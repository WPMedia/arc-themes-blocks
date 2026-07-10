import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFusionContext } from "fusion:context";
import HTMLBox from "./default";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(),
}));

describe("the htmlbox block", () => {
	it("renders the embedded HTML when the HTML custom field is provided", () => {
		const html =
			'<iframe width="560" height="315" src="https://www.youtube.com/embed/TKjI4CYThjg" frameborder="0" allowfullscreen></iframe>';
		useFusionContext.mockReturnValue({ customFields: { HTML: html } });

		const { container } = render(<HTMLBox id="abc123" />);

		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		expect(container.querySelector("iframe")).toBeInTheDocument();
		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		expect(container.querySelector("iframe").getAttribute("src")).toBe(
			"https://www.youtube.com/embed/TKjI4CYThjg",
		);
	});

	it("renders nothing when no HTML custom field is given", () => {
		useFusionContext.mockReturnValue({ customFields: {} });

		const { container } = render(<HTMLBox id="xyz987" />);

		expect(container).toBeEmptyDOMElement();
	});

	it("renders nothing when HTML is an empty string", () => {
		useFusionContext.mockReturnValue({ customFields: { HTML: "" } });

		const { container } = render(<HTMLBox id="empty123" />);

		expect(container).toBeEmptyDOMElement();
	});
});
