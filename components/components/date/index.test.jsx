import { render, screen } from "@testing-library/react";

import Date from ".";

describe("Date", () => {
	it("should render date string", () => {
		render(<Date dateTime="2018-03-05T20:00:00" dateString="March 5 at 8 at night" />);
		const foundDate = screen.queryByText("March 5 at 8 at night");

		expect(foundDate).not.toBeNull();
		expect(foundDate).toHaveClass("c-date");
		expect(foundDate).toHaveAttribute("datetime", "2018-03-05T20:00:00");
	});

	it("should allow pass through of props", () => {
		const { container } = render(
			<Date dateTime="2018-03-05T20:00:00" dateString="March 5 at 8 at night" id="custom-id" />
		);
		expect(container.querySelector(".c-date")).toHaveAttribute("id", "custom-id");
	});

	it("should have additional classes", () => {
		render(
			<Date
				dateTime="2018-03-05T20:00:00"
				dateString="March 5 at 8 at night"
				className="test-class"
			/>
		);
		const foundDate = screen.queryByText("March 5 at 8 at night");

		expect(foundDate).not.toBeNull();
		expect(foundDate).toHaveClass("c-date test-class");
		expect(foundDate).toHaveAttribute("datetime", "2018-03-05T20:00:00");
	});
});
