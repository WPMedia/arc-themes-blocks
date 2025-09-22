import React, { useState, useEffect } from "react";
import { Icon } from "@wpmedia/arc-themes-components";
import { useIdentity } from "@wpmedia/arc-themes-components";
import { useFusionContext } from "fusion:context";

function Bookmark() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);

    const { isAdmin } = useFusionContext();
    const { Identity } = useIdentity();

    const [bookmarked, setBookmarked] = useState(null);
	const [loading, setLoading] = useState(false);

    const redirectURL = "/account/login/";

    const fusionContext = useFusionContext();

     const ansId = fusionContext?.globalContent?._id;

    console.log(" ANS ID:", ansId);

    useEffect(() => {
    const checkLoggedInStatus = async () => {
    try { 
      const isLoggedIn = await Identity.isLoggedIn();
      if (!isLoggedIn) {
        window.location = redirectURL;
        return;
      }
      setLoggedIn(true);
    
      const token =
        JSON.parse(localStorage.getItem("ArcId.USER_INFO") || "{}").accessToken || null;

      console.log("JWT Token:", token);
      setJwtToken(token);

      if (!token) {      
        setBookmarked(false);
        return;
      }

      const res = await fetch(
        `${Identity.apiOrigin}/identity/public/v2/extprofile/readlater`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (!res.ok) throw new Error(`GET failed ${res.status}`); 

      const data = await res.json();
      setBookmarked(
        Array.isArray(data) && data.some((item) => item?.ansId === ansId) 
      );
    } catch (err) {
      console.error("Auth or initial bookmarks load failed:", err); 
      setBookmarked(false); 
    }
  };

  if (Identity && !isAdmin) { 
    checkLoggedInStatus();
  }
    }, [Identity, isAdmin, redirectURL, ansId]);

    
    const handleClick = async () => {
        if (!ansId || loading || bookmarked === null) return;

        setLoading(true);

        const next = !bookmarked; 
        setBookmarked(next);

        try {
            if (next) {
                const res = await fetch(`${Identity.apiOrigin}/identity/public/v2/extprofile/readlater`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify({ ansId }),
                });
                if (!res.ok) throw new Error(`POST failed ${res.status}`);
                console.log("Bookmark added");
            } else {
                const res = await fetch(`${Identity.apiOrigin}/identity/public/v2/extprofile/readlater/${encodeURIComponent(ansId)}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                    },
                });
                if (!res.ok && res.status !== 404) throw new Error(`DELETE failed ${res.status}`);
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
