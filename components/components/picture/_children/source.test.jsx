import { render } from "@testing-library/react";

import Source from "./source";

describe("Source subcomponent", () => {
	it("return null if no src prop is provided", () => {
		const { container } = render(<Source media="(max-width: 799px)" />);
		expect(container.firstChild).toBeNull();
	});
	it("return null if no media prop is provided", () => {
		const { container } = render(<Source src="test.jpg" />);
		expect(container.firstChild).toBeNull();
	});

	it("render unresized image an auth key has not been provided", () => {
		const { container } = render(<Source src="test.jpeg" media="(max-width: 799px)" />);
		expect(container.firstChild).toMatchInlineSnapshot(`
		<source
		  media="(max-width: 799px)"
		  srcset="test.jpeg"
		/>
	`);
	});
	it("render resized image an resizer options, including auth key, has been provided", () => {
		const { container } = render(
			<Source
				src="test.jpeg"
				media="(max-width: 799px)"
				resizerURL="http://www.test.org/"
				resizedOptions={{ auth: "fff1111", filter: 70, smart: true }}
			/>
		);
		expect(container.firstChild).toMatchInlineSnapshot(`
		<source
		  media="(max-width: 799px)"
		  srcset="http://www.test.org/test.jpeg?auth=fff1111&filter=70&smart=true"
		/>
	`);
	});
	it("should not set the height and the width of the source element to resized options", () => {
		const { container } = render(
			<Source
				src="test.jpeg"
				media="(max-width: 799px)"
				resizerURL="http://www.test.org/"
				resizedOptions={{ auth: "fff1111", filter: 70, smart: true, width: 100, height: 100 }}
			/>
		);
		// should not set the height of the source element from the resizedOptions
		expect(container.firstChild).not.toHaveAttribute("height", "100");
		// should not set the width of the source element from the resizedOptions
		expect(container.firstChild).not.toHaveAttribute("width", "100");
	});
	it("should set the height and width of the source element if width and height explicitly passed in", () => {
		const { container } = render(
			<Source
				src="test.jpeg"
				media="(max-width: 799px)"
				resizerURL="http://www.test.org/"
				height={100}
				width={100}
				resizedOptions={{ auth: "fff1111", filter: 70, smart: true }}
			/>
		);
		expect(container.firstChild).toHaveAttribute(
			"srcset",
			"http://www.test.org/test.jpeg?auth=fff1111&filter=70&smart=true&width=100&height=100"
		);
		// should set the height of the source element
		expect(container.firstChild).toHaveAttribute("height", "100");
		// should set the width of the source element
		expect(container.firstChild).toHaveAttribute("width", "100");
	});
	it("should opt to use the explicit height and width over the resizedOptions ones in the srcset and the img attributes", () => {
		const { container } = render(
			<Source
				src="test.jpeg"
				media="(max-width: 799px)"
				resizerURL="http://www.test.org/"
				height={100}
				width={100}
				resizedOptions={{ auth: "fff1111", filter: 70, smart: true, height: 77, width: 155 }}
			/>
		);
		expect(container.firstChild).toHaveAttribute(
			"srcset",
			"http://www.test.org/test.jpeg?auth=fff1111&filter=70&smart=true&width=100&height=100"
		);
		// should set the height of the source element
		expect(container.firstChild).toHaveAttribute("height", "100");
		// should set the width of the source element
		expect(container.firstChild).toHaveAttribute("width", "100");
	});
});
