import React from "react";
import { shallow, mount } from "enzyme";
import { useFusionContext } from "fusion:context";
import Header from "./default";

const mockContextObj = {
	arcSite: "site",
};

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => mockContextObj),
}));

describe("The header block", () => {
	describe("when a text prop is provided", () => {
		it("should render a text element", () => {
			const customFields = {
				text: "Header",
				size: "Extra Large",
			};

			const wrapper = mount(<Header customFields={customFields} />);
			expect(wrapper.length).toEqual(1);
			expect(wrapper.text()).toEqual("Header");
		});

		it("should have the appropriate class", () => {
			const customFields = {
				text: "Header",
				size: "Extra Large",
			};
			const wrapper = shallow(<Header customFields={customFields} />);
			expect(wrapper).toHaveProp("className", "b-header b-header--extra-large");
		});
	});

	describe("when an Extra Large size prop is provided", () => {
		const customFields = {
			text: "Extra Large Header",
			size: "Extra Large",
		};
		const mockStory = {
			arcSite: "site",
		};
		useFusionContext.mockImplementation(() => mockStory);
		const wrapper = mount(<Header customFields={customFields} />);
		it("should render a header with Extra Large text", () => {
			expect(wrapper.length).toEqual(1);
			expect(wrapper.props().customFields.size).toEqual("Extra Large");
			expect(wrapper.text()).toEqual("Extra Large Header");
			expect(wrapper.find("h1").length).toEqual(1);
			const extraLargeHeader = wrapper.find(".b-header--extra-large");
			expect(extraLargeHeader).toExist();
		});
	});

	describe("when a Large size prop is provided", () => {
		const customFields = {
			text: "Large Header",
			size: "Large",
		};
		const wrapper = mount(<Header customFields={customFields} />);
		it("should render a header with Large text", () => {
			expect(wrapper.length).toEqual(1);
			expect(wrapper.props().customFields.size).toEqual("Large");
			expect(wrapper.text()).toEqual("Large Header");
			expect(wrapper.find("h1").length).toEqual(1);
			const largeHeader = wrapper.find(".b-header--large");
			expect(largeHeader).toExist();
		});
	});

	describe("when a Medium size prop is provided", () => {
		it("should render a header with Medium text", () => {
			const customFields = {
				text: "Medium Header",
				size: "Medium",
			};
			const wrapper = mount(<Header customFields={customFields} />);
			expect(wrapper.length).toEqual(1);
			expect(wrapper.props().customFields.size).toEqual("Medium");
			expect(wrapper.text()).toEqual("Medium Header");
			expect(wrapper.find("h1").length).toEqual(1);
			const mediumHeader = wrapper.find(".b-header--medium");
			expect(mediumHeader).toExist();
		});
	});

	describe("when a Small size prop is provided", () => {
		it("should render a header with Small text", () => {
			const customFields = {
				text: "Small Header",
				size: "Small",
			};
			const wrapper = mount(<Header customFields={customFields} />);
			expect(wrapper.length).toEqual(1);
			expect(wrapper.props().customFields.size).toEqual("Small");
			expect(wrapper.text()).toEqual("Small Header");
			expect(wrapper.find("h1").length).toEqual(1);

			const smallHeader = wrapper.find(".b-header--small");
			expect(smallHeader).toExist();
		});
	});

	describe("when no size prop is provided", () => {
		it("should render a header with Medium text", () => {
			const customFields = {
				text: "Header",
				size: "",
			};
			const wrapper = mount(<Header customFields={customFields} />);
			expect(wrapper.length).toEqual(1);
			expect(wrapper.props().customFields.size).toEqual("");
			expect(wrapper.text()).toEqual("Header");
			expect(wrapper.find("h1").length).toEqual(1);

			const mediumHeader = wrapper.find(".b-header--medium");
			expect(mediumHeader).toExist();
		});
	});

	describe("when no text prop is provided", () => {
		it("should render an empty header with no text", () => {
			const customFields = {
				text: "",
				size: "",
			};
			const wrapper = mount(<Header customFields={customFields} />);
			expect(wrapper.length).toEqual(1);
			expect(wrapper.props().customFields.size).toEqual("");
			expect(wrapper.props().customFields.text).toEqual("");
			expect(wrapper.text()).toEqual("");
			expect(wrapper.find("h1").length).toEqual(1);

			const mediumHeader = wrapper.find(".b-header--medium");
			expect(mediumHeader).toExist();
		});
	});
});

it("if no custom fields provided, should fallback to an empty object and render defaults", () => {
	const wrapper = mount(<Header />);
	expect(wrapper.text()).toEqual("");
	expect(wrapper.find("h1").length).toEqual(1);
	const mediumHeader = wrapper.find(".b-header--medium");
	expect(mediumHeader).toExist();
});
