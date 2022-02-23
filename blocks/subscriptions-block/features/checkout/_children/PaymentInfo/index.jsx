import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import PaymentForm from "../../../../components/PaymentForm";

const PaymentInfo = ({ orderNumber, paymentDetails, paymentMethodID, successURL }) => {
	const [stripeInstance, setStripeInstance] = useState(null);

	// initialized payment doc https://redirector.arcpublishing.com/alc/docs/api/arc-sdks/interfaces/_sdk_sales_src_sdk_order_.initializedpayment.html
	const { parameter2: stripeKey, parameter1: clientSecret } = paymentDetails;

	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const formErrorText = phrases.t("subscriptions-block.payment-error");
	const formLabel = phrases.t("subscriptions-block.credit-card-information");
	const formTitle = phrases.t("subscriptions-block.payment-information");
	const submitText = phrases.t("subscriptions-block.submit-payment");

	// load stripe key via payment details stripe key string
	useEffect(() => {
		// stripe docs https://stripe.com/docs/stripe-js/react#elements-provider
		loadStripe(stripeKey).then((newStripePromise) => setStripeInstance(newStripePromise));
	}, [stripeKey]);

	if (stripeInstance) {
		// elements wrapper has to contain any stripe hooks
		return (
			<Elements stripe={stripeInstance}>
				<PaymentForm
					clientSecret={clientSecret}
					formErrorText={formErrorText}
					formLabel={formLabel}
					formTitle={formTitle}
					orderNumber={orderNumber}
					paymentMethodID={paymentMethodID}
					stripeInstance={stripeInstance}
					submitText={submitText}
					successURL={successURL}
				/>
			</Elements>
		);
	}

	return null;
};

export default PaymentInfo;
