import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from ".";

export default {
	title: "Blocks/Subscriptions/Components/Payment Form",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

// test string via stripe
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export const basic = () => (
	<Elements stripe={stripePromise}>
		<PaymentForm
			formTitle="Payment Method and Information"
			formLabel="Credit card information"
			submitText="Purchase Subscription"
		/>
	</Elements>
);
