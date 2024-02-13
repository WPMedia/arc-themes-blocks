import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavSection from "./nav-section"

const customFieldSelections = {
	leftComponentDesktop1: "search",
	leftComponentDesktop2: "menu",
	leftComponentMobile1: "menu",
	menuComponentMobile1: "search",
};

it("when no child component exists at the signInOrder index, it should render nothing inside the .nav-right", () => {
	render(
		<NavSection
			customFields={customFieldSelections}
			signInOrder={2}
			side="right"
			blockClassName="b-header-nav-chain"
		>
			{[
				<button key={1} type="button">
					Sign In
				</button>,
			]}
		</NavSection>
	);

	const widgetListMobile = screen.getByTestId("nav-chain-nav-components-mobile-right");
	const widgetListDesktop = screen.getByTestId("nav-chain-nav-components-desktop-right");
	expect(widgetListMobile).toBeEmptyDOMElement();
	expect(widgetListDesktop).toBeEmptyDOMElement();
});

// The 'signInOrder' custom field is deprecated but still necessary for compatibility
describe("when a child component exists at the signInOrder index", () => {
	it("should render the child component inside the .nav-right", () => {
		render(
			<NavSection
				side="right"
				customFields={customFieldSelections}
				signInOrder={1}
				blockClassName="b-header-nav-chain"
			>
				{[
					<button key={1} type="button">
						Sign In
					</button>,
				]}
			</NavSection>
		);
		expect(screen.getByText("Sign In")).not.toBeNull();
	});
});
