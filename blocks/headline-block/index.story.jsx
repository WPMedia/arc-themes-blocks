import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Headline from "./features/headline/_children/headline";

export default {
	title: "Blocks/Headline",
	decorators: [withKnobs],
};

export const customHeadline = () => {
	const headlineString = text("headlineString", "Man Bites Dog");

	return <Headline headlineString={headlineString} />;
};
