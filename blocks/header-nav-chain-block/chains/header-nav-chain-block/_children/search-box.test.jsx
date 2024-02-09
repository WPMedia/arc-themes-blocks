import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchBox from "./search-box";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
		navBarBackground: "",
		navColor: "dark",
	}))
);

describe("the SearchBox component", () => {
	it("should render a search button", () => {
		render(<SearchBox />);
		expect(screen.getByTestId("nav-chain-nav-search")).not.toBeNull();
	});

	describe("when the search button is clicked", () => {
		it("should add .open class to .nav-search", () => {
			render(<SearchBox />);
			expect(screen.getByTestId("nav-chain-nav-search")).not.toHaveClass("open");
			fireEvent.mouseUp(screen.getByLabelText("header-nav-chain-block.search-text"));
			expect(screen.getByTestId("nav-chain-nav-search")).toHaveClass("open");
		});

		it("should run the customSearchAction when not not null", () => {
			const customSearchAction = jest.fn(() => {});
			render(<SearchBox customSearchAction={customSearchAction} />);
			fireEvent.click(screen.getByLabelText("header-nav-chain-block.search-text"));
			expect(customSearchAction).toHaveBeenCalled();
		});
	});

	describe("when .nav-search is open", () => {
		it("should focus on the input element", () => {
			render(<SearchBox />);
			fireEvent.mouseUp(screen.getByLabelText("header-nav-chain-block.search-text"));
			expect(screen.getByRole("textbox")).toHaveFocus();
		});

		describe("when input loses focus", () => {
			it("should remove the .open class from .nav-search", () => {
				render(<SearchBox />);
				fireEvent.mouseUp(screen.getByLabelText("header-nav-chain-block.search-text"));
				expect(screen.getByTestId("nav-chain-nav-search")).toHaveClass("open");

				fireEvent.blur(screen.getByRole("textbox"));
				expect(screen.getByTestId("nav-chain-nav-search")).not.toHaveClass("open");
			});
		});
	});

	describe("when alwaysOpen prop is true", () => {
		it("should add .open class to .nav-search", () => {
			render(<SearchBox alwaysOpen />);
			expect(screen.getByTestId("nav-chain-nav-search")).toHaveClass("open");
		});
	});

	describe("searchInput.current.value on input keydown change ", () => {
		it("should trigger customSearchAction", () => {
			const searchAction = jest.fn((value) => value);
			render(<SearchBox alwaysOpen customSearchAction={searchAction} />);
			fireEvent.change(screen.getByRole("textbox"), {target: {value: "foo"}});
			fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
			expect(searchAction).toHaveBeenCalledWith("foo");
		});

		it("should trigger url location", () => {
			global.window = Object.create(window);
			Object.defineProperty(window, "location", {
				writable: true,
				value: {
					href: "/",
				},
			});

			render(<SearchBox alwaysOpen />);
			fireEvent.change(screen.getByRole("textbox"), {target: {value: "foo"}});
			fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });

			expect(window.location.href).toBe(`/search/foo`);

			delete global.window.location;
		});
	});

	describe("searchInput.current.value on button click change ", () => {
		it("should trigger customSearchAction", () => {
			const searchAction = jest.fn((value) => value);
			render(<SearchBox alwaysOpen customSearchAction={searchAction} />);
			fireEvent.change(screen.getByRole("textbox"), {target: {value: "foo"}});
			fireEvent.click(screen.getByLabelText("header-nav-chain-block.search-text"));
			expect(searchAction).toHaveBeenCalledWith("foo");
		});

		it("should trigger url location", () => {
			global.window = Object.create(window);
			Object.defineProperty(window, "location", {
				writable: true,
				value: {
					href: "/",
				},
			});

			render(<SearchBox alwaysOpen />);
			fireEvent.change(screen.getByRole("textbox"), {target: {value: "foo"}});
			fireEvent.click(screen.getByLabelText("header-nav-chain-block.search-text"));
			expect(window.location.href).toBe(`/search/foo`);

			delete global.window.location;
		});
	});
});
