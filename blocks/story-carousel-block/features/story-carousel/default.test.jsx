import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import StoryCarousel from "./default";

const testImageURL = "dummy.png";

const mockCollectionContent = {
	_id: "WSXWGYQUHVHCHN556DSSNHHZQA",
	type: "collection",
	canonical_website: "arc-commerce",
	content_elements: [
		{
			_id: "QYAHXVDGZRBIVGHXDN6YEBUQIM",
			type: "story",
			version: "0.10.7",
			headlines: {
				basic: "Blazing Your Trail: Why the Best Sport Jacket Strategy is Variety",
			},
			subheadlines: {
				basic:
					"Some days feel like an unstructured French terry, while some nights call for an attention-grabbing velour. Isn’t it time you expanded your blazer game?",
			},
			description: {
				basic:
					"Some days feel like an unstructured French terry, while some nights call for an attention-grabbing velour. Isn’t it time you expanded your blazer game?",
			},
			promo_items: {
				basic: {
					_id: "H3DHE37DORE7FH34X7V24ORNWI",
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "ETUI72TJM5BVHCVWRJJEX45WCU",
			type: "story",
			version: "0.10.7",
			headlines: {
				basic: "Our Winter Collection: Cold-Weather Blues You Can Feel Good About",
			},
			subheadlines: {
				basic:
					"Who says winter has to be gloomy? Not us. Our approach for the season mixes deeper hues with wild accents that reflect your sunnier side.",
			},
			description: {
				basic:
					"Who says winter has to be gloomy? Not us. Our approach for the season mixes deeper hues with wild accents that reflect your sunnier side.",
			},
			promo_items: {
				basic: {
					_id: "Y4RECTW6GBEDXFK6LHBYMQ2HUY",
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "YVL7ZRMJWFAJBPQ4UJR2G3CGOA",
			type: "story",
			version: "0.10.7",
			headlines: {
				basic: "The Case for Artisan Suppliers: How Indigo Supports Small Business",
			},
			subheadlines: {
				basic:
					"Indigo’s commitment to one-of-a-kind fabric suppliers isn’t only a matter of quality. We believe in helping a critical part of the economy and our communities.",
			},
			description: {
				basic:
					"Indigo’s commitment to one-of-a-kind fabric suppliers isn’t only a matter of quality. We believe in helping a critical part of the economy and our communities.",
			},
			promo_items: {
				basic: {
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "UQMQJXJEVRAUHANSPDUZU3HQSI",
			type: "story",
			version: "0.10.7",
			headlines: {
				basic: "The Best T-Shirts",
			},
			subheadlines: {
				basic: "Any color you want! (As long as it's green)",
			},
			description: {
				basic: "Any color you want! (As long as it's green)",
			},
			promo_items: {
				basic: {
					_id: "QCSVIRNLGBCT7LWXIMVOHBANHA",
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "ETUI72TJM5BVHCVWRJJEX45ACU",
			type: "story",
			version: "0.10.7",
			headlines: {
				basic: "Our Chicago Collection: Cold-Weather Spring You Can Feel Good About",
			},
			subheadlines: {
				basic:
					"Who says spring in Chicago has to be gloomy? Not us. Our approach for the season mixes deeper hues with wild accents that reflect your sunnier side.",
			},
			description: {
				basic:
					"Who says spring in Chicago has to be gloomy? Our approach for the season mixes deeper hues with wild accents that reflect your sunnier side.",
			},
			promo_items: {
				basic: {
					_id: "Y4RECTW6GBEDXFK6LHBYMQ2HUY",
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "UQMQJXJEVRAUHANSPDUZU3HQPK",
			type: "story",
			version: "0.10.7",
			headlines: {
				basic: "Hey, More Green T-Shirts",
			},
			subheadlines: {
				basic: "Coming soon, we will be introducing white!",
			},
			description: {
				basic: "Coming soon, we will be introducing white!",
			},
			promo_items: {
				basic: {
					_id: "QCSVIRNLGBCT7LWXIMVOHBANHA",
					type: "image",
					url: testImageURL,
				},
			},
		},
	],
	website: "arc-commerce",
};

const mockCollectionContent2 = {
	_id: "WSXWGYQUHVHCHN556DSSNHHZQA",
	type: "collection",
	canonical_website: "arc-commerce",
	content_elements: [
		{
			_id: "QYAHXVDGZRBIVGHXDN6YEBUQIM",
			type: "story",
			version: "0.10.7",
			headlines: {},
			description: {},
			promo_items: {
				basic: {
					_id: "H3DHE37DORE7FH34X7V24ORNWI",
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "ETUI72TJM5BVHCVWRJJEX45WCU",
			type: "story",
			version: "0.10.7",
			headlines: {},
			description: {},
			promo_items: {
				basic: {
					_id: "Y4RECTW6GBEDXFK6LHBYMQ2HUY",
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "YVL7ZRMJWFAJBPQ4UJR2G3CGOA",
			type: "story",
			version: "0.10.7",
			headlines: {},
			description: {},
			promo_items: {
				basic: {
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "UQMQJXJEVRAUHANSPDUZU3HQSI",
			type: "story",
			version: "0.10.7",
			headlines: {},
			description: {},
			promo_items: {
				basic: {
					_id: "QCSVIRNLGBCT7LWXIMVOHBANHA",
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "ETUI72TJM5BVHCVWRJJEX45ACU",
			type: "story",
			version: "0.10.7",
			headlines: {},
			description: {},
			promo_items: {
				basic: {
					_id: "Y4RECTW6GBEDXFK6LHBYMQ2HUY",
					type: "image",
					url: testImageURL,
				},
			},
		},
		{
			_id: "UQMQJXJEVRAUHANSPDUZU3HQPK",
			type: "story",
			version: "0.10.7",
			headlines: {},
			description: {},
			promo_items: {
				basic: {
					_id: "QCSVIRNLGBCT7LWXIMVOHBANHA",
					type: "image",
					url: testImageURL,
				},
			},
		},
	],
	website: "arc-commerce",
};

const mockPhrases = {
	"global.story-carousel.aria-label": "Stories",
	"global.story-carousel.right-arrow-label": "Next",
	"global.story-carousel.left-arrow-label": "Previous",
	"global.story-carousel.slide-indicator": "Slide %{current} of %{maximum}",
};

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => mockPhrases[phrase]) })),
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
		resizerURL: "https://fake.cdn.com/resizer",
	}))
);

jest.mock("fusion:context", () => ({
	useComponentContext: jest.fn(() => []),
	useAppContext: jest.fn(() => ({
		globalContent: {
			...mockCollectionContent,
		},
	})),
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
	})),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => []),
}));

const mockContextGlobalContent = {
	copyright: "&copy;2021 - Big Media",
	location: "Thatoneplace, ST",
	id: "globalContent_id",
};

describe("Story Carousel", () => {
	it("should render", () => {
		const mockCustomFields = {
			inheritGlobalContent: true,
			carouselContentConfig: {},
		};

		const mockGlobalContent = {
			...mockCollectionContent,
			...mockContextGlobalContent,
		};

		const { container } = render(
			<StoryCarousel globalContent={mockGlobalContent} customFields={mockCustomFields} />
		);

		expect(container.querySelectorAll(".b-story-carousel")).toHaveLength(1);
		expect(container.querySelectorAll(".c-carousel__slide")).toHaveLength(6);
	});

	it("should not render card headlines or paragraphs when they are not in the content", () => {
		const mockCustomFields = {
			inheritGlobalContent: true,
			carouselContentConfig: {},
		};

		const mockGlobalContent = {
			...mockCollectionContent2,
			...mockContextGlobalContent,
		};

		const { container } = render(
			<StoryCarousel globalContent={mockGlobalContent} customFields={mockCustomFields} />
		);

		expect(container.querySelectorAll(".b-story-carousel__story-card-header")).toHaveLength(0);
		expect(container.querySelectorAll(".b-story-carousel__story-card .c-paragraph")).toHaveLength(
			0
		);
	});

	it("should render the optional header", () => {
		const mockCustomFields = {
			inheritGlobalContent: true,
			carouselContentConfig: {},
			headerText: "This is a header",
		};

		const mockGlobalContent = {
			...mockCollectionContent,
			...mockContextGlobalContent,
		};

		const { container } = render(
			<StoryCarousel globalContent={mockGlobalContent} customFields={mockCustomFields} />
		);

		expect(container.querySelectorAll(".b-story-carousel__main-title")).toHaveLength(1);
	});

	it("should render the optional header truncation", () => {
		const mockCustomFields = {
			inheritGlobalContent: true,
			carouselContentConfig: {},
			headerText: "This is a header",
			itemHeaderTruncationLines: 2,
		};

		const mockGlobalContent = {
			...mockCollectionContent,
			...mockContextGlobalContent,
		};

		const { container } = render(
			<StoryCarousel globalContent={mockGlobalContent} customFields={mockCustomFields} />
		);

		const firstHeader = container.querySelector(".b-story-carousel__story-card-header");
		expect(firstHeader.getAttribute("data-testid")).toBe("2");
	});

	it("should render the optional description truncation", () => {
		const mockCustomFields = {
			inheritGlobalContent: true,
			carouselContentConfig: {},
			headerText: "This is a header",
			itemDescriptionTruncationLines: 3,
		};

		const mockGlobalContent = {
			...mockCollectionContent,
			...mockContextGlobalContent,
		};

		const { container } = render(
			<StoryCarousel globalContent={mockGlobalContent} customFields={mockCustomFields} />
		);

		const firstHeader = container.querySelector(".b-story-carousel__story-card .c-paragraph");
		expect(firstHeader.getAttribute("data-testid")).toBe("3");
	});

	it("should not render in testing when inheritGlobalContent is set to false", () => {
		const mockCustomFields = {
			inheritGlobalContent: false,
			carouselContentConfig: {},
		};

		const mockGlobalContent = {
			...mockCollectionContent,
			...mockContextGlobalContent,
		};

		const { container } = render(
			<StoryCarousel globalContent={mockGlobalContent} customFields={mockCustomFields} />
		);

		expect(container.querySelectorAll(".b-story-carousel")).toHaveLength(0);
	});

	it("should not render in testing when inheritGlobalContent is not set at all", () => {
		const mockCustomFields = {
			carouselContentConfig: {},
		};

		const mockGlobalContent = {
			...mockCollectionContent,
			...mockContextGlobalContent,
		};

		const { container } = render(
			<StoryCarousel globalContent={mockGlobalContent} customFields={mockCustomFields} />
		);

		expect(container.querySelectorAll(".b-story-carousel")).toHaveLength(0);
	});
});
