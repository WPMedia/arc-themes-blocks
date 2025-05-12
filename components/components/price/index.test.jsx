import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import Price from ".";

describe("Price", () => {
	it("should render in order passed in", () => {
		const tree = renderer
			.create(
				<Price>
					<Price.Sale>$100</Price.Sale>
					<Price.List>$200</Price.List>
				</Price>
			)
			.toJSON();

		expect(tree).toMatchInlineSnapshot(`
		<div
		  className="c-price"
		  data-testid="price"
		>
		  <div
		    className="c-price__sale"
		  >
		    $100
		  </div>
		  <div
		    className="c-price__list"
		  >
		    $200
		  </div>
		</div>
	`);

		const treeAlt = renderer
			.create(
				<Price>
					<Price.List>$200</Price.List>
					<Price.Sale>$100</Price.Sale>
				</Price>
			)
			.toJSON();

		expect(treeAlt).toMatchInlineSnapshot(`
		<div
		  className="c-price"
		  data-testid="price"
		>
		  <div
		    className="c-price__list"
		  >
		    $200
		  </div>
		  <div
		    className="c-price__sale"
		  >
		    $100
		  </div>
		</div>
	`);
	});

	it("should render sub components", () => {
		render(
			<Price>
				<Price.Sale>$100</Price.Sale>
				<Price.List>$200</Price.List>
			</Price>
		);
		expect(screen.queryByText("$100")).not.toBeNull();
	});

	it("should render only sub components", () => {
		render(
			<Price>
				<Price.Sale>$100</Price.Sale>
				<Price.List>$200</Price.List>
				<div>Other</div>
			</Price>
		);
		expect(screen.queryByText("Other")).toBeNull();
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-price";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Price className={ADDITIONAL_CLASSES}>
				<div />
			</Price>
		);
		const element = screen.getByTestId("price");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render sub components with additional classes", () => {
		const ORIGINAL_CLASSES = "c-price__sale";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Price>
				<Price.Sale className={ADDITIONAL_CLASSES}>$100</Price.Sale>
			</Price>
		);
		const element = screen.queryByText("$100");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render sub components with additional classes", () => {
		const ORIGINAL_CLASSES = "c-price__list";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Price>
				<Price.List className={ADDITIONAL_CLASSES}>$100</Price.List>
			</Price>
		);
		const element = screen.queryByText("$100");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
