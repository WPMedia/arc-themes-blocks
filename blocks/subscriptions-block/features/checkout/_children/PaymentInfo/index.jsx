import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { usePhrases } from "@wpmedia/arc-themes-components";

import PaymentForm from "../../../../components/PaymentForm";

const PaymentInfo = ({ orderNumber, paymentDetails, paymentMethodID, successURL, className }) => {
	const [stripeInstance, setStripeInstance] = useState(null);

	// initialized payment doc https://redirector.arcpublishing.com/alc/en/arc-xp-subscriptions-sdks?id=kb_article_view&sys_kb_id=7770d58747447990eee38788436d4362&spa=1
	const { parameter2: stripeKey, parameter1: clientSecret } = paymentDetails;

	const phrases = usePhrases();

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
					className={className}
				/>
			</Elements>
		);
	}

	return null;
};

export default PaymentInfo;
