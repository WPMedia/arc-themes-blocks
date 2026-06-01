import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAppContext } from "fusion:context";
import RightRailAdvancedLayout from "./default";

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
	{ collection: "sections", props: { id: 6 }, children: [1] },
	{ collection: "sections", props: { id: 7 }, children: [1] },
	{ collection: "sections", props: { id: 8 }, children: [1] },
	{ collection: "sections", props: { id: 9 }, children: [1] },
	{ collection: "feature", props: { id: 99 }, children: [0] },
];

const renderablesFewerItems = [
	{ collection: "sections", props: { id: 0 }, children: [1] },
	{ collection: "sections", props: { id: 1 }, children: [1] },
	{ collection: "sections", props: { id: 2 }, children: [1] },
	{ collection: "sections", props: { id: 3 }, children: [] },
	{ collection: "sections", props: { id: 4 }, children: [1] },
	{ collection: "sections", props: { id: 5 }, children: [] },
	{ collection: "sections", props: { id: 6 }, children: [] },
];

describe("the right rail advanced layout", () => {
	it("places navigation content into the header", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		render(
			<RightRailAdvancedLayout>
				<div>navigation content</div>
			</RightRailAdvancedLayout>,
		);
		expect(screen.getByRole("banner")).toHaveTextContent("navigation content");
	});

	it("places footer content into the footer", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		render(
			<RightRailAdvancedLayout>
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div>footer content</div>
			</RightRailAdvancedLayout>,
		);
		expect(screen.getByRole("contentinfo")).toHaveTextContent("footer content");
	});

	it("does not apply empty class to main interior item when both main sections have items", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		const { container } = render(<RightRailAdvancedLayout />);
		const mainItem = container.querySelector(".b-right-rail-advanced__main-interior-item");
		expect(mainItem).not.toHaveClass("b-right-rail-advanced__empty");
	});

	it("applies empty class to main interior item when fewer than 2 main sections have items", () => {
		useAppContext.mockReturnValue({ renderables: renderablesFewerItems });
		const { container } = render(<RightRailAdvancedLayout />);
		const mainItem = container.querySelector(".b-right-rail-advanced__main-interior-item");
		expect(mainItem).toHaveClass("b-right-rail-advanced__empty");
	});

	it("applies empty class to right rail when fewer than 2 right rail sections have items", () => {
		useAppContext.mockReturnValue({ renderables: renderablesFewerItems });
		const { container } = render(<RightRailAdvancedLayout />);
		const rightRail = container.querySelector(".b-right-rail-advanced__main-right-rail");
		expect(rightRail).toHaveClass("b-right-rail-advanced__empty");
	});
});
