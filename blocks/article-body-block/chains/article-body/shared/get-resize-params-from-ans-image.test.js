import getResizeParamsFromANSImage from "./get-resize-params-from-ans-image";

jest.mock("fusion:environment", () => ({
	RESIZER_TOKEN_VERSION: 2,
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		resizerURL: "https://image.url",
	}))
);

describe("get-resize-params-from-ans-image", () => {
	it("should return an object with appropriate resizer parameters for the Image component", () => {
		expect(
			getResizeParamsFromANSImage(
				{
					_id: "IMAGE_ID",
					auth: { 2: "AUTH_TOKEN" },
					height: 15000,
					url: "https://unresized.img/IMAGE_FILE_NAME.jpg",
					width: 10000,
				},
				"the-sun",
				500,
				[100, 200, 300, 400, 500]
			)
		).toEqual(
			expect.objectContaining({
				height: 750,
				resizedOptions: { auth: "AUTH_TOKEN" },
				resizerURL: "https://image.url",
				responsiveImages: [100, 200, 300, 400, 500],
				src: "IMAGE_ID.jpg",
				width: 500,
			})
		);
	});

	it("should return an object with appropriate resizer parameters without the resizer width array", () => {
		expect(
			getResizeParamsFromANSImage(
				{
					_id: "IMAGE_ID",
					auth: { 2: "AUTH_TOKEN" },
					height: 15000,
					url: "https://unresized.img/IMAGE_FILE_NAME.jpg",
					width: 10000,
				},
				"the-sun",
				800
			)
		).toEqual(
			expect.objectContaining({
				height: 1200,
				resizedOptions: { auth: "AUTH_TOKEN" },
				resizerURL: "https://image.url",
				src: "IMAGE_ID.jpg",
				width: 800,
			})
		);
	});

	it("falls back to resizerURL when resizerURLs missing", () => {
		// currently mock provides only resizerURL so environment selection path should still yield resizerURL
		expect(
			getResizeParamsFromANSImage(
				{
					_id: "IMAGE_ID",
					auth: { 2: "AUTH_TOKEN" },
					height: 12000,
					url: "https://unresized.img/IMAGE_FILE_NAME.jpg",
					width: 8000,
				},
				"the-sun",
				400
			)
		).toEqual(
			expect.objectContaining({
				height: 600, // 12000/8000 * 400
				resizerURL: "https://image.url",
			})
		);
	});

	it("falls back to resizerURL when environment key missing in resizerURLs", () => {
		const getProperties = require("fusion:properties");
		getProperties.mockImplementationOnce(() => ({
			resizerURL: "https://image.url",
			resizerURLs: { production: "https://prod.url" }, // ENVIRONMENT mocked undefined in this file so key missing
		}));
		expect(
			getResizeParamsFromANSImage(
				{
					_id: "IMAGE_ID2",
					auth: { 2: "AUTH_TOKEN2" },
					height: 5000,
					url: "https://unresized.img/IMAGE_FILE_NAME2.jpg",
					width: 4000,
				},
				"the-sun",
				400
			)
		).toEqual(
			expect.objectContaining({
				height: 500, // 5000/4000 * 400
				resizerURL: "https://image.url",
			})
		);
	});
});
