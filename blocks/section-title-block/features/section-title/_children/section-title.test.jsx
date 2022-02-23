/* eslint-disable no-irregular-whitespace */
import React from "react";
import { mount } from "enzyme";
import SectionTitle from "./section-title";
import { mockOneSection, mockTwoSection, mockNoChildren, mockTwoSectionWithUrl } from "./mock-data";

jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => mockTwoSection),
	useAppContext: jest.fn(() => mockTwoSection),
}));

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	formatURL: jest.fn((input) => input.toString()),
}));

describe("the section title block", () => {
	describe("when content from globalContent is present", () => {
		it("should render a title", () => {
			const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

			expect(wrapper.find("h1")).toHaveClassName("section-title");
		});

		it("should set a styled component class on the rendered h1", () => {
			const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

			expect(wrapper.find("h1").hasClass(/sc-/)).toBe(true);
		});

		it("should render sub-section links", () => {
			const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

			expect(wrapper.find(".section-container").length).toEqual(1);
			expect(wrapper.find("a").length).toEqual(2);
		});

		describe("the sub-section links", () => {
			it("should render the correct section name", () => {
				const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

				expect(wrapper.find(".section-container").childAt(0).text()).toEqual("News    •    ");
			});

			it("should have the correct href", () => {
				const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

				// nesting within a span to find the a tag
				expect(wrapper.find(".section-container").childAt(0).find("a").prop("href")).toEqual(
					"/news"
				);
			});

			it("should have a last element without a separator", () => {
				const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

				expect(wrapper.find(".section-container").childAt(1).text()).toEqual("Sports");
			});

			it("should set a styled component class on the rendered a", () => {
				const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

				expect(wrapper.find("a").at(1).hasClass(/sc-/)).toBe(true);
			});

			describe("when there is only one sub-section", () => {
				it("should not have a separator", () => {
					const wrapper = mount(<SectionTitle content={mockOneSection.globalContent} />);

					expect(wrapper.find(".section-container").childAt(0).text()).toEqual("News");
				});
			});

			describe("when there are no children in content", () => {
				it("should not render any children", () => {
					const wrapper = mount(<SectionTitle content={mockNoChildren.globalContent} />);

					expect(wrapper.find("a").length).toEqual(0);
				});
			});

			it("should render sub-section links with url", () => {
				const wrapper = mount(<SectionTitle content={mockTwoSectionWithUrl.globalContent} />);

				expect(wrapper.find(".section-container").length).toEqual(1);
				expect(wrapper.find("a").length).toEqual(2);
				expect(wrapper.find("a").at(0).props().href).toBe("/news");
				expect(wrapper.find("a").at(1).props().href).toBe("www.google.com");

				expect(wrapper.find("a").at(0)).toIncludeText("News");
				expect(wrapper.find("a").at(1)).toIncludeText("Sports");
			});
		});
	});

	describe("when content from globalContent is NOT present", () => {
		it("should not render anything", () => {
			const wrapper = mount(<SectionTitle />);

			expect(wrapper).toBeEmptyRender();
		});
	});
});
