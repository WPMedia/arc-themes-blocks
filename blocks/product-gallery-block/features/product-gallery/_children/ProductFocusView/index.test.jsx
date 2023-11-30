import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductFocusView from "./index";
import mockData from "../../mock-data";

jest.mock("fusion:environment", () => ({
	RESIZER_TOKEN_VERSION: 1,
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn();
const setFocusViewItemId = jest.fn();

const observe = jest.fn();
const disconnect = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
	observe,
	disconnect,
}));

describe("Product Focus View", () => {
	it("Renders 10 images.", () => {
		render(
			<ProductFocusView
				onClose={() => setFocusViewItemId("")}
				productImages={mockData}
				initialItemId={mockData[0]._id}
			/>,
		);
		expect(screen.queryAllByRole("img")).toHaveLength(10);
	});
});
