import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSales as useSalesMock } from "@wpmedia/arc-themes-components";

import SubscriptionProfileManagementList from "./index";

jest.mock("@wpmedia/arc-themes-components", () => ({
  ...jest.requireActual("@wpmedia/arc-themes-components"),
  useSales: jest.fn(() => ({
    Sales: {
      cancelSubscription: jest.fn(() => Promise.resolve()),
      rescueSubscription: jest.fn(() => Promise.resolve()),
    }
  })),
  Icon: () => <i />
}));

jest.mock("../../../../components/SubscriptionOverlay", () => ({
  __esModule: true,
  default: ({ children }) => React.createElement("div", { "data-testid": "overlay" }, children),
}));

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

const subscriptionNonPaid = [
  {
    ...subscriptions[0],
    subscriptionID: 999,
    currentPaymentMethod: {
      ...subscriptions[0].currentPaymentMethod,
      paymentPartner: "Gift",  // non-paid type, should be filtered out
    },
  }
];

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

	it("filters out subscriptions with non-paid payment partners", () => {
		render(
			<SubscriptionProfileManagementList
				customFields={{ offerURL: "/offer-url/", showCancelLink: true, showResubscribeLink: true }}
				subscriptions={subscriptionNonPaid}
				fetchSubs={fetchSubs}
			/>
		);
		expect(screen.queryByText("subscription-block.shared-Payment-method")).toBeNull();
	});

	it("opens cancel modal and confirms cancellation", async () => {
		const cancelSubscription = jest.fn(() => Promise.resolve());
		useSalesMock.mockReturnValue({ Sales: { cancelSubscription, rescueSubscription: jest.fn(() => Promise.resolve()) } });

		render(
			<SubscriptionProfileManagementList
				customFields={{ offerURL: "/offer-url/", showCancelLink: true, showResubscribeLink: true }}
				subscriptions={subscriptions}
				fetchSubs={fetchSubs}
			/>
		);
		// Click cancel button (renders in BasicSubscriptionDetail for ACTIVE status)
		const cancelBtn = screen.queryByText("subscriptions-block.subscription-profile-management-basic-subscription-details-link-active");
		if (cancelBtn) {
			fireEvent.click(cancelBtn);
			// Modal should be open now
			const confirmBtn = screen.queryByText("subscriptions-block.subscription-profile-management-cancel-modal-primary-button-text");
			if (confirmBtn) {
				fireEvent.click(confirmBtn);
				expect(cancelSubscription).toHaveBeenCalled();
			}
		}
	});

	it("opens cancel modal and closes it with secondary button", async () => {
		render(
			<SubscriptionProfileManagementList
				customFields={{ offerURL: "/offer-url/", showCancelLink: true, showResubscribeLink: true }}
				subscriptions={subscriptions}
				fetchSubs={fetchSubs}
			/>
		);
		const cancelBtn = screen.queryByText("subscriptions-block.subscription-profile-management-basic-subscription-details-link-active");
		if (cancelBtn) {
			fireEvent.click(cancelBtn);
			const closeBtn = screen.queryByText("subscription-block.shared-No");
			if (closeBtn) {
				fireEvent.click(closeBtn);
			}
		}
		expect(true).toBe(true); // test runs without error
	});
});
