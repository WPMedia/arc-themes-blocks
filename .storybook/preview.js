import "./themes/news.scss";

// eslint-disable-next-line import/prefer-default-export
export const parameters = {
	layout: "fullscreen",
	a11y: {
		element: "#root",
		config: {},
		options: {},
		manual: false,
	},
	chromatic: { delay: 0 },
	backgrounds: {
		default: "white",
		values: [
			{
				name: "white",
				value: "#ffffff",
			},
			{
				name: "grey",
				value: "grey",
			},
			{
				name: "primary",
				value: "rgb(255, 105, 180)",
			},
		],
	},
	options: {
		storySort: (a, b) =>
		a.title === b.title
		? 0
		: a.id.localeCompare(b.id, undefined, { numeric: true })
	},
};
