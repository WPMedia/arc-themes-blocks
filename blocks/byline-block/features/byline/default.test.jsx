const React = require("react");
const { mount } = require("enzyme");

jest.mock("fusion:properties", () => jest.fn(() => ({})));

jest.mock("fusion:themes", () => jest.fn(() => ({})));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../intl.json")[phrase][locale]),
	})),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
		globalContent: {
			credits: {
				by: [
					{
						type: "other",
						name: "John Doe",
						url: "/author/john-doe",
						additional_properties: {
							original: {
								byline: "John Doe",
							},
						},
					},
				],
			},
		},
	})),
}));

describe("Given byline", () => {
	it("should return a Byline element", () => {
		const { default: ArticleByline } = require("./default");
		const wrapper = mount(<ArticleByline />);
		expect(wrapper.find("Byline").length).toEqual(1);
	});
});
