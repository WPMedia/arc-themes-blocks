import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import QuiltedImage from "./default";

const FILLED_IN_CUSTOM_FIELDS = {
	headline: "Quilted Image Block Headline",
	fullWidthImage: "bottom",
	image1URL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/JYSH6R3ZKBCLLM7UYN73CVLZ24.jpg",
	image1AspectRatio: "4/3",
	overlay1Text: "Overlay Text 1",
	overlay1TextVariant: "dark",
	button1Text: "Button 1 Text",
	item1Action: "https://www.arcxp.com/products/content/",
	button1Variant: "primary",
	image2URL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/ELOVKBWQ7FB7PAJ74GUL7ZW4NU.jpg",
	image2AspectRatio: "4/3",
	overlay2Text: "Overlay Text 2",
	overlay2TextVariant: "dark",
	button2Text: "Button 2 Text",
	item2Action: "https://www.arcxp.com/products/experiences/",
	button2Variant: "primary",
	image3URL:
		"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/QLMIYN6QXRFC7MEQXCLYIUASZI.jpg",
	image3AspectRatio: "16/9",
	overlay3Text: "Overlay Text 3",
	overlay3TextVariant: "dark",
	button3Text: "Button 3 Text",
	item3Action: "https://www.arcxp.com/products/commerce/",
	button3Variant: "primary",
};

describe("Quilted Image", () => {
	it("should render all content for custom fields that have been filled in.", () => {
		render(<QuiltedImage customFields={FILLED_IN_CUSTOM_FIELDS} />);
		expect(screen.queryAllByRole("img")).toHaveLength(3);
		expect(screen.queryByText("Quilted Image Block Headline")).toBeInTheDocument();
		expect(screen.queryByText("Overlay Text 1")).toBeInTheDocument();
		expect(screen.queryByText("Overlay Text 2")).toBeInTheDocument();
		expect(screen.queryByText("Overlay Text 3")).toBeInTheDocument();
		expect(screen.queryByText("Button 1 Text")).toBeInTheDocument();
		expect(screen.queryByText("Button 2 Text")).toBeInTheDocument();
		expect(screen.queryByText("Button 3 Text")).toBeInTheDocument();
	});

	it("should not have a headline when the 'headline' custom field is an empty string.", () => {
		const { container } = render(
			<QuiltedImage customFields={{ ...FILLED_IN_CUSTOM_FIELDS, headline: "" }} />
		);
		const element = container.querySelector(".c-header");
		expect(element).toBeNull();
		expect(screen.queryByText("Quilted Image Block Headline")).not.toBeInTheDocument();
	});

	it("should render 'b-quilted-image__wrapper-top' className on the first link when 'top' is selected for 'fullWidthImage' custom field value.", () => {
		const { container } = render(
			<QuiltedImage customFields={{ ...FILLED_IN_CUSTOM_FIELDS, fullWidthImage: "top" }} />
		);
		const firstLinkElement = container.querySelectorAll("a")[0];
		expect(firstLinkElement.getAttribute("class")).toBe(
			"c-link b-quilted-image__media-panel  b-quilted-image__wrapper-top"
		);
		const thirdLinkElement = container.querySelectorAll("a")[2];
		expect(thirdLinkElement.getAttribute("class")).toBe("c-link b-quilted-image__media-panel ");
	});
	it("should render 'b-quilted-image__wrapper-bottom' className for third link when 'bottom' is selected for 'fullWidthImage' custom field value.", () => {
		const { container } = render(
			<QuiltedImage customFields={{ ...FILLED_IN_CUSTOM_FIELDS, fullWidthImage: "bottom" }} />
		);
		const linkElement1 = container.querySelectorAll("a")[0];
		expect(linkElement1.getAttribute("class")).toBe("c-link b-quilted-image__media-panel  ");
		const linkElement3 = container.querySelectorAll("a")[2];
		expect(linkElement3.getAttribute("class")).toBe(
			"c-link b-quilted-image__media-panel b-quilted-image__wrapper-bottom"
		);
	});

	it("should not render any media panels if one of three needed props custom fields are empty strings.", () => {
		const { container } = render(
			<QuiltedImage
				customFields={{
					...FILLED_IN_CUSTOM_FIELDS,
					item1Action: "",
					item2Action: "",
					item3Action: "",
				}}
			/>
		);

		const mediaPanels = container.querySelectorAll("a.b-quilted-image__media-panel");
		expect(mediaPanels.length).toBe(0);
	});

	it("should not render button components if 'Button Text' custom fields are empty strings.", () => {
		const { container } = render(
			<QuiltedImage
				customFields={{
					...FILLED_IN_CUSTOM_FIELDS,
					button1Text: "",
					button2Text: "",
					button3Text: "",
				}}
			/>
		);
		const linkElements = container.querySelectorAll("p.c-button");
		expect(linkElements.length).toBe(0);
	});

	it("should not render paragraph components if 'Overlay Text' custom fields are empty strings.", () => {
		const { container } = render(
			<QuiltedImage
				customFields={{
					...FILLED_IN_CUSTOM_FIELDS,
					overlay1Text: "",
					overlay2Text: "",
					overlay3Text: "",
				}}
			/>
		);
		const linkElements = container.querySelectorAll("p.c-paragraph");
		expect(linkElements.length).toBe(0);
	});
});
