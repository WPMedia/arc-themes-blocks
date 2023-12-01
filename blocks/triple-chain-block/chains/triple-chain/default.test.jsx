import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TripleChain from "./default";

describe("the triple chain block", () => {
	const Comp1 = () => <div>1</div>;
	const Comp2 = () => <div>2</div>;
	const Comp3 = () => <div>3</div>;
	const Comp4 = () => <div>4</div>;

	it("should only render if there are children", () => {
		const { container } = render(<TripleChain />);
		expect(container.querySelectorAll(".b-triple-chain")).toHaveLength(0);
	});

	it("should put all features into the first column by default", () => {
		const customFields = {};
		const { container } = render(
			<TripleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</TripleChain>,
		);
		expect(container.querySelectorAll(".b-triple-chain")).toHaveLength(1);

		const col1 = container.querySelectorAll(".b-triple-chain__child-item")[0];
		const col2 = container.querySelectorAll(".b-triple-chain__child-item")[1];
		expect(col1.querySelectorAll("div")).toHaveLength(4);
		expect(col2.querySelectorAll("div")).toHaveLength(0);
	});

	it("should be able to accept a number in the custom field, and that number of features within the chain should appear in the first column. ", () => {
		const customFields = { columnOne: 2, columnTwo: 2 };
		const { container } = render(
			<TripleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</TripleChain>,
		);

		const col1 = container.querySelectorAll(".b-triple-chain__child-item")[0];
		const col2 = container.querySelectorAll(".b-triple-chain__child-item")[1];

		expect(col1.querySelectorAll("div")).toHaveLength(2);
		expect(col2.querySelectorAll("div")).toHaveLength(2);
	});

	it("should be able to accept numbers in the custom field, any additional features in the chain should be placed in the third column. ", () => {
		const customFields = { columnOne: 1, columnTwo: 1 };
		const { container } = render(
			<TripleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</TripleChain>,
		);

		const col1 = container.querySelectorAll(".b-triple-chain__child-item")[0];
		const col2 = container.querySelectorAll(".b-triple-chain__child-item")[1];
		const col3 = container.querySelectorAll(".b-triple-chain__child-item")[2];

		expect(col1.querySelectorAll("div")).toHaveLength(1);
		expect(col2.querySelectorAll("div")).toHaveLength(1);
		expect(col3.querySelectorAll("div")).toHaveLength(2);
	});

	it("should render nothing if negative column 1 amount", () => {
		const customFields = { columnOne: -10 };
		const { container } = render(
			<TripleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
				<Comp3 />
				<Comp4 />
			</TripleChain>,
		);

		expect(container.querySelectorAll(".b-triple-chain__child-item")).toHaveLength(0);
	});

	it("should render heading from custom field and children", () => {
		const customFields = {
			columnOne: 1,
			columnTwo: 1,
			heading: "Triple Chain Heading",
		};
		const { container } = render(
			<TripleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
			</TripleChain>,
		);

		expect(container.querySelectorAll(".b-triple-chain__heading")).toHaveLength(1);
		expect(container.querySelector(".b-triple-chain__heading").textContent).toBe(
			"Triple Chain Heading",
		);
		const col1 = container.querySelectorAll(".b-triple-chain__child-item")[0];
		const col2 = container.querySelectorAll(".b-triple-chain__child-item")[1];
		expect(col1.querySelectorAll("div")).toHaveLength(1);
		expect(col2.querySelectorAll("div")).toHaveLength(1);
	});

	it("should not render heading from custom field and children", () => {
		const customFields = { columnOne: 1, columnTwo: 1 };
		const { container } = render(
			<TripleChain customFields={customFields}>
				<Comp1 />
				<Comp2 />
			</TripleChain>,
		);

		expect(container.querySelectorAll(".b-triple-chain__heading")).toHaveLength(0);
		const col1 = container.querySelectorAll(".b-triple-chain__child-item")[0];
		const col2 = container.querySelectorAll(".b-triple-chain__child-item")[1];
		expect(col1.querySelectorAll("div")).toHaveLength(1);
		expect(col2.querySelectorAll("div")).toHaveLength(1);
	});
});
