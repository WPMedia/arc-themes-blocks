import React from "react";
import { Paragraph, usePhrases, Stack, Button } from "@wpmedia/arc-themes-components";

import OrderInformation from "../../../../components/OrderInformation";
import RenewalInformation from "../../../../components/RenewalInformation";
import PaymentIcon, { PAYPAL as paypalIcon } from "../../../../components/PaymentIcons";

import { STRIPEINTENTS, PAYPAL } from "../../../../utils/constants";

const ReviewOrder = ({
	order,
	offerURL,
	paymentOptionSelected,
	termsOfSaleURL,
	termsOfServiceURL,
	checkFinalizePayment,
	setCheckFinalizePayment,
	className,
}) => {
	const phrases = usePhrases();

	const handlePayment = () => {
		setCheckFinalizePayment(!checkFinalizePayment);
	};

	const PaymentButton = () => {
		if (paymentOptionSelected === STRIPEINTENTS) {
			return (
				<Button size="medium" variant="primary" fullWidth onClick={handlePayment} type="submit">
					<span>{phrases.t("subscriptions-block.submit-payment")}</span>
				</Button>
			);
		}

		if (paymentOptionSelected === PAYPAL) {
			return (
				<Button size="medium" variant="primary" fullWidth className={`${className}__review-paypal-button`} type="submit">
					<>
						<span>{phrases.t("subscriptions-block.submit-payment-paypal")} </span>
						<PaymentIcon type={paypalIcon} />
					</>
				</Button>
			);
		}

		// if(paymentOptionSelected === APPLEPAY){
		// 	return();
		// };

		// if(paymentOptionSelected === GOOGLEPAY){
		// 	return();
		// }
	};

	return (
		<Stack className={`${className}__review`}>
			<OrderInformation
				offerURL={offerURL}
				showOfferURL={false}
				showPriceDescription={true}
				showProductFeatures={false}
				orderDetails={order}
				showBorder={true}
				className={className}
			/>
			<RenewalInformation order={order} className={className} />
			<div className={`${className}__review__tos-container`}>
				<Paragraph
					dangerouslySetInnerHTML={{
						__html: phrases.t("subscriptions-block.terms-sales-service-text", {
							termsOfSaleURL,
							termsOfServiceURL,
						}),
					}}
				/>
			</div>
			<PaymentButton />
		</Stack>
	);
};
export default ReviewOrder;
