import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// @Consumer provides fetchContent to class components; stub it so the constructor doesn't throw.
jest.mock("fusion:consumer", () => (Component) => {
	// eslint-disable-next-line no-param-reassign
	Component.prototype.fetchContent = jest.fn(() => Promise.resolve({}));
	return Component;
});

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

// CustomSearchResultsList is a class component decorated with @Consumer.
// It expects a customFields.searchContentConfig prop so the constructor can initialise.
describe("CustomSearchResultsList", () => {
	it("renders without throwing when given a searchContentConfig customField", () => {
		const { default: CustomSearchResultsList } = require("./custom-content");
		expect(() => {
			render(
				<CustomSearchResultsList
					arcSite="test-site"
					customFields={{
						searchContentConfig: {
							contentService: "search-api",
							contentConfigValues: { query: "" },
						},
					}}
				/>,
			);
		}).not.toThrow();
	});
});
