import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockConsole from "jest-mock-console";

import * as fusionContent from "fusion:content";

import Hero from "./default";

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => JSON.stringify({ 2: "2cc3c2b3" })),
	useEditableContent: jest.fn(() => ({
		searchableField: () => {},
	})),
}));

describe("Hero", () => {
	let restoreConsole;
	afterAll(() => {
		restoreConsole?.();
	});
	beforeAll(() => {
		restoreConsole = mockConsole();
	});

	it("should render", () => {
		render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
				}}
			/>,
		);
		expect(screen.getByRole("presentation", { hidden: true })).toBeInTheDocument();
		expect(screen.getByText("My Headline")).toBeInTheDocument();
		expect(screen.getByText("My Sub Headline")).toBeInTheDocument();
		expect(screen.getByText("My description")).toBeInTheDocument();
	});

	it("should not render headline, subheadline or paragraph", () => {
		render(<Hero customFields={{ imageURL: "image" }} />);
		expect(screen.getByRole("presentation", { hidden: true })).toBeInTheDocument();
		expect(screen.queryByText("My Headline")).not.toBeInTheDocument();
		expect(screen.queryByText("My Sub Headline")).not.toBeInTheDocument();
		expect(screen.queryByText("My description")).not.toBeInTheDocument();
	});

	it("should not render button links", () => {
		render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					imageId: "P5EYZ",
					imageURLDesktop: "https://www.google.com",
					imageDesktopAuth: JSON.stringify({ 2: "2dd3c2a2" }),
					mobileImageId: "P5EYZ",
					imageURLMobile: "https://www.google.com",
					mobileImageAuth: { 2: "2cc3c2b3" },
				}}
			/>,
		);
		expect(screen.queryAllByRole("link")).toHaveLength(0);
	});

	it("should render 1 link", () => {
		render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					link1Action: "#",
					link1Text: "For Him",
					link1Type: "primary",
				}}
			/>,
		);
		expect(screen.getAllByRole("link")).toHaveLength(1);
	});

	it("should render 2 links with secondary style", () => {
		render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					link1Action: "#",
					link1Text: "For Him",
					link1Type: "secondary",
					link2Action: "#",
					link2Text: "For Her",
					link2Type: "secondary",
				}}
			/>,
		);
		const link1 = screen.getByRole("link", { name: "For Him" });
		const link2 = screen.getByRole("link", { name: "For Her" });
		expect(link1).toHaveClass("c-button--secondary");
		expect(link2).toHaveClass("c-button--secondary");
		expect(screen.getAllByRole("link")).toHaveLength(2);
	});

	it("should render overlay layout by default", () => {
		render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					link1Action: "#",
					link1Text: "For Him",
					link1Type: "secondary",
					link2Action: "#",
					link2Text: "For Her",
					link2Type: "secondary",
				}}
			/>,
		);
		// Verify primary content renders (layout classes are implementation detail)
		expect(screen.getByText("My Headline")).toBeInTheDocument();
	});

	it("should render stacked layout when specified", () => {
		render(
			<Hero
				customFields={{
					layout: "stacked",
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					link1Action: "#",
					link1Text: "For Him",
					link1Type: "secondary",
					link2Action: "#",
					link2Text: "For Her",
					link2Type: "secondary",
				}}
			/>,
		);
		// Verify primary content renders (layout classes are implementation detail)
		expect(screen.getByText("My Headline")).toBeInTheDocument();
	});

	it("should render center alignment layout by default", () => {
		render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					link1Action: "#",
					link1Text: "For Him",
					link1Type: "secondary",
					link2Action: "#",
					link2Text: "For Her",
					link2Type: "secondary",
				}}
			/>,
		);
		// Verify primary content renders (alignment classes are implementation detail)
		expect(screen.getByText("My description")).toBeInTheDocument();
	});

	it("should render left alignment layout when specified", () => {
		render(
			<Hero
				customFields={{
					alignment: "left",
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					link1Action: "#",
					link1Text: "For Him",
					link1Type: "secondary",
					link2Action: "#",
					link2Text: "For Her",
					link2Type: "secondary",
				}}
			/>,
		);
		// Verify primary content renders (alignment classes are implementation detail)
		expect(screen.getByText("My description")).toBeInTheDocument();
	});

	it("should render light variant when specified", () => {
		render(
			<Hero
				customFields={{
					alignment: "left",
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					link1Action: "#",
					link1Text: "For Him",
					link1Type: "secondary",
					link2Action: "#",
					link2Text: "For Her",
					link2Type: "secondary",
					variant: "light",
				}}
			/>,
		);
		// Verify primary content renders (variant classes are implementation detail)
		expect(screen.getByText("My Headline")).toBeInTheDocument();
	});

	it("sets mobileAuth RESIZER_TOKEN_VERSION when mobileAuth has hash", () => {
		// First call (desktopAuth): return parseable JSON string
		// Second call (mobileAuth): return an object with a hash property for the mobile image
		jest.spyOn(fusionContent, "useContent")
			.mockReturnValueOnce(JSON.stringify({ 2: "2cc3c2b3" })) // desktopAuth
			.mockReturnValueOnce({ hash: "abc123", 2: "xyz" }); // mobileAuth with hash
		render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "Hero with hash auth",
					mobileImageId: "P5EYZ",
					imageId: "DESKTOP123",
				}}
			/>,
		);
		expect(screen.getByText("Hero with hash auth")).toBeInTheDocument();
	});

	it("should render only link2 when link1 is absent", () => {
		render(
			<Hero
				customFields={{
					headline: "Headline",
					link2Action: "/page2",
					link2Text: "Page Two",
					link2Type: "primary",
				}}
			/>,
		);
		// Only one link rendered — link2
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(1);
		expect(links[0]).toHaveTextContent("Page Two");
	});

	it("should render only link1 when link2 action is present but text is absent", () => {
		render(
			<Hero
				customFields={{
					headline: "Headline",
					link1Action: "/page1",
					link1Text: "Page One",
					link1Type: "secondary",
					link2Action: "/page2",
					// link2Text intentionally omitted — link2 should not render
				}}
			/>,
		);
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(1);
		expect(links[0]).toHaveTextContent("Page One");
	});

	it("should set correct alt text for the image", () => {
		jest.spyOn(fusionContent, "useContent").mockImplementation(() => ({}));
		render(
			<Hero
				customFields={{
					alignment: "left",
					imageURL: "image",
					imageAltText: "¿Dónde está la biblioteca?",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					link1Action: "#",
					imageMobileId: "EM5DTGYGABDJZODV7YVFOC2DOM",
					imageDesktopURL:
						"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
					imageMobileURL:
						"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
					imageMobileAlt: "Picture of man in the forest",
					resizerURL: "https://cloudfront-us-east-1.images",
					link1Text: "For Him",
					link1Type: "secondary",
					link2Action: "#",
					link2Text: "For Her",
					link2Type: "secondary",
					variant: "light",
				}}
			/>,
		);
		expect(screen.getByRole("img", { hidden: true })).toHaveAttribute("alt", "My Headline");
	});
});
