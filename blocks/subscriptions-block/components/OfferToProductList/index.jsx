import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Grid } from "@wpmedia/arc-themes-components";
import useSales from "../useSales";
import OfferCard from "../OfferCard";

export const ARCXP_CART = 'ArcXP_cart';
export const ARCXP_CAMPAIGN = 'ArcXP_campaignName';

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
								.then(() => {
									Sales.addItemToCart([
										{
											sku,
											priceCode,
											quantity: 1,
										},
									]);
									const allValidUntil = offer?.campaigns?.map(c => c.validUntil !== undefined && !Number.isNaN(c.validUntil));
									const maxEndDate = allValidUntil.length ? Math.max(allValidUntil) : null;
									const liveCampaing = offer?.campaigns?.find(c => c.validUntil === null || c.validUntil === maxEndDate);
									localStorage.setItem(ARCXP_CAMPAIGN, liveCampaing?.name);
								})
								.then(() => {
									if (isLoggedIn) {
										window.location.href = checkoutURL;
										return;
									}
									localStorage.setItem(ARCXP_CART, JSON.stringify({sku, priceCode}));
									window.location.href = `${loginURL}&redirect=${checkoutURL}`;
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

	const childCount = builtOffers.length;
	const additionalClass = childCount ? `${className}__grid-list--${childCount}` : "";

	return (
		<Grid className={`${className}__grid-list ${additionalClass}`}>
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
		</Grid>
	);
};

OfferToProductList.propTypes = {
	offer: PropTypes.any,
	isLoggedIn: PropTypes.bool,
	loginURL: PropTypes.string,
	checkoutURL: PropTypes.string,
};

export default OfferToProductList;