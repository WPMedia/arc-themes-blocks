import React from "react";
import { render, screen } from "@testing-library/react";
import { useContent } from "fusion:content";
import { useAppContext } from "fusion:context";

import SectionTitleContainer from "./default";

import { mockNoChildren, mockOneSection, mockTwoSectionWithUrl } from "./mock-data";

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => mockOneSection),
}));

describe("Section Title", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("should return null if no content", () => {
		const config = {
			sectionContentConfig: {},
		};
		useContent.mockReturnValueOnce(null);
		useAppContext.mockReturnValue({});

		const { container } = render(<SectionTitleContainer customFields={config} />);
		expect(container.firstChild).toBe(null);
	});

	it("should display section display name from global content", () => {
		const config = {};
		useAppContext.mockReturnValue({ globalContent: mockOneSection });

		render(<SectionTitleContainer customFields={config} />);

		expect(screen.queryByRole("heading", { name: "Section Title" })).not.toBeNull();
	});

	it("should display section display name from content", () => {
		const config = {
			sectionContentConfig: {},
			inheritGlobalContent: false,
		};
		useContent.mockReturnValue(mockOneSection);

		render(<SectionTitleContainer customFields={config} />);

		expect(screen.queryByRole("heading", { name: "Section Title" })).not.toBeNull();
	});

	it("should display only section display name from content", () => {
		const config = {
			sectionContentConfig: {},
			inheritGlobalContent: false,
		};
		useContent.mockReturnValue(mockNoChildren);

		render(<SectionTitleContainer customFields={config} />);

		expect(screen.queryByRole("heading", { name: "Section Title Display Name" })).not.toBeNull();
		expect(screen.queryByRole("link")).toBeNull();
	});

	it("should display section display name and link", () => {
		const config = {
			sectionContentConfig: {},
			inheritGlobalContent: false,
		};
		useContent.mockReturnValue(mockOneSection);

		render(<SectionTitleContainer customFields={config} />);

		expect(screen.queryByRole("heading", { name: "Section Title" })).not.toBeNull();
		expect(screen.queryByRole("link")).not.toBeNull();
	});

	it("should display section display name and links", () => {
		const config = {
			sectionContentConfig: {},
			inheritGlobalContent: false,
		};
		useContent.mockReturnValue(mockTwoSectionWithUrl);

		render(<SectionTitleContainer customFields={config} />);

		expect(screen.queryByRole("heading", { name: "Section Title" })).not.toBeNull();
		expect(screen.queryAllByRole("link")).not.toBeNull();

		expect(screen.queryByRole("link", { name: "News" })).not.toBeNull();
		expect(screen.queryByRole("link", { name: "Sports" })).not.toBeNull();
	});
});
