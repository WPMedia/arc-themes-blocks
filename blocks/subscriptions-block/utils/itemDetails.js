const getPricingStrategy = async ({ origin, priceCode }) => {
	const dateMidnight = new Date();
	dateMidnight.setUTCHours(0, 0, 0, 0);

	return fetch(
		`${origin}/retail/public/v1/pricing/paymentInfo/${priceCode}/1/${dateMidnight.getTime()}`,
		{},
	).then((res) => res.json());
};

const getProduct = async ({ origin, sku }) =>
	fetch(`${origin}/retail/public/v1/product/${sku}`, {}).then((res) => res.json());

const getItemDetails = async (origin, items) => {

	let itemDetails = items;

	const fetchPricingStrategy = (priceCode) =>
		getPricingStrategy({
			origin,
			priceCode,
		});

	const fetchProduct = (sku) =>
		getProduct({
			origin,
			sku,
		});

	await Promise.all(
		itemDetails.map((item) =>
			fetchPricingStrategy(item?.priceCode).then((priceSummary) => ({
				...item,
				priceName: priceSummary?.pricingStrategy?.name,
				priceDescription: priceSummary?.pricingStrategy?.description,
				priceSummary: priceSummary?.pricingStrategy?.summary,
				rates: priceSummary?.pricingStrategy?.rates,
				taxInclusive: priceSummary?.pricingStrategy?.taxInclusive,
			})),
		),
	).then((results) => {
		itemDetails = results;
	});

	await Promise.all(
		itemDetails.map((item) =>
			fetchProduct(item?.sku).then((productSummary) => ({
				...item,
				productAttributes:
					typeof productSummary?.attributes !== "undefined" &&
					productSummary?.attributes?.length !== 0
						? productSummary?.attributes.map((feature) => ({
								featureText: feature.value,
								id: feature?.id,
							}))
						: [],
				productDescription: productSummary?.description,
			})),
		),
	).then((results) => {
		itemDetails = results;
	});

	return itemDetails;
};

export default getItemDetails;