import axios from "axios";

import contentSource from "./fy-recommendations";

jest.mock("fusion:environment", () => ({
	FY_RECOMMENDER_BASE: "https://recommender.test.arcxp.com",
	ORGANIZATION: "test-org",
}));

jest.mock("axios", () => ({
	__esModule: true,
	default: jest.fn(),
}));

const scoredItem = {
	item_id: "item-1",
	score: 0.9,
	title: "Test Article",
	url: "https://example.com/article",
	thumbnail_url: "https://example.com/img.jpg",
	timestamp: "2026-01-01T00:00:00Z",
	author: "Sarah Chen",
	categories: ["Technology"],
	is_premium: true,
	position: 0,
	attribution_id: "attr-1",
};

const mockResolve = (data) => axios.mockResolvedValue({ data });

beforeEach(() => {
	axios.mockReset();
});

describe("the fy-recommendations content source block", () => {
	it("uses text param types", () => {
		expect(contentSource.params).toEqual([
			{ displayName: "num_results", name: "num_results", type: "text" },
			{ displayName: "user_id", name: "user_id", type: "text" },
			{ displayName: "item_id", name: "item_id", type: "text" },
			{ displayName: "device_type", name: "device_type", type: "text" },
			{ displayName: "subscription_tier", name: "subscription_tier", type: "text" },
		]);
	});

	it("calls the recommender with FY contract params and injects Arc headers", async () => {
		mockResolve({ recommendations: [], attribution: null });

		await contentSource.fetch({
			"arc-site": "test-site",
			user_id: "u-123",
			num_results: 3,
			item_id: "article-123",
			device_type: "mobile",
			subscription_tier: "premium",
		});

		expect(axios).toHaveBeenCalledTimes(1);
		const request = axios.mock.calls[0][0];
		expect(request.url).toContain("/recommend/v1/recommendations?");
		expect(request.url).toContain("site_id=test-site");
		expect(request.url).toContain("user_id=u-123");
		expect(request.url).toContain("num_results=3");
		expect(request.url).toContain("item_id=article-123");
		expect(request.url).toContain("device_type=mobile");
		expect(request.url).toContain("subscription_tier=premium");
		expect(request.headers["arc-organization"]).toBe("test-org");
		expect(request.headers["arc-service"]).toBe("api");
	});

	it("maps ScoredItem to ANS content_elements and propagates attribution", async () => {
		mockResolve({
			recommendations: [scoredItem],
			attribution: {
				exposure_id: "exp-1",
				issued_at: "2026-01-01T00:00:00Z",
				surface_id: "home",
			},
		});

		const result = await contentSource.fetch({ "arc-site": "test-site", user_id: "u-123" });

		expect(result.content_elements).toHaveLength(1);
		const el = result.content_elements[0];
		expect(el._id).toBe("item-1");
		expect(el.headlines.basic).toBe("Test Article");
		expect(el.websites["test-site"].website_url).toBe("https://example.com/article");
		expect(el.promo_items.basic.url).toBe("https://example.com/img.jpg");
		expect(el.taxonomy.sections[0].name).toBe("Technology");
		expect(el.credits.by[0].name).toBe("Sarah Chen");
		expect(el.label.isPremium.display).toBe(true);
		expect(el.additional_properties.fy_position).toBe(0);
		expect(el.additional_properties.fy_attribution_id).toBe("attr-1");
		expect(result.attribution.exposure_id).toBe("exp-1");
	});

	it("returns empty without calling the recommender when user_id is missing", async () => {
		const result = await contentSource.fetch({ "arc-site": "test-site" });
		expect(axios).not.toHaveBeenCalled();
		expect(result).toEqual({ content_elements: [], attribution: null });
	});

	it("returns empty when the recommender call rejects", async () => {
		axios.mockRejectedValue(new Error("boom"));
		const result = await contentSource.fetch({ "arc-site": "test-site", user_id: "u-123" });
		expect(result).toEqual({ content_elements: [], attribution: null });
	});

	it("preserves recommender ranking order", async () => {
		mockResolve({
			recommendations: [
				{ ...scoredItem, item_id: "B", position: 0 },
				{ ...scoredItem, item_id: "A", position: 1 },
				{ ...scoredItem, item_id: "C", position: 2 },
			],
			attribution: null,
		});

		const result = await contentSource.fetch({ "arc-site": "test-site", user_id: "u-123" });
		expect(result.content_elements.map((e) => e._id)).toEqual(["B", "A", "C"]);
	});
});
