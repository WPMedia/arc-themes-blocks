// eslint-disable-next-line max-classes-per-file
import React from "react";
import { shallow } from "enzyme";

jest.mock("./_children/global-content", () => class GlobalContentSearchResultsList {});
jest.mock("./_children/custom-content", () => class CustomContentSearchResultsList {});

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({})),
}));
jest.mock("@wpmedia/engine-theme-sdk", () => ({
	...jest.requireActual("@wpmedia/engine-theme-sdk"),
	LazyLoad: ({ children }) => <>{children}</>,
}));
jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	HeadingSection: ({ children }) => <>{children}</>,
	isServerSide: () => true,
}));

const defaultPromos = {
	showByline: true,
	showDate: true,
	showDescription: true,
	showHeadline: true,
	showImage: true,
	imageRatio: "16:9",
};

const globalContent = {
	data: [
		{
			description: { basic: "Basic Description 1" },
			display_date: "2022-01-01T00:00:00.000Z",
			headlines: { basic: "Basic Headline Text" },
			websites: {
				"test-site": {
					website_url: "#",
				},
			},
		},
		{
			description: { basic: "Basic Description 2" },
			display_date: "2022-01-01T00:00:00.000Z",
			headlines: { basic: "Basic Headline Text" },
			websites: {
				"test-site": {
					website_url: "#",
				},
			},
		},
		{
			description: { basic: "Basic Description 3" },
			display_date: "2022-01-01T00:00:00.000Z",
			headlines: { basic: "Basic Headline Text" },
			websites: {
				"test-site": {
					website_url: "#",
				},
			},
		},
	],
	metadata: { total_hits: 3, q: "Enter search items" },
};

describe("the search results list feature block", () => {
	describe("when it is configured to inherit global content", () => {
		it("should render the global content search results list", () => {
			const { default: SearchResultsListContainer } = require("./default");
			const wrapper = shallow(
				<SearchResultsListContainer customFields={{ inheritGlobalContent: true, globalContent }} />
			);
			expect(wrapper.find("GlobalContentSearchResultsList")).toBeTruthy();
		});
	});

	describe("when it is configured to NOT inherit global content", () => {
		const { default: SearchResultsListContainer } = require("./default");

		const wrapper = shallow(
			<SearchResultsListContainer
				customFields={{ inheritGlobalContent: false, sectionContentConfig: {} }}
			/>
		);

		it("should render the global content search results list", () => {
			expect(wrapper.find("CustomContentSearchResultsList")).toBeTruthy();
		});

		it("should render all promo items", () => {
			expect(wrapper.find("CustomContentSearchResultsList").prop("promoElements")).toEqual(
				defaultPromos
			);
		});
	});

	describe("when customFields is empty", () => {
		const { default: SearchResultsListContainer } = require("./default");
		const wrapper = shallow(<SearchResultsListContainer customFields={{}} />);

		it("should render the global content search results list", () => {
			expect(wrapper.find("GlobalContentSearchResultsList")).toBeTruthy();
		});

		it("should render all promo items", () => {
			expect(wrapper.find("GlobalContentSearchResultsList").prop("promoElements")).toEqual(
				defaultPromos
			);
		});
	});

	describe("when customFields is missing", () => {
		const { default: SearchResultsListContainer } = require("./default");
		const wrapper = shallow(<SearchResultsListContainer customFields={undefined} />);

		it("should render the global content search results list", () => {
			expect(wrapper.find("GlobalContentSearchResultsList")).toBeTruthy();
		});

		it("should render all promo items", () => {
			expect(wrapper.find("GlobalContentSearchResultsList").prop("promoElements")).toEqual(
				defaultPromos
			);
		});
	});

	describe("when lazyLoad is true", () => {
		const { default: SearchResultsListContainer } = require("./default");
		const wrapper = shallow(<SearchResultsListContainer customFields={{ lazyLoad: true }} />);

		it("should not render the global content search results list", () => {
			expect(wrapper.html()).toBe(null);
		});
	});
});
