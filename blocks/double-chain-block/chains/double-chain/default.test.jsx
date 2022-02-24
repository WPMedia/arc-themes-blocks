import React from "react";
import { shallow, mount } from "enzyme";
import DoubleChain from "./default";

describe("the double chain block", () => {
	const Comp1 = () => <div>1</div>;
	const Comp2 = () => <div>2</div>;
	const Comp3 = () => <div>3</div>;
	const Comp4 = () => <div>4</div>;
	it("should only render if there are children", () => {
		const component = shallow(<DoubleChain />);
		expect(component).toBeEmptyRender();
	});
	it("should put all features into the first column by default", () => {
		const customFields = {};
		const component = shallow(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</DoubleChain>
		);
		expect(component).not.toBeEmptyRender();
		expect(component.find(".column-1").children().length).toBe(4);
		expect(component.find(".column-2").children().length).toBe(0);
	});
	it("should be able to accept a number in the custom field, and that number of features within the chain should appear in the first column. ", () => {
		const customFields = { columnOne: 2 };
		const component = mount(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</DoubleChain>
		);

		const column1 = component.find(".column-1");
		const column2 = component.find(".column-2");

		expect(column1.text()).toEqual("12");
		expect(column2.text()).toEqual("34");
	});
	it("should be able to accept a number in the custom field, any additional features in the chain should be placed in the second column. ", () => {
		const customFields = { columnOne: 1 };
		const component = mount(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</DoubleChain>
		);

		const column1 = component.find(".column-1");
		const column2 = component.find(".column-2");

		expect(column1.text()).toEqual("1");
		expect(column2.text()).toEqual("234");

		expect(column2.children().length).toBe(3);
	});
	it("should render nothing if negative column 1 amount", () => {
		const customFields = { columnOne: -10 };
		const component = mount(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</DoubleChain>
		);

		expect(component).toBeEmptyRender();
	});

	it("should render heading from custom field and children", () => {
		const customFields = { columnOne: 1, heading: "Double Chain Heading" };
		const component = mount(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
			</DoubleChain>
		);

		expect(component.find("Heading").text()).toBe("Double Chain Heading");
		expect(component.find("HeadingSection").exists()).toBe(true);
		expect(component.find(".column-1").text()).toBe("1");
	});

	it("should not render heading from custom field and children", () => {
		const customFields = { columnOne: 1 };
		const component = mount(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
			</DoubleChain>
		);

		expect(component.find("Heading").exists()).toBe(false);
		expect(component.find("HeadingSection").exists()).toBe(false);
		expect(component.find(".column-1").text()).toBe("1");
	});
});
