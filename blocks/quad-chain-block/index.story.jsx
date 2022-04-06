import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import QuadChain from "./chains/quad-chain/default";

export default {
	title: "Chains/Quad",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 740, 1200] },
	},
};

const styles = {
	backgroundColor: "rgb(240 240 240)",
};

const Comp1 = () => <div style={styles}>1</div>;
const Comp2 = () => <div style={styles}>2</div>;
const Comp3 = () => <div style={styles}>3</div>;
const Comp4 = () => <div style={styles}>4</div>;

export const allColumns = () => {
	const customFields = {
		columnOne: 1,
		columnTwo: 1,
		columnThree: 1,
		heading: "Quad Chain Heading",
	};

	return (
		<QuadChain customFields={customFields}>
			<Comp1 />
			<Comp2 />
			<Comp3 />
			<Comp4 />
		</QuadChain>
	);
};

export const allColumnsNoTitle = () => {
	const customFields = {
		columnOne: 1,
		columnTwo: 1,
		columnThree: 1,
	};

	return (
		<QuadChain customFields={customFields}>
			<Comp1 />
			<Comp2 />
			<Comp3 />
			<Comp4 />
		</QuadChain>
	);
};

export const zeroColumns = () => {
	const customFields = {
		columnOne: 0,
		columnTwo: 0,
		columnThree: 0,
		heading: "Quad Chain Heading",
	};

	return (
		<QuadChain customFields={customFields}>
			<Comp1 />
			<Comp2 />
			<Comp3 />
			<Comp4 />
		</QuadChain>
	);
};

export const columnOneOnly = () => {
	const customFields = {
		columnOne: 1,
		columnTwo: 0,
		columnThree: 0,
		heading: "Quad Chain Heading",
	};

	return (
		<QuadChain customFields={customFields}>
			<Comp1 />
			<Comp2 />
			<Comp3 />
			<Comp4 />
		</QuadChain>
	);
};

export const columnOneAndTwo = () => {
	const customFields = {
		columnOne: 1,
		columnTwo: 1,
		columnThree: 0,
		heading: "Quad Chain Heading",
	};

	return (
		<QuadChain customFields={customFields}>
			<Comp1 />
			<Comp2 />
			<Comp3 />
			<Comp4 />
		</QuadChain>
	);
};
