/*
 Enzyme is using an old jsdom that has issues using waitFor on prototype
 methods and this component is using Component constructor and prototypes.

 This will set the proper jsdom environment for this specific test need
 until we can convert this away from the component model or update the test.

 @jest-environment jsdom-sixteen
*/

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductFocusView from "./index";
import mockData from "../../mock-data";

jest.mock("fusion:environment", () => ({
	RESIZER_APP_VERSION: 1,
	RESIZER_URL: "https://resizer.com",
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
			/>
		);
		expect(screen.queryAllByRole("img")).toHaveLength(8);
	});
});
