import { useState, useEffect, useCallback } from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

const priceCodeService = ({ origin, code, index, start }) =>
	fetch(`${origin}/retail/public/v1/pricing/paymentInfo/${code}/${index}/${start}`, {}).then((res) => res.json());

const usePrice = ({ priceCode, cycleIndex, startDate }) => {
	const { arcSite } = useFusionContext();
	const {
		api: {
			retail: { origin },
		},
	} = getProperties(arcSite);
	const [price, setPrice] = useState(null);
	const [error, setError] = useState(null);
	const [isFetching, setIsFetching] = useState(true);

	const fetchPrice = useCallback(
		async ({code, index, start}) => {
			try {
				const priceResponse = await priceCodeService({
					code,
					origin,
					index,
					start
				});
				setPrice(priceResponse);
				return priceResponse;
			} catch (err) {
				setError(`Error in fetching price details: ${err.toString()}`);
			}
			return null;
		},
		[origin]
	);

	useEffect(() => {
		const fetchNewPrice = async () => {
			setIsFetching(true);
			await fetchPrice({code: priceCode, index: cycleIndex, start: startDate});
			setIsFetching(false);
		};
		if (!price) {
			if (!origin) {
				setError("Origin properties not set in api.retail for this environment.");
			} else {
				fetchNewPrice();
			}
		}
	}, [cycleIndex, priceCode, fetchPrice, price, origin, startDate]);

	return {
		error,
		price,
		isFetching,
		fetchPrice,
	};
};

export default usePrice;