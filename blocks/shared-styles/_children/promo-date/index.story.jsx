import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import PromoDate from "./index";

export default {
	title: "Shared Styles/Promo/Date",
	decorators: [withKnobs],
};

export const usingANSStoryObject = () => {
	const props = {
		className: text("className", ""),
		content: {
			display_date: text("display_date", "2019-08-11T16:45:33.209Z"),
		},
	};

	return <PromoDate {...props} />;
};

export const customDate = () => {
	const props = {
		className: text("className", ""),
		date: text("date", "2019-08-01T14:45:33.209Z"),
	};

	return <PromoDate {...props} />;
};
