const Environment = require("jest-environment-jsdom").TestEnvironment;

class CustomTestEnvironment extends Environment {
	async setup() {
		await super.setup();
		if (typeof this.global.TextEncoder === "undefined") {
			const { TextEncoder } = require("util");
			this.global.TextEncoder = TextEncoder;
		}
	}
}

module.exports = CustomTestEnvironment;
