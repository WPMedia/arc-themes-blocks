import getManualImageID from ".";

describe("getManualImageID()", () => {
	it("returns default value", () => {
		const manualImageId = getManualImageID();
		expect(manualImageId).toBe("");
	});

	it("returns the image id from a cloudfront hosted Photo Center URL without an extension", () => {
		const imageID = "ABC123DEF456GHI789ABC123DE";
		const imageURL = `https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/${imageID}`;
		const manualImageId = getManualImageID(imageURL);
		expect(manualImageId).toBe(imageID);
	});

	it("returns the image id from a cloudfront hosted Photo Center URL with a 3 character extension", () => {
		const imageID = "ABC123DEF456GHI789ABC123DE";
		const imageURL = `https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/${imageID}.jpg`;
		const manualImageId = getManualImageID(imageURL);
		expect(manualImageId).toBe(imageID);
	});

	it("returns the image id from a cloudfront hosted Photo Center URL with a 4 character extension", () => {
		const imageID = "ABC123DEF456GHI789ABC123DE";
		const imageURL = `https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/${imageID}.jpeg`;
		const manualImageId = getManualImageID(imageURL);
		expect(manualImageId).toBe(imageID);
	});

	it("returns default value if resized image flag is true", () => {
		const imageID = "ABC123DEF456GHI789ABC123DE";
		const imageURL = `https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/${imageID}.jpeg`;
		const manualImageId = getManualImageID(imageURL, true);
		expect(manualImageId).toBe("");
	});
});
