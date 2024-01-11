import React from "react";
import { render } from "@testing-library/react";
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
		const { queryByText } = render(<LeadArt customFields={{}} />);
		expect(queryByText(rawHtml)).not.toBeNull();
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
		const { queryByText } = render(<LeadArt customFields={{}} />);
		expect(queryByText("Title")).not.toBeNull();
		expect(queryByText("Description")).not.toBeNull();
		expect(queryByText("(Credit)")).not.toBeNull();
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
		const { queryByText } = render(
			<LeadArt
				customFields={{
					hideTitle: true,
					hideCaption: true,
					hideCredits: true,
				}}
			/>,
		);
		expect(queryByText("Title")).toBeNull();
		expect(queryByText("Description")).toBeNull();
		expect(queryByText("(Credit)")).toBeNull();
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
		const { queryByAltText, queryByText } = render(
			<LeadArt
				customFields={{
					hideTitle: false,
					hideCaption: false,
					hideCredits: false,
				}}
			/>,
		);
		expect(queryByAltText("a test image")).not.toBeNull();
		expect(queryByText("Caption")).not.toBeNull();
		expect(queryByText("Subtitle")).not.toBeNull();
		expect(queryByText("(Credit)")).not.toBeNull();
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
		const { queryByAltText, queryByText } = render(
			<LeadArt
				customFields={{
					hideTitle: true,
					hideCaption: true,
					hideCredits: true,
				}}
			/>,
		);
		expect(queryByAltText("a test image")).not.toBeNull();
		expect(queryByText("Caption")).toBeNull();
		expect(queryByText("Subtitle")).toBeNull();
		expect(queryByText("(Credit)")).toBeNull();
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
		const { queryByRole, queryByText } = render(<LeadArt customFields={{}} />);

		expect(queryByRole("region", { name: "test headline" })).not.toBeNull();
		expect(queryByText("Caption")).not.toBeNull();
		expect(queryByText("Subtitle")).not.toBeNull();
		expect(queryByText("(Credit)")).not.toBeNull();
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
		const { queryByRole, queryByText } = render(
			<LeadArt
				customFields={{
					hideTitle: true,
					hideCaption: true,
					hideCredits: true,
				}}
			/>,
		);
		expect(queryByRole("region", { name: "test headline" })).not.toBeNull();
		expect(queryByText("Caption")).toBeNull();
		expect(queryByText("Subtitle")).toBeNull();
		expect(queryByText("(Credit)")).toBeNull();
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
		const { queryByRole } = render(<LeadArt customFields={{}} />);
		expect(queryByRole("region", { name: "" })).not.toBeNull();
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
		expect(container.firstChild).toBeNull();
	});

	it("returns null if no content promo items", () => {
		const globalContent = { promo_items: null };

		useFusionContext.mockReturnValue({ ...fusionContext, globalContent });
		const { container } = render(<LeadArt customFields={{}} />);
		expect(container.firstChild).toBeNull();
	});
});
