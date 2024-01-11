import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import NumberedList from "./features/numbered-list/default";

export default {
	title: "Blocks/Numbered List",
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
	title: "Numbered List Headline",
	showHeadline: false,
	showImage: false,
};

export const allFields = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
		showImage: true,
	};

	return <NumberedList {...props} customFields={customFields} />;
};

export const noBlockTitle = () => {
	const customFields = {
		...sampleData,
		title: "",
		showHeadline: true,
		showImage: true,
	};

	return <NumberedList {...props} customFields={customFields} />;
};

export const headlineOnly = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
	};

	return <NumberedList {...props} customFields={customFields} />;
};

export const imageOnly = () => {
	const customFields = {
		...sampleData,
		showImage: true,
	};

	return <NumberedList {...props} customFields={customFields} />;
};

export const noImageNoHeadline = () => {
	const customFields = {
		...sampleData,
	};

	return <NumberedList {...props} customFields={customFields} />;
};

export const withRtl = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
		showImage: true,
	};

	return (
		<div dir="rtl">
			<NumberedList {...props} customFields={customFields} />
		</div>
	);
};
