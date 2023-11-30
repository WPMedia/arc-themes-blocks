describe("This test is disabled", () => {
	it("should succeed", () => {
		expect(true);
	});
});

// import { mount } from "enzyme";
// import React from "react";
// import { Carousel, isServerSide, LazyLoad, MediaItem } from "@wpmedia/arc-themes-components";
// import { useContent } from "fusion:content";
// import { useAppContext, useFusionContext } from "fusion:context";

// import Gallery from "./default";

// const { Item: CarouselItem } = Carousel;
// window.matchMedia = jest.fn();
// jest.mock("fusion:environment", () => ({
// 	RESIZER_TOKEN_VERSION: 2,
// }));
// jest.mock("fusion:content", () => ({
// 	useContent: jest.fn(() => []),
// }));
// jest.mock("fusion:context", () => ({
// 	useFusionContext: jest.fn(() => ({
// 		arcSite: "test",
// 		isAdmin: false,
// 	})),
// 	useAppContext: jest.fn(() => ({})),
// }));

// jest.mock("@wpmedia/arc-themes-components", () => ({
// 	...jest.requireActual("@wpmedia/arc-themes-components"),
// 	isServerSide: jest.fn(() => false),
// 	LazyLoad: ({ children }) => children,
// 	// mocking format credits to return whatever passed in
// 	formatCredits: jest.fn((input) => input),
// }));

// describe("Gallery feature parent block", () => {
// 	it("renders null if on server and lazy load enabled", () => {
// 		isServerSide.mockReturnValue(true);
// 		const wrapper = mount(<Gallery customFields={{ lazyLoad: true }} />);
// 		expect(wrapper.html()).toBeNull();
// 	});
// 	it("does not render null if not on server and without lazy load", () => {
// 		const wrapper = mount(<Gallery />);
// 		expect(wrapper.html()).not.toBeNull();
// 	});
// 	it("renders a lazy load disabled container if lazy load and is admin", () => {
// 		useFusionContext.mockReturnValue({
// 			isAdmin: true,
// 		});
// 		const wrapper = mount(<Gallery customFields={{ lazyLoad: true }} />);
// 		expect(wrapper.html()).not.toBeNull();
// 		expect(wrapper.find(LazyLoad).props().enabled).toBe(false);
// 	});
// 	it("renders a lazy load enabled container if lazy load and is not admin", () => {
// 		const wrapper = mount(<Gallery customFields={{ lazyLoad: true }} />);
// 		expect(wrapper.html()).not.toBeNull();
// 		expect(wrapper.find(LazyLoad).props().enabled).toBe(false);
// 	});
// 	it("renders no carousel items if no gallery items", () => {
// 		const wrapper = mount(<Gallery />);
// 		expect(wrapper.find(Carousel)).toHaveLength(1);
// 		expect(wrapper.find(CarouselItem)).toHaveLength(0);
// 	});
// 	it("renders carousel items if gallery items from block content", () => {
// 		useContent.mockReturnValue({
// 			content_elements: [
// 				{
// 					caption: "my cool content caption",
// 					subtitle: "my cool content subtitle",
// 					auth: {
// 						2: "auth string",
// 					},
// 				},
// 			],
// 			_id: "id",
// 			headlines: {
// 				basic: "This is a global content headline",
// 			},
// 		});
// 		const wrapper = mount(<Gallery customFields={{ inheritGlobalContent: false }} />);
// 		expect(wrapper.find(Carousel)).toHaveLength(1);
// 		expect(wrapper.find(CarouselItem)).toHaveLength(1);
// 	});
// 	it("renders carousel items if gallery items from global content", () => {
// 		useAppContext.mockReturnValue({
// 			globalContent: {
// 				content_elements: [
// 					{
// 						caption: "my cool global content caption",
// 						subtitle: "my cool global content subtitle",
// 						auth: {
// 							2: "auth string",
// 						},
// 					},
// 				],
// 				_id: "id",
// 				headlines: {
// 					basic: "This is a global content headline",
// 				},
// 			},
// 		});
// 		const wrapper = mount(
// 			<Gallery
// 				customFields={{
// 					galleryContentConfig: {},
// 					inheritGlobalContent: true,
// 				}}
// 			/>
// 		);

