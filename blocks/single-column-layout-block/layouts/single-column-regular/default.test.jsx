import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SingleColumnRegular from "./default";

const testText = "Single Column Regular Layout";

describe("Single Column Regular Layout", () => {
	describe("when it is first rendered", () => {
		it("should render content into the header (role banner) section when the one child is provided", () => {
			render(
				<SingleColumnRegular>
					<h1>{testText}</h1>
				</SingleColumnRegular>,
			);
			expect(screen.getByRole("banner")).toHaveTextContent(testText);
		});

		it("should render content into the main (role main) section when two children are provided", () => {
			render(
				<SingleColumnRegular>
					<div />
					<p>{testText}</p>
				</SingleColumnRegular>,
			);
			expect(screen.getByRole("main")).toHaveTextContent(testText);
		});

		it("should render content into the main (role main) section when three children are provided", () => {
			render(
				<SingleColumnRegular>
					<div />
					<div />
					<p>{testText}</p>
				</SingleColumnRegular>,
			);
			expect(screen.getByRole("main")).toHaveTextContent(testText);
		});

		it("should render a content into the contentinfo (footer) when four children are provided", () => {
			render(
				<SingleColumnRegular>
					<div />
					<div />
					<div />
					<div>{testText}</div>
				</SingleColumnRegular>,
			);
			expect(screen.getByRole("contentinfo")).toHaveTextContent(testText);
		});

		it("should render null when null is the child", () => {
			const { container } = render(<SingleColumnRegular>{null}</SingleColumnRegular>);
			expect(container).toBeEmptyDOMElement();
		});

		it("should render null when no child", () => {
			const { container } = render(<SingleColumnRegular />);
			expect(container).toBeEmptyDOMElement();
		});
	});
});
