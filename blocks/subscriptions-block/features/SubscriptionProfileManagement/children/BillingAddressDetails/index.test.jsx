import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import BillingAddressDetails from "./index";

jest.mock("fusion:properties", () => jest.fn(() => ({ api: { retail: { origin: "" } } })));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

const sub = {
  billingAddress: {
    line1: "123 test st.",
    locality: "San Francisco",
    region: "CA",
    postal: "94151",
    country: "US"
  }
}

describe("BillingAddressDetails component", () => {
	it("renders component", () => {
		
		render(
			<BillingAddressDetails
				customFields={{
					offerURL: "/offer-url/",
          showCancelLink: true,
          showResubscribeLink: true
				}}
        sub={sub}
			/>
		);

		expect(screen.getByText("123 test st., San Francisco, CA 94151 US")).toBeInTheDocument();

		const contactInfo = screen.getByText("subscriptions-block.subscription-profile-management-billing-address");
		expect(contactInfo).not.toBeNull();
	});
});
