import React from "react";
import CategoryCarousel from "./features/category-carousel/default";

// for more info on storybook and using the component explorer
// https://storybook.js.org/
export default {
	title: "Blocks/Category Carousel",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const showHeading = () => <CategoryCarousel customFields={{ showHeading: true }} />;

export const hideHeading = () => <CategoryCarousel customFields={{ showHeading: false }} />;
