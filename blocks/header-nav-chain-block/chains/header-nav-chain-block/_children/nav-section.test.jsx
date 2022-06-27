import React from "react";

const { mount } = require("enzyme");
const { default: NavSection } = require("./nav-section");

const customFieldSelections = {
	leftComponentDesktop1: "search",
	leftComponentDesktop2: "menu",
	leftComponentMobile1: "menu",
	menuComponentMobile1: "search",
};

it("when no child component exists at the signInOrder index, it should render nothing inside the .nav-right", () => {
	const wrapper = mount(
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

	const widgetListMobile = wrapper.find(
		".b-header-nav-chain__nav-right > .nav-components--mobile > WidgetList"
	);
	const widgetListDesktop = wrapper.find(
		".b-header-nav-chain__nav-right > .nav-components--desktop > WidgetList"
	);
	expect(widgetListMobile).toHaveLength(1);
	expect(widgetListDesktop).toHaveLength(1);
	expect(widgetListMobile.children()).toHaveLength(0);
	expect(widgetListDesktop.children()).toHaveLength(0);
});

// The 'signInOrder' custom field is deprecated but still necessary for compatibility
describe("when a child component exists at the signInOrder index", () => {
	it("should render the child component inside the .nav-right", () => {
		const wrapper = mount(
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
		const navRight = wrapper.find(".b-header-nav-chain__nav-right");
		expect(navRight.children()).toHaveLength(1);
		expect(navRight.find("button")).toHaveText("Sign In");
	});
});
