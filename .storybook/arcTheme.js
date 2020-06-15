import { create } from "@storybook/theming/create";

/*
reference arcpublishing.com
--green: #6bc1ae;
--blue: #46a1dc;
--orange: #f87966;
--turquoise-blue: #2b83c1;
--gray: #a7a9ac;
--binhex: #4ba2da;
--ink-dark: #333;
--ink-light: #fff;
--dark-gray-primary: #3e5364;
--dark-gray-secondary: #869098;
--light-gray-tertiary: #979797;
--light-gray-primary: #dfe3e6;
--light-gray-secondary: #f4f7fb;
--light-blue: #d8ecf8;
*/

// #333 - ink dark (primary)
// #4ba2da - arc flat blue (secondary)
// #6bc1ae - sea foam green arc (highlight)
// white background rgba(244, 247, 251, 0.92)
export default create({
	// see documentation for themes
	// https://storybook.js.org/docs/configurations/theming/
	base: 'light',

	colorPrimary: '#333',
	colorSecondary: '#4ba2da',

	// UI
	appBg: 'white',
	appBorderColor: '#6bc1ae',

	// rounded corners
	appBorderRadius: 4,

	// Typography
	fontBase: '"Open Sans", sans-serif',
	fontCode: 'monospace',

	// Text colors
	textColor: 'black',
	textInverseColor: 'white',

	// Toolbar default and active colors
	barTextColor: 'white',
	barSelectedColor: '#4ba2da',
	barBg: '#333',

	// Form colors
	inputBg: 'white',
	inputBorder: 'silver',
	inputTextColor: 'black',
	inputBorderRadius: 4,

	brandTitle: 'News Theme Blocks',
	brandUrl: 'https://github.com/WPMedia/fusion-news-theme-blocks',
	// todo: change this to a legitimate image url
	brandImage: 'https://arcdesignsystem.com/img/arc-logo-black.svg',
});
