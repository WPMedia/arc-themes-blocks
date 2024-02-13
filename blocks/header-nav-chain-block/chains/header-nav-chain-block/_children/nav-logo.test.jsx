import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import NavLogo from "./nav-logo";

describe("<NavLogo/>", () => {
	it("renders logo", () => {
		jest.useFakeTimers();
		render(
			<NavLogo
				blockClassName="b-header-nav-chain"
				imageSource="resources/images/logo.png"
				imageAltText="NavBar logo"
			/>
		);
		act(() => {
			jest.runAllTimers();
		});
		expect(screen.getByAltText("NavBar logo")).not.toBeNull();
	});

	it("renders SVG logo", () => {
		jest.useFakeTimers();
		render(
			<NavLogo
				blockClassName="b-header-nav-chain"
				imageSource="resources/images/logo.svg"
				imageAltText="NavBar SVG logo"
			/>
		);
		act(() => {
			jest.runAllTimers();
		});
		expect(screen.getByAltText("NavBar SVG logo")).not.toBeNull();
	});
});
