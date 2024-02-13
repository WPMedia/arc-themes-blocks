import React from "react";
import { render, screen, within } from "@testing-library/react";
import MenuWidgets from "./menu-widgets";

jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("With basic selections", () => {
	const customFieldSelections = {
		leftComponentDesktop1: "search",
		leftComponentDesktop2: "menu",
		leftComponentMobile1: "menu",
		menuComponentMobile1: "search",
	};
	it("should render a search widget in the sections menu on mobile", () => {
		render(
			<MenuWidgets customFields={customFieldSelections} menuButtonClickAction={() => {}} />
		);

		const navComponents = screen.getByTestId("nav-chain-nav-components-mobile")
		expect(within(navComponents).getByTestId("nav-chain-nav-search")).not.toBeNull();
	});

	it("should render nothing in the sections menu on desktop", () => {
		render(
			<MenuWidgets customFields={customFieldSelections} menuButtonClickAction={() => {}} />
		);
		const navComponents = screen.getByTestId("nav-chain-nav-components-desktop")
		expect(within(navComponents).queryAllByRole("link").length).toBe(0);
	});
});
