import React from "react";
import { mount } from "enzyme";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./index";

// test string via stripe
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

it("renders", () => {
	const wrapper = mount(
		<Elements stripe={stripePromise}>
			<PaymentForm
				formTitle="Payment Method and Information"
				formLabel="Credit card information"
				submitText="Purchase Subscription"
			/>
		</Elements>
	);
	expect(wrapper.find("button").text()).toBe("Purchase Subscription");
	expect(wrapper.find("h2").text()).toBe("Payment Method and Information");
	expect(wrapper.find("label").text()).toBe("Credit card information");
});