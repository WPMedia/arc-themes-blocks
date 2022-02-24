import React from "react";
import { shallow, mount } from "enzyme";
import Chain from "./default";

describe("the quad chain block", () => {
	const Comp1 = () => <div>1</div>;
	const Comp2 = () => <div>2</div>;
	const Comp3 = () => <div>3</div>;
	const Comp4 = () => <div>4</div>;

	it("should only render if there are children", () => {
		const component = shallow(<Chain />);
		expect(component).toBeEmptyRender();
	});

	it("should put all features into the first column by default", () => {
		const customFields = {};
		const component = shallow(
			<Chain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</Chain>
		);
		expect(component).not.toBeEmptyRender();

		const columnOne = component.find(".row").children().at(0);
		const columnTwo = component.find(".row").children().at(1);
		expect(columnOne.children().length).toBe(4);
		expect(columnTwo.children().length).toBe(0);
	});

	it("should be able to accept a number in the custom field, and that number of features within the chain should appear in the first column. ", () => {
		const customFields = { columnOne: 2, columnTwo: 2, columnThree: 0 };
		const component = mount(
			<Chain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</Chain>
		);

		const columnOne = component.find(".row").children().at(0);
		const columnTwo = component.find(".row").children().at(1);

		expect(columnOne.text()).toEqual("12");
		expect(columnTwo.text()).toEqual("34");
	});

	it("should be able to accept numbers in the custom field, any additional features in the chain should be placed in the fourth column. ", () => {
		const customFields = { columnOne: 1, columnTwo: 1, columnThree: 1 };
		const component = mount(
			<Chain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</Chain>
		);

		const columnOne = component.find(".row").children().at(0);
		const columnTwo = component.find(".row").children().at(1);
		const columnThree = component.find(".row").children().at(2);
		const columnFour = component.find(".row").children().at(3);

		expect(columnOne.text()).toEqual("1");
		expect(columnTwo.text()).toEqual("2");
		expect(columnThree.text()).toEqual("3");
		expect(columnFour.text()).toEqual("4");
	});

	it("should render nothing if negative column 1 amount", () => {
		const customFields = { columnOne: -10 };
		const component = mount(
			<Chain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</Chain>
		);

		expect(component).toBeEmptyRender();
	});

	it("should render heading from custom field and children", () => {
		const customFields = {
			columnOne: 1,
			columnTwo: 1,
			heading: "Quad Chain Heading",
		};
		const component = mount(
			<Chain customFields={customFields}>
				<Comp1 />
				<Comp2 />
			</Chain>
		);

		expect(component.find("Heading").text()).toBe("Quad Chain Heading");
		expect(component.find("HeadingSection").exists()).toBe(true);

		const columnOne = component.find(".row").children().at(0);
		const columnTwo = component.find(".row").children().at(1);

		expect(columnOne.text()).toEqual("1");
		expect(columnTwo.text()).toEqual("2");
	});

	it("should not render heading from custom field and children", () => {
		const customFields = { columnOne: 1, columnTwo: 1 };
		const component = mount(
			<Chain customFields={customFields}>
				<Comp1 />
				<Comp2 />
			</Chain>
		);

		expect(component.find("Heading").exists()).toBe(false);
		expect(component.find("HeadingSection").exists()).toBe(false);
		const columnOne = component.find(".row").children().at(0);
		const columnTwo = component.find(".row").children().at(1);

		expect(columnOne.text()).toEqual("1");
		expect(columnTwo.text()).toEqual("2");
	});
});
