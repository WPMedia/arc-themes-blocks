import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Oembed from "./oembed";

describe("the article body OEmbed component", () => {
	it("renders passed in html", () => {
		render(
			<Oembed
				element={{
					subtype: "other",
					raw_oembed: {
						html: "<div>Hello</div>",
					},
				}}
			/>
		);

		const container = screen.getByTestId('oembed-container');

		expect(container.innerHTML).toContain('<div>Hello</div>');
	});

	it("renders when no subtype element key", () => {
		render(
			<Oembed
				element={{
					raw_oembed: {
						html: "<div>Hello</div>",
					},
				}}
			/>
		);

		const container = screen.getByTestId('oembed-container');
		expect(container.innerHTML).toContain('<div>Hello</div>');
	});

	it("renders wide css class if type youtube", () => {
		render(
			<Oembed
				classPrefix="prefix"
				element={{
					type: "oembed_response",
					subtype: "youtube",
					_id: "3OYDYWUAK5D4XP5WJ6PLS4KHYQ",
					raw_oembed: {
						html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/817CYL6KuGo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
					},
				}}
			/>
		);
		 const prefixResponsiveElement = screen.queryByTestId('oembed-container');
		 expect(prefixResponsiveElement).toBeInTheDocument();
	});
});
