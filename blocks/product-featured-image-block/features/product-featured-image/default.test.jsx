import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProductFeaturedImage from "./default";

describe("Product Featured Image", () => {
	it("should render", () => {
		const { unmount } = render(<ProductFeaturedImage customFields={{ showHeading: true }} />);
		expect(screen.queryByText("product-featured-image-block.hello-text")).toBeInTheDocument();
		unmount();
	});
});
