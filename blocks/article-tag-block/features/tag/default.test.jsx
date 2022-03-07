import React from "react";
import { mount } from "enzyme";

describe("the article tag block", () => {
	jest.mock("fusion:themes", () => jest.fn(() => ({})));
	jest.mock("fusion:properties", () => jest.fn(() => ({})));
	jest.mock("@wpmedia/shared-styles", () => ({
		__esModule: true,
		PrimaryFont: (props) => <div {...props} />,
	}));

	jest.mock("@wpmedia/engine-theme-sdk", () => ({
		LazyLoad: ({ children }) => <>{children}</>,
		isServerSide: () => true,
	}));

	describe("when the global content has an array of tags in its taxonomy", () => {
		const mockReturnData = {
			arcSite: "the-sun",
			globalContent: {
				taxonomy: {
					tags: [
						{
							description: "dogs",
							slug: "dogs slug",
							text: "dogs text",
						},
						{
							description: "cats",
							slug: "cats slug",
							text: "cats text",
						},
					],
				},
			},
		};

		const mockFunction = jest.fn().mockReturnValue(mockReturnData);

		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			jest.mock("fusion:context", () => ({
				useFusionContext: mockFunction,
			}));
		});

		it("should return null if lazyLoad on the server and not in the admin", () => {
			const { default: ArticleTags } = require("./default");
			const config = {
				lazyLoad: true,
			};
			const wrapper = mount(<ArticleTags customFields={config} />);
			expect(wrapper.html()).toBe(null);
		});

		it("should render a parent container for the tags", () => {
			const { default: ArticleTags } = require("./default");
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.children().find("div.tags-holder").length).toEqual(1);
		});

		it("should render a tag element for each tag in the array", () => {
			const { default: ArticleTags } = require("./default");
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.children().find("a").length).toEqual(2);
		});

		it("should render tags with their correct href", () => {
			const { default: ArticleTags } = require("./default");
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.children().find("a").at(0).props().href).toBe("/tags/dogs%20slug/");
			expect(wrapper.children().find("a").at(1).props().href).toBe("/tags/cats%20slug/");
		});
	});

	describe("when the global content has a property called taxonomy which contains tags array with out slugs", () => {
		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			jest.mock("fusion:context", () => ({
				useFusionContext: jest.fn(() => ({
					arcSite: "the-sun",
					globalContent: {
						taxonomy: {
							tags: [
								{
									description: "dogs",
									text: "dogs text",
								},
								{
									description: "cats",
									text: "cats text",
								},
							],
						},
					},
				})),
			}));
		});

		it("should render tags with correct href", () => {
			const { default: ArticleTags } = require("./default");
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.children().find("a").at(0).props().href).toBe("#");
			expect(wrapper.children().find("a").at(1).props().href).toBe("#");
		});
	});

	describe("when the global content has an empty tags array", () => {
		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			jest.mock("fusion:context", () => ({
				useFusionContext: jest.fn(() => ({
					arcSite: "the-sun",
					globalContent: {
						taxonomy: {
							tags: [],
						},
					},
				})),
			}));
		});

		it("should not render anything", () => {
			const { default: ArticleTags } = require("./default");
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.children().find(".tags-holder").length).toEqual(0);
		});
	});

	describe("when the global content does not have a taxonomy property", () => {
		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			jest.mock("fusion:context", () => ({
				useFusionContext: jest.fn(() => ({
					arcSite: "the-sun",
					globalContent: {},
				})),
			}));
		});

		it("should not render anything", () => {
			const { default: ArticleTags } = require("./default");
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.children().find(".tags-holder").length).toEqual(0);
		});
	});
});
