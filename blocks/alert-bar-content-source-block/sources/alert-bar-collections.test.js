import contentSource from "./alert-bar-collections";

import mockCollection from "./mockCollection";
import mockCollectionEmpty from "./mockCollectionEmpty";
import mockCollectionUnpublishedStory from "./mockCollectionUnpublishedStory";

describe("the collections content source block", () => {
	describe("when a website param is provided", () => {
		it("should build the correct url", () => {
			const url = contentSource.resolve({
				"arc-site": "the-sun",
			});

			expect(url).toEqual(
				"content/v4/collections?content_alias=alert-bar&website=the-sun&from=0&size=1&published=true"
			);
		});
	});

	describe("when a website param is not provided", () => {
		it("should build the url without the website", () => {
			const url = contentSource.resolve({});

			expect(url).toEqual(
				"content/v4/collections?content_alias=alert-bar&from=0&size=1&published=true"
			);
		});

		it("should build the url without parameters", () => {
			const url = contentSource.resolve();

			expect(url).toEqual(
				"content/v4/collections?content_alias=alert-bar&from=0&size=1&published=true"
			);
		});
	});

	describe("when a collection is empty", () => {
		it("should return an empty content_elements", () => {
			const content = contentSource.transform(mockCollectionEmpty);
			expect(content.content_elements.length).toBe(0);
		});
	});

	describe("when a collection has data", () => {
		it("should return an one item on content_elements", () => {
			const content = contentSource.transform(mockCollection);
			expect(content.content_elements.length).toBe(1);
		});
	});

	describe("when a collection has unpublished content", () => {
		it("should return an empty content_elements", () => {
			const content = contentSource.transform(mockCollectionUnpublishedStory);
			expect(content.content_elements.length).toBe(0);
		});
	});

	describe("when a collection returns no data", () => {
		it("it should throw an error", () => {
			const throwsError = () => {
				contentSource.transform();
			};
			expect(throwsError).toThrow("Not found");
		});
	});
});
