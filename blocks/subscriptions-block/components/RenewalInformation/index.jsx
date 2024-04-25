import React from "react";

import { usePhrases, Heading, Stack } from "@wpmedia/arc-themes-components";
import PriceRates from "../PriceRates";

const RenewalInformation = ({ order, className }) => {
	const phrases = usePhrases();

	return (
		<Stack className={`${className}__review-renewalInformation`}>
			<Heading>{phrases.t("checkout-block.automatic-renewal-terms-title")}</Heading>
			<div className={`${className}__review-renewalInformation-rates`}>
				<p>{phrases.t("checkout-block.automatic-renewal-terms-intro")}</p>
				<div>
					{order?.items?.map((item) => {
						return (
							<PriceRates
								key={item?.priceCode}
								id={item?.priceCode}
								priceRates={item?.rates}
								currency={order?.currency}
							/>
						);
					})}
				</div>
			</div>
			<p>{phrases.t("checkout-block.sales-tax-may-apply")}</p>
			<p>{phrases.t("checkout-block.automatic-renewal-terms-description")}</p>
		</Stack>
	);
};

export default RenewalInformation;
