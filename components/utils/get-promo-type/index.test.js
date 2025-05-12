import getPromoType from ".";

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
const contentTypeImage = { type: "image" };
const contentTypeImagePromo = {
	type: "story",
	promo_items: { lead_art: { type: "image" } },
};

describe("should return type of content for labels", () => {
	it("must return undefined if no parameters received", () => {
		let rc = getPromoType();
		expect(rc).toBeFalsy();
		rc = getPromoType("");
		expect(rc).toBeFalsy();
	});

	it('must return "other" if parameters no match', () => {
		let rc = getPromoType("foo");
		expect(rc).toBe("other");

		rc = getPromoType(1);
		expect(rc).toBe("other");

		rc = getPromoType(true);
		expect(rc).toBe("other");

		rc = getPromoType({});
		expect(rc).toBe("other");
	});

	it('must return "video" if story type is "video"', () => {
		const rc = getPromoType(contentTypeVideo);
		expect(rc).toBe("video");
	});

	it('must return "gallery" if story type is "gallery"', () => {
		const rc = getPromoType(contentTypeGallery);
		expect(rc).toBe("gallery");
	});

	it('must return "image" if story type is "image"', () => {
		const rc = getPromoType(contentTypeImage);
		expect(rc).toBe("image");
	});

	it('must return "video" if story type is "story" and promo lead art is "video"', () => {
		const rc = getPromoType(contentTypeVideoPromo);
		expect(rc).toBe("video");
	});

	it('must return "gallery" if story type is "story" and promo lead art is "gallery"', () => {
		const rc = getPromoType(contentTypeGalleryPromo);
		expect(rc).toBe("gallery");
	});

	it('must return "image" if story type is "story" and promo lead art is "image"', () => {
		const rc = getPromoType(contentTypeImagePromo);
		expect(rc).toBe("image");
	});
});
