import React from "react";
import { SubHeadlinePresentation } from "./features/subheadline/default";

export default {
	title: "Blocks/Sub Headline",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

const mockContent = {
	description: {
		basic: "Sub Headline From description",
	},
	subheadlines: {
		basic: "Sub Headline From subheadline",
	},
};

export const subHeadlineFromSubheadline = () => <SubHeadlinePresentation content={mockContent} />;

export const subHeadlineFromDescription = () => (
	<SubHeadlinePresentation content={mockContent} valueToDisplay="Description" />
);
