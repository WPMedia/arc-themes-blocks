import React from "react";
import LinksBar from "./features/links-bar/default";

export default {
	title: "Blocks/Links Bar",
	parameters: {
		chromatic: {
			viewports: [320, 1200],
		},
	},
};

export const noData = () => (
	<LinksBar
		customFields={{
			navigationConfig: { contentConfigValues: { hierarchy: "noData" } },
		}}
	/>
);

export const oneLink = () => (
	<LinksBar
		customFields={{
			navigationConfig: { contentConfigValues: { hierarchy: "oneLink" } },
		}}
	/>
);

export const twoLinks = () => (
	<LinksBar
		customFields={{
			navigationConfig: { contentConfigValues: { hierarchy: "twoLinks" } },
		}}
	/>
);

export const threeLinks = () => (
	<LinksBar
		customFields={{
			navigationConfig: { contentConfigValues: { hierarchy: "threeLinks" } },
		}}
	/>
);

export const tenLinks = () => (
	<LinksBar
		customFields={{
			navigationConfig: { contentConfigValues: { hierarchy: "tenLinks" } },
		}}
	/>
);
