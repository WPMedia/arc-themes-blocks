import React from "react";
import StoryCarousel from "./features/story-carousel/default";

export default {
	title: "Blocks/Story Carousel",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

const props = {
	deployment: (x) => x,
};

const sampleData = {
	carouselContentConfig: {
		contentService: "content-api",
		contentConfigValues: { _id: "K2FFSIYSVRC7HIBZBXLQ2CUPTY" },
	},
};

export const withOutHeader = () => <StoryCarousel {...props} customFields={sampleData} />;

export const withHeader = () => {
	const customFields = {
		...sampleData,
		headerText: "This is a header",
	};

	return <StoryCarousel {...props} customFields={customFields} />;
};
