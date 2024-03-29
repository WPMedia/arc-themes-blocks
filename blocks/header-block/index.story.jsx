import React from "react";
import Header from "./features/header/default";

export default {
	title: "Blocks/Header",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const showDefaultHeader = () => <Header customFields={{ text: "Header" }} />;

export const showExtraLargeHeader = () => (
	<Header
		customFields={{
			text: "Extra Large Header",
			size: "Extra Large",
		}}
	/>
);
export const showLargeHeader = () => (
	<Header
		customFields={{
			text: "Large Header",
			size: "Large",
		}}
	/>
);
export const showMediumHeader = () => (
	<Header
		customFields={{
			text: "Medium Header",
			size: "Medium",
		}}
	/>
);
export const showSmallHeader = () => (
	<Header
		customFields={{
			text: "Small Header",
			size: "Small",
		}}
	/>
);
export const showAllHeaders = () => (
	<>
		<Header customFields={{ text: "Extra Large Header", size: "Extra Large" }} />
		<Header customFields={{ text: "Large Header", size: "Large" }} />
		<Header customFields={{ text: "Medium Header", size: "Medium" }} />
		<Header customFields={{ text: "Small Header", size: "Small" }} />
	</>
);
