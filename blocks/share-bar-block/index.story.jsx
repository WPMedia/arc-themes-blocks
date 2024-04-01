import React from "react";
import { text, boolean } from "@storybook/addon-knobs";
import ShareBarContainer, { ShareBar } from "./features/share-bar/default";


export default {
	title: "Blocks/Share Bar",
	component: ShareBarContainer,

	parameters: {
		chromatic: {
			viewports: [960, 1200],
		},
	},
};

export const CustomShareBar = (
	<ShareBar
		customFields={{
			email: boolean("Email", true),
			facebook: boolean("Facebook", true),
			pinterest: boolean("Pinterest", true),
			twitter: boolean("Twitter", true),
			linkedIn: boolean("Linkedin", true),
		}}
		websiteName={text("headlineString", "Man Bites Dog")}
		websiteDomain={text("websiteDomain", "https://www.thesun.com/")}
		websiteUrl={text("websiteUrl", "/2019/07/15/global-kitchen-sink-article/")}
		headlineString={text("websiteName", "The Sun")}
		phrases={{
			t: (key) => key,
		}}
	/>
);

export const NoShareButtons = (
	<ShareBar
		websiteName={text("headlineString", "Man Bites Dog")}
		websiteDomain={text("websiteDomain", "https://www.thesun.com/")}
		websiteUrl={text("websiteUrl", "/2019/07/15/global-kitchen-sink-article/")}
		headlineString={text("websiteName", "The Sun")}
		phrases={{
			t: (key) => key,
		}}
	/>
);
