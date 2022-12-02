import React from "react";
import ArticleDate from "./features/date/default";

export default {
	title: "Blocks/Date",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const dateFromArticleContent = () => <ArticleDate />;
