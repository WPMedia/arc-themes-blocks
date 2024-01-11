import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThumbnailBar from "./index";
import mockData from "../../mock-data";

jest.mock("fusion:environment", () => ({
	RESIZER_TOKEN_VERSION: 1,
}));

describe("Thumbnail Bar", () => {
	it("Renders 1 image and 1 buttons.", () => {
		Object.defineProperty(window, "innerHeight", {
			writable: true,
			configurable: true,
			value: 150,
		});

		render(<ThumbnailBar images={mockData} selectedIndex={1} onImageSelect={() => true} />);

		act(() => {
			window.dispatchEvent(new Event("resize"));
		});

		expect(screen.queryAllByRole("img")).toHaveLength(1);
		expect(screen.queryAllByRole("button")).toHaveLength(1);
	});

	it("does not render buttons", () => {
		render(<ThumbnailBar images={[mockData[0]]} selectedIndex={0} onImageSelect={() => true} />);
		expect(screen.queryAllByRole("img")).toHaveLength(1);
		expect(screen.queryAllByRole("button")).toHaveLength(0);
	});

	it("navigates up and down images using buttons", () => {
		const { container } = render(
			<ThumbnailBar images={mockData} selectedIndex={1} onImageSelect={() => true} />,
		);

		expect(screen.queryAllByRole("img")).toHaveLength(1);
		expect(screen.queryAllByRole("button")).toHaveLength(2);

		expect(
			container
				.querySelector(".b-product-gallery__focus-view-thumbnail-image--selected")
				.getAttribute("src")
				.includes(mockData[1]._id),
		).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "product-gallery.focus-thumbnail-next" }));
		expect(screen.queryByRole("img").getAttribute("src").includes(mockData[2]._id)).toBeTruthy();

		fireEvent.click(
			screen.getByRole("button", { name: "product-gallery.focus-thumbnail-previous" }),
		);
	});

	it("call onImageSelect function when image clicked", () => {
		const imageSelectSpy = jest.fn();
		render(<ThumbnailBar images={mockData} selectedIndex={1} onImageSelect={imageSelectSpy} />);

		expect(screen.queryAllByRole("img")).toHaveLength(1);
		expect(screen.queryAllByRole("button")).toHaveLength(2);

		fireEvent.click(screen.queryAllByRole("img")[0]);
		expect(imageSelectSpy).toHaveBeenCalled();
	});
});
