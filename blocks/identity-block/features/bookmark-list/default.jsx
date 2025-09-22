import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFusionContext } from "fusion:context";
import { useIdentity } from "@wpmedia/arc-themes-components";
import "./bookmark-list.css";

const BLOCK_CLASS_NAME = "b-bookmark-list";

function BookmarkList({ onChange}) {
      const [jwtToken, setJwtToken] = useState(null);
        const { isAdmin } = useFusionContext();
        const { Identity } = useIdentity(); 
		const [bookmarks, setBookmarks] = useState([]);
		const [loading, setLoading] = useState(true);
         const redirectURL = "/account/login/";

        useEffect(() => {
        const fetchBookmarks = async () => {
            if (!Identity || isAdmin) return;
            setLoading(true);
            try {
            const isLoggedIn = await Identity.isLoggedIn();
            if (!isLoggedIn) {
                window.location = redirectURL;
                return;
            }
            const token = JSON.parse(localStorage.getItem("ArcId.USER_INFO") || "{}").accessToken || null;
            setJwtToken(token);
            if (!token) {
                setBookmarks([]);
                setLoading(false);
                return;
            }
            const res = await fetch(`${Identity.apiOrigin}/identity/public/v2/extprofile/readlater`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`GET failed ${res.status}`);
            const data = await res.json();
            setBookmarks(data);
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
            await fetch(
                `${Identity.apiOrigin}/identity/public/v2/extprofile/readlater/${encodeURIComponent(ansId)}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                    },
                }
            );
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
                        //    style={{
                        //          borderRadius: "8px",
                        //              border: "1px solid #d1d5db",
                        //             background: "black",
                        //             color: "white",
                        //             padding: "4px 12px",
                        //             fontSize: "18px",
                        //             cursor: "pointer",
                        //             transition: "background 0.2s, color 0.2s",
                        //       }}
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
	initialBookmarks: PropTypes.arrayOf(
		PropTypes.shape({
			ansId: PropTypes.string.isRequired,
			headline: PropTypes.string,
			site: PropTypes.string,
			url: PropTypes.string.isRequired,
		}),
	),
	onChange: PropTypes.func,
	className: PropTypes.string,
};

BookmarkList.label = "Bookmark List - Arc Block";
export default BookmarkList;
