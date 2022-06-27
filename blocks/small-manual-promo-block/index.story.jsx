import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import SmallManualPromo from "./features/small-manual-promo/default";

export default {
	title: "Blocks/Small Manual Promo",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const sampleData = {
	headline: "This is the headline",
	imageURL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG",
	linkURL: "www.google.com",
	showHeadline: false,
	showImage: false,
	imagePosition: "right",
	imageRatio: "3:2",
};

export const allFields = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
		showImage: true,
	};

	return <SmallManualPromo customFields={customFields} />;
};

export const image4x3 = () => {
	const customFields = {
		...sampleData,
		imageRatio: "4:3",
		showHeadline: true,
		showImage: true,
	};

	return <SmallManualPromo customFields={customFields} />;
};

export const image3x2 = () => {
	const customFields = {
		...sampleData,
		imageRatio: "3:2",
		showHeadline: true,
		showImage: true,
	};

	return <SmallManualPromo customFields={customFields} />;
};

export const headlineOnly = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
	};

	return <SmallManualPromo customFields={customFields} />;
};

export const imageOnly = () => {
	const customFields = {
		...sampleData,
		showImage: true,
	};

	return <SmallManualPromo customFields={customFields} />;
};

export const imageLeft = () => {
	const customFields = {
		...sampleData,
		imagePosition: "left",
		showHeadline: true,
		showImage: true,
	};

	return <SmallManualPromo customFields={customFields} />;
};

export const imageAbove = () => {
	const customFields = {
		...sampleData,
		imagePosition: "above",
		showHeadline: true,
		showImage: true,
	};

	return <SmallManualPromo customFields={customFields} />;
};

export const imageBelow = () => {
	const customFields = {
		...sampleData,
		imagePosition: "below",
		showHeadline: true,
		showImage: true,
	};

	return <SmallManualPromo customFields={customFields} />;
};
