import EventEmitter from ".";

describe("the EventEmitter object", () => {
	it("should allow for publishing and subscribing to events", (done) => {
		const eventEmitterCallback = (event) => {
			expect(event.eventName).toEqual("testEmitterEvent");
		};
		EventEmitter.subscribe("testEmitterEvent", eventEmitterCallback);
		EventEmitter.dispatch("testEmitterEvent", {
			eventName: "testEmitterEvent",
		});
		done();
	});

	it("should ignore unknown events", () => {
		const eventEmitterCallback = jest.fn();
		EventEmitter.subscribe("testEmitterEvent", eventEmitterCallback);
		EventEmitter.dispatch("testEmitterEvent_invalid");
		expect(eventEmitterCallback).not.toHaveBeenCalled();
	});
});
