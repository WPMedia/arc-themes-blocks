import React from "react";
import { shallow } from "enzyme";
import { mockNestedChildren } from "./mock-data";

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => mockNestedChildren),
}));

describe("the custom content section title", () => {
	it("should call useContent with the expected content config values", () => {
		const { default: CustomContentSectionTitle } = require("./custom-content");
		const { useContent } = require("fusion:content");

		shallow(
			<CustomContentSectionTitle
				contentConfig={{ contentService: "api", contentConfigValues: "config" }}
			/>
		);
		expect(useContent.mock.calls).toHaveLength(1);
		expect(useContent.mock.calls[0]).toHaveLength(1);
		expect(useContent.mock.calls[0][0]).toStrictEqual({
			query: "config",
			source: "api",
		});
	});

	describe("when there is hierarchy data returned by the fetch", () => {
		it("should use the hierarchy data supplied by the fetch", () => {
			const { default: CustomContentSectionTitle } = require("./custom-content");

			const wrapper = shallow(
				<CustomContentSectionTitle
					contentConfig={{
						contentService: "api",
						contentConfigValues: "config",
					}}
				/>
			);
			expect(wrapper.find("SectionTitle").props()).toStrictEqual({
				content: mockNestedChildren,
			});
		});
	});

	describe("when there is hierarchy data returned by the fetch", () => {
		it("should load content from global content", () => {
			const { default: CustomContentSectionTitle } = require("./custom-content");
			const { useContent } = require("fusion:content");
			useContent.mockReturnValue(null);

			const wrapper = shallow(
				<CustomContentSectionTitle
					contentConfig={{
						contentService: "api",
						contentConfigValues: "config",
					}}
				/>
			);
			expect(wrapper.find("SectionTitle").props()).toStrictEqual({
				content: {},
			});
		});
	});
});
