import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useFusionContext } from "fusion:context";

import ProductFeaturedImage from "./default";

const ALT_TEXT_STRING = "Man smiling posing in front of shelves. (This is alt text.)";

const FEATURED_IMAGE_ASSET = {
	type: "image",
	url: "https://example.com/image.jpg",
	auth: {
		1: "secret",
	},
	alt_text: ALT_TEXT_STRING,
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
						value: [],
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
					featuredImage: { value: [FEATURED_IMAGE_ASSET] },
				},
			},
		}));

		render(<ProductFeaturedImage />);
		const image = screen.getByRole("img");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("alt", ALT_TEXT_STRING);
	});
	it("should render an empty string for no alt text", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {
					featuredImage: { value: [{ ...FEATURED_IMAGE_ASSET, alt_text: undefined }] },
				},
			},
		}));
		render(<ProductFeaturedImage />);
		const image = screen.getByRole("img");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("alt", "");
	});
	it("should render with no auth", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {
					featuredImage: { value: [{ ...FEATURED_IMAGE_ASSET, auth: undefined }] },
				},
			},
		}));
		render(<ProductFeaturedImage />);
		const image = screen.getByRole("img");
		expect(image).toBeInTheDocument();
	});
});
