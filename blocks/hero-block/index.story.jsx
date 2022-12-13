import React from "react";
import Hero from "./features/hero/default";

// for more info on storybook and using the component explorer
// https://storybook.js.org/

export default {
	title: "Blocks/Hero",
	parameters: {
		chromatic: { viewports: [320, 1200] },
		cssVariables: {
			theme: "commerce",
		},
	},
};

export const showOverlayCenter = () => (
	<Hero
		customFields={{
			layout: "overlay",
			alignment: "center",
			variant: "light",
			imageId: "P5EYZSWH6FBEHDIQMV7H35ENWM",
			imageURLDesktop:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/P5EYZSWH6FBEHDIQMV7H35ENWM.jpg",
			imageAuth: '{"2":"2dd3c2a210c92684c52c3fd991646cc7119f623a92e65a3513a6c1086d41cade"}',
			mobileImageId: "EM5DTGYGABDJZODV7YVFOC2DOM",
			imageURLMobile:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
			mobileImageAuth: '{"2":"75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf"}',
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "secondary",
			link2Action: "/womans",
			link2Text: "Shop Women",
			link2Type: "secondary",
		}}
	/>
);

export const showOverlayLeft = () => (
	<Hero
		customFields={{
			layout: "overlay",
			alignment: "left",
			variant: "light",
			imageId: "P5EYZSWH6FBEHDIQMV7H35ENWM",
			imageURLDesktop:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/P5EYZSWH6FBEHDIQMV7H35ENWM.jpg",
			imageAuth: '{"2":"2dd3c2a210c92684c52c3fd991646cc7119f623a92e65a3513a6c1086d41cade"}',
			mobileImageId: "EM5DTGYGABDJZODV7YVFOC2DOM",
			imageURLMobile:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
			mobileImageAuth: '{"2":"75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf"}',
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "secondary",
			link2Action: "/womans",
			link2Text: "Shop Women",
			link2Type: "secondary",
		}}
	/>
);

export const showButtonVariants = () => (
	<Hero
		customFields={{
			layout: "overlay",
			alignment: "left",
			variant: "light",
			imageId: "P5EYZSWH6FBEHDIQMV7H35ENWM",
			imageURLDesktop:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/P5EYZSWH6FBEHDIQMV7H35ENWM.jpg",
			imageAuth: '{"2":"2dd3c2a210c92684c52c3fd991646cc7119f623a92e65a3513a6c1086d41cade"}',
			mobileImageId: "EM5DTGYGABDJZODV7YVFOC2DOM",
			imageURLMobile:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
			mobileImageAuth: '{"2":"75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf"}',
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "primary",
			link2Action: "/womans",
			link2Text: "Shop Women",
			link2Type: "secondary",
		}}
	/>
);

export const showOnlyOneButton = () => (
	<Hero
		customFields={{
			layout: "overlay",
			alignment: "left",
			variant: "light",
			imageId: "P5EYZSWH6FBEHDIQMV7H35ENWM",
			imageURLDesktop:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/P5EYZSWH6FBEHDIQMV7H35ENWM.jpg",
			imageAuth: '{"2":"2dd3c2a210c92684c52c3fd991646cc7119f623a92e65a3513a6c1086d41cade"}',
			mobileImageId: "EM5DTGYGABDJZODV7YVFOC2DOM",
			imageURLMobile:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
			mobileImageAuth: '{"2":"75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf"}',
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "primary",
		}}
	/>
);

export const showStackedCenter = () => (
	<Hero
		customFields={{
			layout: "stacked",
			alignment: "center",
			variant: "dark",
			imageId: "P5EYZSWH6FBEHDIQMV7H35ENWM",
			imageURLDesktop:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/P5EYZSWH6FBEHDIQMV7H35ENWM.jpg",
			imageAuth: '{"2":"2dd3c2a210c92684c52c3fd991646cc7119f623a92e65a3513a6c1086d41cade"}',
			mobileImageId: "EM5DTGYGABDJZODV7YVFOC2DOM",
			imageURLMobile:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
			mobileImageAuth: '{"2":"75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf"}',
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "primary",
			link2Action: "/womans",
			link2Text: "Shop Women",
			link2Type: "primary",
		}}
	/>
);

export const showStackedLeft = () => (
	<Hero
		customFields={{
			layout: "stacked",
			alignment: "left",
			variant: "dark",
			imageId: "P5EYZSWH6FBEHDIQMV7H35ENWM",
			imageURLDesktop:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/P5EYZSWH6FBEHDIQMV7H35ENWM.jpg",
			imageAuth: '{"2":"2dd3c2a210c92684c52c3fd991646cc7119f623a92e65a3513a6c1086d41cade"}',
			mobileImageId: "EM5DTGYGABDJZODV7YVFOC2DOM",
			imageURLMobile:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
			mobileImageAuth: '{"2":"75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf"}',
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "primary",
			link2Action: "/womans",
			link2Text: "Shop Women",
			link2Type: "primary",
		}}
	/>
);
