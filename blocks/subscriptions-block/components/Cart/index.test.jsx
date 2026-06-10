import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFusionContext } from "fusion:context";
import useSales from "../useSales";

import Cart from "./index";

jest.mock("../useSales");

const originalFetch = global.fetch;

jest.mock("fusion:properties", () =>
	jest.fn(() => ({ api: { retail: { origin: "https://api.example.com" } } })),
);

const mockGetCart = jest.fn();

describe("Cart", () => {
	beforeEach(() => {
		useFusionContext.mockReturnValue({ arcSite: "test-site" });
		useSales.mockReturnValue({
			Sales: { getCart: mockGetCart },
			isInitialized: true,
		});
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						pricingStrategy: {
							name: "Monthly",
							description: "<p>$10/month</p>",
							summary: "<p>Pay monthly</p>",
						},
					}),
			}),
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
		global.fetch = originalFetch;
	});

	it("renders nothing while fetching", () => {
		mockGetCart.mockReturnValue(new Promise(() => {}));
		const { container } = render(<Cart offerURL="/offer/" className="b-checkout" />);
		expect(container.firstChild).toBeNull();
	});

	it("renders empty cart link when no items", async () => {
		mockGetCart.mockResolvedValue({ items: [] });
		await act(async () => {
			render(<Cart offerURL="/offer/" className="b-checkout" />);
		});
		expect(screen.getByRole("link")).toHaveAttribute("href", "/offer/");
	});

	it("renders empty cart when getCart rejects", async () => {
		mockGetCart.mockRejectedValue(new Error("Cart error"));
		await act(async () => {
			render(<Cart offerURL="/offer/" className="b-checkout" />);
		});
		expect(screen.getByRole("link")).toHaveAttribute("href", "/offer/");
	});

	it("renders cart items when items exist", async () => {
		mockGetCart.mockResolvedValue({
			items: [{ sku: "premium", name: "Premium Monthly", priceCode: "ABC123" }],
			currency: "USD",
			total: "10.00",
		});
		await act(async () => {
			render(<Cart offerURL="/offer/" className="b-checkout" />);
		});
		expect(screen.getByText("Premium Monthly")).not.toBeNull();
	});

	it("renders total amount with currency", async () => {
		mockGetCart.mockResolvedValue({
			items: [{ sku: "premium", name: "Premium Monthly", priceCode: "ABC123" }],
			currency: "USD",
			total: "10.00",
		});
		await act(async () => {
			render(<Cart offerURL="/offer/" className="b-checkout" />);
		});
		expect(screen.getByText("checkout-block.due-today")).not.toBeNull();
	});
});
