import React from "react";
import Promo, { ExtraLargePromoPresentation } from "./features/extra-large-promo/default";

export default {
	title: "Blocks/Extra Large Promo",
};

const extraLargePromo = {
	_id: "K2FFSIYSVRC7HIBZBXLQ2CUPTY",
	credits: {
		by: [
			{
				_id: "saracarothers",
				additional_properties: {
					original: {
						byline: "Sara Lynn Carothers",
					},
				},
				name: "Sara Carothers",
				type: "author",
				url: "/author/sara-carothers/",
			},
		],
	},
	description: {
		basic:
			"This story has only a basic promo image (a large rock on the beach). This image should be seen in promo blocks, as well as in the Lead Art spot on the article page, and as the social promo image.",
	},
	display_date: "2021-04-23T21:13:31.477Z",
	headlines: {
		basic: "basic promo image",
	},
	label: {
		basic: {
			display: true,
			text: "Free",
		},
	},
	owner: {
		sponsored: false,
	},
	promo_items: {
		basic: {
			_id: "EM5DTGYGABDJZODV7YVFOC2DOM",
			auth: {
				2: "75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf",
			},
			type: "image",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
		},
	},
	type: "story",
	website_url: "/test/promo-image-variations/2021/04/23/basic-promo-image/",
	websites: {
		"the-gazette": {
			website_section: {
				_id: "/test/promo-image-variations",
				name: "Promo image variations",
			},
			website_url: "/test/promo-image-variations/2021/04/23/basic-promo-image/",
		},
	},
};

const allCustomFields = {
	itemContentConfig: {
		contentService: "content-api",
		contentConfigValues: { _id: "K2FFSIYSVRC7HIBZBXLQ2CUPTY" },
	},
	showOverline: false,
	showHeadline: false,
	showImage: false,
	showDescription: false,
	showByline: false,
	showDate: false,
	imageRatio: "3:2",
	pbInternal_cloneId: "f0fCpmDYaTYpUa",
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
		labelIconName: "Camera",
		labelIconText: "Gallery",
		imageParams: {
			src: extraLargePromo.promo_items.basic.url,
		},
	};

	return <ExtraLargePromoPresentation {...updatedCustomFields} searchableField={() => {}} />;
};

export const withVideoLabelAndImage = () => {
	const updatedCustomFields = {
		...allCustomFields,
		showImage: true,
		labelIconName: "Play",
		labelIconText: "Video",
		imageParams: {
			src: extraLargePromo.promo_items.basic.url,
		},
	};

	return <ExtraLargePromoPresentation {...updatedCustomFields} searchableField={() => {}} />;
};
