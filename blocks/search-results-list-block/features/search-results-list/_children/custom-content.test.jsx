/* eslint-disable prefer-arrow-callback  */
import React from "react";
import { shallow } from "enzyme";
import getThemeStyle from "fusion:themes";
import mockData from "../mock-data";

const mockReturnData = mockData;

jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
	}))
);

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../../intl.json")[phrase][locale]),
	})),
}));

jest.mock("@wpmedia/date-block", () => ({
	__esModule: true,
	default: function ArticleDate(props, children) {
		return <div {...props}>{children}</div>;
	},
}));

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	__esModule: true,
	Image: () => <div />,
	SearchIcon: () => <div />,
}));

describe("The search results list", () => {
	describe("renders a search bar", () => {
		const { default: SearchResultsList } = require("./custom-content");
		getThemeStyle.mockImplementation(() => ({
			"primary-font-family": "Open Sans",
			"primary-color": "#10c8cd",
		}));
		SearchResultsList.prototype.fetchStories = jest.fn();
		SearchResultsList.prototype.onChange = jest.fn();
		SearchResultsList.prototype.fetchContent = jest.fn();
		const wrapper = shallow(
			<SearchResultsList
				arcSite="the-sun"
				targetFallbackImage=""
				deployment={jest.fn((path) => path)}
			/>
		);
		wrapper.setState({ resultList: mockData, searchTerm: "test" }, () => {
			wrapper.update();
			it("should render a text input", () => {
				expect(wrapper.find(".search-bar").length).toEqual(1);
			});

			it("should show the total number of hits", () => {
				expect(wrapper.find(".search-results-text").text()).toEqual(
					'%{smart_count} result for "%{searchTerm}" |||| %{smart_count} results for "%{searchTerm}"'
				);
			});

			it("should set a search term", () => {
				expect(wrapper.state("searchTerm")).toEqual("test");
			});

			describe("renders a search button", () => {
				it("should render a search button to search for results", () => {
					expect(wrapper.find(".btn").at(0).length).toEqual(1);
				});

				it("should call fetchContent when clicked", () => {
					expect(SearchResultsList.prototype.fetchStories.mock.calls.length).toEqual(1);
					wrapper.find(".btn").at(0).simulate("click");
					expect(SearchResultsList.prototype.fetchStories.mock.calls.length).toEqual(2);
				});
			});
		});
	});

	describe("renders a button to display more stories", () => {
		const { default: SearchResultsList } = require("./custom-content");
		SearchResultsList.prototype.fetchStories = jest.fn().mockReturnValue(mockReturnData);
		SearchResultsList.prototype.fetchContent = jest.fn();

		const wrapper = shallow(
			<SearchResultsList arcSite="the-sun" deployment={jest.fn((path) => path)} />
		);
		wrapper.setState({ resultList: mockData }, () => {
			wrapper.update();
			it("should render a button to display more stories", () => {
				expect(wrapper.find(".see-more").childAt(0).length).toEqual(1);
			});

			it("should have invisible text for accessibility purposes", () => {
				expect(wrapper.find(".see-more").childAt(0).prop("ariaLabel").length).not.toBe(0);
			});

			it("should call fetchContent when clicked", () => {
				expect(SearchResultsList.prototype.fetchStories.mock.calls.length).toEqual(2);
				wrapper.find(".see-more").childAt(0).simulate("click");
				expect(SearchResultsList.prototype.fetchStories.mock.calls.length).toEqual(3);
			});
		});
	});
});
