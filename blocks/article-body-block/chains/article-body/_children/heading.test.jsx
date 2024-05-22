import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Heading from "./heading";

describe("the article body Heading component", () => {
	it("should render the correct heading", () => {
		const headingData = {
			_id: "CF5ARXXK6BHJ5LO45DZCCBHL7U",
			type: "header",
			level: 3,
			additional_properties: {
				comments: [],
				inline_comments: [],
				_id: 1563473120776,
			},
			content:
				'Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href="https://www.washingtonpost.com/" target=_blank>hyperlink</a>',
		};

		render(<Heading element={headingData} />);
		const heading = screen.getByRole('heading', { level: 3 });
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toMatch('Heading 3 - bold italic underline hyperlink');
		expect(heading.innerHTML).toMatchInlineSnapshot(
			`"Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href="https://www.washingtonpost.com/" target="_blank">hyperlink</a>"`
		);
	});

	it("should default to h2 if no heading level is given", () => {
		const headingData = {
			_id: "CF5ARXXK6BHJ5LO45DZCCBHL7U",
			type: "header",
			additional_properties: {
				comments: [],
				inline_comments: [],
				_id: 1563473120776,
			},
			content:
				'Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href="https://www.washingtonpost.com/" target=_blank>hyperlink</a>',
		};

		render(<Heading element={headingData} />);
		const heading = screen.getByRole('heading', { level: 2 });
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toMatch('Heading 3 - bold italic underline hyperlink');
		expect(heading.innerHTML).toMatchInlineSnapshot(
			`"Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href="https://www.washingtonpost.com/" target="_blank">hyperlink</a>"`
		);
	});
});
