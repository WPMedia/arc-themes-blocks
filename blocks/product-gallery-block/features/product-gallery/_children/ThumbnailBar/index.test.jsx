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
import ThumbnailBar from "./index";
import mockData from "../../mock-data";

jest.mock("fusion:environment", () => ({
	RESIZER_APP_VERSION: 2,
	RESIZER_URL: "https://resizer.com",
}));
// window.HTMLElement.prototype.scrollIntoView = jest.fn();
/*
const observe = jest.fn();
const disconnect = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
	observe,
	disconnect,
}));
*/

describe("Thumbnail Bar", () => {
	it("Renders 3 images and two buttons.", () => {
		//		const windowResizeSpy = jest.spyOn(ThumbnailBar.prototype, "windowResize");
		render(<ThumbnailBar images={mockData} selectedIndex={1} onImageSelect={() => true} />);
		//		expect(windowResizeSpy).toBeCalledTimes(1);
		expect(screen.queryAllByRole("img")).toHaveLength(3);
		expect(screen.queryAllByRole("button")).toHaveLength(2);
	});
});
