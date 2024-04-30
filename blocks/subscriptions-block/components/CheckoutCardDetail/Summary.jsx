import React from "react";
import { usePhrases, Paragraph } from "@wpmedia/arc-themes-components";
import PaymentIcon from "../PaymentIcons";
import { STRIPEINTENTS } from "../../utils/constants";

export const SummaryAccount = ({ account }) => <Paragraph>{account?.email}</Paragraph>;

export const SummaryBillingAddress = ({ billingAddress }) => (
	<Paragraph>
		{billingAddress?.line1 ||
			(billingAddress?.line2 && (
				<>
					<span>{billingAddress?.line1}</span>
					{billingAddress?.line2 && <span> {billingAddress?.line2}</span>}
				</>
			))}
		{billingAddress?.locality && <span>{` ${billingAddress?.locality}, `}</span>}
		{billingAddress?.region && <span>{`${billingAddress?.region}, `}</span>}
		{billingAddress?.postal && <span>{`${billingAddress?.postal}, `}</span>}
		{billingAddress?.country && <span>{billingAddress?.country}</span>}
	</Paragraph>
);

export const SummaryPayment = ({ paymentDetails }) => {
	const phrases = usePhrases();

	if (paymentDetails?.paymentOptionSelected === STRIPEINTENTS) {
		return (
			<Paragraph>
				{paymentDetails?.card?.brand && (
					<PaymentIcon type={paymentDetails?.card?.brand?.toLowerCase()} />
				)}
				{paymentDetails?.card?.brand && <span> {paymentDetails?.card?.brand}</span>}
				{paymentDetails?.card?.last4 && (
					<span>
						{" "}
						<strong>{"\u2219".repeat(4)}</strong> {paymentDetails?.card?.last4}
					</span>
				)}
				{paymentDetails?.card?.exp_month && paymentDetails?.card?.exp_year && (
					<span>
						{" "}
						{phrases.t("checkout-block.expires")} {paymentDetails?.card?.exp_month}/
						{paymentDetails?.card?.exp_year}
					</span>
				)}
			</Paragraph>
		);
	}

	if (paymentDetails?.paymentOptionSelected !== STRIPEINTENTS) {
		return (
			<Paragraph>
				<PaymentIcon type={paymentDetails?.paymentOptionSelected} />
			</Paragraph>
		);
	}

	return null;
};
