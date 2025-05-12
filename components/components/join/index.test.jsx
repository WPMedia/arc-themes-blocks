import { render, screen } from "@testing-library/react";

import Join from ".";

const HelloWorld = () => <>Hello World</>;
const Separator = () => <span data-testid="separator">-</span>;

describe("Join", () => {
	it("should render only the child if there is only one child", () => {
		const { container } = render(<Join separator={Separator}>Hello World</Join>);
		expect(container.childNodes.length).toBe(1);
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});

	it("should render a separator if there is more than one child", () => {
		const { container } = render(
			<Join separator={Separator}>
				<HelloWorld />
				<HelloWorld />
			</Join>
		);
		expect(container.childNodes.length).toBe(3);
		expect(screen.getByTestId("separator")).not.toBeNull();
	});

	it("should render a separator between each child", () => {
		const { container } = render(
			<Join separator={Separator}>
				<HelloWorld />
				<HelloWorld />
				<HelloWorld />
			</Join>
		);
		expect(container.childNodes.length).toBe(5);
		expect(container.childNodes[0]).toHaveTextContent("Hello World");
		expect(container.childNodes[1]).toHaveTextContent("-");
		expect(container.childNodes[2]).toHaveTextContent("Hello World");
		expect(container.childNodes[3]).toHaveTextContent("-");
		expect(container.childNodes[4]).toHaveTextContent("Hello World");
	});

	it("should not render null children", () => {
		const { container } = render(
			<Join separator={Separator}>
				{null}
				<HelloWorld />
			</Join>
		);
		expect(container.childNodes.length).toBe(1);
		expect(container.childNodes[0]).toHaveTextContent("Hello World");
	});
});
