import cssVariablesTheme from "@etchteam/storybook-addon-css-variables-theme";

// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
import news from "!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./themes/news.scss";
// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
import commerce from "!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./themes/commerce.scss";

export const decorators = [cssVariablesTheme];

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
	cssVariables: {
		files: {
			news,
			commerce,
		},
	},
};
