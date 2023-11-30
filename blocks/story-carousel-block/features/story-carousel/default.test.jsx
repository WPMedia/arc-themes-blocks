import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockConsole from "jest-mock-console";

import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";

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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
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
			websites: {
				"arc-commerce": {
					website_url:
						"/2022/04/15/blazing-your-trail-why-the-best-sport-jacket-strategy-is-variety/",
				},
			},
		},
	],
	website: "arc-commerce",
};

const mockCollectionContent3 = {
	_id: "WSXWGYQUHVHCHN556DSSNHHZQA",
	type: "collection",
	canonical_website: "arc-commerce",
	content_elements: [
		{
			_id: "ETUI72TJM5BVHCVWRJJEX45WCU",
			type: "story",
			version: "0.10.7",
			headlines: {
				basic: "test headline",
			},
			description: {
				basic: "test description",
			},
			promo_items: {
				basic: {
					_id: "Y4RECTW6GBEDXFK6LHBYMQ2HUY",
					type: "image",
					url: testImageURL,
				},
			},
			websites: {},
		},
	],
	website: "arc-commerce",
};

const mockCollectionContent4 = {
	_id: "WSXWGYQUHVHCHN556DSSNHHZQA",
	type: "collection",
	canonical_website: "arc-commerce",
	content_elements: [],
	website: "arc-commerce",
};

jest.mock("fusion:properties", () => jest.fn(() => ({})));

jest.mock("fusion:context", () => ({
	useComponentContext: jest.fn(() => []),
	useAppContext: jest.fn(() => ({})),
	useFusionContext: jest.fn(() => ({
		arcSite: "arc-commerce",
	})),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => {}),
	useFusionContext: jest.fn(() => {}),
}));

describe("Story Carousel", () => {
	let restoreConsole;
	afterAll(() => {
		restoreConsole?.();
	});
	beforeAll(() => {
		restoreConsole = mockConsole();
	});

	it("should render", () => {
		useContent.mockReturnValue(mockCollectionContent2);

		const mockCustomFields = {
			carouselContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "some query",
				},
			},
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		expect(container.querySelectorAll(".b-story-carousel")).toHaveLength(1);
		expect(container.querySelectorAll(".c-carousel__slide")).toHaveLength(6);
	});

	it("should not render when content_elements is empty", () => {
		useContent.mockReturnValue(mockCollectionContent4);

		const mockCustomFields = {
			carouselContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "some query",
				},
			},
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		expect(container.querySelectorAll(".b-story-carousel")).toHaveLength(0);
		expect(container.querySelectorAll(".c-carousel__slide")).toHaveLength(0);
	});

	it("should not render when carouselContentConfig is not configured", () => {
		useContent.mockReturnValue({});

		const mockCustomFields = {
			carouselContentConfig: {},
			headerText: "This is a header",
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		expect(container.querySelectorAll(".b-story-carousel")).toHaveLength(0);
		expect(container.querySelectorAll(".c-carousel__slide")).toHaveLength(0);
	});

	it("should not render when carouselContentConfig is missing", () => {
		useContent.mockReturnValue({});

		const mockCustomFields = {
			headerText: "This is a header",
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		expect(container.querySelectorAll(".b-story-carousel")).toHaveLength(0);
		expect(container.querySelectorAll(".c-carousel__slide")).toHaveLength(0);
	});

	it("should not render card headlines or paragraphs when they are not in the content", () => {
		useContent.mockReturnValue(mockCollectionContent2);

		const mockCustomFields = {
			carouselContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "some query",
				},
			},
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		expect(container.querySelectorAll(".b-story-carousel__story-card-header")).toHaveLength(0);
		expect(container.querySelectorAll(".b-story-carousel__story-card .c-paragraph")).toHaveLength(
			0,
		);
	});

	it("should render card headlines or paragraphs when they are in the content", () => {
		useContent.mockReturnValue(mockCollectionContent);

		const mockCustomFields = {
			carouselContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "some query",
				},
			},
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		expect(container.querySelectorAll(".b-story-carousel__story-card-header")).toHaveLength(6);
		expect(container.querySelectorAll(".b-story-carousel__story-card .c-paragraph")).toHaveLength(
			6,
		);
	});

	it("should not render the optional header", () => {
		useContent.mockReturnValue(mockCollectionContent2);
		const mockCustomFields = {
			carouselContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "some query",
				},
			},
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		expect(container.querySelectorAll(".b-story-carousel__main-title")).toHaveLength(0);
	});

	it("should render the optional header", () => {
		useContent.mockReturnValue(mockCollectionContent2);
		const mockCustomFields = {
			carouselContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "some query",
				},
			},
			headerText: "This is a header",
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		expect(container.querySelectorAll(".b-story-carousel__main-title")).toHaveLength(1);
	});

	it("should not render card if website information is not present in content", () => {
		useContent.mockReturnValue(mockCollectionContent3);

		const mockCustomFields = {
			carouselContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "some query",
				},
			},
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		expect(container.querySelectorAll(".b-story-carousel__story-card-header")).toHaveLength(0);
		expect(container.querySelectorAll(".b-story-carousel__story-card .c-paragraph")).toHaveLength(
			0,
		);
	});

	it("should display warning when content is under 4 items", () => {
		useContent.mockReturnValue(mockCollectionContent3);
		useFusionContext.mockReturnValueOnce({ isAdmin: true });

		const mockCustomFields = {
			carouselContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "some query",
				},
			},
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);
		expect(container.querySelectorAll("p")).toHaveLength(1);
	});
	it("should display warning when content is under 4 items", () => {
		// when content has fewer than 4 items
		useContent.mockReturnValue(mockCollectionContent3);
		// mocking fusion context once in this test
		useFusionContext.mockReturnValueOnce({ isAdmin: false });

		const mockCustomFields = {
			carouselContentConfig: {
				contentService: "something",
				contentConfigValues: {
					query: "some query",
				},
			},
		};

		const { container } = render(<StoryCarousel customFields={mockCustomFields} />);

		// render nothing
		// the b-story carousel comes from existing tests
		expect(container.querySelectorAll("p")).toHaveLength(0);
		expect(container.querySelectorAll(".b-story-carousel")).toHaveLength(0);
		expect(container.querySelectorAll(".c-carousel__slide")).toHaveLength(0);
	});
});
