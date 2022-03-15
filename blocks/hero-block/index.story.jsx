import React from "react";
import Hero from "./features/hero/default";

// for more info on storybook and using the component explorer
// https://storybook.js.org/
export default {
	title: "Blocks/Hero",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const showHeading = () => <Hero customFields={{ showHeading: true }} />;

export const hideHeading = () => <Hero customFields={{ showHeading: false }} />;