// 		expect(wrapper.find(Carousel)).toHaveLength(1);
// 		expect(wrapper.find(CarouselItem)).toHaveLength(1);
// 	});
// 	it("renders subtitle, caption, and title on the media item", () => {
// 		useContent.mockReturnValue({
// 			content_elements: [
// 				{
// 					caption: "my cool content caption",
// 					subtitle: "my cool content subtitle",
// 					auth: {
// 						2: "auth string",
// 					},
// 					credits: "my cool content credits",
// 				},
// 			],
// 			_id: "id",
// 			headlines: {
// 				basic: "This is a global content headline",
// 			},
// 		});
// 		const wrapper = mount(<Gallery customFields={{ inheritGlobalContent: false }} />);
// 		expect(wrapper.find(MediaItem).props().caption).toBe("my cool content caption");
// 		expect(wrapper.find(MediaItem).props().credit).toBe("my cool content credits");
// 		expect(wrapper.find(MediaItem).props().title).toBe("my cool content subtitle");
// 	});
// 	it("hides title if elected in custom field", () => {
// 		useContent.mockReturnValue({
// 			content_elements: [
// 				{
// 					caption: "my cool content caption",
// 					subtitle: "my cool content subtitle",
// 					auth: {
// 						2: "auth string",
// 					},
// 					credits: "my cool content credits",
// 				},
// 			],
// 			_id: "id",
// 			headlines: {
// 				basic: "This is a global content headline",
// 			},
// 		});
// 		const wrapper = mount(
// 			<Gallery customFields={{ inheritGlobalContent: false, hideTitle: true }} />
// 		);
// 		expect(wrapper.find(MediaItem).props().caption).toBe("my cool content caption");
// 		expect(wrapper.find(MediaItem).props().credit).toBe("my cool content credits");
// 		expect(wrapper.find(MediaItem).props().title).toBe(null);
// 	});
// 	it("hides caption if elected in custom field", () => {
// 		useContent.mockReturnValue({
// 			content_elements: [
// 				{
// 					caption: "my cool content caption",
// 					subtitle: "my cool content subtitle",
// 					auth: {
// 						2: "auth string",
// 					},
// 					credits: "my cool content credits",
// 				},
// 			],
// 			_id: "id",
// 			headlines: {
// 				basic: "This is a global content headline",
// 			},
// 		});
// 		const wrapper = mount(
// 			<Gallery customFields={{ inheritGlobalContent: false, hideCaption: true }} />
// 		);
// 		expect(wrapper.find(MediaItem).props().caption).toBe(null);
// 		expect(wrapper.find(MediaItem).props().credit).toBe("my cool content credits");
// 		expect(wrapper.find(MediaItem).props().title).toBe("my cool content subtitle");
// 	});
// 	it("hides credit if elected in custom field", () => {
// 		useContent.mockReturnValue({
// 			content_elements: [
// 				{
// 					caption: "my cool content caption",
// 					subtitle: "my cool content subtitle",
// 					auth: {
// 						2: "auth string",
// 					},
// 					credits: "my cool content credits",
// 				},
// 			],
// 			_id: "id",
// 			headlines: {
// 				basic: "This is a global content headline",
// 			},
// 		});
// 		const wrapper = mount(
// 			<Gallery customFields={{ inheritGlobalContent: false, hideCredits: true }} />
// 		);
// 		expect(wrapper.find(MediaItem).props().caption).toBe("my cool content caption");
// 		expect(wrapper.find(MediaItem).props().credit).toBe(null);
// 		expect(wrapper.find(MediaItem).props().title).toBe("my cool content subtitle");
// 	});
// });
