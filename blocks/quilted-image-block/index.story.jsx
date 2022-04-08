import React from "react";
import QuiltedImage from "./features/quilted-image/default";

// for more info on storybook and using the component explorer
// https://storybook.js.org/
export default {
	title: "Blocks/Quilted Image",
	parameters: {
		chromatic: { viewports: [320, 768, 1200] },
	},
};

const customFields = {
	headline: "Quilted Image Block Headline",
	fullWidthImage: "bottom",
	image1URL: "./camera.jpg",
	image1AspectRatio: "4/3",
	overlay1Text: "Overlay Text 1",
	overlay1TextVariant: "dark",
	button1Text: "Button 1 Text",
	item1Action: "https://www.arcxp.com/products/content/",
	button1Variant: "primary",
	image2URL: "./glasses.jpg",
	image2AspectRatio: "4/3",
	overlay2Text: "Overlay Text 2",
	overlay2TextVariant: "dark",
	button2Text: "Button 2 Text",
	item2Action: "https://www.arcxp.com/products/experiences/",
	button2Variant: "primary",
	image3URL: "./coffee.jpg",
	image3AspectRatiom: "16/9",
	overlay3Text: "Overlay Text 3",
	overlay3TextVariant: "dark",
	button3Text: "Button 3 Text",
	item3Action: "https://www.arcxp.com/products/commerce/",
	button3Variant: "primary",
};

export const fullWidthImageOnBottom = () => <QuiltedImage customFields={{ ...customFields }} />;

export const fullWidthImageOnTop = () => (
	<QuiltedImage customFields={{ ...customFields, fullWidthImage: "top" }} />
);

export const secondaryButtonVariant = () => (
	<QuiltedImage
		customFields={{
			...customFields,
			button1Variant: "secondary",
			button2Variant: "secondary",
			button3Variant: "secondary",
		}}
	/>
);

export const lightTextColorOnOverlay = () => (
	<QuiltedImage
		customFields={{
			...customFields,
			overlay1TextVariant: "light",
			overlay2TextVariant: "light",
			overlay3TextVariant: "light",
		}}
	/>
);
