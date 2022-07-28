import React from "react";
import { mount } from "enzyme";
import StoryItem from "./story-item";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	Image: () => <img url="" alt="placeholder placeholder" />,
}));

jest.mock("fusion:themes", () => jest.fn(() => ({})));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-gazette",
	})),
}));

describe("Story item", () => {
	it("renders title if title provided", () => {
		const testText = "Man Bites Dog";
		const wrapper = mount(
			<StoryItem itemTitle={testText} showHeadline showImage websiteURL="test.com" />
		);
		expect(wrapper.text()).toBe(testText);
	});
	it("renders no title if no title provided", () => {
		const wrapper = mount(<StoryItem />);

		expect(wrapper.text()).toBe("");
	});
	it("renders an image when you pass one in", () => {
		const imageURL =
			"https://en.wikipedia.org/wiki/The_Washington_Post#/media/File:Washington_Post_building.jpg";

		const wrapper = mount(
			<StoryItem imageURL={imageURL} showHeadline showImage websiteURL="test.com" />
		);
		expect(wrapper.find("img").length).toBe(1);
	});
});
