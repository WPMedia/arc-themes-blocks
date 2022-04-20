import React from "react";
import { mount } from "enzyme";

import PromoDescription from "./index";

jest.mock("fusion:content", () => ({
	useEditableContent: jest.fn(() => ({
		editableContent: () => ({ contentEditable: "true" }),
	})),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
	})),
}));

jest.mock("fusion:themes", () => jest.fn(() => ({})));

describe("PromoDescription", () => {
	it("renders nothing if no linkText", () => {
		const wrapper = mount(<PromoDescription />);

		expect(wrapper.html()).toBe(null);
	});

	it("renders custom text", () => {
		const props = {
			text: "Link text",
		};

		const wrapper = mount(<PromoDescription {...props} />);

		expect(wrapper.find("p").text()).toBe(props.text);
	});

	it("renders description from ANS Story object", () => {
		const props = {
			content: {
				description: {
					basic: "An ANS Story description",
				},
			},
		};

		const wrapper = mount(<PromoDescription {...props} />);

		expect(wrapper.find("p").text()).toBe("An ANS Story description");
	});
});
