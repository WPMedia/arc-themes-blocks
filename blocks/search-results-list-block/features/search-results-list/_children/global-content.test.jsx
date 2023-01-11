/* eslint-disable prefer-arrow-callback  */
import React from "react";
import { shallow } from "enzyme";

const mockData = {
	type: "results",
	metadata: {
		total_hits: 3,
		q: "test",
	},
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
};

describe("The search results list - global content", () => {
	describe("renders a search bar", () => {
		const { default: SearchResultsList } = require("./global-content");
		const wrapper = shallow(<SearchResultsList arcSite="test-site" />);
		wrapper.setState({ resultList: mockData }, () => {
			wrapper.update();

			it("should render a search field", () => {
				expect(wrapper.find("SearchField").length).toEqual(1);
			});

			it("should render a results list", () => {
				expect(wrapper.find("ResultsList").length).toEqual(1);
			});
		});
	});

	describe("renders a search bar with the query text properly decoded", () => {
		const { default: SearchResultsList } = require("./global-content");
		const wrapper = shallow(
			<SearchResultsList arcSite="test-site" globalContent={{ metadata: { q: "test%20value" } }} />
		);
		it("should render a search field", () => {
			expect(wrapper.find("SearchField").length).toEqual(1);
			expect(wrapper.find("SearchField").prop("defaultValue")).toEqual("test value");
		});
	});
});
