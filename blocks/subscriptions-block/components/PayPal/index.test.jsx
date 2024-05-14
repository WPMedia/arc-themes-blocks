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