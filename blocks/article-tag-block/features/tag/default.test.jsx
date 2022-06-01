import React from "react";
import { mount } from "enzyme";
import { useFusionContext } from "fusion:context";
import ArticleTags from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn().mockReturnValue(true),
}));

describe("the article tag block", () => {
	jest.mock("@wpmedia/engine-theme-sdk", () => ({
		LazyLoad: ({ children }) => <>{children}f</>,
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

		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			useFusionContext.mockReturnValue(mockReturnData);
		});

		it("should return null if lazyLoad on the server and not in the admin", () => {
			const config = {
				lazyLoad: true,
			};
			const wrapper = mount(<ArticleTags customFields={config} />);
			expect(wrapper.isEmptyRender()).toBe(true);
		});

		it("should render a parent container for the tags", () => {
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.find("div.b-article-tag").length).toEqual(1);
		});

		it("should render a pill for each tag in the array", () => {
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.children().find(".c-pill").length).toEqual(2);
		});

		it("should render tags with their correct href", () => {
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.children().find(".c-pill").at(0).props().href).toBe("/tags/dogs%20slug/");
			expect(wrapper.children().find(".c-pill").at(1).props().href).toBe("/tags/cats%20slug/");
		});
	});

	describe("when the global content has a property called taxonomy which contains tags array with out slugs", () => {
		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			useFusionContext.mockReturnValue({
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
			});
		});

		it("should render pill components", () => {
			const wrapper = mount(<ArticleTags />);
			const tags = wrapper.find(".c-pill");
			expect(tags.length).toBe(2);
		});
	});

	describe("when the global content has an empty tags array", () => {
		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			useFusionContext.mockReturnValue({
				arcSite: "the-sun",
				globalContent: {
					taxonomy: {
						tags: [],
					},
				},
			});
		});

		it("should not render anything", () => {
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.isEmptyRender()).toBe(true);
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
			const wrapper = mount(<ArticleTags />);
			expect(wrapper.isEmptyRender()).toBe(true);
		});
	});
});
