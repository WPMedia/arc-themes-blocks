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
  subscriptionID: "123456"
}

describe("BasicSubscriptionDetail component", () => {
	it("renders component", () => {
		
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

		expect(screen.getByText(`#${sub?.subscriptionID}`)).toBeInTheDocument();

		const contactInfo = screen.getByText("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-start");
		expect(contactInfo).not.toBeNull();
	});
});
