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

/*
 	note: 
	`content` from `customFields` prop is overriding content from useContent because "return <LargePromoPresentation content={content} {...customFields} />;" in the stories below.
	
	In order for storybook to test the following, this logic would need to be maintained or the mock data would need to be updated.
*/

export const withGalleryLabelAndImage = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showImage: true,
		content: { type: "gallery" },
		showDescription: true,
		imageOrVideoLabelText: "promo-label.gallery-text",
		showImageOrVideoLabel: true,
		showVideoLabel: false,
	};

	return <Promo customFields={updatedCustomFields} />;
};

export const withVideoLabelAndImage = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showImage: true,
		content: { type: "video" },
		showDescription: true,
		imageOrVideoLabelText: "promo-label.video-text",
		showImageOrVideoLabel: true,
		showVideoLabel: true,
	};

	return <Promo customFields={updatedCustomFields} />;
};

export const playVideoInPlaceOfImage = () => {
	const updatedCustomFields = {
		...allCustomFields,
		// playVideoInPlace will override showImage
		showImage: true,
		playVideoInPlace: true,
		aspectRatio: 16 / 9,
		content: {
			embed_html: `<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>`,
			type: "video",
		},
	};

	return <Promo customFields={updatedCustomFields} />;
};
