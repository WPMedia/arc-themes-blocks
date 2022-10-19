import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import ResultsListBlock from "./features/results-list/default";

export default {
	title: "Blocks/Results List",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const sampleData = {
	lazyLoad: false,
	listContentConfig: {
		contentService: null,
		contentConfigValues: {
			offset: 0,
			size: 17,
		},
	},
	showByline: false,
	showDate: false,
	showDescription: false,
	showHeadline: false,
	showImage: false,
	showItemOverline: false,
	overline: "overline",
	overlineURL: "www.google.com",
};

export const withLazyLoadAndAllEnabled = () => {
	const data = {
		...sampleData,
		lazyLoad: true,
		showByline: true,
		showDate: true,
		showDescription: true,
		showHeadline: true,
		showImage: true,
		showItemOverline: true,
	};

	return <ResultsListBlock customFields={data} />;
};

export const withShowImageAndHeadline = () => {
	const data = { ...sampleData, showImage: true, showHeadline: true };

	return <ResultsListBlock customFields={data} />;
};

export const withShowByline = () => {
	const data = { ...sampleData, showByline: true };
	return <ResultsListBlock customFields={data} />;
};

export const withShowDate = () => {
	const data = { ...sampleData, showDate: true };

	return <ResultsListBlock customFields={data} />;
};

export const withShowDescription = () => {
	const data = { ...sampleData, showDescription: true };

	return <ResultsListBlock customFields={data} />;
};

export const withShowHeadline = () => {
	const data = { ...sampleData, showHeadline: true };

	return <ResultsListBlock customFields={data} />;
};

export const withShowImage = () => {
	const data = { ...sampleData, showImage: true };

	return <ResultsListBlock customFields={data} />;
};

export const withShowItemOverline = () => {
	const data = { ...sampleData, showItemOverline: true };

	return <ResultsListBlock customFields={data} />;
};

export const withHeadlineAndDescription = () => {
	const data = { ...sampleData, showHeadline: true, showDescription: true };

	return <ResultsListBlock customFields={data} />;
};

export const withLazyLoadDisabledAndBylineDateHeadlineImage = () => {
	const data = {
		...sampleData,
		lazyLoad: true,
		showByline: true,
		showDate: true,
		showHeadline: true,
		showImage: true,
	};

	return <ResultsListBlock customFields={data} />;
};
