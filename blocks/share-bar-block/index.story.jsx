import React from "react";
import ShareBarContainer, { ShareBar } from "./features/share-bar/default";


export default {
	title: "Blocks/Share Bar",
	component: ShareBarContainer,
	args: {
		websiteName: "The Sun",
		websiteDomain: "https://www.thesun.com/",
		websiteUrl: "/2019/07/15/global-kitchen-sink-article/",
		headlineString: "Man Bites Dog"
	},
	parameters: {
		chromatic: {
			viewports: [960, 1200],
		},
	},
};

export const CustomShareBar = (args) => (
	<ShareBar
		{ ...args }
		phrases={{
			t: (key) => key,
		}}
	/>
);
CustomShareBar.args = {
	customFields: {
		email: true,
		facebook: true,
		pinterest: true,
		twitter: true,
		linkedIn: true,
	},
};

export const NoShareButtons = (args) => (
	<ShareBar
		{ ...args }
		phrases={{
			t: (key) => key,
		}}
	/>
);
