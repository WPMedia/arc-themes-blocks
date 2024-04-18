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
	caption:
		"Reimagining a tried-and-true staple can invigorate the senses. Tired of tomato soup with grilled cheese? Why not try a hearty gazpacho with a caprese focaccia?",
	credits: {
		affiliation: [
			{
				name: "Affiliation Name",
			},
		],
		by: [
			{
				type: "author",
				name: "Author Name",
				org: "Author Org",
				slug: "",
			},
		],
	},
	subtitle: "Switching It Up",
	auth: {
		2: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
	},
	url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
};

export const displayImage = () => (
	<ProductFeaturedImageDisplay
		featuredImage={mockFeaturedImageData}
		resizerAppVersion={2}
		resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
	/>
);
