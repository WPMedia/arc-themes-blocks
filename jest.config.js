module.exports = {
	collectCoverageFrom: [
		"**/(features|chains|layouts|sources|output-types|_children|components|utils)/**/*.{js,jsx}",
		// for resizer image block
		"!**/node_modules/**",
		"!**/mock*.js",
		"!**/*.story*.jsx",
		"!**/*.test-ignore.*",
	],
	coverageDirectory: "<rootDir>/coverage",
	coverageThreshold: {
		global: {
			statements: 94,
			branches: 91,
			functions: 90,
			lines: 95,
		},
	},
	// projects: ["<rootDir>/blocks/*/jest.config.js"],
	testEnvironment: "<rootDir>/jest/custom-test-environment.js",
	setupFilesAfterEnv: ["<rootDir>/jest/testSetupFile.js"],
	transform: {
		"\\.[jt]sx?$": "babel-jest",
	},
	transformIgnorePatterns: [
		"//node_modules/(?!@wpmedia/.*-block).*/",
		"//node_modules/(?!(@wpmedia)).*/",
	],
	moduleNameMapper: {
		"\\.(scss|css|sass)$": "identity-obj-proxy",
		"^@wpmedia/arc-themes-components$":
			"<rootDir>/jest/stubs/arc-themes-components/index.js",
		"^@wpmedia/arc-themes-components/src/utils/handle-fetch-error$":
			"<rootDir>/jest/stubs/arc-themes-components/src/utils/handle-fetch-error.js",
		"^@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object$":
			"<rootDir>/jest/stubs/arc-themes-components/src/utils/sign-images-in-ans-object.js",
		"^@wpmedia/arc-themes-components/src/utils/handle-redirect$":
			"<rootDir>/jest/stubs/arc-themes-components/src/utils/handle-redirect.js",
	},
};
