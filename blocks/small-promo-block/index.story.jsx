import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import SmallPromo from "./features/small-promo/default";

export default {
	title: "Blocks/Small Promo",
	decorators: [withKnobs],
};

const sampleData = {
	showHeadline: false,
	showImage: false,
	imagePosition: "right",
	imageRatio: "3:2",
	itemContentConfig: {
		contentService: "abc",
		contentConfigValues: "xyz",
	},
};

export const allFields = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
		showImage: true,
	};

	return <SmallPromo customFields={customFields} />;
};

export const image16x9 = () => {
	const customFields = {
		...sampleData,
		imageRatio: "16:9",
		showHeadline: true,
		showImage: true,
	};

	return <SmallPromo customFields={customFields} />;
};

export const image4x3 = () => {
	const customFields = {
		...sampleData,
		imageRatio: "4:3",
		showHeadline: true,
		showImage: true,
	};

	return <SmallPromo customFields={customFields} />;
};

export const headlineOnly = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
	};

	return <SmallPromo customFields={customFields} />;
};

export const imageOnly = () => {
	const customFields = {
		...sampleData,
		showImage: true,
	};

	return <SmallPromo customFields={customFields} />;
};

export const imageLeft = () => {
	const customFields = {
		...sampleData,
		imagePosition: "left",
		showHeadline: true,
		showImage: true,
	};

	return <SmallPromo customFields={customFields} />;
};

export const imageRight = () => {
	const customFields = {
		...sampleData,
		imagePosition: "right",
		showHeadline: true,
		showImage: true,
	};

	return <SmallPromo customFields={customFields} />;
};

export const imageAbove = () => {
	const customFields = {
		...sampleData,
		imagePosition: "above",
		showHeadline: true,
		showImage: true,
	};

	return <SmallPromo customFields={customFields} />;
};

export const imageBelow = () => {
	const customFields = {
		...sampleData,
		imagePosition: "below",
		showHeadline: true,
		showImage: true,
	};

	return <SmallPromo customFields={customFields} />;
};

export const rightToLeft = () => {
	const customFields = {
		...sampleData,
		showHeadline: true,
		showImage: true,
	};

	return (
		<div dir="rtl">
			<SmallPromo customFields={customFields} />
		</div>
	);
};
