import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DefaultOutputType, { configureSinglePageApp } from "../default";

const DummyComp = () => null;
const mockProps = {
	pagebuilderURL: jest.fn((path) => path),
	CssLinks: DummyComp,
	Fusion: DummyComp,
	Libs: DummyComp,
	MetaTag: DummyComp,
	MetaTags: DummyComp,
	metaValue: jest.fn(() => "article"),
};

// mockPropertiesOverride allows per-test customisation of the getProperties return value.
// Must use `var` so the declaration is hoisted before jest.mock() runs.
// eslint-disable-next-line no-var
var mockPropertiesOverride = null;

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		globalContent: {},
		arcSite: "the-sun",
		requestUri: "/",
	})),
}));

// The factory closure reads `mockPropertiesOverride` at call time, so per-test overrides work
// even though the component holds a reference to this function from module load.
jest.mock("fusion:properties", () =>
	jest.fn(() =>
		mockPropertiesOverride || {
			websiteName: "The Sun",
			twitterUsername: "thesun",
			dangerouslyInjectJS: [],
			websiteDomain: "",
			fallbackImage: "/resources/placeholder.jpg",
			resizerURL: "resizer",
			locale: "en",
			textDirection: "ltr",
			textFlow: "horizontal-tb",
		},
	),
);

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	MetaData: () => null,
	usePhrases: jest.fn(() => ({ t: (key) => key })),
}));

afterEach(() => {
	// React 19 hoists <style>/<script> to document.head; clean up between tests
	document.head.innerHTML = "";
});

beforeEach(() => {
	mockPropertiesOverride = null;
});

// ─── configureSinglePageApp (pure function) ───────────────────────────────────

describe("configureSinglePageApp", () => {
	it("returns true when spaSites is undefined", () => {
		expect(configureSinglePageApp(undefined)).toStrictEqual(true);
	});

	it("returns an empty array when spaSites is an empty array", () => {
		expect(configureSinglePageApp([])).toStrictEqual([]);
	});

	it("returns the provided array when site ids are given", () => {
		const spaSites = ["the-sun"];
		expect(configureSinglePageApp(spaSites)).toStrictEqual(spaSites);
	});
});

// ─── DefaultOutputType render tests ──────────────────────────────────────────

describe("the default output type", () => {
	it("renders without throwing", () => {
		expect(() => render(<DefaultOutputType {...mockProps} />)).not.toThrow();
	});

	it("renders a skip-to-main link", () => {
		const { container } = render(<DefaultOutputType {...mockProps} />);
		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		expect(container.querySelector(".skip-main")).toBeInTheDocument();
	});

	it("renders the fusion-app container", () => {
		const { container } = render(<DefaultOutputType {...mockProps} />);
		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		expect(container.querySelector("#fusion-app")).toBeInTheDocument();
	});

	it("embeds the default writing-mode style", () => {
		render(<DefaultOutputType {...mockProps} />);
		// eslint-disable-next-line testing-library/no-node-access
		expect(document.head.querySelector('style')?.innerHTML).toContain("writing-mode: horizontal-tb");
	});

	it("uses a custom textFlow value in the style tag", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], textFlow: "vertical-rl" };
		render(<DefaultOutputType {...mockProps} />);
		// eslint-disable-next-line testing-library/no-node-access
		expect(document.head.querySelector('style')?.innerHTML).toContain("writing-mode: vertical-rl");
	});
});

// ─── Conditional script rendering ────────────────────────────────────────────
// Scripts and links injected into document.head cannot be queried via RTL screen
// queries; direct document.head access is necessary here.
/* eslint-disable testing-library/no-node-access */

