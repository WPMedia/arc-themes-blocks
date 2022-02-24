/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */

import React from "react";
import { shallow } from "enzyme";
import Link from "./link";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));
jest.mock("fusion:intl", () =>
	jest.fn(() => ({
		t: jest.fn(() => "test-translation"),
	}))
);

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	formatURL: jest.fn((input) => input.toString()),
}));

describe("When the link is generated SSR", () => {
	it("must add rel attriutes to external links", () => {
		const wrapper = shallow(
			<Link href="https://example.com/some/page.html" name="Entertaiment" showSepartor="false" />
		);
		expect(wrapper.find("a").prop("target")).toBe("_blank");
		expect(wrapper.find("a").prop("rel")).toBe("noopener noreferrer");
	});

	it('must add negative tab index when "isHidden" prop is truthy', () => {
		const wrapper = shallow(
			<Link href="https://example.com/some/page.html" name="Entertaiment" isHidden />
		);
		expect(wrapper.find("a").prop("target")).toBe("_blank");
		expect(wrapper.find("a").prop("rel")).toBe("noopener noreferrer");
		expect(wrapper.find("a").prop("tabIndex")).toBe(-1);
	});
});
