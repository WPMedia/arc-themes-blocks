import React from "react";
import { render } from "@testing-library/react";

import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

import FullAuthorBio from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
}));

const authors = [
	{
		_id: "janedoe",
		firstName: "Jane",
		lastName: "Doe",
		byline: "Jane Da Doe",
		role: "Senior Product Manager",
		image:
			"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
		resized_params: { "158x158": "" },
		email: "jane@doe.com",
		facebook: "https://facebook.com/janedoe",
		rss: "somersslink",
		twitter: "janedoe",
		longBio: "Jane Doe is a senior product manager for Arc Publishing. \nShe works on Arc Themes",
		instagram: "janedoe",
	},
];

describe("Full author bio block", () => {
	describe("lazy load and isAdmin", () => {
		it("should return null if lazyLoad on the server and not in the admin", () => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: false,
			}));
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: true }} />);
			expect(container.firstChild).toBeNull();
		});

		it("should not return null if not lazyLoad on the server and isAdmin", () => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: true,
			}));
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			expect(container.firstChild).not.toBeNull();
		});

		it("should not return null if lazyLoad on the server and isAdmin", () => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: true,
			}));
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: true }} />);
			expect(container.firstChild).not.toBeNull();
		});
	});

	describe("when author(s) from globalContent are present", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: true,
			}));
		});

		it("should render", () => {
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			expect(container.firstChild).not.toBeNull();
		});
	});

	describe("when the locale is undefined", () => {
		beforeEach(() => {
			getProperties.mockImplementation(() => ({
				locale: undefined,
			}));
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: true,
			}));
		});

		it("should still render", () => {
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			expect(container.firstChild).not.toBeNull();
		});
	});

	describe("when there are no authors", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors: [],
				},
			}));
		});

		it("should NOT render anything", () => {
			const { container } = render(<FullAuthorBio />);

			expect(container.firstChild).toBeNull();
		});
	});
});
