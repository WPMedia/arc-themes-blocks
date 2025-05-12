import serialJoin from ".";

export default {
	title: "Utilities/Serial Join",
	component: serialJoin,
};

export const OneItem = {
	render: () => <div>{serialJoin(["one"])}</div>,

	name: "One item",
};

export const ThreeItems = {
	render: () => <div>{serialJoin(["one", "two", "three"])}</div>,

	name: "Three items",
};

export const ThreeItemsWithACustomConjunction = {
	render: () => <div>{serialJoin(["one", "two", "three"], "or")}</div>,

	name: "Three items, with a custom conjunction",
};

export const ThreeItemsWithAnEmptyConjunctionAndCustomDelimiter = {
	render: () => <div>{serialJoin(["one", "two", "three"], "", " <")}</div>,

	name: "Three items, with an empty conjunction and custom delimiter",
};

export const ThreeItemsWithAnEmptyConjunctionCustomDelimiterAndEmptySpacer = {
	render: () => <div>{serialJoin(["one", "two", "three"], "", "/", "")}</div>,

	name: "Three items, with an empty conjunction, custom delimiter, and empty spacer",
};

export const ThreeNodeItems = {
	render: () => <div>{serialJoin([<span>one</span>, <i>two</i>, <b>three</b>])}</div>,

	name: "Three node items",
};

export const TwoItems = {
	render: () => <div>{serialJoin(["one", "two"])}</div>,

	name: "Two items",
};
