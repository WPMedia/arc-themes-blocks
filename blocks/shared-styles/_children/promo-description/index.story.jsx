import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import PromoDescription from "./index";

export default {
	title: "Shared Styles/Promo/Description",
	decorators: [withKnobs],
};

export const usingANSStoryObject = () => {
	const props = {
		className: text("className", ""),
		content: {
			description: {
				basic: text(
					"description.basic",
					"Whoa, they really cleaned this place up, looks brand new. Save the clock tower. "
				),
			},
		},
	};

	return <PromoDescription {...props} />;
};

export const customText = () => {
	const props = {
		className: text("className", ""),
		text: text("text", "Custom text for promo description"),
	};

	return <PromoDescription {...props} />;
};
