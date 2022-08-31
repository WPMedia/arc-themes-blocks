import React from "react";
import Promo, { LargePromoPresentation } from "./features/large-promo/default";

export default {
	title: "Blocks/Large Promo",
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const MOCK_CONTENT = {
	_id: "GHRBLTO6MNGV5G65F5D5XFX4SU",
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
			{
				_id: "5IWXTLUXWNAZTN45YUTJBZM3JM",
				additional_properties: {
					original: {
						byline: "Taylor Doe",
					},
				},
				name: "Taylor Doe",
				type: "author",
				url: "/author/taylor-doe/",
			},
			{
				_id: "john-doe",
				additional_properties: {
					original: {
						byline: "John M Doe",
					},
				},
				name: "John Doe",
				type: "author",
				url: "/author/john-m-doe/",
			},
		],
	},
	description: {
		basic:
			"This is a test story that can be used for breaking news situations like if a new baby panda was born.",
	},
	display_date: "2019-12-02T18:58:11.638Z",
	headlines: {
		basic: "Baby panda born at the zoo",
	},
	label: {
		basic: {
			display: true,
			text: "Exclusive",
		},
	},
	owner: {
		sponsored: false,
	},
	promo_items: {
		basic: {
			resized_params: {
				"274x154": "EfMJE6Iiv4GxwSe15iCDxBnN2ag=filters:format(jpg):quality(70)/",
				"274x183": "a0vSW5PVOKTguW9d5fVcZO-61L4=filters:format(jpg):quality(70)/",
				"274x206": "Uq6qFBw-w6VLN6hhAt0sjSt5UXs=filters:format(jpg):quality(70)/",
				"377x212": "6hCESxDFY823IfORYxfAE__fhPw=filters:format(jpg):quality(70)/",
				"377x251": "oKOQKByIKv7SDRQ3XezELPSAs_o=filters:format(jpg):quality(70)/",
				"377x283": "kJ48hfQYVtqL6H_kUy06_Od9GIU=filters:format(jpg):quality(70)/",
			},
			type: "image",
			url: "https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/CLPUNWMKOZHWPLFYKRZXW6XTNU.jpg",
		},
	},
	type: "story",
	embed_html: `<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>`,
	website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
	websites: {
		"the-sun": {
			website_section: {
				_id: "/health",
				name: "Health",
			},
			website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
		},
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
	playVideoInPlace: false,
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

export const withGalleryLabelAndImage = () => (
	<LargePromoPresentation
		aspectRatio={16 / 9}
		imageSearchField="imageURL"
		labelIconName="Camera"
		labelIconText="Gallery"
		promoImageURL={MOCK_CONTENT.promo_items.basic.url}
		registerSuccessEvent={() => {}}
		searchableField={() => {}}
		viewportPercentage={60}
	/>
);

export const withVideoLabelAndImage = () => (
	<LargePromoPresentation
		aspectRatio={16 / 9}
		embedMarkup={MOCK_CONTENT.embed_html}
		imageSearchField="imageURL"
		labelIconName="Play"
		labelIconText="Video"
		registerSuccessEvent={() => {}}
		searchableField={() => {}}
		viewportPercentage={60}
		playVideoInPlace={false}
	/>
);

export const playVideoInPlaceOfImage = () => (
	<LargePromoPresentation
		playVideoInPlace
		aspectRatio={16 / 9}
		embedMarkup={MOCK_CONTENT.embed_html}
		imageSearchField="imageURL"
		registerSuccessEvent={() => {}}
		searchableField={() => {}}
		viewportPercentage={60}
	/>
);
