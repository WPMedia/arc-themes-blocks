import handleFetchError from ".";

describe("handleFetchError()", () => {
	it("handles 404 errors", () => {
		try {
			handleFetchError({ response: { status: 404 } });
		} catch (e) {
			expect(e.message).toEqual("Not Found");
		}
	});

	it("handles 302 redirects", () => {
		try {
			handleFetchError({ location: "test.com", statusCode: 302 });
		} catch (e) {
			expect(e).toEqual({ location: "test.com", statusCode: 302 });
		}
	});

	it("handles errors with the response", () => {
		try {
			handleFetchError({ response: { status: "400" } });
		} catch (e) {
			expect(e.message).toEqual(
				"The response from the server was an error with the status code 400."
			);
		}
	});

	it("handles errors with the request", () => {
		try {
			handleFetchError({ request: {} });
		} catch (e) {
			expect(e.message).toEqual("The request to the server failed with no response.");
		}
	});

	it("handles errors creating the request", () => {
		try {
			handleFetchError({});
		} catch (e) {
			expect(e.message).toEqual("An error occured creating the request.");
		}
	});
});
