module.exports = {
	transform: {
		"^.+\\.[t|j]sx?$": "babel-jest",
		"^.+\\.(svg)$": "../../jest/fileTransformer.js",
	},
	setupFilesAfterEnv: [
		"../../jest/testSetupFile.js",
		"../../node_modules/jest-enzyme/lib/index.js",
	],
	verbose: true,
	moduleNameMapper: {
		"^.+\\.(css|less|scss)$": "identity-obj-proxy",
	},
	transformIgnorePatterns: ["/node_modules/(?!@wpmedia)"],
};
