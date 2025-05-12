import { render } from "@testing-library/react";

import Video from ".";

const COMPONENT_CLASS_NAME = "c-video";

describe("Video", () => {
	it("should render only container", () => {
		const { container } = render(<Video />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).not.toBeNull();
		expect(container.querySelector(".powa")).toBeNull();
	});

	it("should allow pass through of props", () => {
		const { container } = render(<Video id="custom-id" />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).not.toBeNull();
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveAttribute("id", "custom-id");
	});

	it("should render only container with additional class", () => {
		const { container } = render(<Video className="additionalClass" />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveClass("additionalClass");
		expect(container.querySelector(".powa")).toBeNull();
	});

	it("should render container with aspect ratio", () => {
		const { container } = render(<Video aspectRatio="3:2" />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle("--aspect-ratio: 1.5");
	});

	it("should render container with aspect ratio of 16:9 if none is provided", () => {
		const { container } = render(<Video />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle(
			"--aspect-ratio: 1.7777"
		);
	});

	it("should resolve the aspect-ratio from the embed markup if none is provided", () => {
		window.powaBoot = jest.fn();
		const { container } = render(
			<Video embedMarkup="<div class='powa' data-aspect-ratio='0.75'/>" />
		);
		expect(window.powaBoot).toHaveBeenCalled();
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle(
			"--aspect-ratio: 1.3333"
		);
	});

	it("should resolve the aspect-ratio from the embed markup if '--' is provided", () => {
		window.powaBoot = jest.fn();
		const { container } = render(
			<Video aspectRatio="--" embedMarkup="<div class='powa' data-aspect-ratio='0.562'/>" />
		);
		expect(window.powaBoot).toHaveBeenCalled();
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle(
			"--aspect-ratio: 1.7777"
		);
	});

	it("should render container with custom height when it's a 9:16 video", () => {
		const { container } = render(<Video viewportPercentage={50} aspectRatio="9:16" />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle("--height: 50");
	});

	it("should render container with default height when it's not a 9:16 video", () => {
		const { container } = render(<Video viewportPercentage={50} aspectRatio="16:9" />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle("--height: 65");
	});

	it("should initiate video and render markup if not empty", () => {
		// mock window powa boot function to mimick powa
		window.powaBoot = jest.fn();
		const { container } = render(<Video embedMarkup="<div class='powa' />" />);
		expect(window.powaBoot).toHaveBeenCalled();
		expect(container.querySelector(".powa")).not.toBeNull();
	});

	it("should modify the embed markup aspect ratio if not equal to 16:9 and render markup if not empty", () => {
		// mock window powa boot function to mimick powa
		window.powaBoot = jest.fn();
		const { container } = render(
			<Video aspectRatio="4:3" embedMarkup="<div class='powa' data-aspect-ratio='0.562'/>" />
		);
		expect(window.powaBoot).toHaveBeenCalled();
		expect(container.querySelector(".powa")).not.toBeNull();
		expect(container.querySelector(".powa")).toHaveAttribute("data-aspect-ratio", "0.75");
	});

	it("should attach the border-radius attribute in the embed markup when it's a 9:16 video", () => {
		window.powaBoot = jest.fn();
		const { container } = render(
			<Video borderRadius embedMarkup="<div class='powa' data-aspect-ratio='1.7777'/>" />
		);
		expect(window.powaBoot).toHaveBeenCalled();
		expect(container.querySelector(".powa")).not.toBeNull();
		expect(container.querySelector(".powa")).toHaveAttribute("data-border-radius", "true");
	});

	it("should not attach the border-radius attribute in the embed markup when it's a not a 9:16 video", () => {
		window.powaBoot = jest.fn();
		const { container } = render(
			<Video borderRadius embedMarkup="<div class='powa' data-aspect-ratio='0.562'/>" />
		);
		expect(window.powaBoot).toHaveBeenCalled();
		expect(container.querySelector(".powa")).not.toBeNull();
		expect(container.querySelector(".powa")).not.toHaveAttribute("data-border-radius");
	});
});
