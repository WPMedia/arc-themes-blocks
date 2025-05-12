import signImagesInANSObject from ".";

const data = {
	_id: "43UU6MCQERAMRPTD23B3CEXE7E",
	type: "story",
	content_elements: [
		{
			_id: "LJJSIEXMZ5FTDBP7PFHXI5A4XY",
			type: "image", // should fill auth
		},
		{
			_id: "LJJSIEXMZ5FTDBP7PFHXI5A4XY",
			type: "image", // should fill with first items auth
		},
		{
			_id: "LJJSIEXMZ5FTDBP7PFHXI5A4XZ",
			type: "image",
			auth: {
				1: "40b3b900866998ec98c4a286eef727080a10ac968d5eed7bd4a6a084511db6c1",
			}, // should get 2
		},
		{
			_id: "LJJSIEXMZ5FTDBP7PFHXI5A4X2",
			type: "image",
			auth: {
				2: "40b3b900866998ec98c4a286eef727080a10ac968d5eed7bd4a6a084511db6c2",
			}, // should skip
		},
	],
	promo_items: {
		basic: {
			_id: "OYRQQIJJLNBVNN4QLERLG2FZZ4",
			type: "image", // should fill auth
		},
	},
};

const noIDImageData = {
	_id: "43UU6MCQERAMRPTD23B3CEXE7E",
	type: "story",
	promo_items: {
		lead_art: {
			embed_html: "<embededVideo />",
			promo_items: {
				basic: {
					type: "image",
					url: "https://test.img/filename.jpg",
				},
			},
			type: "video",
		},
	},
	credits: {
		by: [
			{
				_id: "4CKUFSJJ2RNSNP5JQRBTTPN2CM",
				type: "author",
				version: "0.5.8",
				name: "Sample Author A",
				image: {
					url: "https://s3.amazonaws.com/arc-authors/themes/author-a-1-2-3-4-5.jpg",
					version: "0.5.8",
				},
			},
			{
				_id: "4CKUFSJJ2RNSNP5JQRBTTPN2CM",
				type: "author",
				version: "0.5.8",
				name: "Sample Author B",
				image: {
					url: "https://s3.amazonaws.com/arc-authors/themes/author-b-1-2-3-4-5.jpg",
					version: "0.5.8",
				},
			},
		],
	},
};

const authorApiData = {
	authors: [
		{
			_id: "authorFirst.authorLast",
			firstName: "authorFirst",
			lastName: "authorLast",
			image: "https://s3.amazonaws.com/arc-authors/themesinternal/author-image.png",
		},
		{
			_id: "authorFirst.authorLast",
			firstName: "authorFirst",
			lastName: "authorLast",
			image: "https://s3.amazonaws.com/arc-authors/themesinternal/author-image-two.png",
		},
	],
	more: false,
	_id: "456d30ab534a4852f1112a7d5956fa18903c5c8f5ff37b2ae54912d4aa8091d2",
};

const idAuthMap = {
	LJJSIEXMZ5FTDBP7PFHXI5A4XY: {
		hash: "40b3b900866998ec98c4a286eef727080a10ac968d5eed7bd4a6a084511db6cy",
	},
	LJJSIEXMZ5FTDBP7PFHXI5A4XZ: {
		hash: "40b3b900866998ec98c4a286eef727080a10ac968d5eed7bd4a6a084511db6cz",
	},
	LJJSIEXMZ5FTDBP7PFHXI5A4X2: {
		hash: "40b3b900866998ec98c4a286eef727080a10ac968d5eed7bd4a6a084511db6c2",
	},
	OYRQQIJJLNBVNN4QLERLG2FZZ4: {
		hash: "545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e40",
	},
	"https://test.img/filename.jpg": {
		hash: "545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e41",
	},
	"https://s3.amazonaws.com/arc-authors/themes/author-a-1-2-3-4-5.jpg": {
		hash: "545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e42",
	},
	"https://s3.amazonaws.com/arc-authors/themes/author-b-1-2-3-4-5.jpg": {
		hash: "545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e43",
	},
	"https://s3.amazonaws.com/arc-authors/themesinternal/author-image.png": {
		hash: "545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e44",
	},
	"https://s3.amazonaws.com/arc-authors/themesinternal/author-image-two.png": {
		hash: "545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e45",
	},
};

const fetcher = jest.fn((id) => Promise.resolve(idAuthMap[id]));
const cachedCall = jest.fn((cacheId, fetchMethod, options) =>
	Promise.resolve(fetchMethod(options.query.id)),
);
const failingCachedCall = jest.fn((cacheId, fetchMethod, options) =>
	Promise.reject(fetchMethod(options.query.id)),
);

