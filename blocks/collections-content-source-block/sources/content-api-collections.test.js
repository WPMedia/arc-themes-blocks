import axios from "axios";
import contentSource from "./content-api-collections";

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "",
}));

jest.mock("axios", () => ({
	__esModule: true,
	default: jest.fn((data) => Promise.resolve({ data })),
}));

describe("the collections content source block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual({
			_id: "text",
			content_alias: "text",
			from: "text",
			size: "text",
		});
	});

	it("should be associated with the ans-feed schema", () => {
		expect(contentSource.schemaName).toEqual("ans-feed");
	});

	describe("when an id and website are provided", () => {
		it("should build the correct url", async () => {
			const contentSourceRequest = await contentSource.fetch({
				_id: "test",
				content_alias: "test",
				website: "the-sun",
				from: "20",
				size: "0",
				"arc-site": "the-sun",
			});

			expect(contentSourceRequest.url).toEqual(
				"/content/v4/collections?_id=test&website=the-sun&from=20&size=0&published=true"
			);
		});
	});

	describe("when a from is provided", () => {
		it("should build the correct url with a from", async () => {
			const contentSourceRequest = await contentSource.fetch({
				_id: "test",
				content_alias: "test",
				website: "the-sun",
				from: "20",
				"arc-site": "the-sun",
			});

			expect(contentSourceRequest.url).toEqual(
				"/content/v4/collections?_id=test&website=the-sun&from=20&published=true"
			);
		});
	});

	describe("when a from is NOT provided", () => {
		it("should build the correct url without a from", async () => {
			const contentSourceRequest = await contentSource.fetch({
				_id: "test",
				content_alias: "test",
				website: "the-sun",
				"arc-site": "the-sun",
			});

			expect(contentSourceRequest.url).toEqual(
				"/content/v4/collections?_id=test&website=the-sun&published=true"
			);
		});
	});

	describe("when a size is provided", () => {
		it("should build the correct url without a size", async () => {
			const contentSourceRequest = await contentSource.fetch({
				_id: "test",
				content_alias: "test",
				website: "the-sun",
				size: "0",
				"arc-site": "the-sun",
			});

			expect(contentSourceRequest.url).toEqual(
				"/content/v4/collections?_id=test&website=the-sun&size=0&published=true"
			);
		});
	});

	describe("when a size is NOT provided", () => {
		it("should build the correct url without a size", async () => {
			const contentSourceRequest = await contentSource.fetch({
				_id: "test",
				content_alias: "test",
				website: "the-sun",
				"arc-site": "the-sun",
			});

			expect(contentSourceRequest.url).toEqual(
				"/content/v4/collections?_id=test&website=the-sun&published=true"
			);
		});
	});

	describe("when an id is NOT provided but a content alias is provided", () => {
		it("should build the correct url with a content alias", async () => {
			const contentSourceRequest = await contentSource.fetch({
				content_alias: "test_alias",
				website: "the-sun",
				from: "20",
				size: "0",
				"arc-site": "the-sun",
			});

			expect(contentSourceRequest.url).toEqual(
				"/content/v4/collections?content_alias=test_alias&website=the-sun&from=20&size=0&published=true"
			);
		});
	});

	describe("when a website is NOT provided", () => {
		it("should not build a url with a website", async () => {
			const contentSourceRequest = await contentSource.fetch({ _id: "test" });

			expect(contentSourceRequest.url).toEqual("/content/v4/collections?_id=test&published=true");
		});
	});

	describe("when an id and website are NOT provided", () => {
		it("should not build a url with an id and website", async () => {
			const contentSourceRequest = await contentSource.fetch({});

			expect(contentSourceRequest.url).toEqual(
				"/content/v4/collections?content_alias=undefined&published=true"
			);
		});
	});

	describe("when an error occurs in the response or request", () => {
		it("handles errors with the response", async () => {
			axios.mockRejectedValue({ response: { status: "404" } });
			const consoleSpy = jest.spyOn(console, "error");
			await contentSource.fetch({});
			expect(consoleSpy).toHaveBeenCalledWith(
				"The response from the server was an error with the status code 404."
			);
		});

		it("handles errors with the request", async () => {
			axios.mockRejectedValue({ request: {} });
			const consoleSpy = jest.spyOn(console, "error");
			await contentSource.fetch({});
			expect(consoleSpy).toHaveBeenCalledWith("The request to the server failed with no response.");
		});

		it("handles errors creating the request", async () => {
			axios.mockRejectedValue({});
			const consoleSpy = jest.spyOn(console, "error");
			await contentSource.fetch({});
			expect(consoleSpy).toHaveBeenCalledWith("An error occured creating the request.");
		});
	});
});
