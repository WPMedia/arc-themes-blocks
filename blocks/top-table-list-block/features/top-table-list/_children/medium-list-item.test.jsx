import React from "react";
import { mount } from "enzyme";

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
	// headlinePositionXL: 'below',
	showImageXL: true,
	showDescriptionXL: true,
	showBylineXL: true,
	showDateXL: true,
	showOverlineLG: true,
	showHeadlineLG: true,
	// headlinePositionLG: 'below',
	showImageLG: true,
	showDescriptionLG: true,
	showBylineLG: true,
	showDateLG: true,
	showHeadlineMD: true,
	// headlinePositionMD: 'above',
	showImageMD: true,
	showDescriptionMD: true,
	showBylineMD: true,
	showDateMD: true,
	showHeadlineSM: true,
	// headlinePositionSM: 'below',
	showImageSM: true,
};

// const headBelowConfig = {
//   showOverlineXL: true,
//   showHeadlineXL: true,
//   headlinePositionXL: 'below',
//   showImageXL: true,
//   showDescriptionXL: true,
//   showBylineXL: true,
//   showDateXL: true,
//   showOverlineLG: true,
//   showHeadlineLG: true,
//   headlinePositionLG: 'below',
//   showImageLG: true,
//   showDescriptionLG: true,
//   showBylineLG: true,
//   showDateLG: true,
//   showHeadlineMD: true,
//   headlinePositionMD: 'below',
//   showImageMD: true,
//   showDescriptionMD: true,
//   showBylineMD: true,
//   showDateMD: true,
//   showHeadlineSM: true,
//   headlinePositionSM: 'below',
//   showImageSM: true,
// };

