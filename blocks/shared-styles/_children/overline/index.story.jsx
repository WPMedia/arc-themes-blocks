import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Overline from "./index";

export default {
	title: "Shared Styles/Overline",
	decorators: [withKnobs],
};

export const usingANSStoryObject = () => {
	const content = {
		websites: {
			"story-book": {
				website_section: {
					_id: text("websites[arcSite].website_section._id", "/news/"),
					name: text("websites[arcSite].website_section.name", "News"),
				},
			},
		},
	};

	return <Overline story={content} className={text("className", "")} />;
};

export const sponsoredContentOutput = () => {
	const content = {
		owner: {
			sponsored: true,
		},
		websites: {
			"story-book": {
				website_section: {
					_id: text("websites[arcSite].website_section._id", "/news/"),
					name: text("websites[arcSite].website_section.name", "News"),
				},
			},
		},
	};

	return <Overline story={content} className={text("className", "")} />;
};

export const customLinkTextAndUrl = () => {
	const props = {
		customText: text("customText", "Overline Text"),
		customUrl: text("customUrl", "https://arcxp.com"),
		className: text("className", ""),
	};

	return <Overline {...props} />;
};
