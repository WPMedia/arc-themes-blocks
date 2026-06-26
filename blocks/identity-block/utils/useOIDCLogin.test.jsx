import React from "react";
import { act, render } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";

import useOIDCLogin from "./useOIDCLogin";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(),
}));

const TestComponent = ({ onResult }) => {
	const result = useOIDCLogin();
	onResult(result);
	return null;
};

describe("useOIDCLogin", () => {
	let originalLocation;

	beforeEach(() => {
		useIdentity.mockReturnValue({
			Identity: {
				loginWithArcIdentityAsOIDCProvider: jest.fn(() => Promise.resolve({ redirectUri: "/callback" })),
			},
			isInitialized: true,
		});
		originalLocation = window.location;
		delete window.location;
		window.location = { href: "https://example.com/login?response_type=code&scope=openid&state=abc&client_id=client1&redirect_uri=/callback&nonce=nonce1" };
	});

	afterEach(() => {
		jest.clearAllMocks();
		window.location = originalLocation;
	});

	it("returns loginByOIDC function", () => {
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} />);
		expect(typeof onResult.mock.calls[0][0].loginByOIDC).toBe("function");
	});

	it("calls Identity.loginWithArcIdentityAsOIDCProvider with query params", async () => {
		const loginWithArcIdentityAsOIDCProvider = jest.fn(() => Promise.resolve({}));
		useIdentity.mockReturnValue({
			Identity: { loginWithArcIdentityAsOIDCProvider },
			isInitialized: true,
		});
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} />);
		await act(async () => {
			await onResult.mock.calls[0][0].loginByOIDC();
		});
		expect(loginWithArcIdentityAsOIDCProvider).toHaveBeenCalled();
		const callArgs = loginWithArcIdentityAsOIDCProvider.mock.calls[0][0];
		expect(callArgs.response_type).toBe("code");
		expect(callArgs.scope).toBe("openid");
		expect(callArgs.state).toBe("abc");
	});

	it("filters out null/undefined query params", async () => {
		window.location = { href: "https://example.com/login?response_type=code" };
		const loginWithArcIdentityAsOIDCProvider = jest.fn(() => Promise.resolve({}));
		useIdentity.mockReturnValue({
			Identity: { loginWithArcIdentityAsOIDCProvider },
			isInitialized: true,
		});
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} />);
		await act(async () => {
			await onResult.mock.calls[0][0].loginByOIDC();
		});
		const callArgs = loginWithArcIdentityAsOIDCProvider.mock.calls[0][0];
		expect(callArgs.scope).toBeUndefined();
		expect(callArgs.response_type).toBe("code");
	});

	it("returns the error when loginWithArcIdentityAsOIDCProvider throws", async () => {
		const error = new Error("OIDC error");
		useIdentity.mockReturnValue({
			Identity: { loginWithArcIdentityAsOIDCProvider: jest.fn(() => Promise.reject(error)) },
			isInitialized: true,
		});
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} />);
		let result;
		await act(async () => {
			result = await onResult.mock.calls[0][0].loginByOIDC();
		});
		expect(result).toBe(error);
	});
});
