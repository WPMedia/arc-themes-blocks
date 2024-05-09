import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import RenewalInformation from ".";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase) => phrase),
	})),
	Heading: ({ dangerouslySetInnerHTML, children }) =>
		dangerouslySetInnerHTML ? (
			<h1 dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
		) : (
			<div>{children}</div>
		),
	Stack: ({ children }) => <div>{children}</div>,
}));

const orderDetail = {
	email: "checkoutTest@gmail.com",
	orderNumber: "P8NQ5OK4PPQI9NUG",
	orderType: "Parent",
	phone: "NA",
	status: "Pending",
	subtotal: 20,
	total: 20,
	totalTax: 0,
	shipping: 0,
	items: [
		{
			sku: "test",
			quantity: 1,
			shortDescription: "<p>test-1</p>",
			name: "test product",
			price: 20,
			tax: 0,
			subtotal: 20,
			total: 20,
			priceCode: "YLE801",
			eventId: null,
			ownerClientId: null,
			attributes: [],
			gift: false,
			priceName: "test price",
			priceDescription: "<p>this is the description section</p>",
			priceSummary: "<p>summary price</p>",
			rates: [
				{
					amount: "20.00",
					billingCount: 1,
					billingFrequency: "Month",
					durationCount: 1,
					duration: "UntilCancelled",
				},
			],
			taxInclusive: true,
			productAttributes: [
				{
					featureText: "<p>a lot of testing</p>",
					id: 19428,
				},
				{
					featureText: "<p>test2</p>",
					id: 19682,
				},
			],
			productDescription: "<p>test-1</p>",
		},
	],
	payments: [],
	billingAddress: {
		line1: "Prol Manuel Lopez Cotilla 869",
		line2: null,
		locality: "tlaquepaque",
		region: "Jalisco",
		country: "MX",
		postal: "45610",
	},
	shippingAddress: null,
	subscriptionIDs: [],
	currency: "USD",
	firstName: null,
	lastName: null,
	secondLastName: null,
	orderDate: 1715055143000,
	orderID: 192018,
	clientID: "01038844-815c-4dd1-8050-e4028091bba6",
};

describe("Renewal Information", () => {
	it("renewal information", () => {
		render(<RenewalInformation order={orderDetail} />);

		expect(screen.getByText("checkout-block.automatic-renewal-terms-title")).toBeInTheDocument();
        expect(screen.getByText("checkout-block.automatic-renewal-terms-intro")).toBeInTheDocument();
        expect(screen.getByText("$20.00 checkout-block.rates-single-untilCancelled-month")).toBeInTheDocument();
        expect(screen.getByText("checkout-block.sales-tax-may-apply")).toBeInTheDocument();
        expect(screen.getByText("checkout-block.automatic-renewal-terms-description")).toBeInTheDocument();
	});
});
