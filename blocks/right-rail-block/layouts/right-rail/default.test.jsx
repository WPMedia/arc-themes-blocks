import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAppContext } from "fusion:context";
import RightRailLayout from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	Stack: ({ children, className, as: Tag = "div" }) => (
		<Tag className={className}>{children}</Tag>
	),
	Grid: ({ children, className }) => <div className={className}>{children}</div>,
}));

const allRenderables = [
	{ collection: "sections", props: { id: 0 }, children: [1] },
	{ collection: "sections", props: { id: 1 }, children: [1] },
	{ collection: "sections", props: { id: 2 }, children: [1] },
	{ collection: "sections", props: { id: 3 }, children: [1] },
	{ collection: "sections", props: { id: 4 }, children: [1] },
	{ collection: "sections", props: { id: 5 }, children: [1] },
	{ collection: "feature", props: { id: 99 }, children: [0] },
];

const renderablesNoFullWidth2 = [
	{ collection: "sections", props: { id: 0 }, children: [1] },
	{ collection: "sections", props: { id: 1 }, children: [1] },
	{ collection: "sections", props: { id: 2 }, children: [1] },
	{ collection: "sections", props: { id: 3 }, children: [1] },
	{ collection: "sections", props: { id: 4 }, children: [] },
	{ collection: "sections", props: { id: 5 }, children: [1] },
];

describe("the right rail layout", () => {
	it("places navigation content into the header", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		render(
			<RightRailLayout>
				<div>navigation content</div>
				<div />
				<div />
				<div />
				<div />
				<div />
			</RightRailLayout>,
		);
		expect(screen.getByRole("banner")).toHaveTextContent("navigation content");
	});

	it("shows the fullWidth2 section when it has children in renderables", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		render(
			<RightRailLayout>
				<div />
				<div />
				<div />
				<div />
				<div>fullwidth2 content</div>
				<div />
			</RightRailLayout>,
		);
		expect(screen.getByText("fullwidth2 content")).toBeInTheDocument();
	});

	it("hides the fullWidth2 section when section 4 has no children", () => {
		useAppContext.mockReturnValue({ renderables: renderablesNoFullWidth2 });
		render(
			<RightRailLayout>
				<div />
				<div />
				<div />
				<div />
				<div>fullwidth2 content</div>
				<div />
			</RightRailLayout>,
		);
		expect(screen.queryByText("fullwidth2 content")).not.toBeInTheDocument();
	});

	it("does not render a navigation element when no navigation child is provided", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		render(<RightRailLayout />);
		expect(screen.queryByRole("banner")).not.toBeInTheDocument();
	});

	it("renders footer content", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		render(
			<RightRailLayout>
				<div />
				<div />
				<div />
				<div />
				<div />
				<div>footer content</div>
			</RightRailLayout>,
		);
		expect(screen.getByRole("contentinfo")).toHaveTextContent("footer content");
	});
});
