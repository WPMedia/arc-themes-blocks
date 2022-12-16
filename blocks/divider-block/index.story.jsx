import React from "react";
import Divider from "./features/divider/default";

// for more info on storybook and using the component explorer
// https://storybook.js.org/
export default {
	title: "Blocks/Divider",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const divider = () => <Divider />;

export const dividingContent = () => (
	<>
		<p>Before divider</p>
		<Divider />
		<p>After divider</p>
	</>
);
