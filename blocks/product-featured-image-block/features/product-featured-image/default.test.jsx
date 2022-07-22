import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProductFeaturedImage from "./default";

describe("Product Featured Image", () => {
	it.skip("should render", () => {
		render(<ProductFeaturedImage />);
		expect(screen.getByRole("img")).toBeInTheDocument();
	});
});
