import { mount } from "enzyme";
import React from "react";
import { isServerSide, Carousel } from "@wpmedia/arc-themes-components";
import { useContent } from "fusion:content";
import Gallery from "./default";

const { Item: CarouselItem } = Carousel;
window.matchMedia = jest.fn();

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => []),
}));
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "test",
		isAdmin: false,
	})),
	useAppContext: jest.fn(() => ({
		globalContent: {},
	})),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
}));

describe("Gallery feature parent block", () => {
	it("renders null if on server and lazy load enabled", () => {
		isServerSide.mockReturnValue(true);
		const wrapper = mount(<Gallery customFields={{ lazyLoad: true }} />);
		expect(wrapper.html()).toBeNull();
	});
	it("does not render null if not on server and without lazy load", () => {
		const wrapper = mount(<Gallery />);
		expect(wrapper.html()).not.toBeNull();
	});
	it("renders no carousel items if no gallery items", () => {
		const wrapper = mount(<Gallery />);
		expect(wrapper.find(Carousel)).toHaveLength(1);
		expect(wrapper.find(CarouselItem)).toHaveLength(0);
	});
	it("renders carousel items if gallery items from block content", () => {
		useContent.mockReturnValue({
			content_elements: [
				{
					caption: "my cool global content caption",
					subtitle: "my cool global content subtitle",
					auth: {
						2: "auth string",
					},
				},
			],
			_id: "shdsjdhs73e34",
			headlines: {
				basic: "This is a global content headline",
			},
		});
		const wrapper = mount(<Gallery customFields={{ inheritGlobalContent: false }} />);
		expect(wrapper.find(Carousel)).toHaveLength(1);
		expect(wrapper.find(CarouselItem)).toHaveLength(1);
	});
});
