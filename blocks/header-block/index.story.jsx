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
