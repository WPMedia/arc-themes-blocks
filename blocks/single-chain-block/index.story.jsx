import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import SingleChain from "./chains/single-chain/default";

export default {
	title: "Chains/Single",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1600] },
	},
};

const styles = {
	backgroundColor: "rgb(240 240 240)",
};

const Comp1 = () => <div style={styles}>1</div>;
const Comp2 = () => <div style={styles}>2</div>;

export const oneChild = () => {
	const customFields = {
		columnOne: 1,
		heading: "Single Chain Heading",
	};

	return (
		<SingleChain customFields={customFields}>
			<Comp1 />
		</SingleChain>
	);
};

export const noHeading = () => {
	const customFields = {
		columnOne: 1,
	};

	return (
		<SingleChain customFields={customFields}>
			<Comp1 />
		</SingleChain>
	);
};

export const twoChildren = () => {
	const customFields = {
		heading: "Single Chain Heading",
	};

	return (
		<SingleChain customFields={customFields}>
			<Comp1 />
			<Comp2 />
		</SingleChain>
	);
};
