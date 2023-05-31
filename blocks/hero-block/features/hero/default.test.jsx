import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as fusionContent from "fusion:content";

import Hero from "./default";

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({ hash: "2cc3c2b3" })),
}));

describe("Hero", () => {
	it("should render", () => {
		render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
				}}
			/>
		);
		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(screen.queryByText("My Headline")).toBeInTheDocument();
		expect(screen.queryByText("My Sub Headline")).toBeInTheDocument();
		expect(screen.queryByText("My description")).toBeInTheDocument();
	});

	it("should not render headline, subheadline or paragraph", () => {
		render(<Hero customFields={{ imageURL: "image" }} />);
		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(screen.queryByText("My Headline")).not.toBeInTheDocument();
		expect(screen.queryByText("My Sub Headline")).not.toBeInTheDocument();
		expect(screen.queryByText("My description")).not.toBeInTheDocument();
	});

	it("should not render button links", () => {
		const { container } = render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
					imageId: "P5EYZ",
					imageURLDesktop: "https://www.google.com",
					imageDesktopAuth: { 2: "2dd3c2a2" },
					mobileImageId: "P5EYZ",
					imageURLMobile: "https://www.google.com",
					mobileImageAuth: { 2: "2cc3c2b3" },
				}}
			/>
		);
		expect(container.querySelectorAll("a")).toHaveLength(0);
	});

	it("should render 1 link", () => {
		const { container } = render(
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
			/>
		);
		expect(container.querySelectorAll("a")).toHaveLength(1);
	});

	it("should render 2 links with secondary style", () => {
		const { container } = render(
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
			/>
		);
		expect(container.querySelectorAll("a.c-button--secondary")).toHaveLength(2);
	});

	it("should render overlay layout by default", () => {
		const { container } = render(
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
			/>
		);
		expect(container.querySelectorAll(".b-hero--stacked")).toHaveLength(0);
		expect(container.querySelectorAll(".b-hero--overlay")).toHaveLength(1);
	});

	it("should render stacked layout when specified", () => {
		const { container } = render(
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
			/>
		);
		expect(container.querySelectorAll(".b-hero--overlay")).toHaveLength(0);
		expect(container.querySelectorAll(".b-hero--stacked")).toHaveLength(1);
	});

	it("should render center alignment layout by default", () => {
		const { container } = render(
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
			/>
		);
		expect(container.querySelectorAll(".b-hero__text--left")).toHaveLength(0);
		expect(container.querySelectorAll(".b-hero__text--center")).toHaveLength(1);
	});

	it("should render left alignment layout when specified", () => {
		const { container } = render(
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
			/>
		);
		expect(container.querySelectorAll(".b-hero__text--center")).toHaveLength(0);
		expect(container.querySelectorAll(".b-hero__text--left")).toHaveLength(1);
	});

	it("should render light variant when specified", () => {
		const { container } = render(
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
			/>
		);
		expect(container.querySelectorAll(".b-hero--dark")).toHaveLength(0);
		expect(container.querySelectorAll(".b-hero--light")).toHaveLength(1);
	});

	it("should set correct alt text for the image", () => {
		jest.spyOn(fusionContent, "useContent").mockImplementation(() => ({}));
		const { container } = render(
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
			/>
		);
		expect(container.querySelector("img").getAttribute("alt")).toBe("My Headline");
	});
});
