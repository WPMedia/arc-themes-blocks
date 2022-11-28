import React from "react";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import { render } from "@testing-library/react";

import { isServerSide } from "@wpmedia/arc-themes-components";

import TopTableListWrapper from "./default";
import mockData from "../../mock-data";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
	}))
);

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
		isAdmin: false,
	})),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => {}),
}));

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	...jest.requireActual("@wpmedia/engine-theme-sdk"),
	LazyLoad: ({ children }) => <>{children}</>,
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
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
		expect(container.firstChild).toBeNull();
	});

	it("bypass lazyLoad if not isAdmin and has content", () => {
		isServerSide.mockReturnValueOnce(true);
		useContent.mockReturnValue({ content_elements: [{ _id: "1234" }] });
		useFusionContext.mockReturnValueOnce({
			arcSite: "the-sun",
			isAdmin: false,
		});

		const { container } = render(
			<TopTableListWrapper customFields={{ ...config, lazyLoad: true }} />
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders null if no content", () => {
		useContent.mockReturnValue({ content_elements: [] });

		const { container } = render(<TopTableListWrapper customFields={{ ...config, medium: 1 }} />);
		expect(container.firstChild).toBeNull();
	});

	it("does not render content item with incomplete data", () => {
		useContent.mockReturnValue({ content_elements: [{ _id: "1234" }] });

		const { container } = render(<TopTableListWrapper customFields={{ ...config, medium: 1 }} />);
		expect(container.firstChild).toBeNull();
	});

	it("renders one content item with complete data", () => {
		useContent.mockReturnValue({ content_elements: [mockData] });

		const { container } = render(<TopTableListWrapper customFields={{ ...config, small: 1 }} />);
		expect(container.firstChild).not.toBeNull();
	});

	it("renders one content item with complete data", () => {
		useContent.mockReturnValue({ content_elements: [mockData, { _id: 123 }] });

		const { container } = render(<TopTableListWrapper customFields={{ ...config, medium: 1 }} />);
		expect(container.firstChild).not.toBeNull();
	});
});
