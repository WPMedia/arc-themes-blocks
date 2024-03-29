import React from "react";
import { ProductFeaturedImageDisplay } from "./features/product-featured-image/default";

export default {
	title: "Blocks/Product Featured Image",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

const mockFeaturedImageData = {
	_id: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
	type: "image",
	url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
	auth: {
		1: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
	},
	alt_text: "Man smiling posing in front of shelves. (This is alt text.)",
};

export const displayImage = () => (
	<ProductFeaturedImageDisplay
		featuredImage={mockFeaturedImageData}
		resizerAppVersion={1}
		resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
	/>
);

export const noImage = () => <ProductFeaturedImageDisplay featuredImage={{}} />;
