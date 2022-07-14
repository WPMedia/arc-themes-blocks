import React from "react";
import { render, screen } from "@testing-library/react";
import { isServerSide } from "@wpmedia/arc-themes-components";

import MediumManualPromo from "./default";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	LazyLoad: ({ children }) => <>{children}</>,
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
}));

jest.mock("fusion:properties", () => () => ({
	fallbackImage: "http://fallback.img",
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
	imageURL: "image-url.jpg",
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
		expect(screen.queryByRole("img")).not.toBeNull();
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
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("does not show description", () => {
		const noDescription = {
			...customFieldData,
			showDescription: false,
		};

		render(<MediumManualPromo customFields={noDescription} />);
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
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
