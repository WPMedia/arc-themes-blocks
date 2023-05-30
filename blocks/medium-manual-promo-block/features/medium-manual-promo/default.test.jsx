import React from "react";
import { render, screen } from "@testing-library/react";
import { isServerSide } from "@wpmedia/arc-themes-components";
import { useContent } from "fusion:content";

import MediumManualPromo from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
	LazyLoad: ({ children }) => <>{children}</>,
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => {}),
	useEditableContent: jest.fn(() => ({
		searchableField: () => {},
	})),
}));

const customFieldData = {
	headline: "Headline",
	description: "Description",
	imageId: 123,
	imageURL: "image-url.jpg",
	imageAuth: '{"2":"1d2390c4cc8df2265924631d707ead2490865f17830bfbb52c8541b8696bf573"}',
	linkURL: "arcxp.com",
	newTab: false,
	showHeadline: true,
	showDescription: true,
	showImage: true,
};

describe("the medium promo feature", () => {
	afterEach(() => {
		jest.resetModules();
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		isServerSide.mockReturnValueOnce(true);
		const config = {
			lazyLoad: true,
		};
		const { container } = render(<MediumManualPromo customFields={config} />);
		expect(container.firstChild).toBe(null);
	});

	it("should render all fields", () => {
		render(<MediumManualPromo customFields={customFieldData} />);
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).not.toBeNull();
		expect(screen.queryByRole("img", { hidden: true })).not.toBeNull();
	});

	it("does not show image", () => {
		const noImage = {
			...customFieldData,
			showImage: false,
		};

		render(<MediumManualPromo customFields={noImage} />);
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).not.toBeNull();
		expect(screen.queryByRole("img")).toBeNull();
	});

	it("uses fallback image", () => {
		const fallbackImage = {
			...customFieldData,
			imageURL: null,
		};

		render(<MediumManualPromo customFields={fallbackImage} />);
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).not.toBeNull();
		expect(screen.queryByRole("img", { hidden: true })).not.toBeNull();
	});

	it("should return a fallback image if showImage is true and imageId is not valid", () => {
		const config = {
			headline: "This is a headline text",
			showImage: true,
			imageId: null,
		};
		render(<MediumManualPromo customFields={config} />);
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
		render(<MediumManualPromo customFields={config} />);
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
		render(<MediumManualPromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});

	it("does not show description", () => {
		const noDescription = {
			...customFieldData,
			showDescription: false,
			description: null,
		};

		render(<MediumManualPromo customFields={noDescription} />);
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).toBeNull();
		expect(screen.queryByRole("img", { hidden: true })).not.toBeNull();
	});

	it("does not show headline", () => {
		const noHeadline = {
			...customFieldData,
			showHeadline: false,
		};

		render(<MediumManualPromo customFields={noHeadline} />);
		expect(screen.getByRole("link")).not.toBeNull();
		expect(screen.queryByText(customFieldData.headline)).toBeNull();
		expect(screen.queryByText(customFieldData.description)).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("does not show description or headline", () => {
		const noDescriptionOrHeadline = {
			...customFieldData,
			headline: null,
			showDescription: false,
			description: null,
		};

		render(<MediumManualPromo customFields={noDescriptionOrHeadline} />);
		expect(screen.queryByText(customFieldData.headline)).toBeNull();
		expect(screen.queryByText(customFieldData.description)).toBeNull();
		expect(screen.queryByRole("img", { hidden: true })).not.toBeNull();
	});

	it("renders headline with no link", () => {
		const noHeadline = {
			...customFieldData,
			linkURL: undefined,
		};

		render(<MediumManualPromo customFields={noHeadline} />);
		expect(screen.queryByRole("link")).toBeNull();
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});
});
