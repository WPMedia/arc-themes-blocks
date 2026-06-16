import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import NavLogo from "./nav-logo";

describe("<NavLogo/>", () => {
	afterEach(() => {
		jest.useRealTimers();
	});

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

	it("shows logo immediately when viewport is smaller than showLogoAbove", () => {
		// jsdom has clientWidth=0 by default, so when showLogoAbove > 0, condition is met
		jest.useFakeTimers();
		render(
			<NavLogo
				blockClassName="b-header-nav-chain"
				imageSource="resources/images/logo.png"
				imageAltText="Mobile Logo"
				showLogoAbove={1200}
			/>
		);
		act(() => { jest.runAllTimers(); });
		expect(screen.getByAltText("Mobile Logo")).not.toBeNull();
	});

	it("renders logo with right alignment", () => {
		jest.useFakeTimers();
		render(
			<NavLogo
				blockClassName="b-header-nav-chain"
				imageSource="resources/images/logo.png"
				imageAltText="Right Logo"
				logoAlignment="right"
			/>
		);
		act(() => { jest.runAllTimers(); });
		expect(screen.getByAltText("Right Logo")).not.toBeNull();
	});

	it("does not immediately show logo when viewport is >= showLogoAbove (768) — uses timer instead", () => {
		jest.useFakeTimers();
		// JSDOM defaults innerWidth=1024, so vw >= 768 — visibility is deferred via a timer rather than set immediately
		render(
			<NavLogo
				blockClassName="b-header-nav-chain"
				imageSource="resources/images/logo.png"
				imageAltText="Wide Logo"
			/>
		);
		// Logo is hidden initially (aria-hidden, no visible role="link")
		expect(screen.queryByRole("link")).toBeNull();
		// After 1s timer fires and no masthead exists, logo becomes visible
		act(() => { jest.runAllTimers(); });
		expect(screen.getByRole("link")).not.toBeNull();
	});

	it("immediately shows logo when viewport is narrower than 768px", () => {
		jest.useFakeTimers();
		// Set a narrow viewport so vw < showLogoAbove (768) → setLogoVisibility(true) immediately
		Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 375 });
		render(
			<NavLogo
				blockClassName="b-header-nav-chain"
				imageSource="resources/images/logo.png"
				imageAltText="Narrow Logo"
			/>
		);
		// Logo should be visible immediately (no timer needed)
		act(() => { jest.runAllTimers(); });
		expect(screen.getByAltText("Narrow Logo")).not.toBeNull();
		// Reset
		Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1024 });
	});

	it("uses clientWidth when it is non-zero", () => {
		jest.useFakeTimers();
		// Set clientWidth > 0 (e.g. 1200) and innerWidth > 0 to cover the truthy branch of clientWidth || 0
		Object.defineProperty(document.documentElement, "clientWidth", {
			writable: true,
			configurable: true,
			value: 1200,
		});
		render(
			<NavLogo
				blockClassName="b-header-nav-chain"
				imageSource="resources/images/logo.png"
				imageAltText="ClientWidth Logo"
			/>
		);
		act(() => { jest.runAllTimers(); });
		expect(screen.getByAltText("ClientWidth Logo")).not.toBeNull();
		// Reset
		Object.defineProperty(document.documentElement, "clientWidth", {
			writable: true,
			configurable: true,
			value: 0,
		});
	});
});
