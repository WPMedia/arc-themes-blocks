const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
	stories: ['../stories/*.stories.@(js|jsx|mdx|tsx)', '../blocks/**/*.story.@(js|jsx|mdx|tsx)' ],
	addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-knobs'],
	webpackFinal: async (config, { configType }) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.

		// Make whatever fine-grained changes you need
		config.resolve = {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				'fusion:context':  path.resolve(__dirname, './alias/context.js'),
				'fusion:consumer': path.resolve(__dirname, './alias/consumer.js'),
				'fusion:content': path.resolve(__dirname, './alias/content.js'),
				'fusion:themes':  path.resolve(__dirname, './alias/themes.js'),
				'fusion:properties': path.resolve(__dirname, './alias/properties.js'),
				'fusion:intl': path.resolve(__dirname, './alias/intl.js'),
				'fusion:environment': path.resolve(__dirname, './alias/environment.js')
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
