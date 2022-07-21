import React from "react";
import { useFusionContext } from "fusion:context";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProductInformation from "./default";

describe("Product Information", () => {
	it("should render null if no global content", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {},
		}));
		const { container } = render(<ProductInformation />);
		expect(container.firstChild).toBe(null);
	});

	it("should render null if no global content object", () => {
		useFusionContext.mockImplementation(() => ({}));
		const { container } = render(<ProductInformation />);
		expect(container.firstChild).toBe(null);
	});

	it("should render product name", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				name: "Arc Commerce T-Shirt",
			},
		}));
		render(<ProductInformation />);
		expect(screen.queryByText("Arc Commerce T-Shirt")).toBeInTheDocument();
	});

	it("should render product name and list price", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				name: "Arc Commerce T-Shirt",
				pricing: [
					{
						currencyCode: "USD",
						currencyDisplayFormat: "symbol",
						currencyLocale: "en-US",
						schema: {},
						prices: [
							{
								type: "List",
								amount: "59.00",
							},
						],
					},
				],
			},
		}));
		render(<ProductInformation />);
		expect(screen.queryByText("Arc Commerce T-Shirt")).toBeInTheDocument();
		expect(screen.queryByText("$59.00")).toBeInTheDocument();
	});
});
