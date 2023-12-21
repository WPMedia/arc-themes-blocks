import React from "react";
import { usePaymentRedirect } from "../usePaymentRedirect";
import { usePhrases } from "@wpmedia/arc-themes-components";

export const PaypalCheckout = ({ labelOrderNumber, paypal, orderNumber, successURL }) => {
	const phrases = usePhrases();
	const params = new URLSearchParams(window.location.search);
	const token = params.get("token");

	// Paypal can't pass back the orderNumber to us (like other payment methods does, e.g. payment express), we store it in local storage
	if (orderNumber) {
		localStorage.setItem(labelOrderNumber, orderNumber);
	} else {
		orderNumber = localStorage[labelOrderNumber];
	}

	const { error } = usePaymentRedirect(paypal, orderNumber, token, "parameter1", successURL);

	return (
		<>
			<div data-testid="paypal-message-div">{token ? phrases.t("subscriptions-block.paypal-processing") : phrases.t("subscriptions-block.paypal-redirect-label")}</div>
			<div data-testid="paypal-error-message-div">{error && phrases.t("subscriptions-block.payment-error") }</div>
		</>
	);
};

PaypalCheckout.displayName = "PaypalCheckout";

export default PaypalCheckout;
