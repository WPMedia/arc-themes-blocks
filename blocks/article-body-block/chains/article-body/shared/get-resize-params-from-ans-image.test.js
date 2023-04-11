import getResizeParamsFromANSImage from "./get-resize-params-from-ans-image";

jest.mock("fusion:environment", () => ({
	RESIZER_TOKEN_VERSION: 2,
	RESIZER_URL: "https://image.url",
}));

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
});
