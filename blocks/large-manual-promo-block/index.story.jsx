import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import LargeManualPromo from "./features/large-manual-promo/default";

export default {
	title: "Blocks/Large Manual Promo",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const sampleData = {
	showOverline: false,
	showHeadline: false,
	showImage: false,
	showDescription: false,
	headline: "This is the headline",
	description: "This is the description",
	overline: "overline",
	overlineURL: "www.google.com",
	imageURL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG",
	linkURL: "www.google.com",
};

export const allFields = () => {
	const customFields = {
		...sampleData,
		showOverline: true,
		showHeadline: true,
		showImage: true,
		showDescription: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const onlyImage = () => {
	const customFields = {
		...sampleData,
		showImage: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const imageAndHeadline = () => {
	const customFields = {
		...sampleData,
		showImage: true,
		showHeadline: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const imageAndOverline = () => {
	const customFields = {
		...sampleData,
		showImage: true,
		showOverline: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const imageAndDescription = () => {
	const customFields = {
		...sampleData,
		showImage: true,
		showDescription: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const imageHeadlineAndOverline = () => {
	const customFields = {
		...sampleData,
		showImage: true,
		showHeadline: true,
		showOverline: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const imageHeadlineAndDescription = () => {
	const customFields = {
		...sampleData,
		showImage: true,
		showHeadline: true,
		showDescription: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const onlyOverline = () => {
	const customFields = {
		...sampleData,
		showOverline: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const onlyHeadline = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const headlineAndDescription = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
		showDescription: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const headlineDescriptionAndOverline = () => {
	const customFields = {
		...sampleData,
		showOverline: true,
		showHeadline: true,
		showDescription: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};

export const onlyDescription = () => {
	const customFields = {
		...sampleData,
		showDescription: true,
	};

	return <LargeManualPromo customFields={customFields} />;
};
