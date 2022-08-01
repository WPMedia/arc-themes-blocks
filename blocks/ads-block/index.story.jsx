import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { ArcAdDisplay } from "./features/ads/default";

export default {
	title: "Blocks/Ads Block",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const DEFAULT_PROPS = {
	config: {
		adClass: "",
		adType: "1x1",
		slotName: "Slot Name",
		dimensions: [[100, 100]],
	},
	displayAdLabel: true,
	instanceId: "1",
	isAdmin: false,
	isAMP: () => false,
	lazyLoad: false,
	propsWithContext: { siteProperties: { dfpId: "dfp id" } },
	sizing: { maxWidth: "100px", minHeight: "100px" },
	adLabel: "Ad Label",
	reserveSpace: true,
};

export const adminView = () => <ArcAdDisplay {...DEFAULT_PROPS} isAdmin />;
