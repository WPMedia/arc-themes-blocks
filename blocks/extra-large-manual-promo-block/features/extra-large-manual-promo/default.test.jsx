import React from "react";
import { mount } from "enzyme";
import ExtraLargeManualPromo from "./default";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	LazyLoad: ({ children }) => <>{children}</>,
	isServerSide: () => true,
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
	useEditableContent: jest.fn(() => ({
		searchableField: () => {},
	})),
}));

describe("the extra large promo feature", () => {
	afterEach(() => {
		jest.resetModules();
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		const config = {
			lazyLoad: true,
		};
		const wrapper = mount(<ExtraLargeManualPromo customFields={config} />);
		expect(wrapper.html()).toBe(null);
	});

	it("should have 1 container fluid class", () => {
		const wrapper = mount(<ExtraLargeManualPromo customFields={{}} />);
		expect(wrapper.find(".container-fluid")).toHaveLength(1);
	});
});
