describe("the unpublished content source block", () => {
	it("should use the proper param types", () => {
		const { default: contentSource } = require("./content-api-unpublished");
		expect(contentSource.params).toEqual({
			_id: "text",
		});
	});

	describe("when an id is provided", () => {
		it("should build the correct url", () => {
			const { default: contentSource } = require("./content-api-unpublished");
			const url = contentSource.resolve({
				_id: "test",
				"arc-site": "bbbbb-ccccc",
			});

			expect(url).toEqual("content/v4?_id=test&website=bbbbb-ccccc&published=false");
		});
	});

	describe("when an id and website are NOT provided", () => {
		it("should not build a url with an id and website", () => {
			const { default: contentSource } = require("./content-api-unpublished");
			const url = contentSource.resolve({});

			expect(url).toEqual("content/v4?_id=undefined&website=undefined&published=false");
		});
	});

	describe("when use transform function", () => {
		const mockFn = jest.fn(() => ({}));
		beforeAll(() => {
			jest.mock("@wpmedia/resizer-image-block", () => mockFn);
		});
		afterAll(() => {
			jest.resetModules();
		});

		it("should call getResizedImageData", () => {
			const { default: contentSource } = require("./content-api-unpublished");
			contentSource.transform([], {});
			expect(mockFn.mock.calls.length).toBe(1);
		});
	});
});
