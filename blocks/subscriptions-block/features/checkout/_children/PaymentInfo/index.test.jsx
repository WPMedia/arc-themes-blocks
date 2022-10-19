import React from "react";
import { mount } from "enzyme";

import PaymentInfo from "./index";

jest.mock("@stripe/stripe-js", () => ({ loadStripe: () => Promise.resolve({}) }));

describe("PaymentInfo", () => {
	it("renders null initially waiting for the resolved promise", () => {
		const wrapper = mount(
			<PaymentInfo
				orderNumber={1}
				paymentDetails={{
					parameter1: "client_secret",
					parameter2: "stripe_key",
				}}
				paymentMethodID={1}
				successURL="https://success.url"
			/>
		);
		expect(wrapper.html()).toBe(null);
	});
});
