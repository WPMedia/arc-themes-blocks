module.exports = {
	transformIgnorePatterns: [
		"//node_modules/(?!@wpmedia/.*-block).*/",
		"//node_modules/(?!(@wpmedia)).*/",
	],
	projects: [
		"<rootDir>/blocks/*/jest.config.js",
		// '<rootDir>/components/*/jest.config.js',
		// Uncomment the components tests once we actually have them.
		// Jest doesn't have an option to ignore those errors.
	],
	coverageDirectory: "<rootDir>/coverage",
	coverageThreshold: {
		global: {
			statements: 85,
			branches: 85,
			functions: 85,
			lines: 85,
		},
	},
	collectCoverageFrom: [
		"**/(features|chains|layouts|sources|output-types|_children|components|utils)/**/*.{js,jsx}",
		// for resizer image block
		"**/extractImageFromStory.js",
		"**/imageRatioCustomField.js",
		"**/ratioFor.js",
		"!**/node_modules/**",
		"!**/vendor/**",
		"!**/images/*.svg",
		"!**/mock*.js",
		"!**/*.story*.jsx",
	],
	modulePathIgnorePatterns: ["<rootDir>/blocks/subscriptions-block/components/ContactInfo "],
};
