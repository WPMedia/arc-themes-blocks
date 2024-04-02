/* eslint-disable no-param-reassign */
const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = {
    stories: [
        "../stories/*.@(mdx|stories.@(js|jsx|tsx))",
        "../blocks/**/*.story.@(js|jsx|mdx|tsx)"
    ],

    addons: [
        "@etchteam/storybook-addon-css-variables-theme",
        "@storybook/addon-a11y",
		"@storybook/addon-controls",
        "@storybook/addon-docs",
        "@storybook/addon-essentials",
        "@storybook/addon-webpack5-compiler-babel"
    ],

    staticDirs: ["../resources"],

    webpackFinal: async (config) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.

		// Make whatever fine-grained changes you need
		// eslint-disable-next-line no-unused-expressions
		config.resolve = {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				"fusion:consumer": path.resolve(__dirname, "./alias/consumer.js"),
				"fusion:content": path.resolve(__dirname, "./alias/content.js"),
				"fusion:context": path.resolve(__dirname, "./alias/context.js"),
				"fusion:environment": path.resolve(__dirname, "./alias/environment.js"),
				"fusion:intl": path.resolve(__dirname, "./alias/intl.js"),
				"fusion:properties": path.resolve(__dirname, "./alias/properties.js"),
				"fusion:static": path.resolve(__dirname, "./alias/static.js"),
				"fusion:themes": path.resolve(__dirname, "./alias/themes.js"),
			},
		};

		config.module.rules.push(
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "sass-loader",
					},
				],
				include: path.resolve(__dirname, "../"),
			},
			{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, "../node_modules/@wpmedia/arc-themes-components"),
				use: {
					loader: "babel-loader",				
				},
			},
		);

		config.externals = /^(fusion:)/;

		// Return the altered config
		return config;
	},

    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    },

    docs: {
        autodocs: true
    }
};
