/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */

import getProperties from "fusion:properties";
import getResizedImageData, { extractResizedParams } from ".";
import mockStoryFeedData from "./mocks/mockFeedData";
import mockSearchApiData from "./mocks/mockSearchApiData";
import mockCollectionApiData from "./mocks/mockCollectionApi";
import mockCreditsData from "./mocks/mockCreditsData";
import mockCreditsEmptyImgData from "./mocks/mockCreditsEmptyImgData";
import mockLeadArtData from "./mocks/mockLeadArtData";
import topLeveLeadArt from "./mocks/topLevelLeadArt";
import galleryResizeData from "./mocks/galleryResizeData";
import searchResultsDataBroken from "./mocks/searchResultsDataBroken";
import mockStoryFeedDataEmptyPromo from "./mocks/mockStoryFeedDataEmptyPromo";
import mockLeadArtDataEmptyPromo from "./mocks/mockLeadArtDataEmptyPromo";
import mockSearchApiDataEmptyPromo from "./mocks/mockSearchApiDataEmptyPromo";
import mockLeadArtVideo from "./mocks/mockLeadArtVideo";
import mockLeadArtVideoPromoBasic from "./mocks/mockLeadArtVideoPromoBasic";
import mockFocalBasicPoint from "./mocks/mockStoryPromoItemsBasicFocalPoint";
import mockFocalLeadArtPoint from "./mocks/mockStoryPromoItemsLeadArtFocalPoint";
import mockFocalPointOverwrite from "./mocks/mockStoryPromoItemsBasicFocalPointOverwrite";
import mockGalleryFocalPoint from "./mocks/mockStoryPromoItemsGalleryFocalPoint";

// https://github.com/wapopartners/Infobae-PageBuilder-Fusion-Features/blob/a2409b8147667bd9c435bb44f81bab7ac974c1e8/properties/index.json#L8
const DEFAULT_BREAKPOINTS_ARRAY = [
	{
		device: "mobile",
		width: 420,
	},
	{
		device: "tablet",
		width: 768,
	},
	{
		device: "desktop",
		width: 992,
	},
];

// just targeting results list
const ASPECT_RATIOS = ["3:2", "4:3"];

const IMAGE_WIDTHS = [158, 274];

