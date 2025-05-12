import { render, screen } from "@testing-library/react";

import Image from ".";

describe("Image", () => {
	it("should render string child", () => {
		render(<Image src="test-image.jpg" />);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("src", "test-image.jpg");
		expect(element).toHaveAttribute("alt", "");
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-image";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Image className={ADDITIONAL_CLASSES} src="test-image.jpg" />);

		const element = screen.getByRole("img");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render additional classes with an auth token", () => {
		const ORIGINAL_CLASSES = "c-image";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Image
				className={ADDITIONAL_CLASSES}
				resizedOptions={{ auth: "secret" }}
				src="test-image.jpg"
			/>
		);

		const element = screen.getByRole("img");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render no height and no width if no height and width", () => {
		render(<Image src="test-image.jpg" />);
		const element = screen.getByRole("img");
		expect(element).not.toHaveAttribute("height");
		expect(element).not.toHaveAttribute("width");
	});

	it("should use src if resizerURL and no Auth", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70 }}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("src", "test-image.jpg");
	});

	it("should use src if no resizerURL and no Auth", () => {
		render(<Image src="test-image.jpg" resizedOptions={{ filter: 70 }} />);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("src", "test-image.jpg");
	});

	it("should render height and width if height and width", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ auth: "secret" }}
				width={100}
				height={100}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("height", "100");
		expect(element).toHaveAttribute("width", "100");
	});

	it("should render only height if height and no width", () => {
		render(<Image src="test-image.jpg" resizedOptions={{ auth: "secret" }} height={100} />);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("height", "100");
		expect(element).not.toHaveAttribute("width");
	});

	it("should pass in a first option with ? into the source with the resized image option", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, auth: "secret" }}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"src",
			"https://resizer.example.com/test-image.jpg?filter=70&auth=secret"
		);
	});

	it("should pass in many options into the source with the resized image option", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"src",
			"https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret"
		);
	});

	it("should pass in boolean as a string into the source with the resized image option", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: true, fancy: false, auth: "secret" }}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"src",
			"https://resizer.example.com/test-image.jpg?filter=true&fancy=false&auth=secret"
		);
	});

	it("should prefix the src with the resizer url and add query parameters", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"src",
			"https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret"
		);
	});

	it("should handle width and height passed into responsive images and render srcset", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
				responsiveImages={[100, 200, 300]}
				height={50}
				width={100}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"srcset",
			"https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=100&height=50 100w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=200&height=100 200w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=300&height=150 300w"
		);
	});

	it("should render srcset without height and width using responsive images array", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
				responsiveImages={[100, 200, 300]}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"srcset",
			"https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=100 100w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=200 200w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=300 300w"
		);
	});

	it("should only render positive integer responsive images array", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
				responsiveImages={[100, 200, 300, -100, "yes", true]}
			/>
		);

		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"srcset",
			"https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=100 100w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=200 200w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=300 300w"
		);
	});

	it("should render srcset using responsive images array with height and width", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				height={100}
				width={50}
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
				responsiveImages={[100, 200, 300, -100, "yes", true]}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"srcset",
			"https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=100&height=200 100w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=200&height=400 200w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=300&height=600 300w"
		);
	});
	it("passes in sizes array of object string default rendered", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
				responsiveImages={[100, 200, 300]}
				sizes={[{ isDefault: true, sourceSizeValue: "50vw" }]}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("sizes", "50vw");
	});

	it("passes in sizes array of object with many sizes", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
				responsiveImages={[100, 200, 300]}
				sizes={[
					{ sourceSizeValue: "50vw", isDefault: true },
					{ sourceSizeValue: "75vw", mediaCondition: "(min-width: 600px)" },
					{ sourceSizeValue: "100vw", mediaCondition: "(min-width: 500px)" },
				]}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"sizes",
			"(min-width: 600px) 75vw, (min-width: 500px) 100vw, 50vw"
		);
	});

	it("uses the first default size provided", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
				responsiveImages={[100, 200, 300]}
				sizes={[
					{ sourceSizeValue: "50vw", isDefault: true },
					{ sourceSizeValue: "75vw", isDefault: true },
				]}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("sizes", "50vw");
	});

	it("handles not having a default size", () => {
		render(
			<Image
				src="test-image.jpg"
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
				responsiveImages={[100, 200, 300]}
				sizes={[{ sourceSizeValue: "50vw", mediaCondition: "(min-width: 600px)" }]}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("sizes", "(min-width: 600px) 50vw");
	});

	it("uses ansImage prop for data", () => {
		render(
			<Image
				ansImage={{
					_id: "123",
					url: "http://image-host.com/test-image.jpg",
					auth: {
						2: "secret",
					},
				}}
				resizerURL="https://resizer.example.com/"
				resizedOptions={{ filter: 70, quality: 50 }}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"src",
			"https://resizer.example.com/123.jpg?filter=70&quality=50&auth=secret"
		);
	});
});
