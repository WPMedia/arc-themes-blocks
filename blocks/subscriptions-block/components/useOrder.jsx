import { useState, useEffect } from "react";

import { useSales } from "@wpmedia/arc-themes-components";
import { ARCXP_CAMPAIGN } from "./OfferToProductList";
import useOffer from "./useOffer";

const useOrder = (orderNumber) => {
	const { Sales } = useSales();

	const [order, setOrder] = useState();
    const [orderDetails, setOrderDetails] = useState();
	const [cart, setCart] = useState();
    const [cartDetails, setCartDetails] = useState();
	const [error, setError] = useState();

	const [campaignName, setCampaignName] = useState();

	const { offer } = useOffer({
		campaignCode: campaignName,
	});

	useEffect(() => {
		const getCart = async () => {
			const cart = await Sales.getCart();
			setCart(cart);
		};
		getCart();

		const campaignName = localStorage.getItem(ARCXP_CAMPAIGN);
		setCampaignName(campaignName);
	}, []);

	useEffect(() => {
		const getOrder = async () => {
			try{
				const order = await Sales.getOrderDetails(orderNumber);
				setOrder(order);
			}catch(e){
				setError(e);
			}
		};
		if (orderNumber) {
			getOrder();
		}
	}, [orderNumber]);

	useEffect(() => {
		const getProductPriceDetailsFromOffer = (sku, priceCode) => {
			let productAttributes;
            let productDescription;
			let priceName;
            let priceDescription;
            let priceSummary;
			let rates;

			const productBySku = offer?.products?.find((item) => item?.sku === sku);

			if (productBySku) {
				productAttributes =
					typeof productBySku?.attributes !== "undefined" && productBySku?.attributes?.length !== 0
						? productBySku?.attributes.map((feature) => ({
								featureText: feature.value,
							}))
						: [];
                productDescription = productBySku?.description;
                const pricingStrategy =   productBySku?.pricingStrategies?.find((price)=> price?.priceCode === priceCode);

				priceName = pricingStrategy?.name;
                priceDescription = pricingStrategy?.description;
                priceSummary = pricingStrategy?.summary;
                rates = pricingStrategy?.rates;
			}

			return {
				productAttributes,
                productDescription,
				priceName,
                priceDescription,
                priceSummary,
				rates,
			};
		};

		if (offer) {
			if (order) {
				const itemsDetail = order?.items?.map((item) => {
					const { productAttributes, productDescription, priceName, priceDescription, priceSummary, rates } = getProductPriceDetailsFromOffer(
						item?.sku,
						item?.priceCode,
					);
					return { ...item, productAttributes, productDescription, priceName, priceDescription, priceSummary, rates};
				});
                setOrderDetails({...order, items: itemsDetail})
			} else if (cart) {
				const itemsDetail = cart?.items?.map((item) => {
					const { productAttributes, productDescription, priceName, priceDescription, priceSummary, rates, taxInclusive }  = getProductPriceDetailsFromOffer(
						item?.sku,
						item?.priceCode,
					);
					return { ...item, productAttributes, productDescription, priceName,  priceDescription, priceSummary, rates, taxInclusive};
				});
                setCartDetails({...cart, items: itemsDetail})
			}
		}
	}, [order, cart, offer]);

	return {
		cartDetails,
		orderDetails,
		error
	};
};

export default useOrder;
