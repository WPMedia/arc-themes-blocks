module.exports = {
	collectCoverageFrom: [
		"**/(features|chains|layouts|sources|output-types|_children|components|utils)/**/*.{js,jsx}",
		// for resizer image block
		"!**/node_modules/**",
		"!**/mock*.js",
		"!**/*.story*.jsx",
	],
	coverageDirectory: "<rootDir>/coverage",
	coverageThreshold: {
		global: {
			statements: 53,
			branches: 66,
			functions: 44,
			lines: 54,
		},
	},
	// projects: ["<rootDir>/blocks/*/jest.config.js"],
	testEnvironment: "<rootDir>/jest/custom-test-environment.js",
	transform: {
		"\\.[jt]sx?$": "babel-jest",
	},
	transformIgnorePatterns: [
		"//node_modules/(?!@wpmedia/.*-block).*/",
		"//node_modules/(?!(@wpmedia)).*/",
	],
};
