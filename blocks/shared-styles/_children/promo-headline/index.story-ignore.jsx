import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import PromoHeadline from "./index";

export default {
	title: "Shared Styles/Promo/Headline",
	decorators: [withKnobs],
};

export const usingANSObject = () => {
	const props = {
		className: text("className", ""),
		linkClassName: text("linkClassName", ""),
		headingClassName: text("headingClassName", ""),
		content: {
			headlines: {
				basic: text(
					"headlines.basic",
					"7 questions about traveling to Australia during catastrophic fires, answered"
				),
			},
			websites: {
				"story-book": {
					website_url: text("websites[arcSite].website_url", "https://arcxp.com"),
				},
			},
		},
		newTab: boolean("newTab", false),
	};

	return <PromoHeadline {...props} />;
};

export const customLinkTextAndUrl = () => {
	const props = {
		className: text("className", ""),
		linkClassName: text("linkClassName", ""),
		headingClassName: text("headingClassName", ""),
		text: text(
			"text",
			"7 questions about traveling to Australia during catastrophic fires, answered"
		),
		link: text("link", "https://arcxp.com"),
		newTab: boolean("newTab", false),
	};

	return <PromoHeadline {...props} />;
};