describe("medium list item", () => {
	beforeAll(() => {
		jest.mock("fusion:themes", () => jest.fn(() => ({})));
		jest.mock("@wpmedia/engine-theme-sdk", () => ({
			Image: () => <img alt="placeholder" />,
		}));
		jest.mock("fusion:properties", () =>
			jest.fn(() => ({
				fallbackImage: "placeholder.jpg",
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

	it("renders title and image with full props", () => {
		const imageURL = "pic";
		const itemTitle = "title";
		const descriptionText = "description";
		const by = ["jack"];
		const id = "test";

		const element = {
			headlines: {
				basic: itemTitle,
			},
			description: {
				basic: descriptionText,
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
			credits: { by },
			websites: {
				"the-sun": {
					website_url: "https://arcxp.com",
				},
			},
		};
		const { default: MediumListItem } = require("./medium-list-item");

		// eslint-disable-next-line no-unused-vars
		const wrapper = mount(<MediumListItem element={element} id={id} customFields={config} />);

		// placeholder
		expect(wrapper.find(".top-table-med-image-placeholder").length).toBe(0);

		// doesn't find spacer
		// expect(wrapper.find('.headline-description-spacing').length).toBe(0);

		// finds description text
		expect(wrapper.find("PromoDescription").text()).toBe(descriptionText);

		expect(wrapper.find("hr").length).toBe(1);
	});

	// it('headline has class headline-above when headline position is above', () => {
	//   const imageURL = 'pic';
	//   const constructedURL = 'url';
	//   const itemTitle = 'title';
	//   const descriptionText = 'description';
	//   const primaryFont = 'arial';
	//   const secondaryFont = 'Georgia';
	//   const by = ['jack'];
	//   const element = { credits: { by: [] } };
	//   const displayDate = '';
	//   const id = 'test';
	//   const { default: MediumListItem } = require('./medium-list-item');

	//   // eslint-disable-next-line no-unused-vars
	//   const wrapper = mount(<MediumListItem
	//     imageURL={imageURL}
	//     constructedURL={constructedURL}
	//     itemTitle={itemTitle}
	//     descriptionText={descriptionText}
	//     primaryFont={primaryFont}
	//     secondaryFont={secondaryFont}
	//     by={by}
	//     element={element}
	//     displayDate={displayDate}
	//     id={id}
	//     customFields={config}
	//   />);

	//   expect(wrapper.find('.headline-above').length).toBe(1);
	//   expect(wrapper.find('.headline-below').length).toBe(0);
	// });

	// it('headline has class headline-below when headline position is below', () => {
	//   const imageURL = 'pic';
	//   const constructedURL = 'url';
	//   const itemTitle = 'title';
	//   const descriptionText = 'description';
	//   const primaryFont = 'arial';
	//   const secondaryFont = 'Georgia';
	//   const by = ['jack'];
	//   const element = { credits: { by: [] } };
	//   const displayDate = '';
	//   const id = 'test';
	//   const { default: MediumListItem } = require('./medium-list-item');

	//   // eslint-disable-next-line no-unused-vars
	//   const wrapper = mount(<MediumListItem
	//     imageURL={imageURL}
	//     constructedURL={constructedURL}
	//     itemTitle={itemTitle}
	//     descriptionText={descriptionText}
	//     primaryFont={primaryFont}
	//     secondaryFont={secondaryFont}
	//     by={by}
	//     element={element}
	//     displayDate={displayDate}
	//     id={id}
	//     customFields={headBelowConfig}
	//   />);

	//   expect(wrapper.find('.headline-below').length).toBe(1);
	//   expect(wrapper.find('.headline-above').length).toBe(0);
	// });

	it("renders image placeholder with empty props", () => {
		const { default: MediumListItem } = require("./medium-list-item");

		const imageURL = "";
		const constructedURL = "url";
		const itemTitle = "";
		const descriptionText = "";
		const primaryFont = "arial";
		const secondaryFont = "Georgia";
		const by = [];
		const element = {};
		const displayDate = "";
		const id = "test";

		// eslint-disable-next-line no-unused-vars
		const wrapper = mount(
			<MediumListItem
				imageURL={imageURL}
				constructedURL={constructedURL}
				itemTitle={itemTitle}
				descriptionText={descriptionText}
				primaryFont={primaryFont}
				secondaryFont={secondaryFont}
				by={by}
				element={element}
				displayDate={displayDate}
				id={id}
				customFields={config}
			/>
		);

		const placeholderImage = wrapper.find("img");

		// There should be no imag present
		expect(placeholderImage.length).toBe(1);
		expect(placeholderImage.html()).toBe('<img alt="placeholder">');

		// doesn't find a headline
		expect(wrapper.find("a.md-promo-headline").length).toBe(0);

		expect(wrapper.find("hr").length).toBe(1);
	});

	it("renders image placeholder with empty props with bottom border", () => {
		const { default: MediumListItem } = require("./medium-list-item");

		const imageURL = "";
		const constructedURL = "url";
		const itemTitle = "";
		const descriptionText = "";
		const primaryFont = "arial";
		const secondaryFont = "Georgia";
		const by = [];
		const element = {};
		const displayDate = "";
		const id = "test";

		config.showBottomBorderMD = true;

		// eslint-disable-next-line no-unused-vars
		const wrapper = mount(
			<MediumListItem
				imageURL={imageURL}
				constructedURL={constructedURL}
				itemTitle={itemTitle}
				descriptionText={descriptionText}
				primaryFont={primaryFont}
				secondaryFont={secondaryFont}
				by={by}
				element={element}
				displayDate={displayDate}
				id={id}
				customFields={config}
			/>
		);

		const placeholderImage = wrapper.find("img");

		// There should be no imag present
		expect(placeholderImage.length).toBe(1);
		expect(placeholderImage.html()).toBe('<img alt="placeholder">');

		// doesn't find a headline
		expect(wrapper.find("a.md-promo-headline").length).toBe(0);

		expect(wrapper.find("hr").length).toBe(1);
		expect(wrapper.find("hr").hasClass("hr-borderless")).toBe(false);

		expect(wrapper.find("hr").length).toBe(1);
	});

	it("renders image placeholder with empty props without bottom border", () => {
		const { default: MediumListItem } = require("./medium-list-item");

		const imageURL = "";
		const constructedURL = "url";
		const itemTitle = "";
		const descriptionText = "";
		const primaryFont = "arial";
		const secondaryFont = "Georgia";
		const by = [];
		const element = {};
		const displayDate = "";
		const id = "test";

		config.showBottomBorderMD = false;

		// eslint-disable-next-line no-unused-vars
		const wrapper = mount(
			<MediumListItem
				imageURL={imageURL}
				constructedURL={constructedURL}
				itemTitle={itemTitle}
				descriptionText={descriptionText}
				primaryFont={primaryFont}
				secondaryFont={secondaryFont}
				by={by}
				element={element}
				displayDate={displayDate}
				id={id}
				customFields={config}
			/>
		);

		const placeholderImage = wrapper.find("img");

		// There should be no imag present
		expect(placeholderImage.length).toBe(1);
		expect(placeholderImage.html()).toBe('<img alt="placeholder">');

		// doesn't find a headline
		expect(wrapper.find("a.md-promo-headline").length).toBe(0);

		expect(wrapper.find("hr").hasClass("hr-borderless")).toBe(true);

		expect(wrapper.find("hr").length).toBe(1);
	});
});
