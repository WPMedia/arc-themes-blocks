import React from "react";
import Promo from "./features/large-promo/default";

export default {
	title: "Blocks/Large Promo",
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const allCustomFields = {
	itemContentConfig: {
		contentService: "content-api",
		contentConfigValues: {
			_id: "",
			website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
		},
	},
	showOverline: false,
	showHeadline: false,
	showImage: false,
	showDescription: false,
	showByline: false,
	showDate: false,
	imageRatio: "4:3",
};

export const allFields = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showOverline: true,
		showHeadline: true,
		showImage: true,
		showDescription: true,
		showByline: true,
		showDate: true,
	};
	return <Promo customFields={updatedCustomFields} />;
};

export const onlyImage = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showImage: true,
	};
	return <Promo customFields={updatedCustomFields} />;
};

export const showOverline = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showOverline: true,
	};
	return <Promo customFields={updatedCustomFields} />;
};

export const showHeadline = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showHeadline: true,
	};

	return <Promo customFields={updatedCustomFields} />;
};

export const showDescription = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showDescription: true,
	};

	return <Promo customFields={updatedCustomFields} />;
};

export const imageAndHeadline = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showHeadline: true,
		showImage: true,
	};

	return <Promo customFields={updatedCustomFields} />;
};

export const imageAndDescription = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showDescription: true,
		showImage: true,
	};

	return <Promo customFields={updatedCustomFields} />;
};

export const withGalleryLabelAndImage = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showImage: true,
		content: { type: "gallery" },
	};

	return <Promo customFields={updatedCustomFields} />;
};

export const withVideoLabelAndImage = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showImage: true,
		content: { type: "video" },
	};

	return <Promo customFields={updatedCustomFields} />;
};
