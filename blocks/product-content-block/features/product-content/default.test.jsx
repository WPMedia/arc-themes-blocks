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

	it("should render product details", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {
					productDetails: {
						label: "Product Details",
						value: "Crocker Sandals product",
						dataType: "string",
						visible: true,
						configuration: null,
					},
				},
			},
		}));
		render(<ProductContent customFields={{ contentType: "details" }} />);
		expect(screen.queryByText("Product Details")).toBeInTheDocument();
		expect(screen.queryByText("Crocker Sandals product")).toBeInTheDocument();
	});
});
