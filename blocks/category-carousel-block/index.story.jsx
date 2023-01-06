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

const requiredImages = {
	imageUrl_0:
		"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
	imageId_0: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
	imageAuth_0: '{"2":"ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4"}',
	imageAlt_0: "Textile salesman",
	label_0: "Item  #1",
	linkUrl_0: "#",
	imageUrl_1:
		"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/QQUBBHAFJRDH7IVNHAI4IBEQVY.jpg",
	imageId_1: "QQUBBHAFJRDH7IVNHAI4IBEQVY",
	imageAuth_1: '{"2":"ea391c022766c61dfadf9c6778efa43a8c31b87db157dc7d5db888562ff3150e"}',
	imageAlt_1: "Cinnamon rolls",
	label_1: "Item  #2",
	linkUrl_1: "#",
	imageUrl_2:
		"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/NPVE46CA5RGQNFTBI4KHLSKXK4.jpg",
	imageId_2: "NPVE46CA5RGQNFTBI4KHLSKXK4",
	imageAuth_2: '{"2":"e8ea8c4ce569edba303877a534ed0f3726da822d94bf7c8394f9ed299d5d4b20"}',
	imageAlt_2: "Abandoned island",
	label_2: "Item  #3",
	linkUrl_2: "#",
	imageUrl_3:
		"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/ID2JHZDKZNAU5PTWWQRBDBPGBM.png",
	imageId_3: "ID2JHZDKZNAU5PTWWQRBDBPGBM",
	imageAuth_3: '{"2":"0545f53d90e7454436d030970d92101e03df66bb99eaef39e222ec548fbbea31"}',
	imageAlt_3: "Apartment building",
	label_3: "Item  #4",
	linkUrl_3: "#",
};

export const showHeading = () => (
	<CategoryCarousel
		customFields={{
			headerText: "Category Carousel",
			...requiredImages,
		}}
	/>
);

export const hideHeading = () => (
	<CategoryCarousel
		customFields={{
			...requiredImages,
		}}
	/>
);

export const maximumItems = () => (
	<CategoryCarousel
		customFields={{
			...requiredImages,
			imageUrl_4:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
			imageId_4: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
			imageAuth_4: '{"2":"ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4"}',
			imageAlt_4: "Textile salesman",
			label_4: "Item  #5",
			linkUrl_4: "#",
			imageUrl_5:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/QQUBBHAFJRDH7IVNHAI4IBEQVY.jpg",
			imageId_5: "QQUBBHAFJRDH7IVNHAI4IBEQVY",
			imageAuth_5: '{"2":"ea391c022766c61dfadf9c6778efa43a8c31b87db157dc7d5db888562ff3150e"}',
			imageAlt_5: "Cinnamon rolls",
			label_5: "Item  #6",
			linkUrl_5: "#",
			imageUrl_6:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/NPVE46CA5RGQNFTBI4KHLSKXK4.jpg",
			imageId_6: "NPVE46CA5RGQNFTBI4KHLSKXK4",
			imageAuth_6: '{"2":"e8ea8c4ce569edba303877a534ed0f3726da822d94bf7c8394f9ed299d5d4b20"}',
			imageAlt_6: "Abandoned island",
			label_6: "Item  #7",
			linkUrl_6: "#",
			imageUrl_7:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/ID2JHZDKZNAU5PTWWQRBDBPGBM.png",
			imageId_7: "ID2JHZDKZNAU5PTWWQRBDBPGBM",
			imageAuth_7: '{"2":"0545f53d90e7454436d030970d92101e03df66bb99eaef39e222ec548fbbea31"}',
			imageAlt_7: "Apartment building",
			label_7: "Item  #8",
			linkUrl_7: "#",
			imageUrl_8:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
			imageId_8: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
			imageAuth_8: '{"2":"ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4"}',
			imageAlt_8: "Textile salesman",
			label_8: "Item  #9",
			linkUrl_8: "#",
			imageUrl_9:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/QQUBBHAFJRDH7IVNHAI4IBEQVY.jpg",
			imageId_9: "QQUBBHAFJRDH7IVNHAI4IBEQVY",
			imageAuth_9: '{"2":"ea391c022766c61dfadf9c6778efa43a8c31b87db157dc7d5db888562ff3150e"}',
			imageAlt_9: "Cinnamon rolls",
			label_9: "Item  #10",
			linkUrl_9: "#",
			imageUrl_10:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/NPVE46CA5RGQNFTBI4KHLSKXK4.jpg",
			imageId_10: "NPVE46CA5RGQNFTBI4KHLSKXK4",
			imageAuth_10: '{"2":"e8ea8c4ce569edba303877a534ed0f3726da822d94bf7c8394f9ed299d5d4b20"}',
			imageAlt_10: "Abandoned island",
			label_10: "Item  #11",
			linkUrl_10: "#",
			imageUrl_11:
				"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/ID2JHZDKZNAU5PTWWQRBDBPGBM.png",
			imageId_11: "ID2JHZDKZNAU5PTWWQRBDBPGBM",
			imageAuth_11: '{"2":"0545f53d90e7454436d030970d92101e03df66bb99eaef39e222ec548fbbea31"}',
			imageAlt_11: "Apartment building",
			label_11: "Item  #12",
			linkUrl_11: "#",
		}}
	/>
);
