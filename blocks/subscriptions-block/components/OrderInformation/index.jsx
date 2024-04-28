import React from "react";

import { usePhrases, Link, Heading, Paragraph, Stack } from "@wpmedia/arc-themes-components";
import { FeatureDetails } from "../OfferCard";
import currency from "../../utils/currency";

const OrderSummary = ({ orderDetails, className }) => {
	const phrases = usePhrases();

	return (
		<Stack className={`${className}__summary`}>
			<Heading>{phrases.t("checkout-block.order-summary")}</Heading>
			<Stack className={`${className}__summary--details`}>
				<Stack
					direction="horizontal"
					justification="space-between"
					className={`${className}__summary--details--item`}
				>
					<p>{phrases.t("checkout-block.subtotal")}</p>
					<p>{`${currency(orderDetails?.currency)}${orderDetails?.subtotal}`}</p>
				</Stack>
				<Stack
					direction="horizontal"
					justification="space-between"
					className={`${className}__summary--details--item`}
				>
					<p>{phrases.t("checkout-block.salesTax")}</p>
					<p>
						{orderDetails?.tax > 0
							? `${currency(orderDetails?.currency)}${orderDetails?.tax}`
							: "--"}
					</p>
				</Stack>
			</Stack>
			<div className={`${className}__summary--dueToday`}>
				<p>{phrases.t("checkout-block.due-today")}</p>
				<p>{`${currency(orderDetails?.currency)}${orderDetails?.total}`}</p>
			</div>
		</Stack>
	);
};

const ProductPriceDetails = ({
	details = [],
	showPriceDescription,
	showProductFeatures,
	className,
}) => {
	if (details?.items?.length) {
		return details?.items?.map((item) => (
			<Stack as="div" className={`${className}__orderCard--productPrice`}>
				<Heading> {item.priceName}</Heading>
				{showPriceDescription && (
					<Paragraph dangerouslySetInnerHTML={{ __html: item?.priceDescription }} />
				)}
				{showProductFeatures && (
					<FeatureDetails
						features={item?.productAttributes}
						className={`${className}__orderCard`}
					/>
				)}
			</Stack>
		));
	}
	return null;
};

const OrderInformation = ({
	id,
	offerURL,
	showOfferURL,
	showPriceDescription,
	showProductFeatures,
	orderDetails,
	showBorder,
	className,
}) => {
	const phrases = usePhrases();

	return (
		<div className={showBorder ? `${className}__orderCard-borderOn` : undefined}>
			<section key={`orderInfo${id && `-${id}`}`} className={`${className}__orderCard`}>
				<ProductPriceDetails
					key={id}
					details={orderDetails}
					showPriceDescription={showPriceDescription}
					showProductFeatures={showProductFeatures}
					className={className}
				/>
				{showOfferURL && (
					<Link href={offerURL}>{phrases.t("checkout-block.view-subscription-offers")}</Link>
				)}
				<OrderSummary orderDetails={orderDetails} className={`${className}__orderCard`} />
			</section>
		</div>
	);
};

export default OrderInformation;
