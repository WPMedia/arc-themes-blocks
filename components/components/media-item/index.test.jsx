import { render, screen } from "@testing-library/react";

import MediaItem from ".";

describe("MediaItem", () => {
	it("should render title, credit and caption", () => {
		render(<MediaItem title="title" credit="credit" caption="caption" />);

		expect(screen.queryByText("title")).not.toBeNull();

		expect(screen.queryByText("credit")).not.toBeNull();
		expect(screen.queryByText("caption")).not.toBeNull();
	});

	it("should allow pass through of props", () => {
		const { container } = render(
			<MediaItem title="title" credit="Credit" caption="caption" id="custom-id" />
		);
		expect(container.querySelector(".c-media-item")).toHaveAttribute("id", "custom-id");
	});

	it("should render string child with additional classes", () => {
		const { container } = render(
			<MediaItem title="title" credit="Credit" caption="caption" className="test-class" />
		);
		expect(container.querySelector(".test-class")).not.toBeNull();
		expect(container.querySelector(".c-media-item")).not.toBeNull();
	});

	it("should render no figcaption if falsy title, formatted credit, and caption", () => {
		const { container } = render(<MediaItem title="" credit="" caption="" />);
		expect(container.querySelector(".c-media-item")).not.toBeNull();
		expect(container.querySelector(".c-media-item__fig-caption")).toBeNull();
		expect(container.querySelector(".c-media-item__title")).toBeNull();
		expect(container.querySelector(".c-media-item__caption")).toBeNull();
		expect(container.querySelector(".c-media-item__credit")).toBeNull();
	});

	it("should not render title if no title", () => {
		const { container } = render(<MediaItem title="" credit="Credit" caption="caption" />);
		expect(container.querySelector(".c-media-item__title")).toBeNull();
	});

	it("should not render credit if no caption", () => {
		const { container } = render(<MediaItem title="title" credit="credit" caption="" />);
		expect(container.querySelector(".c-media-item__caption")).toBeNull();
	});

	it("should not render caption if empty object credit causing falsy string", () => {
		const { container } = render(<MediaItem title="title" credit="" caption="caption" />);
		expect(container.querySelector(".c-media-item__credit")).toBeNull();
	});

	it("should take in html for the title prop", () => {
		render(<MediaItem title="<p>title something special</p>" credit="Credit" caption="caption" />);
		expect(screen.queryByText("title something special")).not.toBeNull();
	});

	it("should take in html for the caption prop", () => {
		render(
			<MediaItem
				title="title"
				credit="Credit"
				caption="<dialog data-testid='html-example-as-props'>caption</dialog>"
			/>
		);
		expect(screen.queryByText("caption")).not.toBeNull();
		const exampleHtmlCaptionProp = screen.getByTestId("html-example-as-props");
		expect(exampleHtmlCaptionProp).not.toBeNull();
	});

	it("should take in html for the credit prop", () => {
		render(
			<MediaItem
				title="title"
				credit="<dialog data-testid='html-example-as-props'>Credit</dialog>"
				caption="caption"
			/>
		);
		expect(screen.queryByText("Credit")).not.toBeNull();
		const exampleHtmlCreditProp = screen.getByTestId("html-example-as-props");
		expect(exampleHtmlCreditProp).not.toBeNull();
	});

	it("should render children", () => {
		const { container } = render(
			<MediaItem title="title" credit="Credit" caption="caption">
				<p>child</p>
			</MediaItem>
		);
		expect(container.querySelector("p")).not.toBeNull();
		expect(container.querySelector("p").textContent).toBe("child");
	});
});
