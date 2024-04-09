/* eslint-disable no-param-reassign */
const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = {
    stories: [
        "../stories/*.@(mdx|stories.@(js|jsx|tsx))",
        "../blocks/**/*.story.@(js|jsx|mdx|tsx)"
    ],

    addons: [
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
					options: {
						"plugins": [
							[
								// Module resolver aliases need to be set here as well so arc-themes-components uses the right mock files.
								"module-resolver",
								{
									"alias": {
										"fusion:themes": "./.storybook/alias/themes.js",
										"fusion:content": "./.storybook/alias/content.js",
										"fusion:context": "./.storybook/alias/context.js",
										"fusion:consumer": "./.storybook/alias/consumer.js",
										"fusion:environment": "./.storybook/alias/environment.js",
										"fusion:properties": "./.storybook/alias/properties.js",
										"fusion:static": "./.storybook/alias/static.js",
										"fusion:intl": "./.storybook/alias/intl.js"
									}
								}
							]
						],
					},
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
    },

	babelDefault: {
		"presets": [
			[
				"@babel/preset-env",
				{
					"targets": {
						"node": "current"
					},
					"modules": "commonjs"
				}
			],
			[
				"@babel/preset-react",
				{
					"runtime": "automatic"
				}
			]
		],
		"plugins": [
			"@babel/plugin-proposal-nullish-coalescing-operator",
			"transform-react-remove-prop-types",
			[
				"@babel/plugin-proposal-decorators",
				{
					"legacy": true
				}
			],
			"@babel/plugin-proposal-class-properties",
			"@babel/plugin-transform-private-methods",
			[
				"module-resolver",
				{
					"alias": {
						"fusion:themes": "./.storybook/alias/themes.js",
						"fusion:content": "./.storybook/alias/content.js",
						"fusion:context": "./.storybook/alias/context.js",
						"fusion:consumer": "./.storybook/alias/consumer.js",
						"fusion:environment": "./.storybook/alias/environment.js",
						"fusion:properties": "./.storybook/alias/properties.js",
						"fusion:static": "./.storybook/alias/static.js",
						"fusion:intl": "./.storybook/alias/intl.js"
					}
				}
			]
		],
	},
};
