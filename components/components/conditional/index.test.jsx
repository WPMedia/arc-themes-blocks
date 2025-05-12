import { render, screen } from "@testing-library/react";

import Link from "../link";

import Conditional from ".";

describe("Conditional", () => {
	it("should render string child", () => {
		render(<Conditional component={Link}>Hello World</Conditional>);
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});

	it("should not use the Component", () => {
		render(
			<Conditional component={Link} condition={"b" !== "a"} href="/">
				Hello World
			</Conditional>
		);
		expect(screen.getByRole("link")).not.toBeNull();
	});
});
