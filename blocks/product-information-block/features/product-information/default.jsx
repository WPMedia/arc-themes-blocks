import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import { Heading, Price, Stack } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-information";

const getPrice = (type, prices) => (prices && prices.filter((x) => x.type === type)?.[0]) || null;

const priceDisplay = (pricing, item) =>
	new Intl.NumberFormat(pricing?.currencyLocale, {
		style: "currency",
		currency: pricing?.currencyCode,
		minimumFractionDigits: 2,
	}).format(item.amount);

export const ProductInformationDisplay = ({ data }) => {
	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const pricing = (data?.pricing && data?.pricing[0]) || null;
	const ListPrice = getPrice("List", pricing?.prices);
	const SalePrice = getPrice("Sale", pricing?.prices);
	const salePriceAmount = SalePrice?.amount;
	const listPriceAmount = ListPrice?.amount;
	const isOnSale = salePriceAmount && salePriceAmount !== listPriceAmount;

	return (
		<Stack className={`${BLOCK_CLASS_NAME}`}>
			{data.name ? <Heading>{data.name}</Heading> : null}
			{ListPrice ? (
				<Price className={`${!isOnSale ? `${BLOCK_CLASS_NAME}__product-single-price` : ""}`}>
					{isOnSale ? (
						<Price.Sale
							aria-label={phrases.t("product-information.sale-price", {
								price: priceDisplay(pricing, SalePrice),
							})}
						>
							{priceDisplay(pricing, SalePrice)}
						</Price.Sale>
					) : null}
					<Price.List
						aria-label={phrases.t("product-information.list-price", {
							price: priceDisplay(pricing, ListPrice),
						})}
					>
						{priceDisplay(pricing, ListPrice)}
					</Price.List>
				</Price>
			) : null}
		</Stack>
	);
};

const ProductInformation = () => {
	const { globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length) {
		return null;
	}

	return <ProductInformationDisplay data={globalContent} />;
};

ProductInformation.label = "Product Information - Arc Block";

ProductInformation.icon = "cursor-information";

export default ProductInformation;
