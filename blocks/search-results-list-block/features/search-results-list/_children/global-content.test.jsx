import React from "react";
import { shallow } from "enzyme";
import mockData, { oneListItem } from "../mock-data";

jest.mock("fusion:themes", () => ({
	__esModule: true,
	default: jest.fn(() => ({
		"primary-font-family": "Open Sans",
		"primary-color": "#10c8cd",
	})),
}));
jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
		locale: "en",
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
		const { default: SearchResultsList } = require("./global-content");
		SearchResultsList.prototype.fetchContent = jest.fn();
		const wrapper = shallow(
			<SearchResultsList
				globalContent={oneListItem}
				arcSite="the-sun"
				deployment={jest.fn((path) => path)}
			/>
		);

		it("should render a text input", () => {
			expect(wrapper.find(".search-bar").length).toEqual(1);
			expect(wrapper.find(".search-bar").prop("placeholder")).toEqual("Enter your search terms");
		});

		it("should show the total number of hits", () => {
			expect(wrapper.find(".search-results-text").text()).toEqual(
				'%{smart_count} result for "%{searchTerm}" |||| %{smart_count} results for "%{searchTerm}"'
			);
		});

		describe("renders a search button", () => {
			it("should render a search button to search for results", () => {
				expect(wrapper.find(".btn").at(0).length).toEqual(1);
			});
		});

		describe("when a new search is made", () => {
			global.window = Object.create(window);
			Object.defineProperty(window, "location", {
				value: {
					href: "",
				},
			});
			it("should go to a new page if a search value is provided", () => {
				wrapper.setState({ value: "article" }, () => {
					wrapper.update();
					expect(wrapper.state("value")).toEqual("article");
					wrapper.find(".btn").at(0).simulate("click");
					expect(window.location.href).toEqual("/search/article");
				});
			});
			it("should not go to a new page if no search value is provided", () => {
				window.location.href = "";
				wrapper.setState({ value: "" }, () => {
					wrapper.update();
					expect(wrapper.state("value")).toEqual("");
					wrapper.find(".btn").at(0).simulate("click");
					expect(window.location.href).toEqual("");
				});
			});
		});
	});

	it("should render a list of stories", () => {
		const { default: SearchResultsList } = require("./global-content");
		SearchResultsList.prototype.fetchContent = jest.fn();
		const wrapper = shallow(
			<SearchResultsList
				globalContent={mockData}
				arcSite="the-sun"
				deployment={jest.fn((path) => path)}
			/>
		);
		expect(wrapper.find(".results-list-container").length).toEqual(1);
		expect(wrapper.find("SearchResult").length).toEqual(28);
	});

	describe("renders a button to display more stories", () => {
		it("should render a button to display more stories", () => {
			const { default: SearchResultsList } = require("./global-content");
			SearchResultsList.prototype.fetchContent = jest.fn();
			const wrapper = shallow(
				<SearchResultsList
					globalContent={oneListItem}
					arcSite="the-sun"
					deployment={jest.fn((path) => path)}
				/>
			);
			expect(wrapper.find(".see-more").childAt(0).length).toEqual(1);
		});
	});
	it("should register search input change", () => {
		const { default: SearchResultsList } = require("./global-content");
		SearchResultsList.prototype.fetchContent = jest.fn();
		const wrapper = shallow(
			<SearchResultsList
				globalContent={oneListItem}
				arcSite="the-sun"
				deployment={jest.fn((path) => path)}
			/>
		);

		wrapper.find(".search-bar").simulate("change", { target: { value: "test" } });
		expect(wrapper.state().value).toEqual("test");
	});
	it("click see more button", () => {
		const { default: SearchResultsList } = require("./global-content");
		SearchResultsList.prototype.fetchContent = jest.fn();
		const wrapper = shallow(
			<SearchResultsList
				globalContent={oneListItem}
				arcSite="the-sun"
				deployment={jest.fn((path) => path)}
			/>
		);
		wrapper.find(".see-more > Button").simulate("click");
		expect(wrapper.state().page).toEqual(2);
	});
});
