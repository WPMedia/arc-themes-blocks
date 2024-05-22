import React from "react";
import Byline from "./features/byline/default";

export default {
	title: "Blocks/Byline",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const bylineFromArticleContent = () => <Byline />;
