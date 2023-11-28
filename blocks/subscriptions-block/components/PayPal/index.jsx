import React from "react";
import { usePaymentRedirect } from "../usePaymentRedirect";

export const PaypalCheckout = ({ labelOrderNumber, paypal, orderNumber, isUpdatePaymentMethod, successURL, successUpdateURL, isInitialized }) => {
	const params = new URLSearchParams(window.location.search);
	const token = params.get("token");

	// Paypal can't pass back the orderNumber to us (like other payment methods does, e.g. payment express), we store it in local storage
	if (orderNumber) {
		localStorage.setItem(labelOrderNumber, orderNumber);
	} else {
		orderNumber = localStorage[labelOrderNumber];
	}

	const { error } = usePaymentRedirect(paypal, orderNumber, isUpdatePaymentMethod, token, "parameter1", successURL, successUpdateURL, isInitialized);

	return (
		<>
			<div>{token ? "Processing..." : "Redirecting to paypal page..."}</div>
			<pre>{error && JSON.stringify(error, null, 2)}</pre>
		</>
	);
};

PaypalCheckout.displayName = "PaypalCheckout";

export default PaypalCheckout;
