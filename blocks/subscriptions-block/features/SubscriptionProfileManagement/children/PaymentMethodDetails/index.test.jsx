import React from "react";

import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const originalFetch = global.fetch;

import PaymentMethodDetails from "./index";

jest.mock("@wpmedia/arc-themes-components", () => ({
  ...jest.requireActual("@wpmedia/arc-themes-components"),
  Icon: () => <i />
}));

jest.mock("fusion:properties", () => jest.fn(() => ({ api: { retail: { origin: "" } } })));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

const setPrice = jest.fn(() => {});

const sub = {
  "subscriptionID": 723395849619906,
  "events": [
      {
          "eventDateUTC": 1713815853000,
          "details": "{\"sku\": \"123\"}",
          "eventType": "START_SUBSCRIPTION"
      }
  ],
  "status": 2,
  "currentPaymentMethod": {
      "creditCardType": "Visa",
      "lastFour": "1111",
      "expiration": "1025",
      "cardHolderName": "edward cho",
      "paymentPartner": "StripeIntents",
      "paymentMethodID": 209602
  },
  "currentRetailCycleIDX": 1
}

describe("PaymentMethodDetails component", () => {
	afterEach(() => {
		global.fetch = originalFetch;
	});

	it("renders component", () => {
		
		render(
			<PaymentMethodDetails
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        sub={sub}
        setPrice={setPrice}
			/>
		);
    expect(setPrice).toHaveBeenCalled();
		expect(screen.getByText("subscription-block.shared-Payment-method")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-payment-string")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-next-bill")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-billing-statement")).not.toBeNull();
	});

	it("calls getNextRate when price and sub are both available", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						pricingStrategy: {
							name: "Monthly Plan",
							rates: [{ amount: "10.00", billingFrequency: "Month", billingCount: 1, duration: "UntilCancelled", durationCount: 1 }],
							currencyCode: "USD",
						},
						price: "10.00",
						paymentDate: 1716407853000,
					}),
			}),
		);
		jest.mock("fusion:properties", () => jest.fn(() => ({ api: { retail: { origin: "https://api.example.com", endpoint: "/retail/public/v1/pricing/paymentInfo/" } } })));
		await act(async () => {
			render(
				<PaymentMethodDetails
					customFields={{ offerURL: "/offer-url/" }}
					sub={{ ...sub, priceCode: "ABC123" }}
					setPrice={jest.fn()}
					className="b-sub"
				/>
			);
		});
		expect(screen.getByText("subscription-block.shared-Payment-method")).not.toBeNull();
	});

  it("renders when there is no subscription", () => {
		
		render(
			<PaymentMethodDetails
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        sub={null}
        setPrice={setPrice}
			/>
		);
    expect(setPrice).toHaveBeenCalled();
		expect(screen.getByText("subscription-block.shared-Payment-method")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-next-bill")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-billing-statement")).not.toBeNull();
	});
});
