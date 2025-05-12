import getImageFromANS from "./index";

const mockLeadArtVideo = {
	_id: "WRONBKU2AVFKBOGTD3U7TYQJEQ",
	type: "story",
	promo_items: {
		lead_art: {
			type: "video",
			_id: "e3fd9d65-abef-44c0-95b6-7bdfe2acc82d",
			promo_items: {
				basic: {
					type: "image",
					version: "0.5.8",
					credits: {},
					caption: "GF Default - A Shallow River Streaming Through A Bed Of Rocks",
					url: "https://d22ff27hdsy159.cloudfront.net/11-05-2019/t_9f51049ae2e640ba99b4a7f1763ca5fc_name_t_1c01cadfde48422b857383e38d8553a7_name_Pexels_Videos_2330708__scaled.jpg",
					width: 1920,
					height: 1080,
				},
			},
			promo_image: {
				type: "image",
				version: "0.5.8",
				credits: {},
				caption: "GF Default - A Shallow River Streaming Through A Bed Of Rocks",
				url: "https://d22ff27hdsy159.cloudfront.net/11-05-2019/t_9f51049ae2e640ba99b4a7f1763ca5fc_name_t_1c01cadfde48422b857383e38d8553a7_name_Pexels_Videos_2330708__scaled.jpg",
				width: 1920,
				height: 1080,
			},
		},
	},
};
const mockLeadArtVideoNoImageType = {
	_id: "ZFGIZMA6LFEUHMOMN4D4CAJXWY",
	type: "story",
	version: "0.10.5",
	content_elements: [
		{
			_id: "ALEXEUBIPFH5LD4PQ63H5ISHHU",
			type: "text",
			additional_properties: {
				comments: [],
				_id: 1597068366879,
				inline_comments: [],
			},
			content: "<br/>",
		},
	],
	promo_items: {
		lead_art: {
			type: "video",
			_id: "ba52f779-47be-46b9-8bd5-58dcb4318101",
			promo_items: {
				basic: {
					type: "not-image-type",
					version: "0.5.8",
					credits: {},
				},
			},
			video_type: "clip",
		},
	},
};
const mockLeadArtVideoPromoBasic = {
	_id: "Y72XAJSRQRE4LABBKKDW6GJZNM",
	type: "story",
	version: "0.10.5",
	content_elements: [
		{
			_id: "E3567HNOYFDTXDFMHPXWXDII24",
			type: "text",
			content: "<br/>",
		},
	],
	promo_items: {
		basic: {
			_id: "GH3BDATX7FBZ7DSPPZFD5DPFJM",
			additional_properties: {
				fullSizeResizeUrl:
					"/photo/resize/6BiTyEjupbGWhooSE6SJwf0bPl8=/arc-anglerfish-arc2-prod-corecomponents/public/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
				ingestionMethod: "manual",
				keywords: [],
				mime_type: "image/jpeg",
				originalName: "tv-test-pattern.jpg",
				originalUrl:
					"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
			},
			type: "image",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
		},
		lead_art: {
			type: "video",
			_id: "ba52f779-47be-46b9-8bd5-58dcb4318101",
			version: "0.8.0",
			promo_items: {
				basic: {
					type: "image",
					version: "0.5.8",
					credits: {},
				},
			},
			video_type: "clip",
			promo_image: {
				type: "image",
				version: "0.5.8",
				credits: {},
			},
		},
	},
	canonical_website: "the-sun",
};
const mockStoryPromoItemsGalleryFocalPoint = {
	promo_items: {
		lead_art: {
			_id: "ZMTIFZGC2NCYTDVU7GIGHJKEUY",
			content_elements: [
				{
					_id: "P3V3THIJPVGUBLRIIYWKFHZTKA",
					type: "image",
					url: "foo.jpg",
					version: "0.10.3",
					width: 5616,
				},
			],
			promo_items: {
				basic: {
					_id: "P3V3THIJPVGUBLRIIYWKFHZTKA",
					type: "image",
					url: "bar.jpg",
				},
			},
			type: "gallery",
		},
	},
};

describe("when extract an image from a story", () => {
	it("return null if not found", () => {
		const url = getImageFromANS({
			promo_items: null,
		});
		expect(url).toBeNull();
	});
	it("return null if no argument passed", () => {
		const url = getImageFromANS();
		expect(url).toBeNull();
	});
	it("must extract image from lead_art.promo_items if is present", () => {
		const objectWithURL = getImageFromANS(mockLeadArtVideo);

		expect(objectWithURL).toEqual({
			caption: "GF Default - A Shallow River Streaming Through A Bed Of Rocks",
			credits: {},
			height: 1080,
			type: "image",
			url: "https://d22ff27hdsy159.cloudfront.net/11-05-2019/t_9f51049ae2e640ba99b4a7f1763ca5fc_name_t_1c01cadfde48422b857383e38d8553a7_name_Pexels_Videos_2330708__scaled.jpg",
			version: "0.5.8",
			width: 1920,
		});
	});

	it("must extract image from basic if lead_art image is empty", () => {
		const objectWithURL = getImageFromANS(mockLeadArtVideoPromoBasic);

		expect(objectWithURL).toEqual({
			_id: "GH3BDATX7FBZ7DSPPZFD5DPFJM",
			additional_properties: {
				fullSizeResizeUrl:
					"/photo/resize/6BiTyEjupbGWhooSE6SJwf0bPl8=/arc-anglerfish-arc2-prod-corecomponents/public/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
				ingestionMethod: "manual",
				keywords: [],
				mime_type: "image/jpeg",
				originalName: "tv-test-pattern.jpg",
				originalUrl:
					"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
			},
			type: "image",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
		});
	});

	it("must return null if lead_art or basic doesn't have an image type", () => {
		const url = getImageFromANS(mockLeadArtVideoNoImageType);

		expect(url).toBeNull();
	});

	it("must extract image from basic if lead_art is gallery", () => {
		const url = getImageFromANS(mockStoryPromoItemsGalleryFocalPoint);

		expect(url).toEqual({ _id: "P3V3THIJPVGUBLRIIYWKFHZTKA", type: "image", url: "bar.jpg" });
	});
});
