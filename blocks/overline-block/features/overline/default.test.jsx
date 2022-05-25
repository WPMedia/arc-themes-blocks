import React from "react";
import { useFusionContext } from "fusion:context";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Overline from "./default";

const mockContextObj = {
	arcSite: "site",
	globalContent: {
		_id: "12345",
		websites: {
			site: {
				website_section: {
					_id: "/news",
					name: "News",
				},
			},
		},
	},
};

jest.mock("fusion:properties", () => jest.fn(() => ({})));
jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => mockContextObj),
}));

jest.mock("fusion:content", () => ({
	useEditableContent: jest.fn(() => ({
		editableContent: jest.fn(() => {}),
	})),
}));

describe("overline feature for default output type", () => {
	describe("when website_section content from globalContent is present", () => {
		it("should render an a", () => {
			const { container } = render(<Overline />);
			expect(container.querySelectorAll("a")).toHaveLength(1);
		});

		it("should dangerously set the inner HTML to the website_section content", () => {
			const { container } = render(<Overline />);
			expect(container.querySelector("a").textContent).toContain("News");
		});

		it("should render only text if label do not have url", () => {
			const mockStory = {
				arcSite: "site",
				globalContent: {
					_id: "123456",
					label: {
						basic: {
							display: true,
							text: "label",
						},
					},
					websites: {
						site: {
							website_section: {
								_id: "/mock/",
								name: "Mock",
							},
						},
					},
				},
			};
			useFusionContext.mockImplementation(() => mockStory);
			const { container } = render(<Overline />);
			expect(container.querySelector("span").textContent).toContain(
				mockStory.globalContent.label.basic.text
			);
		});
	});

	describe("when label content from globalContent is present", () => {
		describe("when label.basic.display is true", () => {
			beforeEach(() => {
				const labelObj = {
					label: {
						basic: { display: true, text: "EXCLUSIVE", url: "/exclusive" },
					},
				};
				const contextObjWithLabel = {
					...mockContextObj,
					globalContent: {
						...labelObj,
						...mockContextObj.globalContent,
					},
				};
				useFusionContext.mockImplementation(() => contextObjWithLabel);
			});

			it("should display the label name instead of the website section name", () => {
				const { container } = render(<Overline />);
				expect(container.querySelector("a").textContent).toContain("EXCLUSIVE");
			});
		});

		describe("when label.basic.url is missing", () => {
			beforeEach(() => {
				const labelObj = {
					label: { basic: { display: true, text: "EXCLUSIVE" } },
				};
				const contextObjWithLabel = {
					...mockContextObj,
					globalContent: {
						...labelObj,
						...mockContextObj.globalContent,
					},
				};
				useFusionContext.mockImplementation(() => contextObjWithLabel);
			});

			it("should display the label name instead of the website section name", () => {
				const { container } = render(<Overline />);
				expect(container.querySelector("span").textContent).toContain("EXCLUSIVE");
			});

			it("should render as text", () => {
				const { container } = render(<Overline />);
				expect(container.querySelectorAll("span")).toHaveLength(1);
				expect(container.querySelectorAll("a")).toHaveLength(0);
			});
		});

		describe("when label.basic.url is empty", () => {
			beforeEach(() => {
				const labelObj = {
					label: { basic: { display: true, text: "EXCLUSIVE", url: "" } },
				};
				const contextObjWithLabel = {
					...mockContextObj,
					globalContent: {
						...labelObj,
						...mockContextObj.globalContent,
					},
				};
				useFusionContext.mockImplementation(() => contextObjWithLabel);
			});

			it("should display the label name instead of the website section name", () => {
				const { container } = render(<Overline />);
				expect(container.querySelector("span").textContent).toContain("EXCLUSIVE");
			});

			it("should render as text", () => {
				const { container } = render(<Overline />);
				expect(container.querySelectorAll("span")).toHaveLength(1);
				expect(container.querySelectorAll("a")).toHaveLength(0);
			});
		});

		describe("when label.basic.display is NOT true", () => {
			beforeEach(() => {
				const labelObj = {
					label: {
						basic: { display: false, text: "EXCLUSIVE", url: "/exclusive/" },
					},
				};
				const contextObjWithLabel = {
					...mockContextObj,
					globalContent: {
						...labelObj,
						...mockContextObj.globalContent,
					},
				};
				useFusionContext.mockImplementation(() => contextObjWithLabel);
			});

			it("should dangerously set the inner HTML to the website_section content", () => {
				const { container } = render(<Overline />);
				expect(container.querySelector("a").textContent).toContain("News");
			});
		});
	});

	describe("when headline content from globalContent is NOT present", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({}));
		});

		it("should not render anything", () => {
			const { container } = render(<Overline />);
			expect(container.querySelectorAll("span")).toHaveLength(0);
			expect(container.querySelectorAll("a")).toHaveLength(0);
		});
	});
});
