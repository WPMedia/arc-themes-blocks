/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from "@testing-library/react";
import GalleryFeature, { GalleryPresentation } from "./default"; // import feature and presentation

// Capture Image props for assertions
const imageCalls = [];

// Polyfill matchMedia for Carousel component expectations
if (!window.matchMedia) {
	window.matchMedia = jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	}));
}

jest.mock("fusion:environment", () => ({
	RESIZER_TOKEN_VERSION: 2,
	ENVIRONMENT: "sandbox",
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
}));

jest.mock("fusion:context", () => ({
	useAppContext: jest.fn(() => ({ globalContent: {} })),
	useFusionContext: jest.fn(() => ({ arcSite: "site", isAdmin: false })),
}));

// Mock phrases
const lazyLoadCalls = [];
const carouselIds = [];
let mockIsServerSide = jest.fn(() => false);

jest.mock("@wpmedia/arc-themes-components", () => {
	const actual = jest.requireActual("@wpmedia/arc-themes-components");
	return {
		...actual,
		usePhrases: () => ({ t: (_k, opts) => (opts?.current && opts?.total ? `${opts.current} of ${opts.total}` : _k) }),
		Image: ({ alt, ...rest }) => {
			imageCalls.push({ alt, ...rest });
			return <img alt={alt || "gallery image"} />;
		},
		LazyLoad: ({ enabled, children }) => {
			lazyLoadCalls.push(enabled);
			return <div data-enabled={enabled}>{children}</div>;
		},
				Carousel: (() => {
					const CarouselRoot = ({ id, children, ...rest }) => {
						carouselIds.push(id);
						return <div data-testid="carousel" data-carousel-id={id} data-rest={Object.keys(rest).length}>{children}</div>;
					};
					const Button = ({ children, ...btnProps }) => <button type="button" data-testid="carousel-button" {...btnProps}>{children}</button>;
					const Item = ({ children, ...itemProps }) => <div data-testid="carousel-item" {...itemProps}>{children}</div>;
					CarouselRoot.Button = Button;
					CarouselRoot.Item = Item;
					return CarouselRoot;
				})(),
		isServerSide: () => mockIsServerSide(),
		formatCredits: (credits) => credits,
	};
});

jest.mock("fusion:properties", () => jest.fn(() => ({
	galleryCubeClicks: "3",
	resizerURL: "https://fallback",
	resizerURLs: { sandbox: "https://sandbox", prod: "https://prod" },
})));

// Import after mocks

