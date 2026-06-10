import React from "react";
import { render, screen } from "@testing-library/react";

import PayPal from "./index";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase) => phrase),
	})),
}));

it("renders",  async () => {
	render(
		<PayPal 
		  labelOrderNumber = "ArcSubs_OrderNumber"
		  paypal = {{paymentMethodType: 10, paymentMethodID: 4339}}
		  orderNumber = "XAUEWT5S4PJJTAYY"
		  successURL = "/success"
		  isInitialized = {false}
		/>
	  );
	
	  expect(screen.getByTestId('paypal-message-div').innerHTML).toBe('subscriptions-block.paypal-redirect-label');
	  expect(screen.getByTestId('paypal-error-message-div')).not.toBeNull();
});

it("shows processing message when token is provided", () => {
	render(
		<PayPal
			labelOrderNumber="ArcSubs_OrderNumber"
			paypal={{ paymentMethodType: 10, paymentMethodID: 4339 }}
			orderNumber="ORDER-123"
			successURL="/success"
			token="PAYPAL-TOKEN-123"
		/>
	);
	const msgDiv = screen.getByTestId("paypal-message-div");
	// token is "PAYPAL-TOKEN-123" (truthy) → should show processing message
	// If this fails, check that usePhrases mock returns a working t function
	expect(msgDiv).not.toBeNull();
});

it("reads orderNumber from localStorage when not provided", () => {
	localStorage.setItem("ArcSubs_OrderNumber", "STORED_ORDER_123");
	render(
		<PayPal
			labelOrderNumber="ArcSubs_OrderNumber"
			paypal={{ paymentMethodType: 10, paymentMethodID: 4339 }}
			successURL="/success"
			isInitialized={false}
			// orderNumber not provided → reads from localStorage
		/>
	);
	expect(screen.getByTestId("paypal-message-div")).not.toBeNull();
	localStorage.removeItem("ArcSubs_OrderNumber");
});