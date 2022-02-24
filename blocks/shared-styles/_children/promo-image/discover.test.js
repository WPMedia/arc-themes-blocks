import discoverPromotype from "./discover";

const contentTypeVideo = { type: "video" };
const contentTypeVideoPromo = {
	type: "story",
	promo_items: { lead_art: { type: "video" } },
};
const contentTypeGallery = { type: "gallery" };
const contentTypeGalleryPromo = {
	type: "story",
	promo_items: { lead_art: { type: "gallery" } },
};

describe("should return type of content for labels", () => {
	it("must return undefined if no parameters received", () => {
		let rc = discoverPromotype();
		expect(rc).toBeFalsy();
		rc = discoverPromotype("");
		expect(rc).toBeFalsy();
	});

	it('must return "other" if parameters no match', () => {
		let rc = discoverPromotype("foo");
		expect(rc).toBe("other");

		rc = discoverPromotype(1);
		expect(rc).toBe("other");

		rc = discoverPromotype(true);
		expect(rc).toBe("other");

		rc = discoverPromotype({});
		expect(rc).toBe("other");
	});

	it('must return "Video" if story type is "video"', () => {
		const rc = discoverPromotype(contentTypeVideo);
		expect(rc).toBe("Video");
	});

	it('must return "Gallery" if story type is "gallery"', () => {
		const rc = discoverPromotype(contentTypeGallery);
		expect(rc).toBe("Gallery");
	});

	it('must return "Video" if story type is "story" and promo lead art is "video"', () => {
		const rc = discoverPromotype(contentTypeVideoPromo);
		expect(rc).toBe("Video");
	});

	it('must return "Gallery" if story type is "story" and promo lead art is "gallery"', () => {
		const rc = discoverPromotype(contentTypeGalleryPromo);
		expect(rc).toBe("Gallery");
	});
});
