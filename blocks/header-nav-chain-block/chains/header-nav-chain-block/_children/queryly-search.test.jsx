import React from "react";
import { mount } from "enzyme";
import getProperties from "fusion:properties";
import QuerylySearch from "./queryly-search";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
		navBarBackground: "",
		navColor: "dark",
	}))
);
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));
jest.mock("fusion:intl", () =>
	jest.fn(() => ({
		t: jest.fn(() => "test-translation"),
	}))
);

describe("<QuerylySearch/>", () => {
	it("renders", () => {
		const wrapper = mount(<QuerylySearch />);
		expect(wrapper.find("button").length).toBe(1);
	});

	it("affects the querly toggle on click", () => {
		const MockQuerlyToggle = () => (
			<input type="checkbox" id="queryly_toggle" checked={false} onChange={() => {}} />
		);

		// via https://stackoverflow.com/a/43734834/7491536
		// in order to use document.body queries, have to attach to body
		// not ideal using getElementById within a react component
		const wrapper = mount(
			<>
				<MockQuerlyToggle />
				<QuerylySearch />
			</>,
			{ attachTo: document.body }
		);
		const inputMock = wrapper.find("input#queryly_toggle");
		expect(inputMock.props().checked).toBe(false);
		const button = wrapper.find("button");

		button.simulate("click");
		expect(inputMock.props().checked).toBe(false);
	});
});
