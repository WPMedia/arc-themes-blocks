import React from "react";
import { mount } from "enzyme";
import Heading from "./heading";
import HeadingSection from "./section";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		globalContent: {},
		arcSite: "the-sun",
	})),
}));

jest.mock("fusion:themes", () => jest.fn(() => ({})));

describe("Heading", () => {
	it("should render as a h1", () => {
		const wrapper = mount(<Heading />);

		expect(wrapper.html()).toMatchInlineSnapshot(`"<h1 class=\\"sc-bdVaJa dwBSY\\"></h1>"`);
	});
});

describe("HeadingSection", () => {
	it("should render as a h2", () => {
		const wrapper = mount(
			<HeadingSection>
				<Heading />
			</HeadingSection>
		);

		expect(wrapper.html()).toMatchInlineSnapshot(`"<h2 class=\\"sc-bdVaJa dwBSY\\"></h2>"`);
	});
	it("increases the heading level for each HeadingSection", () => {
		const wrapper = mount(
			<div>
				<Heading>h1 text</Heading>
				<HeadingSection>
					<Heading>h2 text</Heading>
				</HeadingSection>
			</div>
		);

		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<div><h1 class=\\"sc-bdVaJa dwBSY\\">h1 text</h1><h2 class=\\"sc-bdVaJa dwBSY\\">h2 text</h2></div>"`
		);
	});
});
