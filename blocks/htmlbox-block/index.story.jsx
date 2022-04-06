import React from "react";
import HTMLBox from "./features/htmlbox/default";

export default {
	title: "Blocks/HTML Box",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const SampleHTML = () => <HTMLBox />;
