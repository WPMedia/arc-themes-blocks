import React from "react";
import { render, screen } from "@testing-library/react";
import { useFusionContext } from "fusion:context";
import Masthead from "./default";

const mockContextObj = {
	arcSite: "the-sun",
};

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => mockContextObj),
}));

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	localizeDate: jest.fn(() => new Date().toDateString()),
}));

describe("the masthead block", () => {
	useFusionContext.mockImplementation(() => mockContextObj);

	it("hides image if none passed in", () => {
		render(<Masthead customFields={{ logoURL: "" }} />);

		expect(screen.queryByRole("img")).toBeNull();
	});

	it("shows image if passed in", () => {
		render(<Masthead customFields={{ logoURL: "something.jpg" }} />);

		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("hides promo if no promo link text with link", () => {
		render(<Masthead customFields={{ promoLinkText: "", promoLinkURL: "google.com" }} />);

		expect(screen.queryByRole("link")).toBeNull();
	});

	it("hides promo if no promo url text with text", () => {
		render(<Masthead customFields={{ promoLinkText: "the facebook", promoLinkURL: "" }} />);

		expect(screen.queryByText("the facebook")).not.toBeTruthy();
	});

	it("shows promo if  promo url text with text", () => {
		render(
			<Masthead
				customFields={{
					promoLinkText: "the facebook",
					promoLinkURL: "facebook.com",
				}}
			/>
		);

		expect(screen.queryByText("the facebook")).toBeTruthy();
	});

	it("shows text if showdate is true", () => {
		render(<Masthead customFields={{ showDate: true }} />);

		expect(screen.queryByText(new Date().toDateString())).toBeTruthy();
	});

	it("does not show text if showdate is false", () => {
		render(<Masthead customFields={{ showDate: false }} />);

		expect(screen.queryByText(new Date().toDateString())).not.toBeTruthy();
	});

	it("shows tagline", () => {
		render(<Masthead customFields={{ tagLine: "Tag Line text" }} />);
		expect(screen.queryByText("Tag Line text")).toBeTruthy();
	});
});
