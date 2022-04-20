// eslint-disable-next-line max-classes-per-file
import React from "react";
import { shallow } from "enzyme";

// two classes for testing purposes
jest.mock("./_children/global-content", () => class GlobalContentSectionTitle {});
jest.mock("./_children/custom-content", () => class CustomContentSectionTitle {});
jest.mock("@arc-fusion/prop-types", () => ({
	bool: true,
	shape: () => {},
	contentConfig: () => {},
}));

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	formatURL: jest.fn((input) => input.toString()),
}));

describe("the section title feature block", () => {
	describe("when it is configured to inherit global content", () => {
		it("should render the global content section title", () => {
			const { default: SectionTitleContainer } = require("./default");
			const wrapper = shallow(
				<SectionTitleContainer customFields={{ inheritGlobalContent: true }} />
			);
			expect(wrapper.is("GlobalContentSectionTitle")).toBeTruthy();
		});
	});

	describe("when it is configured to NOT inherit global content", () => {
		it("should render the global content section title", () => {
			const { default: SectionTitleContainer } = require("./default");

			const wrapper = shallow(
				<SectionTitleContainer
					customFields={{
						inheritGlobalContent: false,
						sectionContentConfig: {},
					}}
				/>
			);
			expect(wrapper.is("CustomContentSectionTitle")).toBeTruthy();
		});

		it("should pass the content config for fetching the section title", () => {
			const { default: SectionTitleContainer } = require("./default");
			const wrapper = shallow(
				<SectionTitleContainer
					customFields={{
						inheritGlobalContent: false,
						sectionContentConfig: {},
					}}
				/>
			);
			expect(wrapper.props()).toStrictEqual({ contentConfig: {} });
		});
	});

	describe("when customFields is empty", () => {
		it("should render the global content section title", () => {
			const { default: SectionTitleContainer } = require("./default");
			const wrapper = shallow(<SectionTitleContainer customFields={{}} />);
			expect(wrapper.is("GlobalContentSectionTitle")).toBeTruthy();
		});
	});

	describe("when customFields is missing", () => {
		it("should render the global content section title", () => {
			const { default: SectionTitleContainer } = require("./default");
			const wrapper = shallow(<SectionTitleContainer customFields={undefined} />);
			expect(wrapper.is("GlobalContentSectionTitle")).toBeTruthy();
		});
	});
});
