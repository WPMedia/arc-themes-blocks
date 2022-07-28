import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import AdsBlock from "./features/ads/default";

export default {
	title: "Blocks/Ads Block",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

export const doesNotBreak = () => <AdsBlock />;
