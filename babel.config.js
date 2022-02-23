module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				modules: "commonjs",
			},
		],
		"@babel/preset-react",
	],
	env: {
		test: {
			plugins: [
				"@babel/plugin-proposal-nullish-coalescing-operator",
				"transform-react-remove-prop-types",
				[
					"@babel/plugin-proposal-decorators",
					{
						legacy: true,
					},
				],
				"@babel/plugin-proposal-class-properties",
				[
					"module-resolver",
					{
						alias: {
							"fusion:themes": "./jest/mocks/themes.js",
							"fusion:content": "./jest/mocks/content.js",
							"fusion:context": "./jest/mocks/context.js",
							"fusion:consumer": "./jest/mocks/consumer.js",
							"fusion:environment": "./jest/mocks/environment.js",
							"fusion:properties": "./jest/mocks/properties.js",
							"fusion:static": "./jest/mocks/static.js",
							"fusion:intl": "./jest/mocks/intl.js",
							"~/blocks.json": "./jest/mocks/blocks.json",
						},
					},
				],
			],
		},
	},
};
