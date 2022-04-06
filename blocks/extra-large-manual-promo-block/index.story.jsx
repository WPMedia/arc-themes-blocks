import React from "react";
import ExtraLargeManualPromo from "./features/extra-large-manual-promo/default";

export default {
	title: "Blocks/Extra Large Manual Promo",
};

const allCustomFields = {
	showOverline: false,
	showHeadline: false,
	showImage: false,
	showDescription: false,
	showByline: false,
	showDate: false,
	imageRatio: "3:2",
	headline: "This is the headline",
	description: "This is the description",
	overline: "overline",
	overlineURL: "www.google.com",
	imageURL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG",
	linkURL: "www.google.com",
};

export const allFields = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showOverline: true,
		showHeadline: true,
		showImage: true,
		showDescription: true,
	};
	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};

export const onlyImage = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showImage: true,
	};
	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};

export const showOverline = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showOverline: true,
	};
	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};

export const showHeadline = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showHeadline: true,
	};

	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};

export const showDescription = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showDescription: true,
	};

	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};

export const imageAndHeadline = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showHeadline: true,
		showImage: true,
	};

	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};

export const imageAndDescription = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showDescription: true,
		showImage: true,
	};

	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};

export const imageAndOverline = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showOverline: true,
		showImage: true,
	};

	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};

export const imageOverlineAndDescription = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showDescription: true,
		showImage: true,
		showOverline: true,
	};

	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};

export const overlineAndDescription = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showDescription: true,
		showOverline: true,
	};

	return <ExtraLargeManualPromo customFields={updatedCustomFields} />;
};
