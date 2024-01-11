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
	caption: "Caption goes here,",
	subtitle: "Image Title",
	credits: "Photographer/Videographer Credit. Publication credit",
	showOverline: false,
	showHeadline: false,
	showImage: false,
	showDescription: false,
	headline: "This is the headline",
	description: "This is the description",
	overline: "overline",
	overlineURL: "www.google.com",
	imageId: "P5EYZSWH6FBEHDIQMV7H35ENWM",
	imageURL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/P5EYZSWH6FBEHDIQMV7H35ENWM.jpg",
	imageAuth: '{"2":"2dd3c2a210c92684c52c3fd991646cc7119f623a92e65a3513a6c1086d41cade"}',
	linkURL: "www.google.com",
	imagePosition: "bottom",
	author: "Jane and John Dee",
	dateTime: "2021-01-12 13:23",
	dateString: "January 12, 2021 at 1:23PM EST",
	imageRatio: "4:3",
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

export const imageHeadlineOverlineAndDescription = () => {
	const customFields = {
		...sampleData,
		showImage: true,
		showHeadline: true,
		showDescription: true,
		showOverline: true,
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

export const withRtl = () => {
	const customFields = {
		...sampleData,
		showOverline: true,
		showHeadline: true,
		showImage: true,
		showDescription: true,
	};

	return (
		<div dir="rtl">
			<LargeManualPromo customFields={customFields} />
		</div>
	);
};
