const React = require("react");
const { mount } = require("enzyme");

jest.mock("fusion:themes", () => jest.fn(() => ({})));

describe("the headline feature for the default output type", () => {
	afterEach(() => {
		jest.resetModules();
	});

	describe("when headline content from globalContent is present", () => {
		beforeEach(() => {
			jest.mock("fusion:context", () => ({
				useFusionContext: jest.fn(() => ({
					globalContent: {
						headlines: {
							basic: "headline for our story",
						},
					},
					arcSite: "not-real",
				})),
			}));
		});

		it("should render an h1", () => {
			const { default: Headline } = require("./default");
			const wrapper = mount(<Headline />);

			expect(wrapper.find("h1")).toHaveClassName("headline");
			// checking for styled component class
			expect(wrapper.find("h1").hasClass(/sc-/)).toBe(true);
		});

		it("should dangerously set the innerHTML to the headline content", () => {
			const { default: Headline } = require("./default");
			const wrapper = mount(<Headline />);

			// text() shows any text within tag
			expect(wrapper.find("h1").text()).toStrictEqual("headline for our story");
		});
	});

	describe("when headline content from globalContent is NOT present", () => {
		beforeEach(() => {
			jest.mock("fusion:context", () => ({
				useFusionContext: jest.fn(() => ({
					globalContent: {},
				})),
			}));
		});

		it("should render nothing", () => {
			const { default: Headline } = require("./default");
			const wrapper = mount(<Headline />);

			expect(wrapper).toBeEmptyRender();
		});
	});
});
