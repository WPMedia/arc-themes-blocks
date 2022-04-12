import algoliasearch from "algoliasearch/lite";
import contentSource from "./algolia-assortment";

const HITS_MOCK = [{ name: "product 1" }];
jest.mock("algoliasearch/lite");

describe("Algolia Assortment content source", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toMatchInlineSnapshot(
			`
		Object {
		  "filters": "text",
		  "hitsPerPage": "number",
		  "index": "text",
		  "page": "number",
		  "query": "text",
		  "ruleContexts": "text",
		}
	`
		);
	});
	it("should transform data", () => {
		const key = {
			"arc-site": "arc-site",
			input: "test-input",
		};
		const dataTransform = contentSource.transform(key);

		expect(dataTransform).toEqual(key);
	});
	it("passes in filter, index, query, ruleContexts to algolia search", async () => {
		algoliasearch.mockImplementation(() => ({
			initIndex: jest.fn(() => ({
				search: jest.fn(() => ({
					hits: HITS_MOCK,
				})),
			})),
		}));
		const filters = "test-filters";
		const index = "test-index";
		const query = "test-query";
		const ruleContexts = "test-ruleContexts";
		const key = {
			filters,
			index,
			query,
			ruleContexts,
		};
		const fetchData = await contentSource.fetch(key);

		expect(fetchData).toEqual(HITS_MOCK);
	});
	it("should throw error", async () => {
		algoliasearch.mockImplementation(() => ({
			initIndex: jest.fn(() => ({
				search: jest.fn(() => {
					throw new Error();
				}),
			})),
		}));

		const filters = "test-filters";
		const index = "test-index";
		const query = "test-query";
		const ruleContexts = "test-ruleContexts";
		const key = {
			filters,
			index,
			query,
			ruleContexts,
		};

		expect(async () => {
			await contentSource.fetch(key);
		}).rejects.toThrow();
	});
});
