import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { isServerSide } from "@wpmedia/arc-themes-components";
import SubscriptionOverlay, { Portal } from ".";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
}));

// jsdom doesn't implement scrollingElement — provide a stub
const scrollingElementStub = {
	style: { overflow: "", maxHeight: "" },
	addEventListener: jest.fn(),
	removeEventListener: jest.fn(),
};

beforeAll(() => {
	Object.defineProperty(document, "scrollingElement", {
		get: () => scrollingElementStub,
		configurable: true,
	});
});

describe("SubscriptionOverlay", () => {
	beforeEach(() => {
		isServerSide.mockReturnValue(false);
		scrollingElementStub.addEventListener.mockClear();
		scrollingElementStub.removeEventListener.mockClear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("renders children inside the overlay section", () => {
		render(
			<SubscriptionOverlay usePortal={false} className="b-paywall">
				<div data-testid="child">Content</div>
			</SubscriptionOverlay>,
		);
		expect(screen.getByTestId("child")).not.toBeNull();
		expect(screen.getByRole("alert")).not.toBeNull();
	});

	it("renders children with correct class structure", () => {
		render(
			<SubscriptionOverlay usePortal={false} className="b-paywall">
				<span>test</span>
			</SubscriptionOverlay>,
		);
		expect(screen.getByRole("alert")).not.toBeNull();
		expect(screen.getByTestId("overlay-content")).not.toBeNull();
	});

	it("handles wheel events on overlay", () => {
		render(
			<SubscriptionOverlay usePortal={false} className="b-paywall">
				<div>Content</div>
			</SubscriptionOverlay>,
		);
		const overlay = screen.getByRole("alert");
		expect(() => {
			fireEvent.wheel(overlay, { deltaY: 10 });
		}).not.toThrow();
	});

	it("handles wheel events on content", () => {
		render(
			<SubscriptionOverlay usePortal={false} className="b-paywall">
				<div>Content</div>
			</SubscriptionOverlay>,
		);
		const content = screen.getByTestId("overlay-content");
		expect(() => {
			fireEvent.wheel(content, { deltaY: 5 });
		}).not.toThrow();
	});

	it("handles touch events on overlay", () => {
		render(
			<SubscriptionOverlay usePortal={false} className="b-paywall">
				<div>Content</div>
			</SubscriptionOverlay>,
		);
		const overlay = screen.getByRole("alert");
		expect(() => {
			fireEvent.touchStart(overlay, { changedTouches: [{ clientY: 100 }] });
			fireEvent.touchMove(overlay, { changedTouches: [{ clientY: 90 }] });
		}).not.toThrow();
	});

	it("handles touch events on content div", () => {
		render(
			<SubscriptionOverlay usePortal={false} className="b-paywall">
				<div>Content</div>
			</SubscriptionOverlay>,
		);
		const content = screen.getByTestId("overlay-content");
		expect(() => {
			fireEvent.touchStart(content, { changedTouches: [{ clientY: 100 }] });
			fireEvent.touchMove(content, { changedTouches: [{ clientY: 90 }] });
		}).not.toThrow();
	});

	it("registers and cleans up scroll event listener", () => {
		const { unmount } = render(
			<SubscriptionOverlay usePortal={false} className="b-paywall">
				<div>Content</div>
			</SubscriptionOverlay>,
		);
		expect(scrollingElementStub.addEventListener).toHaveBeenCalledWith(
			"scroll",
			expect.any(Function),
		);
		unmount();
		expect(scrollingElementStub.removeEventListener).toHaveBeenCalledWith(
			"scroll",
			expect.any(Function),
		);
	});

	it("renders using Portal when usePortal is true", () => {
		render(
			<SubscriptionOverlay usePortal className="b-paywall">
				<div data-testid="portal-child">Portal Content</div>
			</SubscriptionOverlay>,
		);
		expect(screen.getByTestId("portal-child")).not.toBeNull();
	});
});

describe("Portal", () => {
	beforeEach(() => {
		isServerSide.mockReturnValue(false);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("renders null when server-side", () => {
		isServerSide.mockReturnValue(true);
		const { container } = render(
			<Portal>
				<div>test</div>
			</Portal>,
		);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders children via portal when client-side", () => {
		render(
			<Portal>
				<div data-testid="portal-content">In Portal</div>
			</Portal>,
		);
		expect(screen.getByTestId("portal-content")).not.toBeNull();
	});
});
