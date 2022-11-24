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
	showHeadlineSM: true,
	showImageSM: true,
	showBottomBorderSM: true,
	imagePositionSM: "right",
};

describe("small image block", () => {
	beforeAll(() => {
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				arcSite: "the-sun",
				globalContent: {},
			})),
		}));
	});

	afterAll(() => {
		jest.resetModules();
	});

	it("must render title and image with full props", () => {
		const itemTitle = "title";
		const imageURL = "pic.jpg";

		const element = {
			headlines: {
				basic: itemTitle,
			},
			promo_items: {
				basic: {
					_id: "123",
					type: "image",
					url: imageURL,
					auth: {
						2: "ABC",
					},
				},
			},
			websites: {
				"the-sun": {
					website_url: "https://arcxp.com",
				},
			},
		};

		const { default: Small } = require("./small");

		const wrapper = mount(<Small element={element} customFields={config} />);

		expect(wrapper.find("img").length).toBe(1);
		expect(wrapper.find("Heading").first().text()).toContain(itemTitle);

		expect(wrapper.find("hr").length).toBe(1);
	});

	it("must renders neither title nor image with empty props, renders placeholder image", () => {
		const element = {
			headlines: {
				basic: "",
			},
			promo_items: {},
			websites: {
				"the-sun": {
					website_url: "https://arcxp.com",
				},
			},
		};
		const { default: Small } = require("./small");

		const wrapper = mount(<Small element={element} customFields={config} />);

		expect(wrapper.find("h2").length).toBe(0);
		expect(wrapper.find("img").length).toBe(1);
		expect(wrapper.find("hr").length).toBe(1);
	});

	it("must render only title if showImageSM false", () => {
		const itemTitle = "title";
		const imageURL = "pic";

		const element = {
			headlines: {
				basic: itemTitle,
			},
			promo_items: {
				basic: {
					_id: "123",
					type: "image",
					url: imageURL,
					auth: {
						2: "ABC",
					},
				},
			},
			websites: {
				"the-sun": {
					website_url: "https://arcxp.com",
				},
			},
		};
		const { default: Small } = require("./small");

		const wrapper = mount(
			<Small
				element={element}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, { showImageSM: false })}
			/>
		);

		expect(wrapper.find("h2").length).toBe(1);
		expect(wrapper.find("h2").text()).toContain(itemTitle);
		expect(wrapper.find("img").length).toBe(0);
		expect(wrapper.find("hr").length).toBe(1);
	});

	it("must render only image if showHeadlineSM false", () => {
		const itemTitle = "title";
		const imageURL = "pic";

		const element = {
			headlines: {
				basic: itemTitle,
			},
			promo_items: {
				basic: {
					_id: "ID123",
					type: "image",
					url: imageURL,
					auth: {
						2: "AUTH123",
					},
				},
			},
			websites: {
				"the-sun": {
					website_url: "https://arcxp.com",
				},
			},
		};
		const { default: Small } = require("./small");

		const wrapper = mount(
			<Small
				element={element}
				/* eslint-disable-next-line */
				customFields={Object.assign({}, config, { showHeadlineSM: false })}
			/>
		);

		expect(wrapper.find("h2").length).toBe(0);
		expect(wrapper.find("img").length).toBe(1);
		expect(wrapper.find("hr").length).toBe(1);
	});
});
