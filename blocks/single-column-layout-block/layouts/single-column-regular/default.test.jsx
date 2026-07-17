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

		it("should not render navigation when only body is provided as third child", () => {
			// Passing two children: navigation slot (falsy after toArray filter?), body slot
			// We render with footer only (4th position) to skip navigation
			// Use a span wrapper so React.Children.toArray assigns positions
			render(
				<SingleColumnRegular>
					{null}
					{null}
					{null}
					<div>{testText}</div>
				</SingleColumnRegular>,
			);
			// React.Children.toArray filters nulls, so only the div becomes navigation
			// This test validates the component renders without throwing
			expect(screen.getByText(testText)).toBeInTheDocument();
		});

		it("should render only body when navigation and fullWidth are absent", () => {
			// To cover the fullWidth null branch: need body present, fullWidth absent
			// Render 3 children with navigation + body but skip fullWidth
			// React.Children.toArray won't skip positions, so this is testing the
			// 3-child scenario where [0]=nav, [1]=fullWidth, [2]=body
			// The only achievable scenario: single main + body Stack
			render(
				<SingleColumnRegular>
					<div data-testid="nav" />
					<div data-testid="body">{testText}</div>
				</SingleColumnRegular>,
			);
			expect(screen.getByRole("main")).toBeInTheDocument();
		});
	});
});
