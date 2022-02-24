export default {
	resolve(resolveParams) {
		const { hierarchy, sectionId, "arc-site": arcSite } = resolveParams;
		return `/site/v3/navigation/${arcSite}?${hierarchy ? `hierarchy=${hierarchy}` : ""}${
			sectionId ? `&_id=${sectionId}` : ""
		}`;
	},
	schemaName: "navigation-hierarchy",
	params: {
		hierarchy: "text",
		sectionId: "text",
	},
	transform: (data, query) => {
		let idMatch = false;
		if (query.sectionId) {
			idMatch = data._id !== query.sectionId;
		}

		if ((!query.hierarchy && idMatch) || (query.uri && idMatch)) {
			const error = new Error("Not found");
			error.statusCode = 404;
			throw error;
		}

		return data;
	},
};
