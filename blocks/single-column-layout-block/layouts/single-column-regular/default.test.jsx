import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SingleColumnRegular from "./default";

const testText = "Single Column Regular Layout";

describe("Single Column Regular Layout", () => {
	describe("when it is first rendered", () => {
		it("should render the content in the header (role banner) when the first child is provided", () => {
			render(
				<SingleColumnRegular>
					<h1>{testText}</h1>
				</SingleColumnRegular>
			);
			expect(screen.getByRole("banner")).toHaveTextContent(testText);
		});

		it("should render content into the main when two children are provided", () => {
			render(
				<SingleColumnRegular>
					<></>
					<p>{testText}</p>
				</SingleColumnRegular>
			);
			expect(screen.getByRole("main")).toHaveTextContent(testText);
		});

		it("should render a content into the contentinfo (footer) when three children are provided", () => {
			render(
				<SingleColumnRegular>
					<></>
					<></>
					<div>{testText}</div>
				</SingleColumnRegular>
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
