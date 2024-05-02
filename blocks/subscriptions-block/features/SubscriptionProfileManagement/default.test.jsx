import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SubscriptionProfileManagement from "./default";

const mockSubs = [
  {
    "subscriptionID": 723395849619906,
    "events": [
        {
            "eventDateUTC": 1713815853000,
            "details": "{\"sku\": \"123\"}",
            "eventType": "START_SUBSCRIPTION"
        }
    ],
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
]

const mockSub = {
  "subscriptionID": 723395849619906,
  "events": [
      {
          "eventDateUTC": 1713815853000,
          "details": "{\"sku\": \"123\"}",
          "eventType": "START_SUBSCRIPTION"
      }
  ],
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

jest.mock("@wpmedia/arc-themes-components", () => ({
  ...jest.requireActual("@wpmedia/arc-themes-components"),
  useSales: () => ({
    Sales: {
      getAllSubscriptions: jest.fn(async() => await (mockSubs)),
      getSubscriptionDetails: jest.fn(async() => await (mockSub))
    }
  }),
  useIdentity: () => ({Identity: {
    isLoggedIn: jest.fn(() => true)
  }})
}));

jest.mock("@wpmedia/arc-themes-components")

jest.mock("../../components/PaymentIcons", () => {
  const PaymentIcon = () => <i />
  return PaymentIcon;
});

jest.mock("fusion:properties", () => jest.fn(() => ({ api: { retail: { origin: "" } } })));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

const fetchSubs = jest.fn(() => {});

const subscriptions = [
  {
    "subscriptionID": 723395849619906,
    "events": [
        {
            "eventDateUTC": 1713815853000,
            "details": "{\"sku\": \"123\"}",
            "eventType": "START_SUBSCRIPTION"
        }
    ],
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
]

describe("SubscriptionProfileManagement component", () => {
	it("renders component", async () => {
		
		render(
			<SubscriptionProfileManagement
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        subscriptions={subscriptions}
        fetchSubs={fetchSubs}
			/>
		);
		expect(await screen.findByText("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-start")).not.toBeNull();
		expect(await screen.findByText("subscription-block.shared-Payment-method")).not.toBeNull();
		expect(await screen.findByText("subscriptions-block.subscription-profile-management-payment-method-details-payment-string")).not.toBeNull();
		expect(await screen.findByText("subscriptions-block.subscription-profile-management-payment-method-details-next-bill")).not.toBeNull();
		expect(await screen.findByText("subscriptions-block.subscription-profile-management-payment-method-details-billing-statement")).not.toBeNull();
		expect(await screen.findByText("subscriptions-block.subscription-profile-management-billing-address")).not.toBeNull();
	});

  it("renders component when there are no subscriptions", async () => {
		
		render(
			<SubscriptionProfileManagement
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
			/>
		);
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-start")).toBeNull();
		expect(screen.queryByText("subscription-block.shared-Payment-method")).toBeNull();
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-payment-method-details-payment-string")).toBeNull();
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-payment-method-details-next-bill")).toBeNull();
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-payment-method-details-billing-statement")).toBeNull();
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-billing-address")).toBeNull();
	});
});
