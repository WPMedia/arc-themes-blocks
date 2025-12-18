// Provide MessageChannel in Jest if missing (React 19 scheduler expects it)
if (typeof global.MessageChannel === "undefined") {
	try {
		// Prefer explicit node: scheme when available
		// eslint-disable-next-line import/no-extraneous-dependencies, global-require
		const { MessageChannel } = require("node:worker_threads");
		global.MessageChannel = MessageChannel;
	} catch (e) {
		try {
			// Fallback for older Node versions without node: specifier
			// eslint-disable-next-line import/no-extraneous-dependencies, global-require
			const { MessageChannel } = require("worker_threads");
			global.MessageChannel = MessageChannel;
		} catch {
			// Leave undefined if truly unavailable
		}
	}
}

beforeEach(() => {
	jest.resetModules();
});
