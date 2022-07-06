import React from "react";
import { render, screen } from "@testing-library/react";
import { isServerSide } from "@wpmedia/arc-themes-components";
import SmallManualPromo from "./default";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	LazyLoad: ({ children }) => children,
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
}));

jest.mock("fusion:content", () => ({
	useEditableContent: jest.fn(() => ({
		editableContent: () => ({ contentEditable: "true" }),
		searchableField: () => {},
		useFusionContext: jest.fn(() => ({
			isAdmin: false,
		})),
	})),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({})),
	useComponentContext: jest.fn(() => ({
		registerSuccessEvent: () => ({}),
	})),
}));

const customFields = {
	headline: "This is the headline",
	imagePosition: "right",
	imageRatio: "3:2",
	imageURL: "www.google.com/fake.png",
	lazyLoad: false,
	linkURL: "www.google.com",
	newTab: true,
	showHeadline: true,
	showImage: true,
};

describe("the small manual promo feature", () => {
	afterEach(() => {
		jest.resetModules();
	});

	beforeEach(() => {
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				isAdmin: false,
			})),
		}));
	});

	it("should have one image when showImage is true", () => {
		render(<SmallManualPromo customFields={customFields} />);
		expect(
			screen.queryByRole("img", { name: "This is the headline", hidden: true })
		).not.toBeNull();
	});

	it("should have no image when showImage is false", () => {
		render(<SmallManualPromo customFields={{ ...customFields, showImage: false }} />);
		expect(screen.queryByRole("img", { name: "This is the headline" })).toBeNull();
	});

	it("should have no headline when showHeadline is false", () => {
		render(<SmallManualPromo customFields={{ ...customFields, showHeadline: false }} />);
		expect(screen.queryByText("This is the headline")).toBeNull();
	});

	it("should return null on server-side render from PageBuilder Editor when lazyload is true", () => {
		isServerSide.mockImplementationOnce(() => true);
		const { container } = render(
			<SmallManualPromo customFields={{ ...customFields, lazyLoad: true }} />
		);
		expect(container.firstChild).toBeNull();
	});

	it("should render image first when imagePosition is set to above", () => {
		render(
			<SmallManualPromo
				customFields={{ ...customFields, imagePosition: "above", linkURL: undefined }}
			/>
		);
		const stack = screen.queryByRole("article");
		const figure = screen.queryByRole("figure");
		expect(stack.firstChild).toBe(figure);
	});

	it("should render heading first when imagePosition is set to below", () => {
		render(<SmallManualPromo customFields={{ ...customFields, imagePosition: "below" }} />);
		const stack = screen.queryByRole("article");
		const heading = screen.queryByRole("heading");
		expect(stack.firstChild).toBe(heading);
	});

	it("should render image first when imagePosition is set to left", () => {
		render(
			<SmallManualPromo
				customFields={{ ...customFields, imagePosition: "left", linkURL: undefined }}
			/>
		);
		const stack = screen.queryByRole("article");
		const figure = screen.queryByRole("figure");
		expect(stack.firstChild).toBe(figure);
	});

	it("should render heading first when imagePosition is set to right", () => {
		render(<SmallManualPromo customFields={{ ...customFields, imagePosition: "right" }} />);
		const stack = screen.queryByRole("article");
		const heading = screen.queryByRole("heading");
		expect(stack.firstChild).toBe(heading);
	});

	it("should render a headline without a linkURL", () => {
		render(<SmallManualPromo customFields={{ ...customFields, linkURL: undefined }} />);
		expect(screen.queryByText("This is the headline")).not.toBeNull();
	});
});
