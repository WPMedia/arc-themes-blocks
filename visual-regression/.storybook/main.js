module.exports = {
	stories: ["../stories/**/*.stories.jsx"],
	staticDirs: ["../screenshots"],
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	addons: ["@storybook/addon-webpack5-compiler-babel"],
	docs: { autodocs: false },
};
