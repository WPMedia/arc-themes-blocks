import React from "react";

import OfferCard from ".";

export default {
	title: "Blocks/Subscriptions/Components/Offer Card",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const allFields = () => (
	<OfferCard
		headline="All Access Annual"
		subHeadline="Save $40 by subscribing annually"
		actionText="Subscribe for $68 for one year"
		actionEvent={() => {}}
		features={[
			{ featureText: "Unlimited access to The Daily Intelligencer" },
			{ featureText: "Save $40" },
		]}
	/>
);

export const noFeatures = () => (
	<OfferCard
		headline="All Access Annual"
		subHeadline="Save $40 by subscribing annually"
		actionText="Subscribe for $68 for one year"
		actionEvent={() => {}}
	/>
);

export const noActionNoFeatures = () => (
	<OfferCard headline="All Access Annual" subHeadline="Save $40 by subscribing annually" />
);

export const HeadlineOnly = () => <OfferCard headline="All Access Annual" />;

export const subHeadlineOnly = () => <OfferCard subHeadline="Save $40 by subscribing annually" />;

export const noAction = () => (
	<OfferCard
		headline="All Access Annual"
		subHeadline="Save $40 by subscribing annually"
		features={[
			{ featureText: "Unlimited access to The Daily Intelligencer" },
			{ featureText: "Save $40" },
		]}
	/>
);

export const onlyFeatures = () => (
	<OfferCard
		features={[
			{ featureText: "Unlimited access to The Daily Intelligencer" },
			{ featureText: "Save $40" },
		]}
	/>
);

export const headlineAndAction = () => (
	<OfferCard
		headline="All Access Annual"
		actionText="Subscribe for $68 for one year"
		actionEvent={() => {}}
	/>
);
