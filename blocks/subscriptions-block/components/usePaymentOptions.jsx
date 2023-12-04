import { useState, useEffect } from "react";

import useSales from "./useSales";

const STRIPE_PAYMENT_METHOD_ID = 18;
const PAYPAL_METHOD_ID = 10;

const getPaymentMethodByID = (paymentOptions, paymentMethodTypeID, paymentMethodID) => {
	const stripeDefault = paymentOptions?.find(
		(opts) =>
			opts?.paymentMethodType === paymentMethodTypeID && opts?.paymentMethodID === paymentMethodID,
	);

	if (stripeDefault) {
		return stripeDefault;
	} else {
		const allStripeIntents = paymentOptions?.filter(
			(opts) => opts?.paymentMethodType === paymentMethodTypeID,
		);

		var minStripeIntentsID = allStripeIntents.reduce(function (res, obj) {
			return obj.paymentMethodID < res.paymentMethodID ? obj : res;
		});
		return minStripeIntentsID;
	}
};

// On subscriptions side we can setup multiple payment providers with the same typeID.
// This hook is on charge to return the default one or the one with the min paymentMethodID
export const usePaymentOptions = (stripeIntentsDefaultID, paypalDefaultID) => {
	const [paymentOpts, setPaymentOpts] = useState();
	const [paypal, setPaypal] = useState();
	const [stripeIntents, setStripeIntents] = useState();
	const [error, setError] = useState();

	const { Sales } = useSales();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const options = await Sales.getPaymentOptions();
				const stripe = getPaymentMethodByID(
					options,
					STRIPE_PAYMENT_METHOD_ID,
					stripeIntentsDefaultID,
				);
				const paypal = getPaymentMethodByID(options, PAYPAL_METHOD_ID, paypalDefaultID);
                setPaymentOpts(options);
                setPaypal(paypal);
                setStripeIntents(stripe);
			} catch (e) {
				setError(e);
			}
		};
		fetchData();
	}, []);

	return {
		paymentOpts,
		stripeIntents,
		paypal,
		error
	};
};

export default usePaymentOptions;