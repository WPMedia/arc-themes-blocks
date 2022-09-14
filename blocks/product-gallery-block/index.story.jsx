import React from "react";
import { ProductGalleryDisplay } from "./features/product-gallery/default";

export default {
	title: "Blocks/Product Gallery",
	parameters: {
		chromatic: { viewports: [320, 1200] },
		cssVariables: {
			theme: "commerce",
		},
	},
};

const MOCK_FEATURED_ITEM = {
	_id: "CHS3UKF4BJAQHPON32QXUZDV5Q",
	auth: {
		2: "6d828c8ee7a8dd4a5f350d09bca073eb575cab5517e2e4637aa37202a4903534",
	},
	type: "image",
	url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/CHS3UKF4BJAQHPON32QXUZDV5Q.jpg",
};

const MOCK_ITEM = {
	_id: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
	alt_text: "Man smiling posing in front of shelves. (This is alt text.)",
	auth: {
		2: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
	},
	caption:
		"Portrait of confident businessman with arms crossed against rolled fabric. Executive is smiling while standing against shelves. He is wearing smart casuals in textile factory.",
	type: "image",
	url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
};

const MOCK_CAROUSEL_ITEMS = [
	...Array(10)
		.fill(MOCK_ITEM)
		.map((item, id) => ({
			...item,
			testId: `${item._id}_${id}`,
		})),
];

const MOCK_CAROUSEL_WITH_FEATURED = [
	MOCK_FEATURED_ITEM,
	...Array(10)
		.fill(MOCK_ITEM)
		.map((item, id) => ({
			...item,
			testId: `${item._id}_${id}`,
		})),
];

export const defaultFeaturedImageDisabled = () => (
	<ProductGalleryDisplay
		carouselItems={MOCK_CAROUSEL_ITEMS}
		isFeaturedImageEnabled={false}
		resizerAppVersion={2}
		arcSite="story-book"
		id="id"
		resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		indicatorType="thumbnails"
	/>
);

export const featuredImageEnabled = () => (
	<ProductGalleryDisplay
		carouselItems={MOCK_CAROUSEL_WITH_FEATURED}
		isFeaturedImageEnabled
		resizerAppVersion={2}
		id="id"
		arcSite="story-book"
		resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		indicatorType="thumbnails"
	/>
);

export const indicatorTypeDotsOnMobile = () => (
	<ProductGalleryDisplay
		carouselItems={MOCK_CAROUSEL_ITEMS}
		isFeaturedImageEnabled={false}
		resizerAppVersion={2}
		arcSite="story-book"
		id="id"
		resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		indicatorType="dots"
	/>
);

export const indicatorTypeNoneOnMobile = () => (
	<ProductGalleryDisplay
		carouselItems={MOCK_CAROUSEL_ITEMS}
		isFeaturedImageEnabled={false}
		resizerAppVersion={2}
		arcSite="story-book"
		id="id"
		resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		indicatorType="none"
	/>
);

export const indicatorTypeThumbnailsOnMobile = () => (
	<ProductGalleryDisplay
		carouselItems={MOCK_CAROUSEL_ITEMS}
		isFeaturedImageEnabled={false}
		resizerAppVersion={2}
		arcSite="story-book"
		id="id"
		resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		indicatorType="thumbnails"
	/>
);
