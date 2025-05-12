const isValidHttpUrl = (urlString) => {
	try {
		const url = new URL(urlString);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
};

const transformAuthorImages = (value) => {
	const { authors = [], image, type } = value;

	if (type === "author" && image?.url) {
		return {
			...value,
			image: {
				...image,
				type: "image",
			},
		};
	}

	if (type === "author" && isValidHttpUrl(image)) {
		return {
			...value,
			ansImage: {
				type: "image",
				url: image,
			},
		};
	}

	if (authors.length > 0 && typeof authors[0].image === "string") {
		return {
			...value,
			authors: authors.map((author) => ({
				...author,
				ansImage: {
					...image,
					type: "image",
					url: author.image,
				},
			})),
		};
	}

	return value;
};

const signImagesInANSObject =
	(cachedCall, fetcher, resizerAppVersion, cacheKey = "image-token") =>
	({ data, ...rest }) => {
		const replacements = new Set();

		const stringData = JSON.stringify(data, (key, value) => {
			if (value === null) {
				return value;
			}
			const { _id, type, auth, url } = value;
			if (!auth?.[resizerAppVersion] && type === "image") {
				replacements.add(_id || url);
				return {
					...value,
					auth: {
						...value.auth,
						[resizerAppVersion]: `__replaceMe${_id || url}__`,
					},
				};
			}

			return transformAuthorImages(value);
		});

		return Promise.all(
			Array.from(replacements).map((id) =>
				cachedCall(`${cacheKey}-${id}`, fetcher, {
					query: { id },
					ttl: 31536000,
					independent: true,
				})
					.then((auth) => ({ id, auth }))
					.catch(() => ({})),
			),
		).then((authResults) => {
			const replaced = authResults
				.filter(({ id, auth }) => id && auth)
				.reduce(
					(accumulator, { id, auth }) =>
						accumulator.replace(new RegExp(`__replaceMe${id}__`, "g"), auth.hash),
					stringData,
				)
				.replace(/,*\s*"\d+"\s*:\s*"__replaceMe[^_]+__"/g, "")
				.replace(/,"auth"\s*:\s*{\s*}/g, "");
			return {
				data: JSON.parse(replaced),
				...rest,
			};
		});
	};

export default signImagesInANSObject;
