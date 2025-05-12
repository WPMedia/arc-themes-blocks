import handleRedirect from ".";

describe("handleRedirect()", () => {
	it("throws a 302 when a story has a redirectUrl", () => {
		try {
			handleRedirect({
				data: { type: "story", related_content: { redirect: [{ redirect_url: "google.com" }] } },
			});
		} catch (e) {
			expect(e.statusCode).toEqual(302);
			expect(e.location).toEqual("google.com");
		}
	});

	it("does nothing when a story does not have a redirect", () => {
		const handler = handleRedirect({ data: { type: "story", related_content: {} } });
		expect(() => handler).not.toThrow(Error);
	});
});
