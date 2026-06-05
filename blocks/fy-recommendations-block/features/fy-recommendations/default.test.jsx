import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockConsole from "jest-mock-console";

import { useFusionContext } from "fusion:context";

import FYRecommendations from "./default";

jest.mock("fusion:context", () => ({
	useComponentContext: jest.fn(() => ({ id: "test-id" })),
	useFusionContext: jest.fn(() => ({ globalContent: null, arcSite: "test-site" })),
}));

// The block fetches CLIENT-SIDE through Fusion's content-fetch endpoint, which
// resolves the fy-recommendations content source server-side. We mock the
// content-fetch response shape: { content_elements, attribution }.
const mockContentFetch = (response) => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve(response),
		})
	);
};

const mockFetchError = () => {
	global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));
};

// ANS element as returned by the content source (already mapped from ScoredItem).
const sampleElement = {
	_id: "item-1",
	headlines: { basic: "Test Article" },
	promo_items: { basic: { url: "https://example.com/img.jpg" } },
	websites: { "test-site": { website_url: "https://example.com/article" } },
	taxonomy: { sections: [{ name: "Technology" }] },
	credits: { by: [{ name: "Sarah Chen" }] },
	display_date: "2026-01-01T00:00:00Z",
	additional_properties: { fy_position: 0, fy_attribution_id: "attr-1" },
};

describe("FY Recommendations", () => {
	let restoreConsole;

	beforeAll(() => {
		restoreConsole = mockConsole();
	});

	afterAll(() => {
		restoreConsole?.();
	});

	beforeEach(() => {
		jest.clearAllMocks();
		useFusionContext.mockReturnValue({ globalContent: null, arcSite: "test-site" });
		document.cookie = "fy_user_id=u-123";
	});

	afterEach(() => {
		document.cookie = "fy_user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		delete global.IntersectionObserver;
	});

	it("does not render the carousel before the fetch resolves", async () => {
		global.fetch = jest.fn(() => new Promise(() => {})); // never resolves
		let container;
		await act(async () => {
			({ container } = render(<FYRecommendations customFields={{ lazyLoad: false }} />));
		});
		expect(container.querySelectorAll(".b-fy-recommendations")).toHaveLength(0);
	});

	it("renders nothing when the content source returns no elements", async () => {
		mockContentFetch({ content_elements: [], attribution: null });
		let container;
		await act(async () => {
			({ container } = render(<FYRecommendations customFields={{ lazyLoad: false }} />));
		});
		expect(container.querySelectorAll(".b-fy-recommendations")).toHaveLength(0);
	});

	it("renders nothing on network error", async () => {
		mockFetchError();
		let container;
		await act(async () => {
			({ container } = render(<FYRecommendations customFields={{ lazyLoad: false }} />));
		});
		expect(container.querySelectorAll(".b-fy-recommendations")).toHaveLength(0);
	});

	it("fetches via the Fusion content-fetch endpoint with the FY query params", async () => {
		useFusionContext.mockReturnValue({
			globalContent: { _id: "article-123" },
			arcSite: "test-site",
		});
		mockContentFetch({ content_elements: [], attribution: null });

		await act(async () => {
			render(<FYRecommendations customFields={{ displayAmount: 3, lazyLoad: false }} />);
		});

		expect(global.fetch).toHaveBeenCalledTimes(1);
		const [calledUrl] = global.fetch.mock.calls[0];
		expect(calledUrl).toContain("/content/fetch/fy-recommendations");
		expect(calledUrl).toContain("_website=test-site");

		const parsed = new URL(calledUrl, "http://localhost");
		const query = JSON.parse(parsed.searchParams.get("query"));
		expect(query.num_results).toBe(3);
		expect(query.item_id).toBe("article-123");
		expect(query.user_id).toBe("u-123");
		expect(query.device_type).toBeDefined();
	});

	it("renders the carousel with the mapped ANS fields", async () => {
		mockContentFetch({ content_elements: [sampleElement], attribution: { exposure_id: "exp-1" } });

		let container;
		await act(async () => {
			({ container } = render(<FYRecommendations customFields={{ lazyLoad: false }} />));
		});

		expect(container.querySelectorAll(".b-fy-recommendations")).toHaveLength(1);
		expect(container.querySelectorAll(".b-fy-recommendations__card")).toHaveLength(1);
		expect(container.textContent).toContain("Test Article");
		expect(container.textContent).toContain("Technology");
		expect(container.textContent).toContain("Sarah Chen");

		const link = container.querySelector(".b-fy-recommendations__card");
		expect(link.getAttribute("href")).toBe("https://example.com/article");
	});

	it("defers the fetch until the block scrolls into view when lazyLoad is on", async () => {
		let triggerIntersection;
		const observe = jest.fn();
		const disconnect = jest.fn();
		global.IntersectionObserver = jest.fn((cb) => {
			triggerIntersection = cb;
			return { observe, disconnect, unobserve: jest.fn() };
		});
		mockContentFetch({ content_elements: [sampleElement], attribution: null });

		await act(async () => {
			render(<FYRecommendations customFields={{ lazyLoad: true }} />);
		});

		// Waiting for intersection — no fetch yet.
		expect(global.fetch).not.toHaveBeenCalled();
		expect(observe).toHaveBeenCalledTimes(1);

		await act(async () => {
			triggerIntersection([{ isIntersecting: true }]);
		});

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(disconnect).toHaveBeenCalled();
	});
});
