import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavWidget from "./nav-widget";
import { PLACEMENT_AREAS } from "../nav-helper";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		navColor: "light",
		locale: "somelocale",
	}))
);
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));

describe("<NavWidget/>", () => {
	it('renders null when type "none"', () => {
		const { container } = render(<NavWidget type="none" />);
		expect(container).toBeEmptyDOMElement();
	});

	it('renders nav widget - arc search w/ "nav-bar" placement', () => {
		const placement = PLACEMENT_AREAS.NAV_BAR;
		render(<NavWidget type="search" placement={placement} />);
		expect(screen.getByTestId("nav-chain-nav-search")).not.toBeNull();
	});

	it('renders nav widget - arc search w/ "section-menu" placement', () => {
		const placement = PLACEMENT_AREAS.SECTION_MENU;
		render(<NavWidget type="search" placement={placement} />);
		expect(screen.getByTestId("nav-chain-nav-search")).not.toBeNull();
	});

	it('renders nav widget - queryly search w/ "nav-bar" placement', () => {
		render(<NavWidget type="queryly" placement={PLACEMENT_AREAS.NAV_BAR} />);
		expect(screen.getByLabelText("header-nav-chain-block.search-text")).not.toBeNull();
	});

	it('renders nav widget - queryly search w/ "section-menu" placement', () => {
		render(<NavWidget type="queryly" placement={PLACEMENT_AREAS.SECTION_MENU} />);
		expect(screen.getByLabelText("header-nav-chain-block.search-text")).not.toBeNull();
	});

	it("renders nav widget - section menu", () => {
		const menuButtonClick = jest.fn(() => {});
		render(<NavWidget type="menu" menuButtonClickAction={menuButtonClick} />);
		expect(screen.getByTestId("nav-chain-nav-section-button")).not.toBeNull();
	});

	it("renders nav widget - section menu with svg and container text, with desktop breakpoint", () => {
		const menuButtonClick = jest.fn(() => {});
		render(
			<NavWidget type="menu" menuButtonClickAction={menuButtonClick} breakpoint="desktop" />
		);
		expect(screen.getByTestId("nav-chain-nav-section-button")).not.toBeNull();
		expect(screen.getByText("header-nav-chain-block.sections-button")).not.toBeNull();
	});

	it("renders nav widget - custom with child component", () => {
		const ChildComponent = () => <div>something</div>;
		render(
			<NavWidget
				type="custom"
				position={1}
				// eslint-disable-next-line react/no-children-prop
				children={[<ChildComponent key="child-test" />]}
			/>
		);
		expect(screen.getByText("something")).not.toBeNull();
	});

	it("renders nav widget - custom without child component", () => {
		const { container } = render(<NavWidget type="none" />);
		expect(container).toBeEmptyDOMElement();
	});
});
