import storyQuery from "./story-feed-query";

describe("the story feed query block", () => {
	it("should use the proper param types", () => {
		expect(storyQuery.params).toEqual({
			query: "text",
			size: "number",
			offset: "number",
		});
	});

	it("should be associated with the ans-feed schema", () => {
		expect(storyQuery.schemaName).toEqual("ans-feed");
	});

	describe("when a query is provided", () => {
		expect(storyQuery.resolve({ "arc-site": "my-site", query: "queryqueryquery" })).toEqual(
			"/content/v4/search/published?q=queryqueryquery&website=my-site&size=8&from=0&sort=display_date:desc"
		);
	});

	describe("when a query is NOT provided", () => {
		expect(storyQuery.resolve({ "arc-site": "my-site" })).toEqual(
			"/content/v4/search/published?q=*&website=my-site&size=8&from=0&sort=display_date:desc"
		);
	});

	describe("when a size is provided", () => {
		expect(storyQuery.resolve({ "arc-site": "my-site", size: 4 })).toEqual(
			"/content/v4/search/published?q=*&website=my-site&size=4&from=0&sort=display_date:desc"
		);
	});

	describe("when a size is NOT provided", () => {
		expect(storyQuery.resolve({ "arc-site": "my-site" })).toEqual(
			"/content/v4/search/published?q=*&website=my-site&size=8&from=0&sort=display_date:desc"
		);
	});

	describe("when an offset is provided", () => {
		expect(storyQuery.resolve({ "arc-site": "my-site", offset: 12 })).toEqual(
			"/content/v4/search/published?q=*&website=my-site&size=8&from=12&sort=display_date:desc"
		);
	});

	describe("when an offset is NOT provided", () => {
		expect(storyQuery.resolve({ "arc-site": "my-site" })).toEqual(
			"/content/v4/search/published?q=*&website=my-site&size=8&from=0&sort=display_date:desc"
		);
	});

	describe("the arc site param", () => {
		expect(storyQuery.resolve({ "arc-site": "my-other-site" })).toEqual(
			"/content/v4/search/published?q=*&website=my-other-site&size=8&from=0&sort=display_date:desc"
		);
	});
});