describe("Sign Images In ANS Object", () => {
	beforeEach(() => {
		cachedCall.mockClear();
	});

	it("returns the correct auth key values in the returned ans object", async () => {
		const signIt = signImagesInANSObject(cachedCall, fetcher, 2);

		const { data: signedData, status } = await signIt({ data, status: 2 });

		expect(status).toBe(2);
		expect(cachedCall).toHaveBeenCalledWith(
			"image-token-LJJSIEXMZ5FTDBP7PFHXI5A4XY",
			fetcher,
			expect.objectContaining({
				query: { id: "LJJSIEXMZ5FTDBP7PFHXI5A4XY" },
				ttl: 31536000,
				independent: true,
			}),
		);
		expect(cachedCall).toHaveBeenCalledWith(
			"image-token-LJJSIEXMZ5FTDBP7PFHXI5A4XZ",
			fetcher,
			expect.objectContaining({
				query: { id: "LJJSIEXMZ5FTDBP7PFHXI5A4XZ" },
				ttl: 31536000,
				independent: true,
			}),
		);
		expect(cachedCall).toHaveBeenCalledWith(
			"image-token-OYRQQIJJLNBVNN4QLERLG2FZZ4",
			fetcher,
			expect.objectContaining({
				query: { id: "OYRQQIJJLNBVNN4QLERLG2FZZ4" },
				ttl: 31536000,
				independent: true,
			}),
		);
		expect(cachedCall).not.toHaveBeenCalledWith(
			"image-token-LJJSIEXMZ5FTDBP7PFHXI5A4X2",
			fetcher,
			expect.objectContaining({
				query: { id: "LJJSIEXMZ5FTDBP7PFHXI5A4X2" },
				ttl: 31536000,
				independent: true,
			}),
		);
		expect(cachedCall).toHaveBeenCalledTimes(3);
		expect(signedData.promo_items.basic.auth[2]).toBe(
			"545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e40",
		);
		expect(signedData.content_elements[0].auth[2]).toBe(
			"40b3b900866998ec98c4a286eef727080a10ac968d5eed7bd4a6a084511db6cy",
		);
		expect(signedData.content_elements[1].auth[2]).toBe(
			"40b3b900866998ec98c4a286eef727080a10ac968d5eed7bd4a6a084511db6cy",
		);
		expect(signedData.content_elements[2].auth[2]).toBe(
			"40b3b900866998ec98c4a286eef727080a10ac968d5eed7bd4a6a084511db6cz",
		);
	});

	it("returns the correct auth key for a non-id image (third party url)", async () => {
		const signIt = signImagesInANSObject(cachedCall, fetcher, 2);

		const { data: signedData } = await signIt({ data: noIDImageData });

		expect(cachedCall).toHaveBeenCalledWith(
			"image-token-https://test.img/filename.jpg",
			fetcher,
			expect.objectContaining({
				query: { id: "https://test.img/filename.jpg" },
				ttl: 31536000,
				independent: true,
			}),
		);

		expect(cachedCall).toHaveBeenCalledTimes(3);

		expect(signedData.promo_items.lead_art.promo_items.basic.auth[2]).toBe(
			"545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e41",
		);
		expect(signedData.credits.by[0].image.auth[2]).toBe(
			"545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e42",
		);
		expect(signedData.credits.by[1].image.auth[2]).toBe(
			"545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e43",
		);
	});

	it("returns the correct auth key author-api data", async () => {
		const signIt = signImagesInANSObject(cachedCall, fetcher, 2);

		const { data: signedData } = await signIt({ data: authorApiData });

		expect(cachedCall).toHaveBeenCalledWith(
			"image-token-https://s3.amazonaws.com/arc-authors/themesinternal/author-image.png",
			fetcher,
			expect.objectContaining({
				query: { id: "https://s3.amazonaws.com/arc-authors/themesinternal/author-image.png" },
				ttl: 31536000,
				independent: true,
			}),
		);

		expect(cachedCall).toHaveBeenCalledTimes(2);

		expect(signedData.authors[0].ansImage.auth[2]).toBe(
			"545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e44",
		);
		expect(signedData.authors[1].ansImage.auth[2]).toBe(
			"545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e45",
		);
	});

	it("returns the correct ansImage format for authors with image url strings", async () => {
		const signIt = signImagesInANSObject(cachedCall, fetcher, 2);

		const { data: signedData } = await signIt({
			data: {
				image: "https://s3.amazonaws.com/arc-authors/themesinternal/author-image.png",
				type: "author",
			},
		});

		expect(signedData.ansImage.auth[2]).toBe(
			"545c018dbf2bbc8e4488c7546167e6afacc259cf4fe0b2f28c8043990f689e44",
		);
	});

	it("ignores author images that are not valid urls", async () => {
		const signIt = signImagesInANSObject(cachedCall, fetcher, 2);

		const { data: signedData } = await signIt({
			data: {
				image: "I'm not real!",
				type: "author",
			},
		});

		expect(signedData.ansImage).toBeUndefined();
	});

	it("returns unmodified data for a failing fetch service", async () => {
		const signIt = signImagesInANSObject(failingCachedCall, fetcher, 2);

		const { data: signedData } = await signIt({ data });

		expect(failingCachedCall).toHaveBeenCalledTimes(3);

		expect(signedData).toMatchObject(data);
	});

	it("does not fail when null values are present", async () => {
		const signIt = signImagesInANSObject(cachedCall, fetcher, 2);

		const { data: signedData } = await signIt({
			data: {
				...data,
				testKey: null,
			},
		});

		expect(cachedCall).toHaveBeenCalledTimes(3);

		expect(signedData).toMatchObject(data);
	});
});
