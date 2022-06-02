import React from "react";

import { useFusionContext } from "fusion:context";

import { render } from "@testing-library/react";

import Byline from "./default";

jest.mock("fusion:properties", () => jest.fn(() => ({})));
jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../intl.json")[phrase][locale]),
	})),
}));

describe("Given byline", () => {
	it("should return a prefix and name element", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "the-sun",
			globalContent: {
				credits: {
					by: [
						{
							type: "author",
							name: "John Doe",
							url: "/author/john-doe",
						},
					],
				},
			},
		});

		const { container } = render(<Byline />);
		expect(container.textContent).toEqual("By John Doe");
	});

	it("should return nothing if the credits are not provided", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "the-sun",
			globalContent: {
				credits: {},
			},
		});
		const { container } = render(<Byline />);
		expect(container.firstChild).toBe(null);
	});

	it("should return nothing if the by array is empty", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "the-sun",
			globalContent: {
				credits: {
					by: [],
				},
			},
		});
		const { container } = render(<Byline />);
		expect(container.firstChild).toBe(null);
	});
});
