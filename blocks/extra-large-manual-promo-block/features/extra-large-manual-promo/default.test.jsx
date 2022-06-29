import React from "react";
import { render, screen } from "@testing-library/react";
import ExtraLargeManualPromo from "./default";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	LazyLoad: ({ children }) => children,
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
}));

jest.mock("fusion:content", () => ({
	useEditableContent: jest.fn(() => ({
		searchableField: () => {},
	})),
}));

jest.mock("fusion:properties", () => () => ({
	fallbackImage: "http://fallback.img",
}));

describe("the extra large promo feature", () => {
	it("should return null if lazyLoad on the server and not in the admin", () => {
		const config = {
			lazyLoad: true,
		};
		const { container } = render(<ExtraLargeManualPromo customFields={config} />);
		expect(container.firstChild).toBeNull();
	});

	it("should return null if no show flag is true", () => {
		const config = {
			showDescription: false,
			showHeadline: false,
			showImage: false,
			showOverline: false,
		};
		const { container } = render(<ExtraLargeManualPromo customFields={config} />);
		expect(container.firstChild).toBeNull();
	});

	it("should return an overline if showOverline is true", () => {
		const config = {
			overline: "This is an overline text",
			showOverline: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(screen.queryByText(config.overline)).not.toBeNull();
	});

	it("should return a headline if showHeadline is true", () => {
		const config = {
			headline: "This is a headline text",
			showHeadline: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(screen.queryByRole("heading", { name: config.headline })).not.toBeNull();
	});

	it("should return a image if showImage is true", () => {
		const config = {
			headline: "This is a headline text",
			imageURL: "#",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should return a fallback image if showImage is trueand imageUrl is not valid", () => {
		const config = {
			headline: "This is a headline text",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should return a description if showDescription is true", () => {
		const config = {
			description: "This is a description text",
			showDescription: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(screen.queryByText(config.description)).not.toBeNull();
	});
});
