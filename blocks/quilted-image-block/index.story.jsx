import React from "react";
import QuiltedImage from "./features/quilted-image/default";

// for more info on storybook and using the component explorer
// https://storybook.js.org/
export default {
	title: "Blocks/Quilted Image",
	parameters: {
		chromatic: { viewports: [320, 768, 1200] },
		cssVariables: {
			theme: "commerce",
		},
	},
};

const customFields = {
	headline: "Quilted Image Block Headline",
	fullWidthImage: "bottom",
	image1URL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/NPVE46CA5RGQNFTBI4KHLSKXK4.jpg",
	image1AspectRatio: "4/3",
	image1Id: "NPVE46CA5RGQNFTBI4KHLSKXK4",
	image1Auth: '{"2":"e8ea8c4ce569edba303877a534ed0f3726da822d94bf7c8394f9ed299d5d4b20"}',
	image1Alt: "Abandoned island",
	overlay1Text: "Overlay Text 1",
	overlay1TextVariant: "dark",
	button1Text: "Button 1 Text",
	item1Action: "https://www.arcxp.com/products/content/",
	button1Variant: "primary",
	image2URL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/ID2JHZDKZNAU5PTWWQRBDBPGBM.png",
	image2AspectRatio: "4/3",
	image2Id: "ID2JHZDKZNAU5PTWWQRBDBPGBM",
	image2Auth: '{"2":"0545f53d90e7454436d030970d92101e03df66bb99eaef39e222ec548fbbea31"}',
	image2Alt: "Apartment building",
	overlay2Text: "Overlay Text 2",
	overlay2TextVariant: "dark",
	button2Text: "Button 2 Text",
	item2Action: "https://www.arcxp.com/products/experiences/",
	button2Variant: "primary",
	image3URL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/Y3STKUZ2CVHUBN4CLLFKP4JRQU.jpg",
	image3AspectRatio: "16/9",
	image3Id: "Y3STKUZ2CVHUBN4CLLFKP4JRQU",
	image3Auth: '{"2":"e1ee90266f0068204492e7212dc50cf4a7f9a05a21480ec1821346511a09b65b"}',
	image3Alt: "Smiling dog",
	overlay3Text: "Overlay Text 3",
	overlay3TextVariant: "dark",
	button3Text: "Button 3 Text",
	item3Action: "https://www.arcxp.com/products/commerce/",
	button3Variant: "primary",
};

export const fullWidthImageOnBottom = () => <QuiltedImage customFields={{ ...customFields }} />;

export const fullWidthImageOnTop = () => (
	<QuiltedImage
		customFields={{
			...customFields,
			fullWidthImage: "top",
			image1AspectRatio: "16/9",
			image3AspectRatio: "4/3",
		}}
	/>
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

export const itemsNotRenderedWithoutActionCustomFields = () => (
	<QuiltedImage
		customFields={{
			...customFields,
			item1Action: "",
			item2Action: "",
			item3Action: "",
		}}
	/>
);

export const item1NotRenderedWithoutTextOverlay = () => (
	<QuiltedImage
		customFields={{
			...customFields,
			overlay1Text: "",
		}}
	/>
);
