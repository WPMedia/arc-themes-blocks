import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResultsListContainer from "./default";

jest.mock("./_children/global-content", () => {
	const MockGlobal = () => <div data-testid="global-content-search" />;
	return MockGlobal;
});

jest.mock("./_children/custom-content", () => {
	const MockCustom = () => <div data-testid="custom-content-search" />;
	return MockCustom;
});

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({ arcSite: "the-sun", isAdmin: false })),
}));

let mockIsServerSide = false;

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => mockIsServerSide),
	LazyLoad: ({ children }) => children,
	HeadingSection: ({ children }) => children,
}));

describe("the search results list feature block", () => {
	it("renders the global content search list when inheritGlobalContent is true", () => {
		render(<SearchResultsListContainer customFields={{ inheritGlobalContent: true }} />);
		expect(screen.getByTestId("global-content-search")).toBeInTheDocument();
	});

	it("renders the custom content search list when inheritGlobalContent is false", () => {
		render(<SearchResultsListContainer customFields={{ inheritGlobalContent: false }} />);
		expect(screen.getByTestId("custom-content-search")).toBeInTheDocument();
	});

	it("defaults to global content when customFields is empty", () => {
		render(<SearchResultsListContainer customFields={{}} />);
		expect(screen.getByTestId("global-content-search")).toBeInTheDocument();
	});

	it("defaults to global content when customFields is undefined", () => {
		render(<SearchResultsListContainer customFields={undefined} />);
		expect(screen.getByTestId("global-content-search")).toBeInTheDocument();
	});


	it("renders null when lazyLoad is true and server-side", () => {
		mockIsServerSide = true;
		const { container } = render(
			<SearchResultsListContainer customFields={{ lazyLoad: true }} />,
		);
		mockIsServerSide = false;
		expect(container).toBeEmptyDOMElement();
	});

	it("passes customSearchAction to GlobalContentSearch when provided", () => {
		const mockSearchAction = jest.fn();
		render(
			<SearchResultsListContainer
				customFields={{ inheritGlobalContent: true }}
				customSearchAction={mockSearchAction}
			/>,
		);
		expect(screen.getByTestId("global-content-search")).toBeInTheDocument();
	});

	it("passes globalContent from customFields to GlobalContentSearch when present", () => {
		const fakeGlobalContent = { _id: "fake-content" };
		render(
			<SearchResultsListContainer
				customFields={{ inheritGlobalContent: true, globalContent: fakeGlobalContent }}
			/>,
		);
		expect(screen.getByTestId("global-content-search")).toBeInTheDocument();
	});
});
