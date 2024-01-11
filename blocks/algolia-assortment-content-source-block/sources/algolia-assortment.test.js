import algoliasearch from "algoliasearch/lite";
import contentSource from "./algolia-assortment";

const HITS_MOCK = [{ name: "product 1" }];
jest.mock("algoliasearch/lite");

describe("Algolia Assortment content source", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it("should use the proper param types", () => {
		expect(contentSource.params).toMatchObject({
			filters: "text",
			hitsPerPage: "number",
			index: "text",
			page: "number",
			query: "text",
			ruleContexts: "text",
		});
	});
	it("should transform data", () => {
		const key = {
			"arc-site": "arc-site",
			input: "test-input",
		};
		const dataTransform = contentSource.transform(key);

		expect(dataTransform).toEqual(key);
	});
	it("passes in filter, index, query, ruleContexts as string within array, page, and results count to algolia search", async () => {
		const mockSearch = jest.fn(() => ({
			hits: HITS_MOCK,
		}));
		algoliasearch.mockImplementation(() => ({
			initIndex: jest.fn(() => ({
				search: mockSearch,
			})),
		}));
		const filters = "test-filters";
		const index = "test-index";
		const query = "test-query";
		const ruleContexts = "test-ruleContexts";
		const hitsPerPage = 5;
		const page = 10;
		const key = {
			filters,
			index,
			query,
			ruleContexts,
			hitsPerPage,
			page,
		};
		const fetchData = await contentSource.fetch(key);

		expect(fetchData).toEqual(HITS_MOCK);
		expect(mockSearch).toHaveBeenCalledWith(query, {
			filters,
			ruleContexts: [ruleContexts],
			hitsPerPage,
			page,
		});
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
	it("should take in page and page count with defaults if null", async () => {
		const mockSearch = jest.fn(() => ({
			hits: HITS_MOCK,
		}));
		algoliasearch.mockImplementation(() => ({
			initIndex: jest.fn(() => ({
				search: mockSearch,
			})),
		}));
		const filters = "test-filters";
		const index = "test-index";
		const query = "test-query";
		const ruleContexts = "test-ruleContexts";
		const hitsPerPage = null;
		const page = null;
		const key = {
			filters,
			index,
			query,
			ruleContexts,
			hitsPerPage,
			page,
		};
		const fetchData = await contentSource.fetch(key);

		expect(fetchData).toEqual(HITS_MOCK);
		expect(mockSearch).toHaveBeenCalledWith(query, {
			filters,
			ruleContexts: [ruleContexts],
			hitsPerPage: 20,
			page: 0,
		});
	});
});