describe("get resized image data helper on the server-side", () => {
	it("returns data passed in if missing env variables", () => {
		getProperties.mockImplementation(() => ({}));
		const dataWithResizedImages = getResizedImageData(
			mockStoryFeedData,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		);
		const resizedParams = dataWithResizedImages.content_elements[0].promo_items.basic;

		expect(typeof resizedParams.resized_params).toBe("undefined");
	});

	it("returns data passed in if window is undefined", () => {
		getProperties.mockImplementation(() => ({
			breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
			aspectRatios: ASPECT_RATIOS,
			imageWidths: IMAGE_WIDTHS,
			resizerURL: "https://fake.cdn.com/resizer",
		}));

		const dataWithResizedImages = getResizedImageData(
			mockStoryFeedData,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		);

		const resizedParams =
			dataWithResizedImages.content_elements[0].promo_items.basic.resized_params;

		const paramKeys = Object.keys(resizedParams);

		const filterValues = Object.values(resizedParams);

		// if the same resizer key is used this won't change
		expect(filterValues).toEqual([
			"B-33vJ0Ak54a9pMvGhgkzGk0meE=filters:format(jpg):quality(70)/",
			"CfybbXLZWF3gcwc2tD-FYzZlc8Y=filters:format(jpg):quality(70)/",
			"RwaE87wvO3wFs17iLXhecTl2hhQ=filters:format(jpg):quality(70)/",
			"6SNHSvz_6KHTam6lqe-ZgKzlzLs=filters:format(jpg):quality(70)/",
		]);

		// {
		// '420x315|mobile':
		// '/1QqmqwWQDKeiaT6bDVR31vyHK3k=Z/',
		// },

		// will return undefined if no window
		const allValidFilterValues = filterValues.every(
			(imageFilterValue) =>
				typeof imageFilterValue !== "undefined" && imageFilterValue.includes(":cm=t/")
		);
		expect(allValidFilterValues).toEqual(false);

		expect(paramKeys).toEqual(["158x105", "274x183", "158x119", "274x206"]);
	});

	describe("when shouldCompressImageParams siteProperty is true", () => {
		it("returns data passed in from search-api", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const dataWithResizedImages = getResizedImageData(
				mockSearchApiData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			// doesn't have content_elements, just an array with elements that have promo_items
			const resizedParams = dataWithResizedImages[0].promo_items.basic.resized_params;

			const paramKeys = Object.keys(resizedParams);

			const filterValues = Object.values(resizedParams);

			// if the same resizer key is used this won't change
			expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "MT_XX796EvNxF3HZApqlZJ2cp9A=filters:cm=t/",
          "Mg9TY0qaNtVgMhb_ZKJsbP5LozQ=filters:cm=t/",
          "d8sD1oBqFj-OcYFYjxIUvZaJYT8=filters:cm=t/",
          "JrZVYSYW9J7D5h3rkNRlTXpWy5g=filters:cm=t/",
        ]
      `);

			const allValidFilterValues = filterValues.every(
				(imageFilterValue) =>
					typeof imageFilterValue !== "undefined" && imageFilterValue.includes(":cm=t/")
			);
			expect(allValidFilterValues).toEqual(true);

			expect(paramKeys).toEqual(["158x105", "274x183", "158x119", "274x206"]);
		});

		it("resizes author bio if img available", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const {
				credits: { by },
			} = getResizedImageData(
				mockCreditsData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			// doesn't have content_elements, just an array with elements that have promo_items
			expect(by[0].resized_params).toEqual({
				"158x105": "jDV13NRbki-mzrsgQFfZjcSwABw=filters:cm=t/",
				"158x119": "BTrRV2a2kh2y3BIwbM5oKQKBNDs=filters:cm=t/",
				"274x183": "fxQaIWaQP5lRjwYUPWVQwMkNH9o=filters:cm=t/",
				"274x206": "OL7VUs7AyKWyREepsXcuvd89l58=filters:cm=t/",
			});
		});

		it("returns empty resizer params author bio if img not available", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const {
				credits: { by },
			} = getResizedImageData(
				mockCreditsEmptyImgData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			// doesn't have content_elements, just an array with elements that have promo_items
			expect(by[0].resized_params).toEqual({});
		});

		it("get lead art", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const dataWithResizedImages = getResizedImageData(
				mockLeadArtData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			// doesn't have content_elements, just an array with elements that have promo_items
			const resizedParams =
				dataWithResizedImages.promo_items.lead_art.promo_items.basic.resized_params;

			const filterValues = Object.values(resizedParams);

			// if the same resizer key is used this won't change
			expect(filterValues).toEqual([
				"JH9YE5rXU3WoFv5vs342UvuC1gA=filters:cm=t/",
				"oVCzXp5WcaNYOq9omFEyWoMCo78=filters:cm=t/",
				"31mmYPove0AN7aFn_vwKJ0qhZeI=filters:cm=t/",
				"TkU_4vX7gHlX4WBLLwCDMrLuQj4=filters:cm=t/",
			]);

			const allValidFilterValues = filterValues.every(
				(imageFilterValue) =>
					typeof imageFilterValue !== "undefined" && imageFilterValue.includes(":cm=t/")
			);
			expect(allValidFilterValues).toEqual(true);
		});

		it("get lead art from video", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const dataWithResizedImages = getResizedImageData(
				mockLeadArtVideo,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			// doesn't have content_elements, just an array with elements that have promo_items
			const resizedParams =
				dataWithResizedImages.promo_items.lead_art.promo_items.basic.resized_params;
			const extracted = extractResizedParams(dataWithResizedImages);
			const filterValues = Object.values(resizedParams);

			// if the same resizer key is used this won't change
			expect(filterValues).toEqual([
				"tlTe1hPc85YfFlTMCStAmmrE2Vc=filters:cm=t/",
				"bWSAqvBttzIKiAE1e6phCZBYdH0=filters:cm=t/",
				"Vl230_LsGyl4R2KEQU6TF_8H5Wc=filters:cm=t/",
				"wHPWgxtNFn5PYodMUfU3SpZV5rA=filters:cm=t/",
			]);

			expect(resizedParams).toEqual(extracted);

			const allValidFilterValues = filterValues.every(
				(imageFilterValue) =>
					typeof imageFilterValue !== "undefined" && imageFilterValue.includes(":cm=t/")
			);
			expect(allValidFilterValues).toEqual(true);
		});

		it("get lead art fom video from promo.basic if has image", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const dataWithResizedImages = getResizedImageData(
				mockLeadArtVideoPromoBasic,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			const resizedParams = dataWithResizedImages.promo_items.basic.resized_params;
			const extracted = extractResizedParams(dataWithResizedImages);
			const filterValues = Object.values(resizedParams);

			expect(filterValues).toEqual([
				"Kjuf_xqpadIZBFEG2XsBC3bNoEM=filters:cm=t/",
				"_gwdkIM1uwTFiR0LWaaOUQc3rA0=filters:cm=t/",
				"15d84ojP7siUek9f5jzDMQQWMMs=filters:cm=t/",
				"qCvQmPpPxYd_dYM8uNnbRcRt4rY=filters:cm=t/",
			]);

			expect(resizedParams).toEqual(extracted);

			const allValidFilterValues = filterValues.every(
				(imageFilterValue) =>
					typeof imageFilterValue !== "undefined" && imageFilterValue.includes(":cm=t/")
			);
			expect(allValidFilterValues).toEqual(true);
		});

		it("resizes recursively for content type gallery, returns gallery specific sizes", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const resizedObject = getResizedImageData(
				galleryResizeData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			expect(resizedObject.content_elements[0].content_elements[0].resized_params)
				.toMatchInlineSnapshot(`
        Object {
          "1600x1067": "j5s_Jccu-4vsn9vElpAZex2a5Gw=filters:format(png):quality(70)/",
          "1600x1200": "sb3VLae1dxPXLcerVJHzE4xvFvQ=filters:format(png):quality(70)/",
          "400x267": "t2lIXc0izcXu5SvmkriN623pi5c=filters:format(png):quality(70)/",
          "400x300": "9hUDHIX4tqYIz7NbMUxmKrs8_uY=filters:format(png):quality(70)/",
          "600x400": "64TnUWrxeNv8gGT1YEyrp0WssMQ=filters:format(png):quality(70)/",
          "600x450": "C148ylhIEI0Iq6ldn6b82TO5GH4=filters:format(png):quality(70)/",
          "800x533": "7GAx40TMdSVOcDvZrQ1zKn5lkNo=filters:format(png):quality(70)/",
          "800x600": "_mwMJ8Y3YkyrfTzJL8T6zt9kLr0=filters:format(png):quality(70)/",
        }
      `);
		});

		it("takes in lead art on the top level data", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const dataWithResizedImages = getResizedImageData(
				topLeveLeadArt,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			expect(dataWithResizedImages.promo_items.lead_art.resized_params).toEqual({
				"158x105": "I9PStk1gjBSf260jZTioN4u_RPo=filters:cm=t/",
				"158x119": "-bLoWbHajT6EMnuJq9KILDWTk9k=filters:cm=t/",
				"274x183": "3iOl2XDNsie7ZxxlpRagvADtkio=filters:cm=t/",
				"274x206": "P5WszqbW7D4BknEyLhffQi2ulIk=filters:cm=t/",
			});
		});

		it("takes in search results data object", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const dataWithResizedImages = getResizedImageData(
				searchResultsDataBroken.data,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			expect(dataWithResizedImages[0].promo_items.basic.resized_params).toEqual({
				"158x105": "OsfQnLmY00jrVTU2Bn4BNFUNMhU=filters:cm=t/",
				"158x119": "h0EkN6oDSPYmLReOq22BJZYfCz4=filters:cm=t/",
				"274x183": "tei84mHd537sfGdIxzgfEPb90rM=filters:cm=t/",
				"274x206": "2Qa9_nYqKGnCzwL-goJs3iZ4LwY=filters:cm=t/",
			});
		});

		it("respects aspect ratio of image and only url", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));
			const sampleImage = "image.jpg";
			const dataWithResizedImages = getResizedImageData(
				sampleImage,
				null,
				true,
				true,
				undefined,
				undefined
			);
			// uses fit in logic
			// only png allowed here
			// by default, fit in only works with png
			// not coercing png
			expect(dataWithResizedImages).toMatchInlineSnapshot(`
        Object {
          "158x105": "OhPCT9HOiYClZDcHtXJA1y_HbO8=/fit-in/158x105/filters:quality(70):fill(white):background_color(white)/",
          "158x119": "d1gFvKA4cYT9lBiMNFWTq-7zY5w=/fit-in/158x119/filters:quality(70):fill(white):background_color(white)/",
          "274x183": "DakL7zt-4boiiIW4glxQ_Ot3l1k=/fit-in/274x183/filters:quality(70):fill(white):background_color(white)/",
          "274x206": "1ZfEGgXbYqMzzbVM2PUWqZo1RJo=/fit-in/274x206/filters:quality(70):fill(white):background_color(white)/",
        }
      `);
		});
		it("return null if only image is used with no image url", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));
			const dataWithResizedImages = getResizedImageData("", null, true, true);
			// uses fit in logic
			expect(dataWithResizedImages).toEqual(null);
		});

		it("returns data passed in if promo_items do not has all the data", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const data = getResizedImageData(
				mockStoryFeedDataEmptyPromo,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			expect(data).toEqual(mockStoryFeedDataEmptyPromo);
		});

		it("get lead art passed in if promo_items do not has all the data", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const leadArtData = getResizedImageData(
				mockLeadArtDataEmptyPromo,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			const resizedParams = leadArtData.promo_items.lead_art.promo_items.basic.resized_params;

			expect(typeof resizedParams).toEqual("undefined");
			expect(leadArtData).toEqual(mockLeadArtDataEmptyPromo);
		});

		it("takes in search results data object", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const dataSearch = getResizedImageData(
				mockSearchApiDataEmptyPromo,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			expect(typeof dataSearch[0].promo_items.basic.resized_params).toEqual("undefined");
			expect(dataSearch).toEqual(mockSearchApiDataEmptyPromo);
		});

		it("takes in collection api results data object", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
				shouldCompressImageParams: true,
			}));

			const dataSearch = getResizedImageData(
				mockCollectionApiData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			expect(typeof dataSearch.content_elements[0].promo_items.basic.resized_params).toEqual(
				"object"
			);
		});
	});
	describe("when shouldCompressImageParams siteProperty is false (unset)", () => {
		it("returns data passed in from search-api", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const dataWithResizedImages = getResizedImageData(
				mockSearchApiData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			// doesn't have content_elements, just an array with elements that have promo_items
			const resizedParams = dataWithResizedImages[0].promo_items.basic.resized_params;

			const paramKeys = Object.keys(resizedParams);

			const filterValues = Object.values(resizedParams);

			// if the same resizer key is used this won't change
			expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "MT_XX796EvNxF3HZApqlZJ2cp9A=filters:format(jpg):quality(70)/",
          "Mg9TY0qaNtVgMhb_ZKJsbP5LozQ=filters:format(jpg):quality(70)/",
          "d8sD1oBqFj-OcYFYjxIUvZaJYT8=filters:format(jpg):quality(70)/",
          "JrZVYSYW9J7D5h3rkNRlTXpWy5g=filters:format(jpg):quality(70)/",
        ]
      `);

			const allValidFilterValues = filterValues.every(
				(imageFilterValue) =>
					typeof imageFilterValue !== "undefined" &&
					imageFilterValue.includes(":format(jpg):quality(70)/")
			);
			expect(allValidFilterValues).toEqual(true);

			expect(paramKeys).toEqual(["158x105", "274x183", "158x119", "274x206"]);
		});

		it("resizes author bio if img available", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const {
				credits: { by },
			} = getResizedImageData(
				mockCreditsData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			// doesn't have content_elements, just an array with elements that have promo_items
			expect(by[0].resized_params).toEqual({
				"158x105": "jDV13NRbki-mzrsgQFfZjcSwABw=filters:format(jpg):quality(70)/",
				"158x119": "BTrRV2a2kh2y3BIwbM5oKQKBNDs=filters:format(jpg):quality(70)/",
				"274x183": "fxQaIWaQP5lRjwYUPWVQwMkNH9o=filters:format(jpg):quality(70)/",
				"274x206": "OL7VUs7AyKWyREepsXcuvd89l58=filters:format(jpg):quality(70)/",
			});
		});

		it("returns empty resizer params author bio if img not available", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const {
				credits: { by },
			} = getResizedImageData(
				mockCreditsEmptyImgData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			// doesn't have content_elements, just an array with elements that have promo_items
			expect(by[0].resized_params).toEqual({});
		});

		it("get lead art", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const dataWithResizedImages = getResizedImageData(
				mockLeadArtData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			// doesn't have content_elements, just an array with elements that have promo_items
			const resizedParams =
				dataWithResizedImages.promo_items.lead_art.promo_items.basic.resized_params;

			const filterValues = Object.values(resizedParams);

			// if the same resizer key is used this won't change
			expect(filterValues).toEqual([
				"JH9YE5rXU3WoFv5vs342UvuC1gA=filters:format(jpg):quality(70)/",
				"oVCzXp5WcaNYOq9omFEyWoMCo78=filters:format(jpg):quality(70)/",
				"31mmYPove0AN7aFn_vwKJ0qhZeI=filters:format(jpg):quality(70)/",
				"TkU_4vX7gHlX4WBLLwCDMrLuQj4=filters:format(jpg):quality(70)/",
			]);

			const allValidFilterValues = filterValues.every(
				(imageFilterValue) =>
					typeof imageFilterValue !== "undefined" &&
					imageFilterValue.includes(":format(jpg):quality(70)/")
			);
			expect(allValidFilterValues).toEqual(true);
		});

		it("get lead art from video", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const dataWithResizedImages = getResizedImageData(
				mockLeadArtVideo,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			// doesn't have content_elements, just an array with elements that have promo_items
			const resizedParams =
				dataWithResizedImages.promo_items.lead_art.promo_items.basic.resized_params;
			const extracted = extractResizedParams(dataWithResizedImages);
			const filterValues = Object.values(resizedParams);

			// if the same resizer key is used this won't change
			expect(filterValues).toEqual([
				"tlTe1hPc85YfFlTMCStAmmrE2Vc=filters:format(jpg):quality(70)/",
				"bWSAqvBttzIKiAE1e6phCZBYdH0=filters:format(jpg):quality(70)/",
				"Vl230_LsGyl4R2KEQU6TF_8H5Wc=filters:format(jpg):quality(70)/",
				"wHPWgxtNFn5PYodMUfU3SpZV5rA=filters:format(jpg):quality(70)/",
			]);

			expect(resizedParams).toEqual(extracted);

			const allValidFilterValues = filterValues.every(
				(imageFilterValue) =>
					typeof imageFilterValue !== "undefined" &&
					imageFilterValue.includes(":format(jpg):quality(70)/")
			);
			expect(allValidFilterValues).toEqual(true);
		});

		it("get lead art fom video from promo.basic if has image", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const dataWithResizedImages = getResizedImageData(
				mockLeadArtVideoPromoBasic,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			const resizedParams = dataWithResizedImages.promo_items.basic.resized_params;
			const extracted = extractResizedParams(dataWithResizedImages);
			const filterValues = Object.values(resizedParams);

			expect(filterValues).toEqual([
				"Kjuf_xqpadIZBFEG2XsBC3bNoEM=filters:format(jpg):quality(70)/",
				"_gwdkIM1uwTFiR0LWaaOUQc3rA0=filters:format(jpg):quality(70)/",
				"15d84ojP7siUek9f5jzDMQQWMMs=filters:format(jpg):quality(70)/",
				"qCvQmPpPxYd_dYM8uNnbRcRt4rY=filters:format(jpg):quality(70)/",
			]);

			expect(resizedParams).toEqual(extracted);

			const allValidFilterValues = filterValues.every(
				(imageFilterValue) =>
					typeof imageFilterValue !== "undefined" &&
					imageFilterValue.includes(":format(jpg):quality(70)/")
			);
			expect(allValidFilterValues).toEqual(true);
		});

		it("resizes recursively for content type gallery, returns gallery specific sizes", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const resizedObject = getResizedImageData(
				galleryResizeData,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			expect(resizedObject.content_elements[0].content_elements[0].resized_params)
				.toMatchInlineSnapshot(`
        Object {
          "1600x1067": "j5s_Jccu-4vsn9vElpAZex2a5Gw=filters:format(png):quality(70)/",
          "1600x1200": "sb3VLae1dxPXLcerVJHzE4xvFvQ=filters:format(png):quality(70)/",
          "400x267": "t2lIXc0izcXu5SvmkriN623pi5c=filters:format(png):quality(70)/",
          "400x300": "9hUDHIX4tqYIz7NbMUxmKrs8_uY=filters:format(png):quality(70)/",
          "600x400": "64TnUWrxeNv8gGT1YEyrp0WssMQ=filters:format(png):quality(70)/",
          "600x450": "C148ylhIEI0Iq6ldn6b82TO5GH4=filters:format(png):quality(70)/",
          "800x533": "7GAx40TMdSVOcDvZrQ1zKn5lkNo=filters:format(png):quality(70)/",
          "800x600": "_mwMJ8Y3YkyrfTzJL8T6zt9kLr0=filters:format(png):quality(70)/",
        }
      `);
		});

		it("takes in lead art on the top level data", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const dataWithResizedImages = getResizedImageData(
				topLeveLeadArt,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			expect(dataWithResizedImages.promo_items.lead_art.resized_params).toEqual({
				"158x105": "I9PStk1gjBSf260jZTioN4u_RPo=filters:format(jpg):quality(70)/",
				"158x119": "-bLoWbHajT6EMnuJq9KILDWTk9k=filters:format(jpg):quality(70)/",
				"274x183": "3iOl2XDNsie7ZxxlpRagvADtkio=filters:format(jpg):quality(70)/",
				"274x206": "P5WszqbW7D4BknEyLhffQi2ulIk=filters:format(jpg):quality(70)/",
			});
		});

		it("takes in search results data object", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const dataWithResizedImages = getResizedImageData(
				searchResultsDataBroken.data,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			expect(dataWithResizedImages[0].promo_items.basic.resized_params).toEqual({
				"158x105": "OsfQnLmY00jrVTU2Bn4BNFUNMhU=filters:format(jpg):quality(70)/",
				"158x119": "h0EkN6oDSPYmLReOq22BJZYfCz4=filters:format(jpg):quality(70)/",
				"274x183": "tei84mHd537sfGdIxzgfEPb90rM=filters:format(jpg):quality(70)/",
				"274x206": "2Qa9_nYqKGnCzwL-goJs3iZ4LwY=filters:format(jpg):quality(70)/",
			});
		});

		it("respects aspect ratio of image and only url", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));
			const sampleImage = "image.jpg";
			const dataWithResizedImages = getResizedImageData(
				sampleImage,
				null,
				true,
				true,
				undefined,
				undefined
			);
			// uses fit in logic
			// only png allowed here
			// by default, fit in only works with png
			// not coercing png
			expect(dataWithResizedImages).toMatchInlineSnapshot(`
        Object {
          "158x105": "OhPCT9HOiYClZDcHtXJA1y_HbO8=/fit-in/158x105/filters:quality(70):fill(white):background_color(white)/",
          "158x119": "d1gFvKA4cYT9lBiMNFWTq-7zY5w=/fit-in/158x119/filters:quality(70):fill(white):background_color(white)/",
          "274x183": "DakL7zt-4boiiIW4glxQ_Ot3l1k=/fit-in/274x183/filters:quality(70):fill(white):background_color(white)/",
          "274x206": "1ZfEGgXbYqMzzbVM2PUWqZo1RJo=/fit-in/274x206/filters:quality(70):fill(white):background_color(white)/",
        }
      `);
		});

		it("respects png image formats", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));
			const sampleImage = "image.png";
			const dataWithResizedImages = getResizedImageData(
				sampleImage,
				null,
				true,
				false,
				undefined,
				undefined
			);
			// uses fit in logic
			// only png allowed here
			// by default, fit in only works with png
			// not coercing png
			expect(dataWithResizedImages).toMatchInlineSnapshot(`
        Object {
          "158x105": "OT81ifQJMWfiZlSRbO-Wr30xiNg=filters:format(png):quality(70)/",
          "158x119": "eYGg_HKw-nT74Ccun3WMjrmLF3c=filters:format(png):quality(70)/",
          "274x183": "zFJ-Yhcd-6zvCfTBIdeyGXIrzQs=filters:format(png):quality(70)/",
          "274x206": "0Bu3xxVjdOBhbuxDOWQcPavOLV8=filters:format(png):quality(70)/",
        }
      `);
		});

		it("return null if only image is used with no image url", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));
			const dataWithResizedImages = getResizedImageData("", null, true, false);
			// uses fit in logic
			expect(dataWithResizedImages).toEqual(null);
		});

		it("returns data passed in if promo_items do not has all the data", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const data = getResizedImageData(
				mockStoryFeedDataEmptyPromo,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			expect(data).toEqual(mockStoryFeedDataEmptyPromo);
		});

		it("get lead art passed in if promo_items do not has all the data", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const leadArtData = getResizedImageData(
				mockLeadArtDataEmptyPromo,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			const resizedParams = leadArtData.promo_items.lead_art.promo_items.basic.resized_params;

			expect(typeof resizedParams).toEqual("undefined");
			expect(leadArtData).toEqual(mockLeadArtDataEmptyPromo);
		});

		it("takes in search results data object", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const dataSearch = getResizedImageData(
				mockSearchApiDataEmptyPromo,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			expect(typeof dataSearch[0].promo_items.basic.resized_params).toEqual("undefined");
			expect(dataSearch).toEqual(mockSearchApiDataEmptyPromo);
		});
	});

	describe("focal point", () => {
		it("must genenerate focal point filter for all resized urls on basic promo items", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const imageData = getResizedImageData(
				mockFocalBasicPoint,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			const resizedParams = imageData.promo_items.basic.resized_params;

			Object.keys(resizedParams).forEach((key) => {
				expect(resizedParams[key]).toMatch(/focal\(1674x452:1684x462\)/);
			});
		});

		it("must genenerate focal point filter for all resized urls on lead_art promo items", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const imageData = getResizedImageData(
				mockFocalLeadArtPoint,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			const resizedParams = imageData.promo_items.lead_art.resized_params;

			Object.keys(resizedParams).forEach((key) => {
				expect(resizedParams[key]).toMatch(/focal\(65x65:75x75\)/);
			});
		});

		it("must genenerate focal point filter for all resized urls on basic promo items when overwritten on Composer", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const imageData = getResizedImageData(
				mockFocalPointOverwrite,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			const resizedParams = imageData.promo_items.basic.resized_params;

			Object.keys(resizedParams).forEach((key) => {
				expect(resizedParams[key]).toMatch(/focal\(98x99:108x109\)/);
			});
		});

		it("must genenerate focal point filter for all resized urls on lead art promo items when is Gallery", () => {
			getProperties.mockImplementation(() => ({
				breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
				aspectRatios: ASPECT_RATIOS,
				imageWidths: IMAGE_WIDTHS,
				resizerURL: "https://fake.cdn.com/resizer",
			}));

			const imageData = getResizedImageData(
				mockGalleryFocalPoint,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			const resizedParams = imageData.promo_items.lead_art.promo_items.basic.resized_params;

			Object.keys(resizedParams).forEach((key) => {
				expect(resizedParams[key]).toMatch(/focal\(5245x213:5255x223\)/);
			});

			const galleryItems = imageData.promo_items.lead_art.content_elements;

			// the gallery elements that have focal point, must have the url with the filter too
			galleryItems.forEach((item) => {
				if (item.focal_point) {
					Object.keys(item.resized_params).forEach((key) => {
						expect(item.resized_params[key]).toMatch(/focal\(5245x213:5255x223\)/);
					});
				}
			});
		});
	});
});
