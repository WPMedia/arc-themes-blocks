import React from "react";
import { mount } from "enzyme";
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
		const wrapper = mount(<MediumManualPromo customFields={config} />);
		expect(wrapper.html()).toBe(null);
	});

	it("should render all fields", () => {
		const wrapper = mount(<MediumManualPromo customFields={customFieldData} />);
		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<article class=\\"b-medium-manual-promo b-medium-manual-promo--show-image\\"><figure class=\\"c-media-item\\"><a class=\\"c-link\\" href=\\"arcxp.com\\"><img alt=\\"Headline\\" class=\\"c-image\\" loading=\\"lazy\\" src=\\"image-url.jpg\\"></a></figure><h2 class=\\"c-heading\\"><a class=\\"c-link\\" href=\\"arcxp.com\\">Headline</a></h2><p class=\\"c-paragraph\\">Description</p></article>"`
		);
	});

	it("does not show image", () => {
		const noImage = {
			...customFieldData,
			showImage: false,
		};
		const wrapper = mount(<MediumManualPromo customFields={noImage} />);
		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<article class=\\"b-medium-manual-promo\\"><h2 class=\\"c-heading\\"><a class=\\"c-link\\" href=\\"arcxp.com\\">Headline</a></h2><p class=\\"c-paragraph\\">Description</p></article>"`
		);
	});

	it("uses fallback image", () => {
		const fallbackImage = {
			...customFieldData,
			imageURL: null,
		};
		const wrapper = mount(<MediumManualPromo customFields={fallbackImage} />);
		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<article class=\\"b-medium-manual-promo b-medium-manual-promo--show-image\\"><figure class=\\"c-media-item\\"><a class=\\"c-link\\" href=\\"arcxp.com\\"><img alt=\\"Headline\\" class=\\"c-image\\" loading=\\"lazy\\" src=\\"http://fallback.img\\"></a></figure><h2 class=\\"c-heading\\"><a class=\\"c-link\\" href=\\"arcxp.com\\">Headline</a></h2><p class=\\"c-paragraph\\">Description</p></article>"`
		);
	});

	it("does not show description", () => {
		const noDescription = {
			...customFieldData,
			showDescription: false,
		};
		const wrapper = mount(<MediumManualPromo customFields={noDescription} />);
		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<article class=\\"b-medium-manual-promo b-medium-manual-promo--show-image\\"><figure class=\\"c-media-item\\"><a class=\\"c-link\\" href=\\"arcxp.com\\"><img alt=\\"Headline\\" class=\\"c-image\\" loading=\\"lazy\\" src=\\"image-url.jpg\\"></a></figure><h2 class=\\"c-heading\\"><a class=\\"c-link\\" href=\\"arcxp.com\\">Headline</a></h2></article>"`
		);
	});

	it("does not show headline", () => {
		const noHeadline = {
			...customFieldData,
			showHeadline: false,
		};
		const wrapper = mount(<MediumManualPromo customFields={noHeadline} />);
		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<article class=\\"b-medium-manual-promo b-medium-manual-promo--show-image\\"><figure class=\\"c-media-item\\"><a class=\\"c-link\\" href=\\"arcxp.com\\"><img alt=\\"Headline\\" class=\\"c-image\\" loading=\\"lazy\\" src=\\"image-url.jpg\\"></a></figure><p class=\\"c-paragraph\\">Description</p></article>"`
		);
	});

	it("renders headline with no link", () => {
		const noHeadline = {
			...customFieldData,
			linkURL: undefined,
		};
		const wrapper = mount(<MediumManualPromo customFields={noHeadline} />);
		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<article class=\\"b-medium-manual-promo b-medium-manual-promo--show-image\\"><figure class=\\"c-media-item\\"><img alt=\\"Headline\\" class=\\"c-image\\" loading=\\"lazy\\" src=\\"image-url.jpg\\"></figure><h2 class=\\"c-heading\\">Headline</h2><p class=\\"c-paragraph\\">Description</p></article>"`
		);
	});
});
