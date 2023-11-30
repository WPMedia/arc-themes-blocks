import React from "react";
import { render, screen } from "@testing-library/react";
import { useContent } from "fusion:content";
import { isServerSide } from "@wpmedia/arc-themes-components";

import LargeManualPromo from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({})),
	useComponentContext: jest.fn(() => ({
		registerSuccessEvent: () => ({}),
	})),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
	useEditableContent: jest.fn(() => ({
		searchableField: () => {},
	})),
}));

const customFieldData = {
	showOverline: true,
	showHeadline: true,
	showImage: true,
	showDescription: true,
	headline: "This is the headline",
	description: "This is the description",
	overline: "overline",
	overlineURL: "www.google.com",
	imageId: 123,
	imageURL: "www.google.com/fake.png",
	imageAuth: '{"2":"1d2390c4cc8df2265924631d707ead2490865f17830bfbb52c8541b8696bf573"}',
	linkURL: "www.google.com",
};

describe("the large promo feature", () => {
	afterEach(() => {
		jest.resetModules();
	});

	beforeEach(() => {
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
				id: "testId",
			})),
		}));
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		isServerSide.mockReturnValueOnce(true);
		const config = {
			lazyLoad: true,
		};
		const { container } = render(<LargeManualPromo customFields={config} />);
		expect(container.firstChild).toBe(null);
	});

	it("should use content source to get image auth", () => {
		useContent.mockReturnValueOnce({ hash: 123 });
		render(
			<LargeManualPromo
				customFields={{
					...customFieldData,
					headline: undefined,
					linkURL: undefined,
					imageAuth: undefined,
					imageId: 123,
				}}
			/>,
		);
		expect(useContent).toHaveBeenCalled();
		expect(screen.queryByRole("img", { hidden: true })).not.toBeNull();
	});

	it("does not show image", () => {
		const noImage = {
			...customFieldData,
			showImage: false,
		};

		render(<LargeManualPromo customFields={noImage} />);
		expect(screen.queryByRole("img")).toBeNull();
	});

	it("does not show headline", () => {
		const noHeadline = {
			...customFieldData,
			headline: null,
			showHeadline: false,
		};

		render(<LargeManualPromo customFields={noHeadline} />);
		expect(screen.queryByText(customFieldData.headline)).toBeNull();
		expect(screen.queryByText(customFieldData.description)).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("renders headline with no link", () => {
		const noHeadline = {
			...customFieldData,
			linkURL: undefined,
		};

		render(<LargeManualPromo customFields={noHeadline} />);
		expect(screen.queryByRole("link", { name: customFieldData.headline })).toBeNull();
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("does not show headline or description", () => {
		const noHeadlineOrDescription = {
			...customFieldData,
			showHeadline: false,
			showDescription: false,
			headline: null,
			description: null,
		};

		render(<LargeManualPromo customFields={noHeadlineOrDescription} />);
		expect(screen.queryByText(customFieldData.headline)).toBeNull();
		expect(screen.queryByText(customFieldData.description)).toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("does not show description", () => {
		const noDescripiton = {
			...customFieldData,
			showDescription: false,
			description: null,
		};

		render(<LargeManualPromo customFields={noDescripiton} />);
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("renders overline", () => {
		const noHeadline = {
			...customFieldData,
			linkURL: undefined,
		};

		render(<LargeManualPromo customFields={noHeadline} />);
		expect(screen.queryByRole("link", { name: customFieldData.overline })).not.toBeNull();
		expect(screen.queryByText(customFieldData.overline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).not.toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("renders overline without link", () => {
		const noOverlineLink = {
			...customFieldData,
			overlineURL: undefined,
		};

		render(<LargeManualPromo customFields={noOverlineLink} />);
		expect(screen.queryByRole("link", { name: customFieldData.overline })).toBeNull();
		expect(screen.queryByText(customFieldData.overline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.headline)).not.toBeNull();
		expect(screen.queryByText(customFieldData.description)).not.toBeNull();
		expect(screen.queryByRole("img", { hidden: true })).not.toBeNull();
	});

	it("does not render overline", () => {
		const noOverlineLink = {
			...customFieldData,
			showOverline: false,
			overlineURL: undefined,
		};

		render(<LargeManualPromo customFields={noOverlineLink} />);
		expect(screen.queryByRole("link", { name: customFieldData.overline })).toBeNull();
		expect(screen.queryByText(customFieldData.overline)).toBeNull();
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
		render(<LargeManualPromo customFields={config} />);
		expect(screen.queryByRole("img", { name: config.headline })).not.toBeNull();
	});

	it("should make a blank call to the signing-service if the image is from PhotoCenter and has an Auth value", () => {
		const config = {
			imageAuth: '{"2":"1d2390c4cc8df2265924631d707ead2490865f17830bfbb52c8541b8696bf573"}',
			imageURL: "test_id=123",
			imageId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<LargeManualPromo customFields={config} />);
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
		render(<LargeManualPromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});

	it("should make a call to the signing-service if the image is not from PhotoCenter", () => {
		const config = {
			imageAuth: "",
			imageURL: "test_id=123",
			imageId: "abc",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<LargeManualPromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});
});
