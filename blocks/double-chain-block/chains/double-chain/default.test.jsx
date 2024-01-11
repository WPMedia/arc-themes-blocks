import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DoubleChain from "./default";

describe("the double chain block", () => {
	const Comp1 = () => <div>1</div>;
	const Comp2 = () => <div>2</div>;
	const Comp3 = () => <div>3</div>;
	const Comp4 = () => <div>4</div>;

	it("should only render if there are children", () => {
		const { container } = render(<DoubleChain />);
		expect(container.querySelectorAll(".b-double-chain")).toHaveLength(0);
	});

	it("should put all features into the first column by default", () => {
		const customFields = {};
		const { container } = render(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</DoubleChain>,
		);

		expect(container.querySelectorAll(".b-double-chain")).toHaveLength(1);
		const col1 = container.querySelectorAll(".b-double-chain__child-item")[0];
		const col2 = container.querySelectorAll(".b-double-chain__child-item")[1];
		expect(col1.querySelectorAll("div")).toHaveLength(4);
		expect(col2.querySelectorAll("div")).toHaveLength(0);
	});

	it("should be able to accept a number in the custom field, and that number of features within the chain should appear in the first column. ", () => {
		const customFields = { columnOne: 2 };
		const { container } = render(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</DoubleChain>,
		);

		const col1 = container.querySelectorAll(".b-double-chain__child-item")[0];
		const col2 = container.querySelectorAll(".b-double-chain__child-item")[1];
		expect(col1.querySelectorAll("div")).toHaveLength(2);
		expect(col2.querySelectorAll("div")).toHaveLength(2);
	});

	it("should be able to accept a number in the custom field, any additional features in the chain should be placed in the second column. ", () => {
		const customFields = { columnOne: 1 };
		const { container } = render(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</DoubleChain>,
		);

		const col1 = container.querySelectorAll(".b-double-chain__child-item")[0];
		const col2 = container.querySelectorAll(".b-double-chain__child-item")[1];
		expect(col1.querySelectorAll("div")).toHaveLength(1);
		expect(col2.querySelectorAll("div")).toHaveLength(3);
	});

	it("should render nothing if negative column 1 amount", () => {
		const customFields = { columnOne: -10 };
		const { container } = render(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</DoubleChain>,
		);

		expect(container.querySelectorAll(".b-double-chain__child-item")).toHaveLength(0);
	});

	it("should render heading from custom field and children", () => {
		const customFields = { columnOne: 1, heading: "Double Chain Heading" };
		const { container } = render(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</DoubleChain>,
		);

		expect(container.querySelectorAll(".b-double-chain__heading")).toHaveLength(1);
		expect(container.querySelector(".b-double-chain__heading").textContent).toBe(
			"Double Chain Heading",
		);
		const col1 = container.querySelectorAll(".b-double-chain__child-item")[0];
		expect(col1.querySelectorAll("div")).toHaveLength(1);
	});

	it("should not render heading from custom field and children", () => {
		const customFields = { columnOne: 1 };
		const { container } = render(
			<DoubleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
			</DoubleChain>,
		);

		expect(container.querySelectorAll(".b-double-chain__heading")).toHaveLength(0);
		const col1 = container.querySelectorAll(".b-double-chain__child-item")[0];
		expect(col1.querySelectorAll("div")).toHaveLength(1);
	});
});
