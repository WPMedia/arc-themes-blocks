import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import SearchField from "./search-field";

describe("Search Results List - Search Field", () => {
	it("should render the search field", async () => {
		render(
			<SearchField
				results={[]}
				onChange={() => {}}
				onSearch={() => {}}
				searchTerm="search term"
				totalItems={0}
			/>
		);

		expect(screen.getByRole("textbox", { name: "" })).toBeDefined();
		// expect(screen.getByText("search-results-block.search-result-number")).toBe(null);
		expect(
			screen.getByRole("button", { name: "search-results-block.search-button" })
		).toBeDefined();
	});

	it("should render the search metadata if there are results", async () => {
		render(
			<SearchField
				results={[{ _id: "ID1" }]}
				onChange={() => {}}
				onSearch={() => {}}
				searchTerm="search term"
				totalItems={2}
			/>
		);

		expect(screen.getByText("search-results-block.search-result-number")).toBeDefined();
	});

	it("should should call onSearch when search is clicked", () => {
		const onSearch = jest.fn();
		render(
			<SearchField
				results={[{ _id: "ID1" }]}
				onChange={() => {}}
				onSearch={onSearch}
				searchTerm="search term"
				totalItems={2}
			/>
		);

		fireEvent.click(
			screen.getByRole("button", {
				name: "search-results-block.search-button",
			})
		);
		expect(onSearch).toHaveBeenCalled();
	});

	it("should should call onChange when field is altered", () => {
		const onChange = jest.fn();
		render(
			<SearchField
				results={[{ _id: "ID1" }]}
				onChange={onChange}
				onSearch={() => {}}
				searchTerm="search term"
				totalItems={2}
			/>
		);

		fireEvent.change(
			screen.getByRole("textbox", {
				name: "",
			}),
			{
				target: { value: "changed search" },
			}
		);
		expect(onChange).toHaveBeenCalledWith({ value: "changed search" });
	});

	it("should should include a defaultValue if defined", () => {
		const onChange = jest.fn();
		render(
			<SearchField
				defaultValue="test"
				results={[{ _id: "ID1" }]}
				onChange={onChange}
				onSearch={() => {}}
				searchTerm="search term"
				totalItems={2}
			/>
		);

		expect(screen.getByRole("textbox", { value: "test" })).toBeDefined();
	});
});
