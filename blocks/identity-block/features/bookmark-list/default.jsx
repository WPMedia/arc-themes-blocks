import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFusionContext } from "fusion:context";
import { useIdentity } from "@wpmedia/arc-themes-components";
import "./bookmark-list.css";
import AudienceInsights from '@arcxp/sdk-audience-insights';

const BLOCK_CLASS_NAME = "b-bookmark-list";

function BookmarkList({ onChange}) {
    //   const [jwtToken, setJwtToken] = useState(null);
        const { isAdmin } = useFusionContext();
        const { Identity } = useIdentity(); 
		const [bookmarks, setBookmarks] = useState([]);
		const [loading, setLoading] = useState(true);
         const redirectURL = "/account/login/";

        useEffect(() => {
             if (Identity) {
             AudienceInsights._Identity = Identity;
                 AudienceInsights.apiOrigin = Identity.apiOrigin; 
  }
        const fetchBookmarks = async () => {
            setLoading(true);
            try {
            const isLoggedIn = await Identity.isLoggedIn();
            if (!isLoggedIn) {
                window.location = redirectURL;
                return;
            }
            const res = await AudienceInsights.listBookmarks();
            if (res.statusCode !== 200) throw new Error(`GET failed ${res.status}`);
            setBookmarks(Array.isArray(res.items) ? res.items : []);
            } catch (err) {
            setBookmarks([]);
            console.error("Failed to fetch bookmarks:", err);
            } finally {
            setLoading(false);
            }
        };
        fetchBookmarks();
        }, [Identity, isAdmin]);

        const handleRemove = async (ansId) => {
        try {
            await AudienceInsights.deleteBookmark(ansId);
            setBookmarks((prev) => {
                const next = prev.filter((b) => b.ansId !== ansId);
                if (onChange) onChange(next);
                return next;
            });
        } catch (err) {
            console.error("Failed to remove bookmark:", err);
        }
        };

	return (
         <div className={BLOCK_CLASS_NAME}>
            <h2 className="headline">My Bookmarks</h2>
		<ul className="list">
            { loading ? (
            <li className="listItem">Loading...</li>
          ) : 
			(bookmarks.length === 0 ? ( <li> No bookmarks yet. </li>) :

			(bookmarks.map((b) => (
				<li
					key={b.ansId}
					className="listItem"
				>
                    <div className="listItem__content">
					{b.site && <span>{b.site}</span>}
                    <br/>
					<a href={b.url} target="_blank" rel="noreferrer">
						{" "}{b.headline || b.url}
					</a>
                          <br/>
        			{" "}
					<span>{b.url}</span>

					<span style={{ flex: 1 }} />
                    </div>
					<button
                       className={`${BLOCK_CLASS_NAME}_button`}
						type="button"
						aria-label={`Remove ${b.headline || b.url}`}
						onClick={() => handleRemove(b.ansId)}
					>
						×
					</button>
				</li>
			))) )}
		</ul>
        </div>
	);
}

BookmarkList.propTypes = {
	onChange: PropTypes.func,
};

BookmarkList.label = "Bookmark List - Arc Block";
export default BookmarkList;
