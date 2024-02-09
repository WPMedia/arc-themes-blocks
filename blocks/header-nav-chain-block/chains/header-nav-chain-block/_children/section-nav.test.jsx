import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import SectionNav from "./section-nav";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));

const items = [
	{
		_id: "/sports",
		node_type: "section",
		name: "Sports",
		children: [
			{
				_id: "foo",
				node_type: "link",
				display_name: "Basketball",
				url: "/basketball",
			},
			{
				_id: "bar",
				node_type: "link",
				display_name: "Dodgeball",
				url: "/dodgeball",
			},
			{
				_id: "/some-inactive-sub-section",
				inactive: false,
				node_type: "section",
				name: "Some Inactive Section",
			},
		],
	},
	{
		_id: "bar",
		node_type: "link",
		display_name: "Entertainment",
		url: "/entertainment/",
	},
	{
		_id: "external",
		node_type: "link",
		display_name: "External Link",
		url: "http://washingtonpost.com/entertainment/",
	},
	{
		_id: "query",
		node_type: "link",
		display_name: "External with query",
		url: "http://washingtonpost.com/entertainment/?test=2&foo=bar",
	},
	{
		_id: "query2",
		node_type: "link",
		display_name: "internal with query",
		url: "/entertainment/?test=1",
	},
	{
		_id: "link3",
		node_type: "link",
		display_name: "with page name",
		url: "https://example.com/category/page.html",
	},
	{
		_id: "hash",
		node_type: "link",
		display_name: "internal with hash",
		url: "/entertainment/page#myhash",
	},
	{
		_id: "mail",
		node_type: "link",
		display_name: "mail link",
		url: "mailto:readers@washpost.com",
	},
	{
		_id: "/some-inactive-section",
		inactive: true,
		node_type: "section",
		name: "Some Inactive Section",
	},
];

describe("the SectionNav component", () => {
	it("should render children", () => {
		render(
			<SectionNav blockClassName="b-header-nav-chain">
				<div className="child">Child Item</div>
			</SectionNav>
		);

		expect(screen.getByText("Child Item")).not.toBeNull();
	});

	it("should render the correct number of active .section-item elements", () => {
		render(<SectionNav sections={items} />);
		const numActiveItems = items.filter((i) => !i.inactive).length;

		expect(screen.getAllByTestId("nav-chain-section-item")).toHaveLength(numActiveItems);
	});

	it("should render the text for a section node correctly", () => {
		render(<SectionNav sections={items} />);
		expect(screen.getByText("Sports")).not.toBeNull();
	});

	it("should render the text for a link node correctly", () => {
		render(<SectionNav sections={items} />);
		expect(screen.getByText("Entertainment")).not.toBeNull();
	});

	describe("when a section has child nodes", () => {
		it("should render a .submenu-caret element inside the anchor tag", () => {
			render(<SectionNav sections={items} />);
			const sections = screen.getAllByTestId("nav-chain-section-item-subsection");
			sections.forEach((section) => {
				expect(within(section).getByLabelText("header-nav-chain-block.sections-button-aria-label")).not.toBeNull();
			});
		});

		it("should render a .subsection-container", () => {
			render(<SectionNav sections={items} />);
			const numSubsectionContainers = items.filter((i) => i.children && i.children.length).length;
			expect(screen.getAllByTestId("nav-chain-section-item-subsection")).toHaveLength(numSubsectionContainers);
		});

		it("should render the correct number of active .subsection-item elements", () => {
			render(<SectionNav sections={items} blockClassName="b-header-nav-chain" />);
			const numActiveSubItems = items[0].children.length;
			expect(screen.getAllByTestId("nav-chain-subsection-item")).toHaveLength(
				numActiveSubItems
			);
		});

		it("should render the text for a subsection link node correctly", () => {
			render(<SectionNav sections={items} blockClassName="b-header-nav-chain" />);
			expect(screen.getByText("Basketball")).not.toBeNull();
		});

		it("should render target and rel attribute for external links", () => {
			render(<SectionNav sections={items} />);
			const link = screen.getByText("External Link");

			expect(link).toHaveAttribute("target", "_blank");
			expect(link).toHaveAttribute("rel", "noreferrer");
		});

		it('submenu "caret" button sets open class correctly on parent', () => {
			render(<SectionNav sections={items} />);
			const caret = screen.getAllByLabelText("header-nav-chain-block.sections-button-aria-label")[0];
			const sectionMenu = screen.getAllByTestId("nav-chain-section-item-subsection")[0];

			expect(sectionMenu).not.toHaveClass("open");
			fireEvent.click(caret)
			expect(sectionMenu).toHaveClass("open");
		});

		it('submenu "caret" button sets correct aria-expanded on open and close', () => {
			render(<SectionNav sections={items} />);
			const caret = screen.getAllByLabelText("header-nav-chain-block.sections-button-aria-label")[0];

			expect(caret).toHaveAttribute("aria-expanded", "false");
			fireEvent.click(caret)
			expect(caret).toHaveAttribute("aria-expanded", "true");
			fireEvent.click(caret)
			expect(caret).toHaveAttribute("aria-expanded", "false");
		});

		it("clicking menu item link does not open sub sections", () => {
			render(<SectionNav sections={items} />);
			const sectionMenu = screen.getAllByTestId("nav-chain-section-item-subsection")[0];

			expect(sectionMenu).not.toHaveClass("open");
			fireEvent.click(within(sectionMenu).getByText("Sports"));
			expect(sectionMenu).not.toHaveClass("open");
		});
	});
});
