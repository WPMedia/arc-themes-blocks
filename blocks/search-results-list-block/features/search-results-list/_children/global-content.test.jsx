import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// @Consumer is a class decorator: it receives the class and returns it (no-op here)
jest.mock("fusion:consumer", () => (Component) => Component);

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({ arcSite: "test-site" })),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => null),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Stack: ({ children, className }) => <div className={className}>{children}</div>,
}));

// Mock child components by their actual relative paths
jest.mock("./search-field", () => () => <input aria-label="search" />);
jest.mock("./results-list", () => () => <ul />);

// GlobalSearchResultsList is a class component decorated with @Consumer.
// These tests verify it renders without throwing.
describe("GlobalSearchResultsList", () => {
	it("renders without throwing when given no globalContent", () => {
		const { default: GlobalSearchResultsList } = require("./global-content");
		expect(() => {
			render(<GlobalSearchResultsList arcSite="test-site" />);
		}).not.toThrow();
	});

	it("renders without throwing when given an encoded search query in globalContent", () => {
		// The component initialises state.value with decodeURI(props.globalContent.metadata.q)
		const { default: GlobalSearchResultsList } = require("./global-content");
		expect(() => {
			render(
				<GlobalSearchResultsList
					arcSite="test-site"
					globalContent={{ metadata: { q: "test%20value" } }}
				/>,
			);
		}).not.toThrow();
	});
});
