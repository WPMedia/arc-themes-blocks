import React from "react";
import { render, screen } from "@testing-library/react";
import { useAppContext } from "fusion:context";
import getProperties from "fusion:properties";

import ArticleDate from "./default";

describe("Given the display time from ANS, it should convert to the proper timezone format we want", () => {
	it("should return proper long form with correctly converted timezone (mocked timezone is in CDT)", () => {
		getProperties.mockReturnValue({
			dateLocalization: {
				language: "en",
				timeZone: "America/New_York",
				dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
			},
		});
		useAppContext.mockReturnValue({ globalContent: { display_date: "2019-08-11T16:45:33.209Z" } });
		render(<ArticleDate />);

		expect(screen.queryByText("August 11, 2019 at 12:45 pm EDT")).not.toBeNull();
	});

	it("should use default localization values", () => {
		useAppContext.mockReturnValue({ globalContent: { display_date: "2019-08-11T16:45:33.209Z" } });
		getProperties.mockReturnValue({});

		render(<ArticleDate />);

		expect(screen.queryByText("August 11, 2019 at 4:45 pm UTC")).not.toBeNull();
	});

	it("should not output date if display_date is value", () => {
		useAppContext.mockReturnValue({ globalContent: { display_date: "9-08-11T16:45:33.209Z" } });
		render(<ArticleDate />);

		expect(screen.queryByText("August 11, 2019 at 12:45 pm EDT")).toBeNull();
	});

	it("should not output date", () => {
		useAppContext.mockReturnValue({});
		render(<ArticleDate />);

		expect(screen.queryByText("August 11, 2019 at 12:45 pm EDT")).toBeNull();
	});
});
