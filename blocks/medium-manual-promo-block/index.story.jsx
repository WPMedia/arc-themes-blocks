import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import MediumManualPromo from "./features/medium-manual-promo/default";

export default {
	title: "Blocks/Medium Manual Promo",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 768, 1200] },
	},
};

const sampleData = {
	headline: "This is the headline",
	description: "This is the description",
	imageId: "P5EYZSWH6FBEHDIQMV7H35ENWM",
	imageURL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/P5EYZSWH6FBEHDIQMV7H35ENWM.jpg",
	imageAuth: '{"2":"2dd3c2a210c92684c52c3fd991646cc7119f623a92e65a3513a6c1086d41cade"}',
	linkURL: "www.google.com",
	showHeadline: false,
	showImage: false,
	showDescription: false,
};

export const allFields = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
		showImage: true,
		showDescription: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const image4x3 = () => {
	const customFields = {
		...sampleData,
		imageRatio: "4:3",
		showHeadline: true,
		showImage: true,
		showDescription: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const image3x2 = () => {
	const customFields = {
		...sampleData,
		imageRatio: "3:2",
		showHeadline: true,
		showImage: true,
		showDescription: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const headlineOnly = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const headlineAndDescription = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
		showDescription: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const imageOnly = () => {
	const customFields = {
		...sampleData,
		showImage: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const descriptionOnly = () => {
	const customFields = {
		...sampleData,
		showDescription: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const headlineAndImage = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
		showImage: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const imageAndDescription = () => {
	const customFields = {
		...sampleData,
		showImage: true,
		showDescription: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const reallyLongText = () => {
	const customFields = {
		...sampleData,
		headline:
			"This is a really long headline. This is a really long headline. This is a really long headline. This is a really long headline. This is a really long headline. This is a really long headline. This is a really long headline. This is a really long headline.",
		description:
			"This is a really long description. This is a really long description. This is a really long descriptionThis is a really long description. This is a really long description. This is a really long description. This is a really long description. This is a really long description. This is a really long description. This is a really long descriptionThis is a really long description. This is a really long description. This is a really long description. This is a really long description.",
		showHeadline: true,
		showImage: true,
		showDescription: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};

export const shortHeadlineLongDescription = () => {
	const customFields = {
		...sampleData,
		headline: "This is a short headline.",
		description:
			"This is a really long description. This is a really long description. This is a really long descriptionThis is a really long description. This is a really long description. This is a really long description. This is a really long description. This is a really long description. This is a really long description. This is a really long descriptionThis is a really long description. This is a really long description. This is a really long description. This is a really long description.",
		showHeadline: true,
		showImage: true,
		showDescription: true,
	};

	return <MediumManualPromo customFields={customFields} />;
};
