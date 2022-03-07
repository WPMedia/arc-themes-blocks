import React from "react";
import { mount } from "enzyme";
import { useFusionContext } from "fusion:context";
import TagTitle from "./default";

jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "no-site",
		globalContent: {
			Payload: [
				{
					organization: "corecomponents",
					path: "/",
					slug: "dogs",
					updated_on: "2019-12-02T16:54:49.632Z",
					description: "This is a tag about dogs. This is the description field.",
					name: "Dogs",
				},
			],
		},
	})),
}));

describe("the tag title feature for the default output type", () => {
	describe("when tag title content from globalContent is present", () => {
		it("should render an h1", () => {
			const wrapper = mount(<TagTitle />);

			expect(wrapper.find("h1")).toHaveClassName("tag-name");
		});

		it("should render a p", () => {
			const wrapper = mount(<TagTitle />);

			expect(wrapper.find("p")).toHaveClassName("tag-description");
		});

		it("should set the name content", () => {
			const wrapper = mount(<TagTitle />);

			expect(wrapper.text().includes("Dogs")).toBe(true);
		});

		it("should set the description content", () => {
			const wrapper = mount(<TagTitle />);

			expect(
				wrapper.text().includes("This is a tag about dogs. This is the description field.")
			).toBe(true);
		});

		it("should set a styled components class on the rendered h1", () => {
			const wrapper = mount(<TagTitle />);

			expect(wrapper.find("h1").hasClass(/sc-/)).toBe(true);
		});

		it("should set a styled components class on the rendered p", () => {
			const wrapper = mount(<TagTitle />);

			expect(wrapper.find("p").hasClass(/sc-/)).toBe(true);
		});
	});

	describe("when tag title description from globalContent is NOT present", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({
				arcSite: "no-site",
				globalContent: {
					Payload: [
						{
							organization: "corecomponents",
							path: "/",
							slug: "dogs",
							updated_on: "2019-12-02T16:54:49.632Z",
							name: "Dogs",
						},
					],
				},
			}));
		});

		it("should NOT render a description", () => {
			const wrapper = mount(<TagTitle />);

			expect(wrapper.find("p")).toHaveLength(0);
		});

		it("should render a name", () => {
			const wrapper = mount(<TagTitle />);

			expect(wrapper.find("h1")).toHaveLength(1);
		});
	});

	describe("when tag title content from globalContent is NOT present", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({}));
		});

		it("should NOT render anything", () => {
			const wrapper = mount(<TagTitle />);

			expect(wrapper).toBeEmptyRender();
		});
	});
});
