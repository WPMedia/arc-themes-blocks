describe("the related-content content source block", () => {
	it("should use the proper param types", () => {
		const { default: contentSource } = require("./related-content");
		expect(contentSource.params).toEqual({
			_id: "text",
		});
	});

	it("should use the proper schema", () => {
		const { default: contentSource } = require("./related-content");
		expect(contentSource.schemaName).toEqual("ans-feed");
	});

	it("should build the correct url", () => {
		const { default: contentSource } = require("./related-content");
		const url = contentSource.resolve({
			_id: "test",
			"arc-site": "bbbbb-ccccc",
		});

		expect(url).toEqual("/content/v4/related-content?_id=test&website=bbbbb-ccccc");
	});

	it("should not build an url with missing id and website", () => {
		const { default: contentSource } = require("./related-content");
		const url = contentSource.resolve({});

		expect(url).toBeFalsy();
	});

	it("should not build an url with missing data", () => {
		const { default: contentSource } = require("./related-content");
		const url = contentSource.resolve();

		expect(url).toBeFalsy();
	});

	it("should not build an url with missing id param", () => {
		const { default: contentSource } = require("./related-content");
		const url = contentSource.resolve({ _id: "test" });

		expect(url).toBeFalsy();
	});

	it("should not build an url with missing website param", () => {
		const { default: contentSource } = require("./related-content");
		const url = contentSource.resolve({ "arc-site": "test" });

		expect(url).toBeFalsy();
	});

	describe("when use transform function", () => {
		const mockFn = jest.fn(() => ({}));
		beforeAll(() => {
			jest.mock("@wpmedia/resizer-image-block", () => mockFn);
		});
		afterAll(() => {
			jest.resetModules();
		});
		afterEach(() => {
			mockFn.mockClear();
		});

		it("should call getResizedImageData if has information", () => {
			const { default: contentSource } = require("./related-content");
			contentSource.transform(
				{
					basic: [{}],
				},
				{}
			);
			expect(mockFn.mock.calls.length).toBe(1);
		});

		it("should rename the top property as content_elements", () => {
			const { default: contentSource } = require("./related-content");
			const result = contentSource.transform(
				{
					basic: [{}],
				},
				{}
			);
			expect(result.content_elements).toBeTruthy();
		});

		it("should not call getResizedImageData if data missing", () => {
			const { default: contentSource } = require("./related-content");
			contentSource.transform(null, {});
			expect(mockFn.mock.calls.length).toBe(0);
		});

		it("should not call getResizedImageData if data is not array", () => {
			const { default: contentSource } = require("./related-content");
			contentSource.transform({ basic: "" }, {});
			expect(mockFn.mock.calls.length).toBe(0);
		});
		it("should not call getResizedImageData if data is a truthy string", () => {
			const { default: contentSource } = require("./related-content");
			contentSource.transform({ basic: "ff" }, {});
			expect(mockFn.mock.calls.length).toBe(0);
		});
	});
});