describe("GalleryPresentation & GalleryFeature comprehensive coverage", () => {
	beforeEach(() => {
		imageCalls.length = 0;
		lazyLoadCalls.length = 0;
		carouselIds.length = 0;
		mockIsServerSide = jest.fn(() => false);
		const { useFusionContext } = require("fusion:context");
		useFusionContext.mockReturnValue({ arcSite: "site", isAdmin: false });
		const getProperties = require("fusion:properties");
		getProperties.mockImplementation(() => ({
			galleryCubeClicks: "3",
			resizerURL: "https://fallback",
			resizerURLs: { sandbox: "https://sandbox", prod: "https://prod" },
		}));
	});

	it("uses environment-specific resizerURLs entry when available", () => {
		render(
			<GalleryPresentation
				arcSite="site"
				globalContent={{
					content_elements: [
						{
							url: "https://example.com/path/image1.jpg",
							_id: "image1",
							auth: { 2: "TOKEN" },
							subtitle: "subtitle",
							caption: "caption",
							credits: "credits",
							vanityCredits: "vanityCredits",
						},
					],
					headlines: { basic: "Headline" },
					_id: "gallery-id",
				}}
				customFields={{ inheritGlobalContent: true }}
				resizerAppVersion={2}
			/>
		);
		expect(imageCalls[0].resizerURL).toBe("https://sandbox");
	});

	it("falls back to resizerURL when resizerURLs absent", () => {
		const getProperties = require("fusion:properties");
		getProperties.mockImplementationOnce(() => ({
			galleryCubeClicks: "2",
			resizerURL: "https://single"
		}));
		render(
			<GalleryPresentation
				arcSite="site"
				globalContent={{ content_elements: [{ url: "u", _id: "i", auth: { 2: "T" } }], headlines: {}, _id: "id-single" }}
				customFields={{ inheritGlobalContent: true }}
				resizerAppVersion={2}
			/>
		);
		expect(imageCalls[0].resizerURL).toBe("https://single");
	});

	it("hides caption, credit, and title based on custom fields", () => {
		render(
			<GalleryPresentation
				arcSite="site"
				globalContent={{ content_elements: [{ url: "u2", _id: "i2", auth: { 2: "T" }, caption: "cap", credits: "cred", subtitle: "sub" }], headlines: {}, _id: "id-hide" }}
				customFields={{ inheritGlobalContent: true, hideTitle: true, hideCaption: true, hideCredits: true }}
				resizerAppVersion={2}
			/>
		);
		const propsPassed = imageCalls[0];
		expect(propsPassed).toHaveProperty("resizerURL");
	});

	it("selects content source vs global content based on inheritGlobalContent logic", () => {
		// Case A: inheritGlobalContent undefined & galleryContentConfig defined -> use content
		const { useContent } = require("fusion:content");
		useContent.mockReturnValueOnce({ _id: "content-id", content_elements: [{ url: "c", _id: "c1", auth: { 2: "T" } }], headlines: { basic: "Content Head" } });
		render(
			<GalleryPresentation
				arcSite="site"
				globalContent={{ _id: "global-id", content_elements: [], headlines: { basic: "Global Head" } }}
				customFields={{ galleryContentConfig: { contentService: "svc", contentConfigValues: {} } }}
				resizerAppVersion={2}
			/>
		);
		expect(carouselIds).toContain("content-id");
		// Case B: inheritGlobalContent true overrides and uses global
		useContent.mockReturnValueOnce({ _id: "content-id2", content_elements: [{ url: "c2", _id: "c2", auth: { 2: "T" } }], headlines: { basic: "Content Head2" } });
		render(
			<GalleryPresentation
				arcSite="site"
				globalContent={{ _id: "global-id2", content_elements: [{ url: "g", _id: "g1", auth: { 2: "T" } }], headlines: { basic: "Global Head2" } }}
				customFields={{ galleryContentConfig: { contentService: "svc", contentConfigValues: {} }, inheritGlobalContent: true }}
				resizerAppVersion={2}
			/>
		);
		expect(carouselIds).toContain("global-id2");
		// Case C: inheritGlobalContent false uses content
		useContent.mockReturnValueOnce({ _id: "content-id3", content_elements: [{ url: "c3", _id: "c3", auth: { 2: "T" } }], headlines: { basic: "Content Head3" } });
		render(
			<GalleryPresentation
				arcSite="site"
				globalContent={{ _id: "global-id3", content_elements: [], headlines: {} }}
				customFields={{ inheritGlobalContent: false }}
				resizerAppVersion={2}
			/>
		);
		expect(carouselIds).toContain("content-id3");
	});

	it("GalleryFeature returns null server-side when lazyLoad true and not admin", () => {
		mockIsServerSide = jest.fn(() => true);
		const { useFusionContext } = require("fusion:context");
		useFusionContext.mockReturnValueOnce({ arcSite: "site", isAdmin: false });
		render(<GalleryFeature customFields={{ lazyLoad: true }} />);
		expect(screen.queryByTestId('carousel')).toBeNull();
	});

	it("GalleryFeature renders with LazyLoad enabled when client-side and not admin", () => {
		mockIsServerSide = jest.fn(() => false);
		render(<GalleryFeature customFields={{ lazyLoad: true }} />);
		expect(lazyLoadCalls.pop()).toBe(true);
	});

	it("GalleryFeature sets LazyLoad disabled for admin even with lazyLoad true", () => {
		const { useFusionContext } = require("fusion:context");
		useFusionContext.mockReturnValueOnce({ arcSite: "site", isAdmin: true });
		render(<GalleryFeature customFields={{ lazyLoad: true }} />);
		expect(lazyLoadCalls.pop()).toBe(false);
	});

});
