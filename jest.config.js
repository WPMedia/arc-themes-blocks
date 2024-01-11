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
			statements: 48,
			branches: 60,
			functions: 40,
			lines: 40,
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
