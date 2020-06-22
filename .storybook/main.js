const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
	stories: ['../stories/*.stories.@(js|jsx|mdx|tsx)', '../blocks/**/*.story.[tj]s[x]' ],
	addons: ['@storybook/addon-a11y/register', '@storybook/addon-docs'],
	webpackFinal: async (config, { configType }) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.

		// Make whatever fine-grained changes you need
		config.resolve = {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				'fusion:context': '../../context.js',
				'fusion:content': path.resolve(__dirname, './alias/content.js'),
				'fusion:themes':  path.resolve(__dirname, './alias/themes.js'),
				'fusion:properties': path.resolve(__dirname, './alias/properties.js'),
			}
		},
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader',
			{
				loader: 'sass-loader',
				options: {
					prependData: (loaderContext) => {
						return `
							@import '~@wpmedia/news-theme-css/scss';

							// Should look for a better way to do this ->
							// This should be defaulted in the news-theme-css repo too!
							$theme-primary-font-family: $primary-font-family !default;
						`;
					},
				},
			},
			],
			include: path.resolve(__dirname, '../'),
		});

		// Return the altered config
		return config;
	},
};
