import { create } from "@storybook/theming/create";

/*

 Pickled Bluewood, off-navy #2D3E4A
 plastic blue #45a1dc

*/
export default create({
  // see documentation for themes 
  // https://storybook.js.org/docs/configurations/theming/
  base: 'light',

  colorPrimary: '#2D3E4A',
  colorSecondary: '#45a1dc',

  // UI
  appBg: '#fff',
  // appContentBg: 'rgba(244, 247, 251, 0.92)',
  appBorderColor: '#fff',
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
  barSelectedColor: '#45a1dc',
  barBg: '#2D3E4A',

  // Form colors
  inputBg: '#fff',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Theme Blocks',
  brandUrl: 'https://github.com/WPMedia/fusion-theme-blocks',
  // todo: change this to a legitimate image url
  // brandImage: 'https://arcdesignsystem.com/img/arc-logo-black.svg',
});
