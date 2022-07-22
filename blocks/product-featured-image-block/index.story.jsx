import React from "react";
import ProductFeaturedImage from "./features/product-featured-image/default";

// for more info on storybook and using the component explorer
// https://storybook.js.org/
export default {
	title: "Blocks/Product Featured Image",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const showHeading = () => <ProductFeaturedImage customFields={{ showHeading: true }} />;

export const hideHeading = () => <ProductFeaturedImage customFields={{ showHeading: false }} />;
