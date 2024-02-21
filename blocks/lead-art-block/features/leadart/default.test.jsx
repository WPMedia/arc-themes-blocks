import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";
import LeadArt from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	usePhrases: jest.fn(() => ({
		t: jest.fn().mockReturnValue("gallery-expand"),
	})),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
}));

Object.defineProperty(global.window, "matchMedia", {
	value: () => true,
});

const fusionContext = {
	arcSite: "the-sun",
	globalContent: {},
};

describe("LeadArt", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	beforeEach(() => {
		getProperties.mockImplementation(() => ({
			locale: [],
			resizerURL: "http://url.com/",
		}));
	});

	it("renders html lead art type", () => {
		const rawHtml = "This is raw HTML";
		const globalContent = {
			promo_items: {
				lead_art: {
					type: "raw_html",
					content: rawHtml,
				},
			},
		};
		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		render(<LeadArt customFields={{}} />);
		expect(screen.getByText(rawHtml)).not.toBeNull();
	});

	it("renders video lead art type", () => {
		const globalContent = {
			promo_items: {
				lead_art: {
					type: "video",
					headlines: {
						basic: "Title",
					},
					description: {
						basic: "Description",
					},
					credits: {
						by: [{ name: "Credit", type: "author" }],
					},
				},
			},
		};
		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		render(<LeadArt customFields={{}} />);
		expect(screen.getByText("Title")).not.toBeNull();
		expect(screen.getByText("Description")).not.toBeNull();
		expect(screen.getByText("(Credit)")).not.toBeNull();
	});

	it("renders video lead art type with no meta data", () => {
		const globalContent = {
			promo_items: {
				lead_art: {
					type: "video",
					headlines: {
						basic: "Title",
					},
					description: {
						basic: "Description",
					},
					credits: {
						by: [{ name: "Credit", type: "author" }],
					},
				},
			},
		};
		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		render(
			<LeadArt
				customFields={{
					hideTitle: true,
					hideCaption: true,
					hideCredits: true,
				}}
			/>,
		);
		expect(screen.queryByText("Title")).toBeNull();
		expect(screen.queryByText("Description")).toBeNull();
		expect(screen.queryByText("(Credit)")).toBeNull();
	});

	it("renders image type", () => {
		const globalContent = {
			promo_items: {
				lead_art: {
					type: "image",
					alt_text: "a test image",
					auth: {
						2: "AUTH_STRING",
					},
					caption: "Caption",
					subtitle: "Subtitle",
					credits: {
						by: [{ name: "Credit", type: "author" }],
					},
				},
			},
		};

		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		render(
			<LeadArt
				customFields={{
					hideTitle: false,
					hideCaption: false,
					hideCredits: false,
				}}
			/>,
		);
		expect(screen.getByAltText("a test image")).not.toBeNull();
		expect(screen.getByText("Caption")).not.toBeNull();
		expect(screen.getByText("Subtitle")).not.toBeNull();
		expect(screen.getByText("(Credit)")).not.toBeNull();
	});

	it("renders image type and no meta data", () => {
		const globalContent = {
			promo_items: {
				lead_art: {
					type: "image",
					alt_text: "a test image",
					auth: {
						2: "AUTH_STRING",
					},
					caption: "Caption",
					subtitle: "Subtitle",
					credits: {
						by: [{ name: "Credit", type: "author" }],
					},
				},
			},
		};

		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		render(
			<LeadArt
				customFields={{
					hideTitle: true,
					hideCaption: true,
					hideCredits: true,
				}}
			/>,
		);
		expect(screen.getByAltText("a test image")).not.toBeNull();
		expect(screen.queryByText("Caption")).toBeNull();
		expect(screen.queryByText("Subtitle")).toBeNull();
		expect(screen.queryByText("(Credit)")).toBeNull();
	});

	it("renders gallery lead image type", () => {
		const globalContent = {
			promo_items: {
				lead_art: {
					type: "gallery",
					headlines: { basic: "test headline" },
					content_elements: [
						{
							type: "image",
							alt_text: "a test image",
							auth: {
								2: "AUTH_STRING",
							},
							caption: "Caption",
							subtitle: "Subtitle",
							credits: {
								by: [{ name: "Credit", type: "author" }],
							},
						},
					],
				},
			},
		};
		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		render(<LeadArt customFields={{}} />);

		expect(screen.getByRole("region", { name: "test headline" })).not.toBeNull();
		expect(screen.getByText("Caption")).not.toBeNull();
		expect(screen.getByText("Subtitle")).not.toBeNull();
		expect(screen.getByText("(Credit)")).not.toBeNull();
	});

	it("renders gallery lead image type with no meta data", () => {
		const globalContent = {
			promo_items: {
				lead_art: {
					type: "gallery",
					headlines: { basic: "test headline" },
					content_elements: [
						{
							type: "image",
							alt_text: "a test image",
							auth: {
								2: "AUTH_STRING",
							},
							caption: "Caption",
							subtitle: "Subtitle",
							credits: {
								by: [{ name: "Credit", type: "author" }],
							},
						},
					],
				},
			},
		};
		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		render(
			<LeadArt
				customFields={{
					hideTitle: true,
					hideCaption: true,
					hideCredits: true,
				}}
			/>,
		);
		expect(screen.getByRole("region", { name: "test headline" })).not.toBeNull();
		expect(screen.queryByText("Caption")).toBeNull();
		expect(screen.queryByText("Subtitle")).toBeNull();
		expect(screen.queryByText("(Credit)")).toBeNull();
	});

	it("renders gallery with an empty ans headline if no basic headline provided", () => {
		const globalContent = {
			promo_items: {
				lead_art: {
					type: "gallery",
					headlines: {},
					content_elements: [],
				},
			},
		};

		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		render(<LeadArt customFields={{}} />);
		expect(screen.getByRole("region", { name: "" })).not.toBeNull();
	});

	it("returns null if invalid lead art type", () => {
		const globalContent = {
			promo_items: {
				lead_art: {
					type: "film",
					headlines: { basic: "test headline" },
				},
			},
		};

		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		const { container } = render(<LeadArt customFields={{}} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("returns null if no content promo items", () => {
		const globalContent = { promo_items: null };

		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		const { container } = render(<LeadArt customFields={{}} />);
		expect(container).toBeEmptyDOMElement();
	});
});
