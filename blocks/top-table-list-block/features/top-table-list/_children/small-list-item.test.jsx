import React from "react";
import { mount } from "enzyme";
import { LEFT, RIGHT, ABOVE, BELOW } from "../shared/imagePositionConstants";

jest.mock("fusion:content", () => ({
	useEditableContent: jest.fn(() => ({
		editableContent: () => ({ contentEditable: "true" }),
	})),
	useContent: jest.fn(),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
	})),
}));

jest.mock("fusion:themes", () => jest.fn(() => ({})));

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
	imagePositionSM: RIGHT,
};

describe("small image block", () => {
	beforeAll(() => {
		jest.mock("fusion:properties", () =>
			jest.fn(() => ({
				fallbackImage: "placeholder.jpg",
				resizerURL: "http://example.com",
			}))
		);
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
				globalContent: {},
			})),
			useComponentContext: jest.fn(() => ({
				registerSuccessEvent: () => ({}),
			})),
		}));
	});

	afterAll(() => {
		jest.resetModules();
	});

	it.only("must render title and image with full props", () => {
		const itemTitle = "title";
		const imageURL = "pic";

		const element = {
			headlines: {
				basic: itemTitle,
			},
			promo_items: {
				basic: {
					type: "image",
					url: imageURL,
					resized_params: {
						"400x267": "VWgB9mYQ5--6WT0lD6nIw11D_yA=filters:cm=t/",
					},
				},
			},
			websites: {
				"the-sun": {
					website_url: "https://arcxp.com",
				},
			},
		};
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(<SmallListItem element={element} id={id} customFields={config} />);

		expect(wrapper.find("PromoHeadline").length).toBe(1);
		expect(wrapper.find(".sm-promo-headline").first().text()).toBe(itemTitle);

		expect(wrapper.find("PromoImage").length).toBe(1);
		expect(wrapper.find("Image").prop("url")).toBe(imageURL);

		expect(wrapper.find("article > hr").length).toBe(1);
	});

	it("must renders neither title nor image with empty props, renders placeholder image", () => {
		const fallbackImage = "fallback";
		const itemTitle = "";
		const id = "test";

		const element = {
			headlines: {
				basic: itemTitle,
			},
			promo_items: {},
			websites: {
				"the-sun": {
					website_url: "https://arcxp.com",
				},
			},
		};
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(<SmallListItem element={element} id={id} customFields={config} />);

		expect(wrapper.find("h2.sm-promo-headline").length).toBe(0);

		expect(wrapper.find("PromoImage").length).toBe(1);
		expect(wrapper.find("PromoImage").prop("url")).toBe(fallbackImage);

		expect(wrapper.find("article > hr").length).toBe(1);
	});

	it("must render only title if showImageSM false", () => {
		const id = "test";
		const itemTitle = "title";
		const imageURL = "pic";

		const element = {
			headlines: {
				basic: itemTitle,
			},
			promo_items: {
				basic: {
					type: "image",
					url: imageURL,
					resized_params: {
						"400x267": "VWgB9mYQ5--6WT0lD6nIw11D_yA=filters:cm=t/",
					},
				},
			},
			websites: {
				"the-sun": {
					website_url: "https://arcxp.com",
				},
			},
		};
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				element={element}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, { showImageSM: false })}
				resizedImageOptions={{ "400x267": "" }}
			/>
		);

		expect(wrapper.find("h2.sm-promo-headline").length).toBe(1);
		expect(wrapper.find("h2.sm-promo-headline").text()).toBe(itemTitle);
		expect(wrapper.find("PromoImage").length).toBe(0);
		expect(wrapper.find("article > hr").length).toBe(1);
	});

	it("must render only image if showHeadlinesSM false", () => {
		const itemTitle = "title";
		const imageURL = "pic";

		const element = {
			headlines: {
				basic: itemTitle,
			},
			promo_items: {
				basic: {
					type: "image",
					url: imageURL,
					resized_params: {
						"400x267": "VWgB9mYQ5--6WT0lD6nIw11D_yA=filters:cm=t/",
					},
				},
			},
			websites: {
				"the-sun": {
					website_url: "https://arcxp.com",
				},
			},
		};
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				element={element}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, { showHeadlineSM: false })}
			/>
		);

		expect(wrapper.find("h2.sm-promo-headline").length).toBe(0);
		expect(wrapper.find("PromoImage").length).toBe(1);
		expect(wrapper.find("article > hr").length).toBe(1);
	});

	it('must render with layout horizontal if image position is "left" or "right"', () => {
		const imageURL = "pic";
		const itemTitle = "title";
		const primaryFont = "arial";
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				imageURL={imageURL}
				itemTitle={itemTitle}
				primaryFont={primaryFont}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, { imagePositionSM: LEFT })}
				resizedImageOptions={{ "400x267": "" }}
			/>
		);

		expect(wrapper.find("article > .horizontal").length).toBe(1);
	});

	it('must render with layout vertical if image position is "above" or "below"', () => {
		const imageURL = "pic";
		const itemTitle = "title";
		const primaryFont = "arial";
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				imageURL={imageURL}
				itemTitle={itemTitle}
				primaryFont={primaryFont}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, { imagePositionSM: BELOW })}
				resizedImageOptions={{ "400x267": "" }}
			/>
		);
		expect(wrapper.find("article > .vertical").length).toBe(1);
	});

	it("must render only title if showImageSM false in horizontal layuout", () => {
		const imageURL = "pic";
		const itemTitle = "title";
		const primaryFont = "arial";
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				imageURL={imageURL}
				itemTitle={itemTitle}
				primaryFont={primaryFont}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, {
					storiesPerRowSM: 2,
					showImageSM: false,
				})}
				resizedImageOptions={{ "400x267": "" }}
			/>
		);

		expect(wrapper.find("h2.sm-promo-headline").length).toBe(1);
		expect(wrapper.find("h2.sm-promo-headline").text()).toBe(itemTitle);

		expect(wrapper.find("PromoImage").length).toBe(0);
		expect(wrapper.find("article > .horizontal").length).toBe(1);
	});

	it("must render only image if showHeadlineSM false in horizontal layuout", () => {
		const imageURL = "pic";
		const itemTitle = "title";
		const primaryFont = "arial";
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				imageURL={imageURL}
				itemTitle={itemTitle}
				primaryFont={primaryFont}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, {
					storiesPerRowSM: 2,
					showHeadlineSM: false,
				})}
				resizedImageOptions={{ "400x267": "" }}
			/>
		);

		expect(wrapper.find("h2.sm-promo-headline").length).toBe(0);

		expect(wrapper.find("PromoImage").length).toBe(1);
		expect(wrapper.find("article > .horizontal").length).toBe(1);
	});

	it("must render only image if showHeadlineSM false in vertical layout", () => {
		const imageURL = "pic";
		const itemTitle = "";
		const primaryFont = "arial";
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				imageURL={imageURL}
				itemTitle={itemTitle}
				primaryFont={primaryFont}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, {
					imagePositionSM: ABOVE,
					showHeadlineSM: false,
				})}
				resizedImageOptions={{ "400x267": "" }}
			/>
		);

		expect(wrapper.find("h2.sm-promo-headline").length).toBe(0);
		expect(wrapper.find("article > .vertical").length).toBe(1);
	});

	it("must render only title if showImageSM false in vertical layout", () => {
		const imageURL = "pic";
		const itemTitle = "title";
		const primaryFont = "arial";
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				imageURL={imageURL}
				itemTitle={itemTitle}
				primaryFont={primaryFont}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, {
					imagePositionSM: BELOW,
					showImageSM: false,
				})}
				resizedImageOptions={{ "400x267": "" }}
			/>
		);

		expect(wrapper.find("h2.sm-promo-headline").length).toBe(1);
		expect(wrapper.find("h2.sm-promo-headline").text()).toBe(itemTitle);
		expect(wrapper.find("PromoImage").length).toBe(0);
		expect(wrapper.find("article > .vertical").length).toBe(1);
	});

	it("must render only title if showImageSM false in vertical layout with bottom border", () => {
		const imageURL = "pic";
		const itemTitle = "title";
		const primaryFont = "arial";
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				imageURL={imageURL}
				itemTitle={itemTitle}
				primaryFont={primaryFont}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, {
					imagePositionSM: BELOW,
					showImageSM: false,
					showBottomBorderSM: true,
				})}
				resizedImageOptions={{ "400x267": "" }}
			/>
		);

		expect(wrapper.find("h2.sm-promo-headline").length).toBe(1);
		expect(wrapper.find("h2.sm-promo-headline").text()).toBe(itemTitle);
		expect(wrapper.find("PromoImage").length).toBe(0);
		expect(wrapper.find("article > .vertical").length).toBe(1);
		expect(wrapper.find("hr").length).toBe(1);
		expect(wrapper.find("hr").hasClass("hr-borderless")).toBe(false);
	});

	it("must render only title if showImageSM false in vertical layout without bottom border", () => {
		const imageURL = "pic";
		const itemTitle = "title";
		const primaryFont = "arial";
		const id = "test";
		const { default: SmallListItem } = require("./small-list-item");

		const wrapper = mount(
			<SmallListItem
				imageURL={imageURL}
				itemTitle={itemTitle}
				primaryFont={primaryFont}
				id={id}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, {
					imagePositionSM: BELOW,
					showImageSM: false,
					showBottomBorderSM: false,
				})}
				resizedImageOptions={{ "400x267": "" }}
			/>
		);

		expect(wrapper.find("h2.sm-promo-headline").length).toBe(1);
		expect(wrapper.find("h2.sm-promo-headline").text()).toBe(itemTitle);
		expect(wrapper.find("PromoImage").length).toBe(0);
		expect(wrapper.find("article > .vertical").length).toBe(1);
		expect(wrapper.find("hr").hasClass("hr-borderless")).toBe(true);
	});
});
