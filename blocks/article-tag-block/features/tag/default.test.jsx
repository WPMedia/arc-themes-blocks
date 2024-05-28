import { render, screen } from "@testing-library/react"
import { useFusionContext } from "fusion:context";
import React from "react";
import ArticleTags from "./default";
import '@testing-library/jest-dom'

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn().mockReturnValue(true),
	LazyLoad: ({ children }) => children,
}));

describe("the article tag block", () => {
	describe("when the global content has an array of tags in its taxonomy", () => {
		const mockReturnData = {
			arcSite: "the-sun",
			globalContent: {
				taxonomy: {
					tags: [
						{
							description: "dogs",
							slug: "dogs slug",
							text: "dogs text",
						},
						{
							description: "cats",
							slug: "cats slug",
							text: "cats text",
						},
					],
				},
			},
		};

		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			useFusionContext.mockReturnValue(mockReturnData);
		});

		test("should return null if lazyLoad on the server and not in the admin", async () => {
			const config = {
				lazyLoad: true,
			};
			render(<ArticleTags customFields={config} />);
			const wrapper = await screen.findByRole("generic");
			expect(wrapper).toBeEmptyDOMElement()
		});

		test("should render a parent container for the tags", () => {
			render(<ArticleTags />);
			const wrapper = screen.getByTestId("article-container");
			expect(wrapper).toBeInTheDocument();
		});

		test("should render a pill for each tag in the array", () => {
			render(<ArticleTags />);
			const pillsArray = screen.getAllByRole("link");
			expect(pillsArray.length).toEqual(2);
		});

		test("should render tags with their correct href", () => {
			render(<ArticleTags />);
			const pillsArray = screen.getAllByRole("link");
			const href0 = pillsArray[0].getAttribute('href');
			const href1 = pillsArray[1].getAttribute('href');
			expect(href0).toBe("/tags/dogs%20slug/");
			expect(href1).toBe("/tags/cats%20slug/");
		});
	});

	describe("when the global content has a property called taxonomy which contains tags array with out slugs", () => {
		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			useFusionContext.mockReturnValue({
				arcSite: "the-sun",
				globalContent: {
					taxonomy: {
						tags: [
							{
								description: "dogs",
								text: "dogs text",
							},
							{
								description: "cats",
								text: "cats text",
							},
						],
					},
				},
			});
		});

		it("should render pill components", () => {
			render(<ArticleTags />)
			expect(screen.getByText("dogs text")).not.toBeNull();
		});
	});

	describe("when the global content has an empty tags array", () => {
		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			useFusionContext.mockReturnValue({
				arcSite: "the-sun",
				globalContent: {
					taxonomy: {
						tags: [],
					},
				},
			});
		});

		it("should not render anything", async () => {
			render(<ArticleTags />);
			const wrapper = await screen.findByRole("generic");
			expect(wrapper).toBeEmptyDOMElement()
		});
	});

	describe("when the global content does not have a taxonomy property", () => {
		afterEach(() => {
			jest.resetModules();
		});

		beforeEach(() => {
			useFusionContext.mockReturnValue({
				arcSite: "the-sun",
				globalContent: {},
			});
		});

		it("should not render anything", async () => {
			const { container } = render(<ArticleTags ItemLength={1} />);
			expect(container).toBeEmptyDOMElement();
		});
	});
});
