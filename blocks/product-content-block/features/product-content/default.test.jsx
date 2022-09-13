import React from "react";
import { useFusionContext } from "fusion:context";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProductContent from "./default";

describe("Product Content", () => {
	it("should render null if no global content", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {},
		}));

		const { container } = render(<ProductContent customFields={{}} />);
		expect(container.firstChild).toBe(null);
	});

	it("should render null if no global content object", () => {
		useFusionContext.mockImplementation(() => ({}));
		const { container } = render(<ProductContent customFields={{}} />);
		expect(container.firstChild).toBe(null);
	});

	it("should render null if schema item has no value", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				description: "Product Description",
				schema: {
					productDetails: {},
				},
			},
		}));
		const { container } = render(<ProductContent customFields={{ contentType: "details" }} />);
		expect(container.firstChild).toBe(null);
	});

	it("should render null if schema item is not pressent", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				description: "Product Description",
				schema: {
					sizeAndFit: {},
				},
			},
		}));
		const { container } = render(<ProductContent customFields={{ contentType: "details" }} />);
		expect(container.firstChild).toBe(null);
	});

	it("should render product description", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				description: "Product Description",
				schema: {
					productDetails: {
						value: "Crocker Sandals product",
						dataType: "string",
						visible: true,
						configuration: null,
					},
				},
			},
		}));
		render(<ProductContent customFields={{ contentType: "description" }} />);
		expect(screen.queryByText("product-content.description")).toBeInTheDocument();
		expect(screen.queryByText("Product Description")).toBeInTheDocument();
	});

	it("should render product details", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {
					productDetails: {
						value: "Crocker Sandals product",
						dataType: "string",
						visible: true,
						configuration: null,
					},
				},
			},
		}));

		render(<ProductContent customFields={{ contentType: "details" }} />);
		expect(screen.queryByText("product-content.details")).toBeInTheDocument();
		expect(screen.queryByText("Crocker Sandals product")).toBeInTheDocument();
	});

	it("should render product details", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {
					productDetails: {
						value: "Crocker Sandals product",
						dataType: "string",
						configuration: null,
					},
				},
			},
		}));

		render(<ProductContent customFields={{ contentType: "details" }} />);
		expect(screen.queryByText("product-content.details")).toBeInTheDocument();
		expect(screen.queryByText("Crocker Sandals product")).toBeInTheDocument();
	});

	it("should not render product details if visible flag is false", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {
					productDetails: {
						value: "Crocker Sandals product",
						dataType: "string",
						visible: false,
						configuration: null,
					},
				},
			},
		}));

		const { container } = render(<ProductContent customFields={{ contentType: "details" }} />);

		expect(container.firstChild).toBe(null);
		expect(screen.queryByText("product-content.details")).not.toBeInTheDocument();
		expect(screen.queryByText("Crocker Sandals product")).not.toBeInTheDocument();
	});
});
