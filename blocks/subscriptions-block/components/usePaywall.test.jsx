import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import { useIdentity, isServerSide } from "@wpmedia/arc-themes-components";
import { useFusionContext } from "fusion:context";

import usePaywall from "./usePaywall";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
	useIdentity: jest.fn(),
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: { retail: { origin: "https://api.example.com" } },
	})),
);

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "test-site",
		globalContent: {
			canonical_url: "/story/test",
			content_restrictions: { content_code: "premium" },
			type: "story",
			taxonomy: { primary_section: { _id: "/news" } },
		},
	})),
}));

const TestComponent = ({ onResult }) => {
	const result = usePaywall();
	onResult(result);
	return null;
};

const defaultFusionContext = {
	arcSite: "test-site",
	globalContent: {
		canonical_url: "/story/test",
		content_restrictions: { content_code: "premium" },
		type: "story",
		taxonomy: { primary_section: { _id: "/news" } },
	},
};

describe("usePaywall", () => {
	beforeEach(() => {
		isServerSide.mockReturnValue(false);
		useIdentity.mockReturnValue({
			Identity: { isLoggedIn: jest.fn(() => Promise.resolve(false)) },
			isInitialized: true,
		});
		useFusionContext.mockReturnValue(defaultFusionContext);
		window.ArcP = undefined;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns server-side state when isServerSide is true", () => {
		isServerSide.mockReturnValue(true);
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} />);
		const result = onResult.mock.calls[0][0];
		expect(result.isPaywalled).toBe(false);
		expect(result.isRegisterwalled).toBe(false);
		expect(result.campaignCode).toBeUndefined();
	});

	it("returns non-paywalled state by default", async () => {
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} />);
		await waitFor(() => {
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.isPaywalled).toBe(false);
		});
	});

	it("checks isLoggedIn when identity is initialized", async () => {
		const isLoggedInMock = jest.fn(() => Promise.resolve(true));
		useIdentity.mockReturnValue({
			Identity: { isLoggedIn: isLoggedInMock },
			isInitialized: true,
		});
		render(<TestComponent onResult={jest.fn()} />);
		await waitFor(() => expect(isLoggedInMock).toHaveBeenCalled());
	});

	it("does not check isLoggedIn when identity is not initialized", async () => {
		const isLoggedInMock = jest.fn(() => Promise.resolve(false));
		useIdentity.mockReturnValue({
			Identity: { isLoggedIn: isLoggedInMock },
			isInitialized: false,
		});
		render(<TestComponent onResult={jest.fn()} />);
		await waitFor(() => expect(isLoggedInMock).not.toHaveBeenCalled());
	});

	it("calls ArcP.run when all conditions are met", async () => {
		const arcPRunMock = jest.fn(() => Promise.resolve({ triggered: null }));
		window.ArcP = { run: arcPRunMock };
		render(<TestComponent onResult={jest.fn()} />);
		await waitFor(() => expect(arcPRunMock).toHaveBeenCalled());
	});

	it("sets isPaywalled when ArcP paywallFunction is called", async () => {
		let paywallFn;
		const arcPRunMock = jest.fn((opts) => {
			paywallFn = opts.paywallFunction;
			return Promise.resolve({ triggered: null });
		});
		window.ArcP = { run: arcPRunMock };
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} />);
		await waitFor(() => expect(arcPRunMock).toHaveBeenCalled());
		if (paywallFn) {
			await act(async () => { paywallFn("campaign-123"); });
		}
		const lastResult = onResult.mock.calls[onResult.mock.calls.length - 1][0];
		if (paywallFn) {
			expect(lastResult.isPaywalled).toBe(true);
		}
	});

	it("returns isLoggedIn in the result", async () => {
		useIdentity.mockReturnValue({
			Identity: { isLoggedIn: jest.fn(() => Promise.resolve(true)) },
			isInitialized: true,
		});
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} />);
		await waitFor(() => {
			const lastResult = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(lastResult.isLoggedIn).toBe(true);
		});
	});
});
