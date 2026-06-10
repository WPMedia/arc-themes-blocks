import "@testing-library/jest-dom";
import React from "react";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import { render } from "@testing-library/react";

import { isServerSide } from "@wpmedia/arc-themes-components";

import TopTableListWrapper from "./default";
import mockData from "../../mock-data";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
		isAdmin: false,
	})),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => {}),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
	LazyLoad: ({ children }) => children,
}));

const config = {
	showOverlineXL: true,
	showHeadlineXL: true,
	showImageXL: true,
	showDescriptionXL: true,
	showBylineXL: true,
	showDateXL: true,
	showOverlineLG: true,
	showHeadlineLG: true,
	showImageLG: true,
	showDescriptionLG: true,
	showBylineLG: true,
	showDateLG: true,
	showHeadlineMD: true,
	showImageMD: true,
	showDescriptionMD: true,
	showBylineMD: true,
	showDateMD: true,
	showHeadlineSM: true,
	showImageSM: true,
	imagePositionSM: "right",
};

describe("Top Table List", () => {
	afterEach(() => {
		jest.resetModules();
	});

	it("renders nothing server side with lazyLoad enabled", () => {
		isServerSide.mockReturnValueOnce(true);
		useContent.mockReturnValueOnce(null);

		const { container } = render(<TopTableListWrapper customFields={config} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("bypass lazyLoad if not isAdmin and has content", () => {
		isServerSide.mockReturnValueOnce(true);
		useContent.mockReturnValue({ content_elements: [{ _id: "1234" }] });
		useFusionContext.mockReturnValueOnce({
			arcSite: "the-sun",
			isAdmin: false,
		});

		const { container } = render(
			<TopTableListWrapper customFields={{ ...config, lazyLoad: true }} />,
		);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders null if no content", () => {
		useContent.mockReturnValue({ content_elements: [] });

		const { container } = render(<TopTableListWrapper customFields={{ ...config, medium: 1 }} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("does not render content item with incomplete data", () => {
		useContent.mockReturnValue({ content_elements: [{ _id: "1234" }] });

		const { container } = render(<TopTableListWrapper customFields={{ ...config, medium: 1 }} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders one content item with complete data", () => {
		useContent.mockReturnValue({ content_elements: [mockData] });

		const { container } = render(<TopTableListWrapper customFields={{ ...config, small: 1 }} />);
		expect(container).not.toBeEmptyDOMElement();
	});

	it("renders one content item with complete data", () => {
		useContent.mockReturnValue({ content_elements: [mockData, { _id: 123 }] });

		const { container } = render(<TopTableListWrapper customFields={{ ...config, medium: 1 }} />);
		expect(container).not.toBeEmptyDOMElement();
	});

	it("renders with isAdmin true and lazyLoad enabled (does not return null server-side)", () => {
		isServerSide.mockReturnValueOnce(true);
		useContent.mockReturnValue({ content_elements: [mockData] });
		useFusionContext.mockReturnValueOnce({
			arcSite: "the-sun",
			isAdmin: true,
		});

		// isAdmin=true bypasses the server-side lazyLoad null return
		const { container } = render(
			<TopTableListWrapper customFields={{ ...config, small: 1, lazyLoad: true }} />,
		);
		expect(container).not.toBeEmptyDOMElement();
	});

	it("fills storyTypeMap for the same type", () => {
		// Two small stories — second iteration hits the already-initialised key branch
		useContent.mockReturnValue({ content_elements: [mockData, mockData] });

		const { container } = render(
			<TopTableListWrapper customFields={{ ...config, small: 2 }} />,
		);
		expect(container).not.toBeEmptyDOMElement();
	});

	it("renders nothing when storyTypeArray has more entries than storyList", () => {
		// Only one content element, but three small story slots — index 1 and 2 are skipped
		useContent.mockReturnValue({ content_elements: [mockData] });

		const { container } = render(
			<TopTableListWrapper customFields={{ ...config, small: 3 }} />,
		);
		expect(container).not.toBeEmptyDOMElement();
	});
});
