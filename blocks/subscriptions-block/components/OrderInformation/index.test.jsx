import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import OrderInformation from "./index";

const orderDetail = {
	total: 21000,
	subtotal: 20000,
	tax: 1000,
	shipping: 0,
	items: [
		{
			sku: "0987",
			quantity: 1,
			shortDescription: "<p>COP Currency description</p>",
			name: "COP Currency",
			price: 20000,
			tax: 1000,
			subtotal: 20000,
			total: 21000,
			priceCode: "Q6R7UO",
			eventId: null,
			ownerClientId: null,
			attributes: [],
			gift: false,
			priceName: "All access Annual",
			priceDescription: "<p>Unlimited access to the daily intelligencer</p>",
			priceSummary: "<p>with tax summary price</p>",
			rates: [
				{
					amount: "20000.00",
					billingCount: 1,
					billingFrequency: "Month",
					durationCount: 1,
					duration: "UntilCancelled",
				},
			],
			taxInclusive: false,
			productAttributes: [
				{
					featureText: "<p>Unlimited access to economic news</p>",
					id: 19698,
				},
				{
					featureText: "<p>Save $40</p>",
					id: 19699,
				},
				{
					featureText: "<p>A <strong>bonus subscription</strong> to share</p>",
					id: 19700,
				},
			],
			productDescription: "<p>COP Currency description</p>",
		},
	],
	currency: "COP",
	taxSupported: true,
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase) => phrase),
	})),
	Stack: ({ children }) => <div>{children}</div>,
	Heading: ({ dangerouslySetInnerHTML, children }) =>
		dangerouslySetInnerHTML ? (
			<h1 dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
		) : (
			<div>{children}</div>
		),
	Icon: () => <svg>Icon</svg>,
	Link: ({href, children}) => <a href={href}>{children}</a>,
	Paragraph: ({ dangerouslySetInnerHTML }) => (
		<div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
	),
}));

describe("OrderInformation component", () => {
	it("renders the orderInformation component", () => {
		render(
			<OrderInformation
				id={1}
				offerURL="/offerURL/"
				showOfferURL
				showPriceDescription
				showProductFeatures
				orderDetails={orderDetail}
				showBorder
				className="b-checkkout"
			/>,
		);

		expect(screen.getByText(orderDetail?.items[0]?.priceName)).not.toBeNull();
		expect(screen.getByText("Unlimited access to the daily intelligencer")).not.toBeNull();

		const lists = screen.queryAllByRole("listitem");
		expect(lists.length).toBe(3);

		expect(screen.getByText("Unlimited access to economic news")).not.toBeNull();
		expect(screen.getByText("Save $40")).not.toBeNull();
		expect(screen.getByText("bonus subscription")).not.toBeNull();

		expect(screen.getByRole("link")).not.toBeNull();

		expect(screen.getByText("checkout-block.order-summary")).toBeInTheDocument();
		expect(screen.getByText("checkout-block.subtotal")).toBeInTheDocument();
		expect(screen.getByText("$20000")).toBeInTheDocument();
		expect(screen.getByText("checkout-block.salesTax")).toBeInTheDocument();
		expect(screen.queryByText("--")).not.toBeInTheDocument();
		expect(screen.getByText("$1000")).toBeInTheDocument();
		expect(screen.getByText("checkout-block.due-today")).toBeInTheDocument();
	});

	it("renders the orderInformation component, tax is equal to zero", () => {
		const newOrderDetail = {
			total: 20000,
			subtotal: 20000,
			tax: 0,
			shipping: 0,
			items: [
				{
					price: 20000,
					tax: 0,
					subtotal: 20000,
					total: 20000,
				},
			],
			currency: "COP",
			taxSupported: true,
		};

		render(
			<OrderInformation
				id={1}
				offerURL="/offerURL/"
				showOfferURL
				showPriceDescription
				showProductFeatures
				orderDetails={newOrderDetail}
				showBorder
				className="b-checkkout"
			/>,
		);

		expect(screen.getByText("--")).toBeInTheDocument();
	});

	it("renders the orderInformation component, showOfferURL is not provided", () => {
		render(
			<OrderInformation
				id={1}
				offerURL="/offerURL/"
				showOfferURL={false}
				showPriceDescription
				showProductFeatures
				orderDetails={orderDetail}
				showBorder
				className="b-checkkout"
			/>,
		);

		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});

	it("renders the orderInformation component, priceDescription is not provided", () => {
		render(
			<OrderInformation
				id={1}
				offerURL="/offerURL/"
				showOfferURL={false}
				showPriceDescription={false}
				showProductFeatures
				orderDetails={orderDetail}
				showBorder
				className="b-checkkout"
			/>,
		);

		expect(
			screen.queryByText("Unlimited access to the daily intelligencer"),
		).not.toBeInTheDocument();
	});

	it("renders the orderInformation component, productFeatures are not provided", () => {
		render(
			<OrderInformation
				id={1}
				offerURL="/offerURL/"
				showOfferURL={false}
				showPriceDescription={false}
				showProductFeatures={false}
				orderDetails={orderDetail}
				showBorder
				className="b-checkkout"
			/>,
		);

		expect(screen.queryByText("Unlimited access to economic news")).not.toBeInTheDocument();
		expect(screen.queryByText("Save $40")).not.toBeInTheDocument();
		expect(screen.queryByText("bonus subscription")).not.toBeInTheDocument();
	});
});
