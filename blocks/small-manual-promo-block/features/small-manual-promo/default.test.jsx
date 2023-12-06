import React from "react";
import { render, screen } from "@testing-library/react";
import { useContent } from "fusion:content";
import { isServerSide } from "@wpmedia/arc-themes-components";
import SmallManualPromo from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => {}),
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
	imageId: 123,
	imageURL: "www.google.com/fake.png",
	imageAuth: '{"2":"1d2390c4cc8df2265924631d707ead2490865f17830bfbb52c8541b8696bf573"}',
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
		expect(screen.queryByRole("img", { hidden: true })).not.toBeNull();
	});

	it("should use fallback image", () => {
		render(<SmallManualPromo customFields={{ ...customFields, imageId: null }} />);
		expect(screen.queryByRole("img", { hidden: true })).not.toBeNull();
	});

	it("should have no image when showImage is false", () => {
		render(<SmallManualPromo customFields={{ ...customFields, showImage: false }} />);
		expect(screen.queryByRole("img")).toBeNull();
	});

	it("should have no headline when showHeadline is false", () => {
		render(<SmallManualPromo customFields={{ ...customFields, showHeadline: false }} />);
		expect(screen.queryByText("This is the headline")).toBeNull();
	});

	it("should not display headline", () => {
		render(<SmallManualPromo customFields={{ ...customFields, headline: null }} />);
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
		render(<SmallManualPromo customFields={{ ...customFields, imagePosition: "inset-block-end" }} />);
		const stack = screen.queryByRole("article");
		const heading = screen.queryByRole("heading");
		expect(stack.firstChild).toBe(heading);
	});

	it("should render image first when imagePosition is set to left", () => {
		render(
			<SmallManualPromo
				customFields={{ ...customFields, imagePosition: "inset-inline-start", linkURL: undefined }}
			/>
		);
		const stack = screen.queryByRole("article");
		const figure = screen.queryByRole("figure");
		expect(stack.firstChild).toBe(figure);
	});

	it("should return a fallback image if showImage is true and imageId is not valid", () => {
		const config = {
			headline: "This is a headline text",
			showImage: true,
			imageId: null,
		};
		render(<SmallManualPromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should make a blank call to the signing-service if the image is from PhotoCenter and has an Auth value", () => {
		const config = {
			imageAuth: `{"2": "abc123"}`,
			imageURL: "test_id=123",
			imageId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<SmallManualPromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({});
	});

	it("should make a call to the signing-service if the image is from PhotoCenter but does not have an Auth value", () => {
		const config = {
			imageAuth: "",
			imageURL: "test_id=123",
			imageId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<SmallManualPromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});

	it("should render heading first when imagePosition is set to right", () => {
		render(<SmallManualPromo customFields={{ ...customFields, imagePosition: "inset-inline-end" }} />);
		const stack = screen.queryByRole("article");
		const heading = screen.queryByRole("heading");
		expect(stack.firstChild).toBe(heading);
	});

	it("should render a headline without a linkURL", () => {
		render(<SmallManualPromo customFields={{ ...customFields, linkURL: undefined }} />);
		expect(screen.queryByText("This is the headline")).not.toBeNull();
	});
});
