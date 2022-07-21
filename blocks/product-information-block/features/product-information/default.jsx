import React from "react";
import { useFusionContext } from "fusion:context";

import { Heading, HeadingSection, Price, Stack } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-information";

const getPrice = (type, prices) => (prices && prices.filter((x) => x.type === type)?.[0]) || null;

export const ProductInformationDisplay = ({ data }) => {
	const pricing = (data?.pricing && data?.pricing[0]) || null;
	const ListPrice = getPrice("List", pricing?.prices);

	return (
		<Stack className={`${BLOCK_CLASS_NAME}`}>
			<HeadingSection>
				{data.name ? <Heading>{data.name}</Heading> : null}
				{ListPrice ? (
					<Price>
						<Price.List>
							{new Intl.NumberFormat(pricing?.currencyLocale, {
								style: "currency",
								currency: pricing?.currencyCode,
								minimumFractionDigits: 2,
							}).format(ListPrice.amount)}
						</Price.List>
					</Price>
				) : null}
			</HeadingSection>
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

ProductInformation.label = "Product Infomration - Arc Block";

ProductInformation.icon = "cursor-information";

export default ProductInformation;
