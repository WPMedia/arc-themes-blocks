import { render } from "@testing-library/react";

import formatAuthors from ".";

const authors = [
	{
		name: "Author One",
		type: "author",
		url: "#",
	},
	{
		name: "Author Two",
		type: "author",
	},
	{
		name: "Author Three",
		type: "author",
	},
	{
		name: "Invalid Author",
		type: "not author",
		url: "#",
	},
];

describe("format authors utility function", () => {
	it("should return nothing if nothing passed in", () => {
		const { container } = render(formatAuthors());
		expect(container).toBeEmptyDOMElement();
	});
	it("should return nothing if empty array passed in", () => {
		const { container } = render(formatAuthors([]));
		expect(container).toBeEmptyDOMElement();
	});
	it("should return nothing if null value passed in", () => {
		const { container } = render(formatAuthors([null]));
		expect(container).toBeEmptyDOMElement();
	});
	it("should return nothing if undefined value passed in", () => {
		const { container } = render(formatAuthors([undefined]));
		expect(container).toBeEmptyDOMElement();
	});
	it("should return nothing for invalid authors", () => {
		const { container } = render(formatAuthors(authors.slice(3, 4)));
		expect(container).toBeEmptyDOMElement();
	});
	it("should return properly formatted for a single item", () => {
		const { queryByRole } = render(formatAuthors(authors.slice(0, 1)));
		expect(queryByRole("link", { name: "Author One" })).toBeInTheDocument();
	});
	it("should return properly formatted for two items", () => {
		const { container, queryByRole } = render(formatAuthors(authors.slice(0, 2)));
		expect(queryByRole("link", { name: "Author One" })).toBeInTheDocument();
		expect(queryByRole("link", { name: "Author Two" })).not.toBeInTheDocument();
		expect(container.textContent).toBe("Author One and Author Two");
	});
	it("should return properly formatted for three items", () => {
		const { container, queryByRole } = render(formatAuthors(authors.slice(0, 3)));
		expect(queryByRole("link", { name: "Author One" })).toBeInTheDocument();
		expect(queryByRole("link", { name: "Author Two" })).not.toBeInTheDocument();
		expect(queryByRole("link", { name: "Author Three" })).not.toBeInTheDocument();
		expect(container.textContent).toBe("Author One, Author Two, and Author Three");
	});
	it("should return properly formatted for three items with custom conjunction", () => {
		const { container, queryByRole } = render(formatAuthors(authors.slice(0, 3), "or"));
		expect(queryByRole("link", { name: "Author One" })).toBeInTheDocument();
		expect(queryByRole("link", { name: "Author Two" })).not.toBeInTheDocument();
		expect(queryByRole("link", { name: "Author Three" })).not.toBeInTheDocument();
		expect(container.textContent).toBe("Author One, Author Two, or Author Three");
	});
});
