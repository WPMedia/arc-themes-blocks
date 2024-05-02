import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@wpmedia/arc-themes-components", () => ({
  ...jest.requireActual("@wpmedia/arc-themes-components"),
  Icon: () => <i />
}));

import SubscriptionCard from "./index";

jest.mock("fusion:properties", () => jest.fn(() => ({ api: { retail: { origin: "" } } })));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

const setSelectedSub = jest.fn(() => {});
const setIsCancelModalOpen = jest.fn(() => {});
const setIsResubModalOpen = jest.fn(() => {});
const setSelectedPrice = jest.fn(() => {});

const sub = {
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

describe("SubscriptionCard component", () => {
	it("renders component", () => {
		
		render(
			<SubscriptionCard
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        sub={sub}
        setSelectedSub={setSelectedSub}
        setIsCancelModalOpen={setIsCancelModalOpen}
        setIsResubModalOpen={setIsResubModalOpen}
        setSelectedPrice={setSelectedPrice}
			/>
		);
		expect(screen.getByText(`#${sub?.subscriptionID}`)).toBeInTheDocument();

		expect(screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-start")).not.toBeNull();
		expect(screen.getByText("subscription-block.shared-Payment-method")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-payment-string")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-next-bill")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-payment-method-details-billing-statement")).not.toBeNull();
		expect(screen.getByText("subscriptions-block.subscription-profile-management-billing-address")).not.toBeNull();
	});
});
