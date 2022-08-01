import React from "react";
// todo: remove and replace
import "./index.scss";

// could I use this in sb?
// this is only visible on the admin side
const ArcAdminAd = ({ adClass, adType, slotName, dimensions, isAdmin }) =>
	isAdmin ? (
		<div
			className={["pb-ad-admin", "arcad", `ad-${adClass}`, "padding-sm-all"].join(
				" "
			)} /* Remove special padding adding here */
		>
			{/* should be able to remove this margin bottom as we don't allow block padding that affects other blocks */}
			<div className="margin-md-bottom">
				<span className="ad_name margin-md-right">{adType || "Ad Name N/A"}</span>
				<span>{slotName}</span>
			</div>
			<div>{JSON.stringify(dimensions)}</div>
		</div>
	) : null;

export default ArcAdminAd;
