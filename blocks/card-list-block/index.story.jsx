import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import CardList from "./features/card-list/default";

export default {
	title: "Blocks/Card List",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const props = {
	deployment: (x) => x,
};

const sampleData = {
	listContentConfig: {
		contentService: "content-api",
		contentConfigValues: {},
	},
	title: "Card List Headline",
};

export const allFields = () => {
	const customFields = {
		...sampleData,
	};

	return <CardList {...props} customFields={customFields} />;
};

export const noTitle = () => {
	const customFields = {
		...sampleData,
		title: null,
	};

	return <CardList {...props} customFields={customFields} />;
};

export const titleAndNoContentRenderingNothing = () => {
	const customFields = {
		listContentConfig: {
			contentService: "content-api",
			contentConfigValues: { noData: true },
		},
		title: "Card List with No Data",
	};

	return <CardList customFields={customFields} />;
};

export const withRtl = () => {
	const customFields = {
		...sampleData,
	};

	return (
		<div dir="rtl">
			<CardList {...props} customFields={customFields} />
		</div>
	);
};
