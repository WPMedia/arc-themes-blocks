import imageANSToImageSrc from ".";

describe("imageANSToImageSrc", () => {
	it("return image src with ext", () => {
		expect(imageANSToImageSrc({ _id: 123, url: "http://image.com/test.jpg" })).toBe("123.jpg");
		expect(imageANSToImageSrc({ _id: 123, url: "http://image.com/test.test.jpg" })).toBe("123.jpg");
		expect(imageANSToImageSrc({ _id: 321, url: "http://image.com/test.test.jpeg" })).toBe("321.jpeg");
	});

	it("return image src without ext", () => {
		expect(imageANSToImageSrc({ _id: 123, url: "http://image.com/123" })).toBe("123");
	});

	it("return image src as encoded url when no _id but an auth exists", () => {
		expect(imageANSToImageSrc({ url: "http://image.com/test.jpg", auth: { 1: "123" } })).toBe(
			encodeURIComponent("http://image.com/test.jpg")
		);
	});

	it("will return null if incorrect ANS data", () => {
		expect(imageANSToImageSrc({ _id: 123 })).toBe(null);
		expect(imageANSToImageSrc({ url: "testjpg" })).toBe(null);
		expect(imageANSToImageSrc()).toBe(null);
	});
});
