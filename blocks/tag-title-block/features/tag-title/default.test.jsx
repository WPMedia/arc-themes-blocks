import React from "react";
import { render, screen } from "@testing-library/react";
import { useFusionContext } from "fusion:context";
import "@testing-library/jest-dom";

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
		it("should assign block class", () => {
			const { container } = render(<TagTitle />);
			expect(container.querySelector(".b-tag-title")).toBeInTheDocument();
		});

		it("should render a heading component", () => {
			const { container } = render(<TagTitle />);
			expect(container.querySelector(".c-heading")).toBeInTheDocument();
		});

		it("should render a paragraph component", () => {
			const { container } = render(<TagTitle />);
			expect(container.querySelector(".c-paragraph")).toBeInTheDocument();
		});

		it("should set the name content", () => {
			render(<TagTitle />);

			expect(screen.getByText("Dogs")).toBeInTheDocument();
		});

		it("should set the description content", () => {
			render(<TagTitle />);

			expect(
				screen.getByText("This is a tag about dogs. This is the description field."),
			).toBeInTheDocument();
		});
	});

	describe("when tag title name from globalContent is NOT present", () => {
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
							description: "This is a tag about dogs. This is the description field.",
						},
					],
				},
			}));
		});

		it("should render a description", () => {
			const { container } = render(<TagTitle />);
			expect(container.querySelector(".c-paragraph")).toBeInTheDocument();
		});

		it("should NOT render a name", () => {
			const { container } = render(<TagTitle />);
			expect(container.querySelector(".c-heading")).not.toBeInTheDocument();
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
			const { container } = render(<TagTitle />);
			expect(container.querySelector(".c-paragraph")).not.toBeInTheDocument();
		});

		it("should render a name", () => {
			const { container } = render(<TagTitle />);
			expect(container.querySelector(".c-heading")).toBeInTheDocument();
		});
	});

	describe("when tag title content from globalContent is NOT present", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({}));
		});

		it("should NOT render anything", () => {
			const { container } = render(<TagTitle />);

			expect(container.firstChild).toBe(null);
		});
	});
});