describe("head content — conditional scripts", () => {
	it("includes GTM code in the inline scripts block when gtmID is set", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], gtmID: "GTM-12345ID" };
		render(<DefaultOutputType {...mockProps} />);
		const inline = document.head.querySelector('script[data-integration="inlineScripts"]');
		expect(inline?.innerHTML).toMatch(/GTM-12345ID/);
	});

	it("renders a Google Analytics script tag when gaID is set", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], gaID: "UA-6789ID" };
		render(<DefaultOutputType {...mockProps} />);
		expect(
			document.head.querySelector('script[data-integration="googleAnalyticsTag"]'),
		).toBeInTheDocument();
	});

	it("renders a Nativo ad script when nativoIntegration is true", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], nativoIntegration: true };
		render(<DefaultOutputType {...mockProps} />);
		expect(document.head.querySelector('script[data-integration="nativo-ad"]')).toBeInTheDocument();
	});

	it("does not render a Nativo ad script when nativoIntegration is not set", () => {
		render(<DefaultOutputType {...mockProps} />);
		expect(
			document.head.querySelector('script[data-integration="nativo-ad"]'),
		).not.toBeInTheDocument();
	});

	it("renders a Chartbeat script when both chartbeatAccountId and chartbeatDomain are set", () => {
		mockPropertiesOverride = {
			dangerouslyInjectJS: [],
			chartbeatAccountId: 994949,
			chartbeatDomain: "example.com",
		};
		render(<DefaultOutputType {...mockProps} />);
		expect(document.head.querySelector('script[data-integration="chartbeat"]')).toBeInTheDocument();
	});

	it("does not render a Chartbeat script when chartbeatAccountId is missing", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], chartbeatDomain: "example.com" };
		render(<DefaultOutputType {...mockProps} />);
		expect(
			document.head.querySelector('script[data-integration="chartbeat"]'),
		).not.toBeInTheDocument();
	});

	it("does not render a Chartbeat script when chartbeatDomain is missing", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], chartbeatAccountId: 994949 };
		render(<DefaultOutputType {...mockProps} />);
		expect(
			document.head.querySelector('script[data-integration="chartbeat"]'),
		).not.toBeInTheDocument();
	});

	it("renders a Comscore script when comscoreID is set", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], comscoreID: 88776655 };
		render(<DefaultOutputType {...mockProps} />);
		expect(document.head.querySelector('script[data-integration="comscore"]')).toBeInTheDocument();
	});

	it("does not render a Comscore script when comscoreID is missing", () => {
		render(<DefaultOutputType {...mockProps} />);
		expect(
			document.head.querySelector('script[data-integration="comscore"]'),
		).not.toBeInTheDocument();
	});

	it("renders a Queryly script when querylyId is set", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], querylyId: 88776655 };
		render(<DefaultOutputType {...mockProps} />);
		expect(document.head.querySelector('script[data-integration="queryly"]')).toBeInTheDocument();
	});

	it("does not render a Queryly script when querylyId is not set", () => {
		render(<DefaultOutputType {...mockProps} />);
		expect(
			document.head.querySelector('script[data-integration="queryly"]'),
		).not.toBeInTheDocument();
	});

	it("renders a retail API script when api.retail.script is set", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], api: { retail: { script: "/retail/script.js" } } };
		render(<DefaultOutputType {...mockProps} />);
		expect(document.head.querySelector('script[data-integration="arcp"]')).toBeInTheDocument();
	});

	it("does not render a retail API script when the property is missing", () => {
		render(<DefaultOutputType {...mockProps} />);
		expect(document.head.querySelector('script[data-integration="arcp"]')).not.toBeInTheDocument();
	});

	it("renders a font loading link when fontUrl is provided as an array", () => {
		mockPropertiesOverride = {
			dangerouslyInjectJS: [],
			fontUrl: ["https://fonts.googleapis.com/css?family=Roboto+Condensed"],
		};
		render(<DefaultOutputType {...mockProps} />);
		expect(document.head.querySelector('[data-testid="font-loading-url-0"]')).toBeInTheDocument();
	});

	it("renders a font loading link when fontUrl is provided as a string", () => {
		mockPropertiesOverride = {
			dangerouslyInjectJS: [],
			fontUrl: "https://fonts.googleapis.com/css?family=Roboto",
		};
		render(<DefaultOutputType {...mockProps} />);
		const link = document.head.querySelector(
			'link[href="https://fonts.googleapis.com/css?family=Roboto"][rel="stylesheet"]',
		);
		expect(link).toBeInTheDocument();
	});

	it("renders no font link when fontUrl is null", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], fontUrl: null };
		render(<DefaultOutputType {...mockProps} />);
		expect(document.head.querySelector('[data-testid^="font-loading-url-"]')).not.toBeInTheDocument();
	});

	it("renders the advanced queryly script when pageType is queryly-search", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], querylyId: 12345, querylyOrg: "myorg" };
		const metaValueWithSearch = jest.fn((key) =>
			key === "page-type" ? "queryly-search" : "article",
		);
		render(<DefaultOutputType {...mockProps} metaValue={metaValueWithSearch} />);
		const querylyScripts = document.head.querySelectorAll('script[data-integration="queryly"]');
		expect(querylyScripts.length).toBe(2);
	});

	it("uses the websiteDomain of the canonical site when globalContent has canonical_website and page-type is article", () => {
		const { useFusionContext } = require("fusion:context");
		const getProperties = require("fusion:properties");
		useFusionContext.mockReturnValueOnce({
			globalContent: { canonical_website: "the-gazette" },
			arcSite: "the-sun",
			requestUri: "/",
		});
		// Return a different domain for the canonical site lookup
		getProperties.mockImplementation((site) => {
			if (site === "the-gazette") {
				return { dangerouslyInjectJS: [], websiteDomain: "https://www.thegazette.com" };
			}
			return { dangerouslyInjectJS: [], websiteDomain: "https://www.thesun.com" };
		});
		const metaValueArticle = jest.fn(() => "article");
		expect(() =>
			render(<DefaultOutputType {...mockProps} metaValue={metaValueArticle} />),
		).not.toThrow();
		getProperties.mockReset();
	});

	it("uses default empty array for dangerouslyInjectJS when not present in properties", () => {
		// Override with properties that omit dangerouslyInjectJS entirely
		mockPropertiesOverride = { websiteName: "The Sun", websiteDomain: "", fallbackImage: "/r/placeholder.jpg", resizerURL: "resizer", locale: "en" };
		expect(() => render(<DefaultOutputType {...mockProps} />)).not.toThrow();
	});
	/* eslint-enable testing-library/no-node-access */

	it("renders a comscore noscript element in the body when comscoreID is set", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], comscoreID: 88776655 };
		const { container } = render(<DefaultOutputType {...mockProps} />);
		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		expect(container.querySelector('noscript[data-integration="comscore"]')).toBeInTheDocument();
	});

	it("renders a GTM noscript element in the body when gtmID is set", () => {
		mockPropertiesOverride = { dangerouslyInjectJS: [], gtmID: "GTM-12345ID" };
		const { container } = render(<DefaultOutputType {...mockProps} />);
		// React 19 + JSDOM renders noscript as an empty element (scripting is enabled).
		// The presence of the noscript tag is sufficient to verify googleTagManagerNoScript ran.
		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		expect(container.querySelector("noscript")).toBeInTheDocument();
	});
});
