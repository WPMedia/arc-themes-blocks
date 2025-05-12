import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Stack from ".";

describe("Stack", () => {
	it("should render only one child div", () => {
		const { container } = render(
			<Stack>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelectorAll(".c-stack div")).toHaveLength(1);
	});

	it("should render as a section", () => {
		const { container } = render(
			<Stack as="section">
				<img alt="image 1" src="https://picsum.photos/200/100" />
			</Stack>
		);
		expect(container.querySelectorAll("section.c-stack")).toHaveLength(1);
	});

	it("should allow pass through of props", () => {
		const { container } = render(
			<Stack id="custom-id">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack")).toHaveAttribute("id", "custom-id");
	});

	it("should render only two child divs", () => {
		const { container } = render(
			<Stack>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelectorAll(".c-stack div")).toHaveLength(2);
	});

	it("should render vertical layout by default", () => {
		const { container } = render(
			<Stack>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-direction")).toBe(
			"vertical"
		);
	});

	it("should apply custom classes in the class attribute", () => {
		const { container } = render(
			<Stack className="test-class, test-class-2">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("class")).toContain(
			"test-class, test-class-2"
		);
	});

	it("should render vertical layout when explicitly specified", () => {
		const { container } = render(
			<Stack direction="vertical">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-direction")).toBe(
			"vertical"
		);
	});

	it("should render horizontal layout when explicitly specified", () => {
		const { container } = render(
			<Stack direction="horizontal">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-direction")).toBe(
			"horizontal"
		);
	});

	it("should render wrap=nowrap when by default", () => {
		const { container } = render(
			<Stack direction="horizontal">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);

		expect(container.querySelector(".c-stack").getAttribute("data-style-wrap")).toBe("nowrap");
	});

	it("should render  wrap=wrap when by specified", () => {
		const { container } = render(
			<Stack direction="horizontal" wrap="wrap">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);

		expect(container.querySelector(".c-stack").getAttribute("data-style-wrap")).toBe("wrap");
	});

	it("should render a reverse wrap when by specified", () => {
		const { container } = render(
			<Stack direction="horizontal" wrap="reverse">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);

		expect(container.querySelector(".c-stack").getAttribute("data-style-wrap")).toBe("reverse");
	});

	it("should render unset alignment by default", () => {
		const { container } = render(
			<Stack>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-alignment")).toBe("unset");
	});

	it("should render start alignment when explicitly specified", () => {
		const { container } = render(
			<Stack alignment="start">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-alignment")).toBe("start");
	});

	it("should render center alignment when explicitly specified", () => {
		const { container } = render(
			<Stack alignment="center">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-alignment")).toBe("center");
	});

	it("should render end alignment when explicitly specified", () => {
		const { container } = render(
			<Stack alignment="end">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-alignment")).toBe("end");
	});

	it("should render start justification when explicitly specified", () => {
		const { container } = render(
			<Stack justification="start">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-justification")).toBe(
			"start"
		);
	});

	it("should render center justification when explicitly specified", () => {
		const { container } = render(
			<Stack justification="center">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-justification")).toBe(
			"center"
		);
	});

	it("should render end justification when explicitly specified", () => {
		const { container } = render(
			<Stack justification="end">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-justification")).toBe(
			"end"
		);
	});

	it("should render custom gap when explicitly specified", () => {
		const { container } = render(
			<Stack gap="15px">
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("style")).toBe("--c-stack-gap: 15px;");
	});

	it("should not render dividers when not specified", () => {
		const { container } = render(
			<Stack>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelectorAll(".c-stack hr")).toHaveLength(0);
	});

	it("should render dividers when explicitly specified", () => {
		const { container } = render(
			<Stack divider>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelectorAll(".c-stack hr")).toHaveLength(1);
	});

	it("should render not render inline by default", () => {
		const { container } = render(
			<Stack>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-inline")).toBe("false");
	});

	it("should render an inline container when specified", () => {
		const { container } = render(
			<Stack inline>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: "100px", width: "200px" }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>
		);
		expect(container.querySelector(".c-stack").getAttribute("data-style-inline")).toBe("true");
	});
});
