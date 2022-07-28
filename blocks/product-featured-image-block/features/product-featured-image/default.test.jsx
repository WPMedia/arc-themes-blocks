import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useFusionContext } from "fusion:context";

import ProductFeaturedImage from "./default";

const FEATURED_IMAGE_ASSET = {
	type: "image",
	url: "https://example.com/image.jpg",
	auth: {
		1: "secret",
	},
};

describe("Product Featured Image", () => {
	it("should render null if no global content", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {},
		}));
		const { container } = render(<ProductFeaturedImage />);
		expect(container.firstChild).toBe(null);
	});
	it("should render null if no global content object", () => {
		useFusionContext.mockImplementation(() => ({}));
		const { container } = render(<ProductFeaturedImage />);
		expect(container.firstChild).toBe(null);
	});
	it("should render null if empty schema provided", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {},
			},
		}));
		const { container } = render(<ProductFeaturedImage />);
		expect(container.firstChild).toBe(null);
	});
	it("should render null if no featured image provided", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {
					featuredImage: {
						value: {
							assets: [],
						},
					},
				},
			},
		}));
		const { container } = render(<ProductFeaturedImage />);
		expect(container.firstChild).toBe(null);
	});
	it("should render a featured image", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {
					featuredImage: {
						value: {
							assets: [FEATURED_IMAGE_ASSET],
						},
					},
				},
			},
		}));

		render(<ProductFeaturedImage />);

		expect(screen.getByRole("img")).toBeInTheDocument();
	});
});
