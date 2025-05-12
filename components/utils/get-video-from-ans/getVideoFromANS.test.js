import getVideoFromANS from ".";

const contentTypeImageBasicPromo = {
	type: "story",
	promo_items: {
		basic: {
			type: "image",
		},
	},
};
const contentTypeImageLeadPromo = {
	type: "story",
	promo_items: {
		lead_art: {
			type: "image",
		},
	},
};
const contentTypeVideo = {
	type: "video",
	embed_html: '<div class="somehtml"></div>',
};
const contentTypeVideoPromo = {
	type: "story",
	promo_items: {
		lead_art: {
			...contentTypeVideo,
		},
	},
};

describe("getVideoFromANS()", () => {
	describe('when content type is "story"', () => {
		it('should return "undefined" when content has non-"video" basic art', () => {
			const vidEmbed = getVideoFromANS(contentTypeImageBasicPromo);
			expect(vidEmbed).not.toBeDefined();
		});

		it('should return "undefined" when content has non-"video" lead art', () => {
			const vidEmbed = getVideoFromANS(contentTypeImageLeadPromo);
			expect(vidEmbed).not.toBeDefined();
		});

		it('should return "embed_html" when content has "video" lead art', () => {
			const vidEmbed = getVideoFromANS(contentTypeVideoPromo);
			expect(vidEmbed).toBeDefined();
			expect(vidEmbed).toEqual(contentTypeVideo.embed_html);
		});
	});

	describe('when content type is "video"', () => {
		it('should return "undefined" when embed does not exist', () => {
			const vidEmbed = getVideoFromANS({ type: "video" });
			expect(vidEmbed).not.toBeDefined();
		});

		it('should return "embed_html" when embed exists', () => {
			const vidEmbed = getVideoFromANS(contentTypeVideo);
			expect(vidEmbed).toBeDefined();
			expect(vidEmbed).toEqual(contentTypeVideo.embed_html);
		});
	});

	describe("when content is undefined", () => {
		it('should return "undefined" when no valid content', () => {
			const vidEmbed = getVideoFromANS(undefined);
			expect(vidEmbed).not.toBeDefined();
		});
	});
});
