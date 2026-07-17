import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFusionContext } from "fusion:context";
import SubHeadline, { SubHeadlinePresentation } from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	Heading: ({ className, dangerouslySetInnerHTML }) => (
		<h2 className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
	),
	HeadingSection: ({ children }) => <div>{children}</div>,
}));

describe("SubHeadlinePresentation", () => {
	it("renders subheadlines.basic content by default", () => {
		render(
			<SubHeadlinePresentation
				content={{ subheadlines: { basic: "subheadline for our story" } }}
			/>,
		);
		expect(screen.getByRole("heading")).toHaveTextContent("subheadline for our story");
	});

	it("renders description.basic when valueToDisplay is Description", () => {
		render(
			<SubHeadlinePresentation
				content={{
					description: { basic: "description for our story" },
					subheadlines: { basic: "subheadline for our story" },
				}}
				valueToDisplay="Description"
			/>,
		);
		expect(screen.getByRole("heading")).toHaveTextContent("description for our story");
	});

	it("renders subheadlines.basic when valueToDisplay is Subheadline", () => {
		render(
			<SubHeadlinePresentation
				content={{
					description: { basic: "description for our story" },
					subheadlines: { basic: "subheadline for our story" },
				}}
				valueToDisplay="Subheadline"
			/>,
		);
		expect(screen.getByRole("heading")).toHaveTextContent("subheadline for our story");
	});

	it("renders nothing when content has no matching value", () => {
		const { container } = render(<SubHeadlinePresentation content={{}} />);
		expect(container).toBeEmptyDOMElement();
	});
});

describe("SubHeadline (Fusion-connected)", () => {
	it("renders with content from useFusionContext", () => {
		useFusionContext.mockReturnValueOnce({
			globalContent: { subheadlines: { basic: "Fusion subheadline" } },
			customFields: {},
		});
		render(<SubHeadline />);
		expect(screen.getByRole("heading")).toHaveTextContent("Fusion subheadline");
	});

	it("uses customFields.valueToDisplay when provided", () => {
		useFusionContext.mockReturnValueOnce({
			globalContent: {
				description: { basic: "desc from context" },
				subheadlines: { basic: "sub from context" },
			},
			customFields: { valueToDisplay: "Description" },
		});
		render(<SubHeadline />);
		expect(screen.getByRole("heading")).toHaveTextContent("desc from context");
	});
});
