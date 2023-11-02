import React from "react";

import { isServerSide } from "@wpmedia/arc-themes-components";
import SubscriptionOverlay from "../SubscriptionOverlay";
import SubscriptionDialog from "../SubscriptionDialog";

const RegwallOffer = ({
	actionText,
	actionUrl,
	displayMode,
	headlineText,
	linkPrompt,
	linkText,
	linkUrl,
	reasonPrompt,
	subheadlineText,
	usePortal = true,
}) => {
	if (isServerSide()) {
		return null;
	}

	return (
		<SubscriptionOverlay displayMode={displayMode} usePortal={usePortal}>
			<SubscriptionDialog
				actionText={actionText}
				actionUrl={actionUrl}
				headline={headlineText}
				linkPrompt={linkPrompt}
				linkText={linkText}
				linkUrl={linkUrl}
				reasonPrompt={reasonPrompt}
				subHeadline={subheadlineText}
			/>
		</SubscriptionOverlay>
	);
};

export default RegwallOffer;
