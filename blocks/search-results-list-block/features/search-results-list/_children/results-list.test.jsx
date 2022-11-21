import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import ResultsList from "./results-list";

describe("Search Results List - Results List", () => {
	it("should not render if there are no results", () => {
		const { container } = render(
			<ResultsList
				arcSite="arc-site"
				results={[]}
				onSearch={() => {}}
				promoElements={{
					showHeadline: true,
					showImage: true,
					showDescription: true,
					showByline: true,
					showDate: true,
				}}
				totalItems={0}
			/>
		);
		expect(container.firstChild).toBe(null);
	});

	it("should not render the see more button if there are no more results", () => {
		render(
			<ResultsList
				arcSite="arc-site"
				results={[{ _id: "ID1" }]}
				onSearch={() => {}}
				promoElements={{
					showHeadline: true,
					showImage: true,
					showDescription: true,
					showByline: true,
					showDate: true,
				}}
				totalItems={1}
			/>
		);
		expect(
			screen.queryByRole("button", {
				name: "search-results-block.see-more-button-aria-label",
			})
		).toBe(null);
	});

	it("should render the see more button if there are more results", () => {
		render(
			<ResultsList
				arcSite="arc-site"
				results={[{ _id: "ID1" }]}
				onSearch={() => {}}
				promoElements={{
					showHeadline: true,
					showImage: true,
					showDescription: true,
					showByline: true,
					showDate: true,
				}}
				totalItems={2}
			/>
		);
		expect(
			screen.getByRole("button", { name: "search-results-block.see-more-button-aria-label" })
		).toBeDefined();
	});

	it("should should call onSearch with true when see more is clicked", () => {
		const onSearch = jest.fn();
		render(
			<ResultsList
				arcSite="arc-site"
				results={[{ _id: "ID1" }]}
				onSearch={onSearch}
				promoElements={{
					showHeadline: true,
					showImage: true,
					showDescription: true,
					showByline: true,
					showDate: true,
				}}
				totalItems={2}
			/>
		);

		fireEvent.click(
			screen.getByRole("button", {
				name: "search-results-block.see-more-button-aria-label",
			})
		);
		expect(onSearch).toHaveBeenCalled();
	});
});
