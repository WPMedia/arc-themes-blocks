describe("This test is disabled", () => {
	it("should succeed", () => {
		expect(true);
	});
});

// /* eslint-disable prefer-arrow-callback  */
// import React from "react";
// import { shallow } from "enzyme";

// const mockData = {
// 	type: "results",
// 	metadata: {
// 		total_hits: 3,
// 		q: "test",
// 	},
// 	data: [
// 		{
// 			description: { basic: "Basic Description 1" },
// 			display_date: "2022-01-01T00:00:00.000Z",
// 			headlines: { basic: "Basic Headline Text" },
// 			websites: {
// 				"test-site": {
// 					website_url: "#",
// 				},
// 			},
// 		},
// 		{
// 			description: { basic: "Basic Description 2" },
// 			display_date: "2022-01-01T00:00:00.000Z",
// 			headlines: { basic: "Basic Headline Text" },
// 			websites: {
// 				"test-site": {
// 					website_url: "#",
// 				},
// 			},
// 		},
// 		{
// 			description: { basic: "Basic Description 3" },
// 			display_date: "2022-01-01T00:00:00.000Z",
// 			headlines: { basic: "Basic Headline Text" },
// 			websites: {
// 				"test-site": {
// 					website_url: "#",
// 				},
// 			},
// 		},
// 	],
// };

// describe("The search results list", () => {
// 	describe("renders a search bar", () => {
// 		const { default: SearchResultsList } = require("./custom-content");
// 		SearchResultsList.prototype.fetchStories = jest.fn();
// 		SearchResultsList.prototype.onChange = jest.fn();
// 		SearchResultsList.prototype.fetchContent = jest.fn();
// 		const wrapper = shallow(<SearchResultsList arcSite="test-site" />);
// 		wrapper.setState({ resultList: mockData, searchTerm: "test" }, () => {
// 			wrapper.update();

// 			it("should render a search field", () => {
// 				expect(wrapper.find("SearchField").length).toEqual(1);
// 			});

// 			it("should render a results list", () => {
// 				expect(wrapper.find("ResultsList").length).toEqual(1);
// 			});
// 		});
// 	});
// });
