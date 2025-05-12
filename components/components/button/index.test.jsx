import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import Button from ".";

describe("Button", () => {
	it("should render string child", () => {
		render(<Button>Hello World</Button>);
		expect(screen.getByRole("button")).not.toBeNull();
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-button";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";

		render(<Button className={ADDITIONAL_CLASSES}>Hello World</Button>);
		const element = screen.getByRole("button");

		expect(element).toHaveClass(ORIGINAL_CLASSES);
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
	});

	it("should render full width class", () => {
		const ORIGINAL_CLASSES = "c-button";

		render(<Button fullWidth>Hello World</Button>);
		const element = screen.getByRole("button");

		expect(element).toHaveClass(ORIGINAL_CLASSES);
		expect(element).toHaveClass("c-button--full-width");
	});

	it("should render variant class", () => {
		const ORIGINAL_CLASSES = "c-button";

		render(<Button variant="primary">Hello World</Button>);
		const element = screen.getByRole("button");

		expect(element).toHaveClass(ORIGINAL_CLASSES);
		expect(element).toHaveClass("c-button--primary");
	});

	it("should only render children span when children passed", () => {
		const tree = renderer.create(<Button iconLeft={<p>Icon?</p>} />).toJSON();

		expect(tree).toMatchInlineSnapshot(`
		<button
		  className="c-button c-button--medium c-button--default"
		  type="button"
		>
		  <p>
		    Icon?
		  </p>
		</button>
	`);
	});

	it("should render as an anchor", () => {
		const ORIGINAL_CLASSES = "c-button";

		render(<Button href="/">Hello World</Button>);
		const element = screen.getByRole("link");
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should respond to assistiveHidden and show tab index -1 and aria-hidden", () => {
		render(<Button assistiveHidden>Button Text</Button>);

		const element = screen.getByRole("button", { hidden: true });

		expect(element).toHaveAttribute("aria-hidden", "true");
		expect(element).toHaveAttribute("tabIndex", "-1");
	});
});
