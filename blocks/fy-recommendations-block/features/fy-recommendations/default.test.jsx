import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
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
		}),
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

	it("does not render the carousel before the fetch resolves", () => {
		global.fetch = jest.fn(() => new Promise(() => {})); // never resolves
		render(<FYRecommendations customFields={{ lazyLoad: false }} />);
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});

	it("renders nothing when the content source returns no elements", async () => {
		mockContentFetch({ content_elements: [], attribution: null });
		render(<FYRecommendations customFields={{ lazyLoad: false }} />);
		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});

	it("renders nothing on network error", async () => {
		mockFetchError();
		render(<FYRecommendations customFields={{ lazyLoad: false }} />);
		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});

	it("fetches via the Fusion content-fetch endpoint with the FY query params", async () => {
		useFusionContext.mockReturnValue({
			globalContent: { _id: "article-123" },
			arcSite: "test-site",
		});
		mockContentFetch({ content_elements: [], attribution: null });

		render(<FYRecommendations customFields={{ displayAmount: 3, lazyLoad: false }} />);
		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

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

	it("includes subscription_tier in the fetch query when configured", async () => {
		mockContentFetch({ content_elements: [], attribution: null });

		render(<FYRecommendations customFields={{ lazyLoad: false, subscriptionTier: "premium" }} />);
		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

		const parsed = new URL(global.fetch.mock.calls[0][0], "http://localhost");
		const query = JSON.parse(parsed.searchParams.get("query"));
		expect(query.subscription_tier).toBe("premium");
	});

	it("renders the carousel with the mapped ANS fields", async () => {
		mockContentFetch({
			content_elements: [sampleElement],
			attribution: { exposure_id: "exp-1" },
		});

		render(<FYRecommendations customFields={{ lazyLoad: false }} />);

		await screen.findByText("Test Article");
		expect(screen.getByText("Technology")).toBeInTheDocument();
		expect(screen.getByText("Sarah Chen")).toBeInTheDocument();

		const cardLink = screen.getByRole("link", { hidden: true, name: /Test Article/i });
		expect(cardLink).toHaveAttribute("href", "https://example.com/article");
	});

	it("opens links in a new tab when openInNewTab is enabled", async () => {
		mockContentFetch({ content_elements: [sampleElement], attribution: null });

		render(<FYRecommendations customFields={{ lazyLoad: false, openInNewTab: true }} />);

		await screen.findByText("Test Article");
		const cardLink = screen.getByRole("link", { hidden: true, name: /Test Article/i });
		expect(cardLink).toHaveAttribute("target", "_blank");
	});

	it("does not set target attribute when openInNewTab is false", async () => {
		mockContentFetch({ content_elements: [sampleElement], attribution: null });

		render(<FYRecommendations customFields={{ lazyLoad: false, openInNewTab: false }} />);

		await screen.findByText("Test Article");
		const cardLink = screen.getByRole("link", { hidden: true, name: /Test Article/i });
		expect(cardLink).not.toHaveAttribute("target");
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

		render(<FYRecommendations customFields={{ lazyLoad: true }} />);

		// Waiting for intersection — no fetch yet.
		expect(global.fetch).not.toHaveBeenCalled();
		expect(observe).toHaveBeenCalledTimes(1);

		triggerIntersection([{ isIntersecting: true }]);
		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
		expect(disconnect).toHaveBeenCalled();
	});
});
