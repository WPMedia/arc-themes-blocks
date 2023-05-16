import React from "react";
import { render, screen } from "@testing-library/react";
import { useContent } from "fusion:content";
import ExtraLargeManualPromo from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
	useEditableContent: jest.fn(() => ({
		searchableField: () => {},
	})),
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

	it("should render all items", () => {
		const config = {
			showDescription: true,
			description: "Description Text",
			showHeadline: true,
			headline: "Headline Text",
			showImage: true,
			showOverline: true,
			overline: "This is an overline text",
		};
		render(<ExtraLargeManualPromo customFields={config} />);

		expect(screen.queryByRole("heading", { name: config.headline })).not.toBeNull();
		expect(screen.queryByText(config.description)).not.toBeNull();
		expect(screen.queryByText(config.overline)).not.toBeNull();
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
			imageRatio: "4:3",
			imageId: 123,
			imageURL: "www.google.com/fake.png",
			imageAuth: '{"2":"1d2390c4cc8df2265924631d707ead2490865f17830bfbb52c8541b8696bf573"}',
			showImage: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should use content source to get image auth", () => {
		useContent.mockReturnValueOnce({ hash: 123 });
		const config = {
			description: "This is the description",
			imageRatio: "4:3",
			imageId: 123,
			imageURL: "www.google.com/fake.png",
			showImage: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(useContent).toHaveBeenCalled();
		expect(screen.queryByRole("img", { hidden: true })).not.toBeNull();
	});

	it("should return a fallback image if showImage is true and imageUrl is not valid", () => {
		const config = {
			headline: "This is a headline text",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should make a blank call to the signing-service if the image is from PhotoCenter and has an Auth value", () => {
		const config = {
			imageAuth: "test hash",
			imageURL: "test_id=123",
			imageId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
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
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});

	it("should make a call to the signing-service if the image is not from PhotoCenter", () => {
		const config = {
			imageAuth: "test hash",
			imageURL: "test_id=123",
			imageId: "abc",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<ExtraLargeManualPromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
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
