import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import HTML from "./html";

describe("the article body raw_html component", () => {
	it("should not render raw_html when it is not provided with the necessary data", () => {
		const rawHTML = {
			_id: "44CZ46VGIBBOZAZH4OXB4ND4U4",
		};

		render(<HTML id={rawHTML._id} content={rawHTML.content} />);
		expect(screen.innerHTML).toBe();
	});

	it("should render raw_html when it is provided with the necessary data", () => {
		const rawHTML = {
			_id: "44CZ46VGIBBOZAZH4OXB4ND4U4",
			content: "<p>Some HTML</p>",
		};
		render(<HTML id={rawHTML._id} content={rawHTML.content} />);
		const element = screen.getByText('Some HTML');
		expect(element).toBeInTheDocument();
	});
});
