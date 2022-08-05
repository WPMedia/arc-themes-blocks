import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProductGallery from "./default";

describe("Product Gallery", () => {
	it("renders with default disabled classname modifier", () => {
		const { container } = render(
			<ProductGallery customFields={{ isFeaturedImageEnabled: false }} />
		);
		expect(container.querySelectorAll(".b-product-gallery--featured-image-disabled").length).toBe(
			1
		);
		expect(container.querySelectorAll(".b-product-gallery--featured-image-enabled").length).toBe(0);
	});
	it("featured image enabled will add featured image enabled classname modifier", () => {
		const { container } = render(
			<ProductGallery customFields={{ isFeaturedImageEnabled: true }} />
		);

		expect(container.querySelectorAll(".b-product-gallery--featured-image-enabled").length).toBe(1);
	});
});
