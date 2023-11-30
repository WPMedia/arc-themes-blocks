import React from "react";
import { render } from "@testing-library/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./index";

// test string via stripe
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

it("renders", () => {
	render(
		<Elements stripe={stripePromise}>
			<PaymentForm
				formTitle="Payment Method and Information"
				formLabel="Credit card information"
				submitText="Purchase Subscription"
			/>
		</Elements>
	);

	expect(screen.getByRole("button")).not.toBeNull();
	expect(screen.getByText("Purchase Subscription")).not.toBeNull();

	expect(screen.getByText("Payment Method and Information")).not.toBeNull();
	expect(screen.getByText("Credit card information")).not.toBeNull();
});