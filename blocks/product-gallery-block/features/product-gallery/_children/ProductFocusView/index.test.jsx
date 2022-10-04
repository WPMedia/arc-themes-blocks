/*
 Enzyme is using an old jsdom that has issues using waitFor on prototype
 methods and this component is using Component constructor and prototypes.

 This will set the proper jsdom environment for this specific test need
 until we can convert this away from the component model or update the test.

 @jest-environment jsdom-sixteen
*/

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductFocusView from "./index";
import mockData from "./mock-data.js";

window.HTMLElement.prototype.scrollIntoView = jest.fn();
const setFocusViewItemId = jest.fn();

const DEFAULT_PROPS = {};

describe("Product Focus View", () => {
	it("Renders when expected props are provided.", () => {
		render(
			<ProductFocusView
				onClose={() => setFocusViewItemId("")}
				productImages={mockData}
				initialItemId={mockData[0]._id}
				resizerAppVersion={2}
				resizerURL="https://www.resizer.com/"
			/>
		);
		expect(screen.queryAllByRole("img")).toHaveLength(12);
	});

	it("Renders a down (next) button when images in the thumbnail bar can be advanced.", () => {
		render(
			<ProductFocusView
				onClose={() => setFocusViewItemId("")}
				productImages={mockData}
				initialItemId={mockData[0]._id}
				resizerAppVersion={2}
				resizerURL="https://www.resizer.com/"
			/>
		);
		expect(screen.queryByRole("button", { name: "Next Image" })).not.toBe(null);
	});

	it("Renders an up (previous) button when images in the thumbnail bar can be advanced.", () => {
		render(
			<ProductFocusView
				onClose={() => setFocusViewItemId("")}
				productImages={mockData}
				initialItemId={mockData[2]._id}
				resizerAppVersion={2}
				resizerURL="https://www.resizer.com/"
			/>
		);
		expect(screen.queryByRole("button", { name: "Previous Image" })).not.toBe(null);
	});

	it("Up (previous) button does not rerender when clicked and a previous image no longer available.", () => {
		render(
			<ProductFocusView
				onClose={() => setFocusViewItemId("")}
				productImages={mockData}
				initialItemId={mockData[1]._id}
				resizerAppVersion={2}
				resizerURL="https://www.resizer.com/"
			/>
		);
		const upButton = screen.queryByRole("button", { name: "Previous Image" });
		fireEvent.click(upButton);
		expect(upButton).not.toBeInTheDocument();
	});

	it("Down (next) button does not rerender when clicked and a next image no longer available.", () => {
		render(
			<ProductFocusView
				onClose={() => setFocusViewItemId("")}
				productImages={mockData}
				initialItemId={mockData[1]._id}
				resizerAppVersion={2}
				resizerURL="https://www.resizer.com/"
			/>
		);
		const downButton = screen.queryByRole("button", { name: "Next Image" });
		fireEvent.click(downButton);
		expect(downButton).not.toBeInTheDocument();
	});
});
