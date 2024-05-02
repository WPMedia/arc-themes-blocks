import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SubscriptionProfileManagementList from "./index";

jest.mock("@wpmedia/arc-themes-components", () => ({
  ...jest.requireActual("@wpmedia/arc-themes-components"),
  useSales: () => ({Sales: () => {}}),
  Icon: () => <i />
}));


jest.mock("@wpmedia/arc-themes-components")

jest.mock("fusion:properties", () => jest.fn(() => ({ api: { retail: { origin: "" } } })));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

const fetchSubs = jest.fn(() => {});

const subscriptions = [
  {
    "subscriptionID": 723395849619906,
    "sku": "123",
    "site": "the-gazette",
    "nextEventDateUTC": 1716407853000,
    "subscriptionType": 1,
    "status": 1,
    "events": [
        {
            "eventDateUTC": 1713815853000,
            "details": "{\"sku\": \"123\"}",
            "eventType": "START_SUBSCRIPTION"
        },
        {
            "eventDateUTC": 1713815877000,
            "details": "notes:test",
            "eventType": "REFUND_PAYMENT"
        },
        {
            "eventDateUTC": 1713815877000,
            "details": "test",
            "eventType": "TERMINATE_SUBSCRIPTION"
        }
    ],
    "salesOrders": [
        {
            "id": 189537,
            "orderDateUTC": 1713815840000,
            "orderNumber": "3EH6B8SLU5ACH1SY",
            "status": 3,
            "tax": 1.5,
            "shipping": 0,
            "total": 16.5,
            "currency": "USD"
        }
    ],
    "paymentHistory": [
        {
            "sku": "123",
            "currency": "USD",
            "total": 5.5,
            "tax": 0.5,
            "transactionDate": 1713815853000,
            "periodFrom": 1713815853000,
            "periodTo": 1716407853000
        },
        {
            "sku": "123",
            "currency": "USD",
            "total": 5.5,
            "tax": 0.5,
            "transactionDate": 1713815877000,
            "periodFrom": null,
            "periodTo": null
        }
    ],
    "productName": "product2",
    "priceCode": "7W6XH8",
    "currentPaymentMethod": {
        "creditCardType": "Visa",
        "lastFour": "1111",
        "expiration": "1025",
        "cardHolderName": "edward cho",
        "paymentPartner": "StripeIntents",
        "paymentMethodID": 209602
    },
    "clientID": "4c5ae536-8f72-4ec5-8b7f-7fb2a8991812",
    "billingAddress": {
        "country": "US",
        "line1": "123 test dr.",
        "line2": "suite A",
        "locality": "San Diego",
        "region": "LA",
        "postal": "12345"
    },
    "subscriptionAttributes": [
        {
            "name": "NumShares",
            "value": "0"
        }
    ],
    "currentRetailCycleIDX": 1
  }
]

describe("SubscriptionProfileManagementList component", () => {
	it("renders component", () => {
		
		render(
			<SubscriptionProfileManagementList
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        subscriptions={subscriptions}
        fetchSubs={fetchSubs}
			/>
		);
		expect(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-start")).not.toBeNull();
		expect(screen.getByText("subscription-block.shared-Payment-method")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-payment-string")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-next-bill")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-billing-statement")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-billing-address")).not.toBeNull();
	});

  it("renders component when there are no subscriptions", () => {
		
		render(
			<SubscriptionProfileManagementList
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        subscriptions={[]}
        fetchSubs={fetchSubs}
			/>
		);
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-start")).toBeNull();
		expect(screen.queryByText("subscription-block.shared-Payment-method")).toBeNull();
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-payment-method-details-payment-string")).toBeNull();
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-payment-method-details-next-bill")).toBeNull();
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-payment-method-details-billing-statement")).toBeNull();
		expect(screen.queryByText("subscriptions-block.subscription-profile-management-billing-address")).toBeNull();
	});

  it("renders cancel modal", async () => {
		render(
			<SubscriptionProfileManagementList
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        subscriptions={subscriptions}
        fetchSubs={fetchSubs}
			/>
		);
    fireEvent(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-link-active"), new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }))
    expect(screen.getByText("subscriptions-block.subscription-profile-management-cancel-modal-paragraph1")).toBeInTheDocument();
    expect(screen.getByText("subscriptions-block.subscription-profile-management-cancel-modal-paragraph2")).toBeInTheDocument();
    expect(screen.getByText("subscription-block.shared-No")).toBeInTheDocument();
    expect(screen.getByText("subscriptions-block.subscription-profile-management-cancel-modal-primary-button-text")).toBeInTheDocument();

    fireEvent(screen.getByText("subscription-block.shared-No"), new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }))

    expect(screen.queryByText("subscriptions-block.subscription-profile-management-cancel-modal-paragraph1")).toBeNull();
    expect(screen.queryByText("subscriptions-block.subscription-profile-management-cancel-modal-paragraph2")).toBeNull();
    expect(screen.queryByText("subscription-block.shared-No")).toBeNull();
    expect(screen.queryByText("subscriptions-block.subscription-profile-management-cancel-modal-primary-button-text")).toBeNull();
	});
});
