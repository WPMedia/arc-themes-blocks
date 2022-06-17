import React from "react";
import { render, screen } from "@testing-library/react";
import SmallManualPromo from "./default";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	LazyLoad: ({ children }) => children,
}));
jest.mock("@wpmedia/arc-themes-components", () => ({
	formatURL: jest.fn(),
	Heading: ({ children }) => <h1>{children}</h1>,
	HeadingSection: ({ children }) => children,
	Image: (props) => {
		const { url, "data-aspect-ratio": dataAspectRatio } = props;
		return <img src={url} alt="test image" data-aspect-ratio={dataAspectRatio} />;
	},
	isServerSide: jest.fn(() => true),
	Link: ({ children }) => children,
	MediaItem: ({ children }) => children,
	Stack: ({ children }) => <article>{children}</article>,
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		isAdmin: false,
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

	/*
	it("should have 1 container fluid class", () => {
		render(<SmallManualPromo customFields={customFields} />);
		expect(wrapper.find(".container-fluid")).toHaveLength(1);
	});
	*/

	/*
		useFusionContext.mockImplementationOnce(() => ({
			isAdmin: true,
		}));
		*/

	it("should have one image when showImage is true", () => {
		render(<SmallManualPromo customFields={customFields} />);
		expect(screen.queryByRole("img", { name: "test image" })).not.toBeNull();
	});

	it("should have no image when showImage is false", () => {
		render(<SmallManualPromo customFields={{ ...customFields, showImage: false }} />);
		expect(screen.queryByRole("img", { name: "test image" })).toBeNull();
	});

	it("should have no headline when showHeadline is false", () => {
		render(<SmallManualPromo customFields={{ ...customFields, showHeadline: false }} />);
		expect(screen.queryByText("This is the headline")).toBeNull();
	});

	it("should return null on server-side render from PageBuilder Editor when lazyload is true", () => {
		const { container } = render(
			<SmallManualPromo customFields={{ ...customFields, lazyLoad: true }} />
		);
		expect(container.firstChild).toBeNull();
	});

	it("should render image first when imagePosition is set to above", () => {
		render(<SmallManualPromo customFields={{ ...customFields, imagePosition: "above" }} />);
		const stack = screen.queryByRole("article");
		const image = screen.queryByRole("img", { name: "test image" });
		expect(stack.firstChild).toBe(image);
	});

	it("should render heading first when imagePosition is set to below", () => {
		render(<SmallManualPromo customFields={{ ...customFields, imagePosition: "below" }} />);
		const stack = screen.queryByRole("article");
		const heading = screen.queryByRole("heading");
		expect(stack.firstChild).toBe(heading);
	});

	it("should render image first when imagePosition is set to left", () => {
		render(<SmallManualPromo customFields={{ ...customFields, imagePosition: "left" }} />);
		const stack = screen.queryByRole("article");
		const image = screen.queryByRole("img", { name: "test image" });
		expect(stack.firstChild).toBe(image);
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
