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

export const showHeading = () => (
	<CategoryCarousel
		customFields={{
			headerText: "Category Carousel",
			imageUrl_0: "./camera.jpg",
			label_0: "Item  #1",
			linkUrl_0: "#",
			imageUrl_1: "./coffee.jpg",
			label_1: "Item  #2",
			linkUrl_1: "#",
			imageUrl_2: "./glasses.jpg",
			label_2: "Item  #3",
			linkUrl_2: "#",
			imageUrl_3: "./camera.jpg",
			label_3: "Item  #4",
			linkUrl_3: "#",
		}}
	/>
);

export const hideHeading = () => (
	<CategoryCarousel
		customFields={{
			imageUrl_0: "./camera.jpg",
			label_0: "Item  #1",
			linkUrl_0: "#",
			imageUrl_1: "./coffee.jpg",
			label_1: "Item  #2",
			linkUrl_1: "#",
			imageUrl_2: "./glasses.jpg",
			label_2: "Item  #3",
			linkUrl_2: "#",
			imageUrl_3: "./camera.jpg",
			label_3: "Item  #4",
			linkUrl_3: "#",
		}}
	/>
);

export const maximumItems = () => (
	<CategoryCarousel
		customFields={{
			imageUrl_0: "./camera.jpg",
			label_0: "Item  #1",
			linkUrl_0: "#",
			imageUrl_1: "./coffee.jpg",
			label_1: "Item  #2",
			linkUrl_1: "#",
			imageUrl_2: "./glasses.jpg",
			label_2: "Item  #3",
			linkUrl_2: "#",
			imageUrl_3: "./camera.jpg",
			label_3: "Item  #4",
			linkUrl_3: "#",
			imageUrl_4: "./camera.jpg",
			label_4: "Item  #5",
			linkUrl_4: "#",
			imageUrl_5: "./coffee.jpg",
			label_5: "Item  #6",
			linkUrl_5: "#",
			imageUrl_6: "./glasses.jpg",
			label_6: "Item  #7",
			linkUrl_6: "#",
			imageUrl_7: "./camera.jpg",
			label_7: "Item  #8",
			linkUrl_7: "#",
			imageUrl_8: "./camera.jpg",
			label_8: "Item  #9",
			linkUrl_8: "#",
			imageUrl_9: "./coffee.jpg",
			label_9: "Item  #10",
			linkUrl_9: "#",
			imageUrl_10: "./glasses.jpg",
			label_10: "Item  #11",
			linkUrl_10: "#",
			imageUrl_11: "./camera.jpg",
			label_11: "Item  #12",
			linkUrl_11: "#",
		}}
	/>
);
