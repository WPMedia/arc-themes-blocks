import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import BasicSubscriptionDetail from "./index";

jest.mock("fusion:properties", () => jest.fn(() => ({ api: { retail: { origin: "" } } })));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

const sub = {
  subscriptionID: "123456",
	"status": 1,
	"events": [
			{
					"eventDateUTC": 1713815853000,
					"details": "{\"sku\": \"123\"}",
					"eventType": "START_SUBSCRIPTION"
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
	"billingAddress": {
			"country": "US",
			"line1": "123 test dr.",
			"line2": "suite A",
			"locality": "San Diego",
			"region": "LA",
			"postal": "12345"
	},
	"currentRetailCycleIDX": 1
}

describe("BasicSubscriptionDetail component", () => {
	it("renders component with active sub", () => {
		
		render(
			<BasicSubscriptionDetail
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        sub={sub}
			/>
		);
		expect(screen.getByText(sub?.productName)).toBeInTheDocument();
		expect(screen.getByText(`#${sub?.subscriptionID}`)).toBeInTheDocument();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-start")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-link-active")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-statusBadge-active")).not.toBeNull();
	});

	it("renders component with cancelled sub", () => {
		
		render(
			<BasicSubscriptionDetail
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        sub={{...sub, status: 3}}
			/>
		);
		expect(screen.getByText(sub?.productName)).toBeInTheDocument();
		expect(screen.getByText(`#${sub?.subscriptionID}`)).toBeInTheDocument();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-start")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-link-canceled")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-statusBadge-canceled")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-cancel")).not.toBeNull();
	});
});
