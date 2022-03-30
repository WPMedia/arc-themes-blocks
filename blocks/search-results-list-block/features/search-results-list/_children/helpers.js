const resolveDefaultPromoElements = (customFields = {}) => {
	const fields = {
		showHeadline: true,
		showImage: true,
		showDescription: true,
		showByline: true,
		showDate: true,
	};
	const fieldKeys = Object.keys(fields);
	return fieldKeys.reduce((acc, key) => {
		if (typeof customFields[key] === "undefined") {
			acc[key] = fields[key];
		} else {
			acc[key] = customFields[key];
		}
		return acc;
	}, fields);
};

// eslint-disable-next-line import/prefer-default-export
export { resolveDefaultPromoElements };
