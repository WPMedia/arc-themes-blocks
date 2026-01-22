import React, { useState, useEffect } from "react";
import { Icon } from "@wpmedia/arc-themes-components";
import { useIdentity } from "@wpmedia/arc-themes-components";
import { useFusionContext } from "fusion:context";
import AudienceInsights from '@arcxp/sdk-audience-insights';

function Bookmark() {

    const [loggedIn, setLoggedIn] = useState(false);
    // const [jwtToken, setJwtToken] = useState(null);

    const { isAdmin } = useFusionContext();
    const { Identity } = useIdentity();

    const [bookmarked, setBookmarked] = useState(null);
	const [loading, setLoading] = useState(false);

    const redirectURL = "/account/login/";

    const fusionContext = useFusionContext();

     const ansId = fusionContext?.globalContent?._id;

    console.log(" ANS ID:", ansId);

    useEffect(() => {
    if (Identity) {
    AudienceInsights._Identity = Identity;
    AudienceInsights.apiOrigin = Identity.apiOrigin; // or your actual API origin string
  }    
  
  console.log("Identity.apiOrigin" + Identity.apiOrigin)
  console.log("AudienceInsights.apiOrigin" + AudienceInsights.apiOrigin)

    const getInitalBookmarkStatus = async () => {
    try { 
      const isLoggedIn = await Identity.isLoggedIn();
      if (!isLoggedIn) {
        window.location = redirectURL;
        return;
      }
      setLoggedIn(true);
    

      const res = await AudienceInsights.listBookmarks();
      console.log("Bookmarks response:", res);

      if (res.statusCode !== 200) throw new Error(`Failed to check if already bookmarked.`); 

      setBookmarked(
        Array.isArray(res.items) && res.items.some((item) => item?.ansId === ansId)
      );
    } catch (err) {
      console.error("Initial bookmarks load failed:", err);
      setBookmarked(false);
    }
  };

  if (Identity && !isAdmin) { 
    getInitalBookmarkStatus();
  }
    }, [Identity, isAdmin, redirectURL, ansId]);

    
    const handleClick = async () => {
        if (!ansId || loading || bookmarked === null) return;

        setLoading(true);

        const next = !bookmarked; 
        setBookmarked(next);

        try {
            if (next) {
                const res = await AudienceInsights.addBookmark(ansId);
                console.log("res", res);
                if (res.statusCode !== 202) throw new Error(`POST failed ${res.statusCode}`);
                console.log("Bookmark added");
            } else {
                const res = await AudienceInsights.deleteBookmark(ansId);
                console.log("res", res);
                if (res.statusCode !== 202) throw new Error(`DELETE failed ${res.statusCode}`);
                console.log("Bookmark removed");
            }
        } catch (err) {
            console.error("Error toggling bookmark:", err);
            setBookmarked(!next); // rollback
        } finally {
            setLoading(false);
        }
    };

	return (
		<button
			onClick={handleClick}
			disabled={loading}
			aria-label={bookmarked ? "Bookmarked" : "Bookmark"}
			type="button"
			style={{
				background: "black",
                borderRadius: "15px",
				border: "1px solid  white",
				cursor: "pointer",
				padding: 1,
				opacity: loading ? 0.5 : 1,
				color: "white",
                width: "100px",
                height: "30px", 
			}}
		>
            {bookmarked === null ? "Loading..." : bookmarked ? "Bookmarked" : "Bookmark"}
		</button>
	);
}

Bookmark.label = "Bookmark - Arc Block";
Bookmark.icon = "bookmark";

export default Bookmark;
