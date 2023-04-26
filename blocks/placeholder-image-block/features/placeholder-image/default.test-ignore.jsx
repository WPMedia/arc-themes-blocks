import React from "react";
import { useContent } from "fusion:content";
import getProperties from "fusion:properties";
import { mount } from "enzyme";
import PlaceholderImage from "./default";

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => {}),
	useFusionContext: jest.fn(() => {}),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
		deployment: jest.fn((x) => x),
		contextPath: "/pf",
	})),
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		websiteDomain: "",
		fallbackImage: "http://resources/placeholder.jpg",
		resizerURL: "resizer",
	}))
);

describe("placeholder-block", () => {
	describe("absolute URL", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});

		it("renders nothing if no resizer image options for placeholder image", () => {
			useContent.mockReturnValueOnce(null);
			const wrapper = mount(<PlaceholderImage />);

			expect(wrapper.html()).toBe(null);
		});

		it("renders Image", () => {
			useContent.mockReturnValueOnce({ abc: 123 });
			const wrapper = mount(<PlaceholderImage />);

			expect(wrapper.find("Image").length).toBe(1);
		});

		it("used client side content source with client prop defined", () => {
			useContent.mockReturnValueOnce({ abc: 123 });
			const wrapper = mount(<PlaceholderImage client />);

			expect(useContent).toBeCalledWith({
				query: {
					raw_image_url: "http://resources/placeholder.jpg",
					respect_aspect_ratio: true,
				},
				source: "resize-image-api-client",
			});
			expect(wrapper.find("Image").length).toBe(1);
		});
	});

	describe("relative URL", () => {
		it("uses no content source", () => {
			getProperties.mockReturnValueOnce({
				fallbackImage: "/resources/test.jpg",
			});
			const wrapper = mount(<PlaceholderImage client />);

			expect(useContent).toHaveBeenCalledWith({});
			expect(wrapper.find("Image").length).toBe(1);
		});
	});
});
