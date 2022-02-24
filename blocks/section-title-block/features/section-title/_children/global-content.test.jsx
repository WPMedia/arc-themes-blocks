import React from "react";
import { shallow } from "enzyme";
import { mockNestedChildren } from "./mock-data";

describe("the global content section title", () => {
	describe("when there is an array of children present", () => {
		it("should load content from global content", () => {
			jest.mock("fusion:context", () => ({
				useAppContext: jest.fn(() => ({
					globalContent: {
						content: mockNestedChildren,
					},
				})),
			}));

			const { default: GlobalContentSectionTitle } = require("./global-content");

			const wrapper = shallow(<GlobalContentSectionTitle />);
			expect(wrapper.find("SectionTitle").props()).toStrictEqual({
				content: {
					content: mockNestedChildren,
				},
			});
		});
	});

	describe("when there is no array of children", () => {
		it("should load content from global content", () => {
			jest.mock("fusion:context", () => ({
				useAppContext: jest.fn(() => ({
					globalContent: {},
				})),
			}));

			const { default: GlobalContentSectionTitle } = require("./global-content");

			const wrapper = shallow(<GlobalContentSectionTitle />);
			expect(wrapper.find("SectionTitle").props()).toStrictEqual({
				content: {},
			});
		});
	});

	describe("when there is no global content object", () => {
		it("should load content from global content", () => {
			jest.mock("fusion:context", () => ({
				useAppContext: jest.fn(() => ({})),
			}));
			const { default: GlobalContentSectionTitle } = require("./global-content");

			const wrapper = shallow(<GlobalContentSectionTitle />);
			expect(wrapper.find("SectionTitle").props()).toStrictEqual({
				content: {},
			});
		});
	});
});
