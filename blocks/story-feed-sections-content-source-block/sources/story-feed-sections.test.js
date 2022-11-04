import contentSource from "./story-feed-sections";

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "https://content.base",
}));

jest.mock("axios", () => ({
	__esModule: true,
	default: jest.fn((request) => {
		const requestUrl = new URL(request.url);
		const url = {
			hostname: requestUrl.hostname,
			pathname: requestUrl.pathname,
			searchObject: Object.fromEntries(requestUrl.searchParams),
		};
		return Promise.resolve({
			data: {
				content_elements: [{ url }],
				request: {
					...request,
					url,
				},
			},
		});
	}),
}));

const body = {
	query: {
		bool: {
			must: [
				{
					term: {
						"revision.published": "true",
					},
				},
				{
					nested: {
						path: "taxonomy.sections",
						query: {
							bool: {
								must: [
									{
										terms: {
											"taxonomy.sections._id": ["3", "4"],
										},
									},
									{
										term: {
											"taxonomy.sections._website": "the-site",
										},
									},
								],
							},
						},
					},
				},
			],
			must_not: [
				{
					nested: {
						path: "taxonomy.sections",
						query: {
							bool: {
								must: [
									{
										terms: {
											"taxonomy.sections._id": ["1", "2"],
										},
									},
									{
										term: {
											"taxonomy.sections._website": "the-site",
										},
									},
								],
							},
						},
					},
				},
			],
		},
	},
};

describe("story-feed-author-content-source-block", () => {
	it("should use the proper param types", () => {
		expect(contentSource.params).toEqual({
			excludeSections: "text",
			feedOffset: "number",
			feedSize: "number",
			includeSections: "text",
		});
	});

	it("should build the correct url", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				excludeSections: "1,2",
				feedOffset: 4,
				feedSize: 3,
				includeSections: "3, 4",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.hostname).toEqual("content.base");
		expect(contentSourceFetch.request.url.pathname).toEqual("/content/v4/search/published");
		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				from: "4",
				body: encodeURI(JSON.stringify(body)),
				sort: "display_date:desc",
				size: "3",
				website: "the-site",
			})
		);
	});

	it("should default size to 10 and offset to 0", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				excludeSections: "1,2",
				includeSections: "3, 4",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				from: "0",
				body: encodeURI(JSON.stringify(body)),
				sort: "display_date:desc",
				size: "10",
				website: "the-site",
			})
		);
	});

	it("should fail if includeSections is not passed in", async () => {
		const contentSourceFetch = await contentSource
			.fetch(
				{
					"arc-site": "the-site",
				},
				{ cachedCall: () => {} }
			)
			.catch((e) => expect(e).not.toBeNull());

		expect(contentSourceFetch).not.toBeDefined();
	});

	it("should succeed if excludeSections is not passed in", async () => {
		const contentSourceFetch = await contentSource.fetch(
			{
				includeSections: "3, 4",
				"arc-site": "the-site",
			},
			{ cachedCall: () => {} }
		);

		expect(contentSourceFetch.request.url.searchObject).toEqual(
			expect.objectContaining({
				from: "0",
				body: encodeURI(
					JSON.stringify({
						...body,
						query: {
							...body.query,
							bool: {
								...body.query.bool,
								must_not: [
									{
										nested: {
											...body.query.bool.must_not[0].nested,
											query: {
												...body.query.bool.must_not[0].nested.query,
												bool: {
													...body.query.bool.must_not[0].nested.query.bool,
													must: [
														{
															terms: { "taxonomy.sections._id": [""] },
														},
														{
															term: { "taxonomy.sections._website": "the-site" },
														},
													],
												},
											},
										},
									},
								],
							},
						},
					})
				),
				sort: "display_date:desc",
				size: "10",
				website: "the-site",
			})
		);
	});
});
