import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import useSales from "../useSales";
import GridList from "../GridList";
import OfferCard from "../OfferCard";

const OfferToProductList = ({ offer, isLoggedIn, checkoutURL, loginURL, className }) => {
	const { Sales } = useSales();

	const buildOffers = () => {
		const offers = [];
		let productIdx;
		let strategiesIdx;
		if (offer.products) {
			const { products } = offer;
			for (productIdx = 0; productIdx < products.length; productIdx += 1) {
				const { pricingStrategies: strategies } = products[productIdx];
				for (strategiesIdx = 0; strategiesIdx < strategies.length; strategiesIdx += 1) {
					const features =
						typeof products[productIdx].attributes !== "undefined" &&
						products[productIdx].attributes.length !== 0
							? products[productIdx].attributes.map((feature) => ({
									featureText: feature.value,
							  }))
							: [];
					const { sku } = products[productIdx];
					const { priceCode } = strategies[strategiesIdx];
					offers.push({
						key: strategies[strategiesIdx].pricingStrategyId,
						subHeadline: strategies[strategiesIdx].description,
						headline: strategies[strategiesIdx].name,
						actionText: strategies[strategiesIdx].summary,
						actionEvent: () => {
							Sales.clearCart()
								.then(() =>
									Sales.addItemToCart([
										{
											sku,
											priceCode,
											quantity: 1,
										},
									])
								)
								.then(() => {
									if (isLoggedIn) {
										window.location.href = checkoutURL;
										return;
									}
									window.location.href = `${loginURL}?redirect=${checkoutURL}`;
								});
						},
						features,
					});
				}
			}
		}
		return offers;
	};

	const builtOffers = buildOffers();

	return (
		<GridList className={className}>
			{builtOffers.map((builtOffer) => (
				<OfferCard
					key={builtOffer.key}
					subHeadline={builtOffer.subHeadline}
					headline={builtOffer.headline}
					actionText={builtOffer.actionText}
					actionEvent={builtOffer.actionEvent}
					features={builtOffer.features}
					className={className}
				/>
			))}
		</GridList>
	);
};

OfferToProductList.propTypes = {
	offer: PropTypes.any,
	isLoggedIn: PropTypes.bool,
	loginURL: PropTypes.string,
	checkoutURL: PropTypes.string,
};

export default OfferToProductList;
