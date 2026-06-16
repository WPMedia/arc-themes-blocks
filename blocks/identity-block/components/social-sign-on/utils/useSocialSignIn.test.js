import { renderHook, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useIdentity } from "@wpmedia/arc-themes-components";
import useSocialSignIn from "./useSocialSignIn";

// Per-test mutable Identity state — must be `let` (not const) so tests can override it
let mockIdentity;

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({ Identity: mockIdentity })),
}));

jest.mock("./googleContext", () => {
	const React = require("react");
	// isGoogleLoaded: false prevents the Google sign-in effect from running
	// and attempting to call window.google.accounts which is not available in JSDOM.
	const GoogleSignInContext = React.createContext({ isGoogleLoaded: false });
	return { GoogleSignInContext };
});

jest.mock("../../../utils/useOIDCLogin", () => jest.fn(() => ({ loginByOIDC: jest.fn() })));

jest.mock("../../../utils/validate-redirect-url", () => jest.fn((url) => url));

beforeEach(() => {
	jest.clearAllMocks();

	mockIdentity = {
		facebookSignOn: jest.fn(() => Promise.resolve()),
		isLoggedIn: jest.fn(() => Promise.resolve(false)),
		initFacebookLogin: jest.fn(() => Promise.resolve()),
		signInWithGoogle: jest.fn(() => Promise.resolve()),
		getConfig: jest.fn(() => Promise.resolve()),
		configOptions: {
			facebookAppId: "fb-app-id",
			googleClientId: "google-client-id",
			teamId: "apple-team-id",
			keyId: "apple-key-id",
			urlToReceiveAuthToken: "https://example.com/auth",
			oidcClients: [],
		},
	};

	useIdentity.mockImplementation(() => ({ Identity: mockIdentity }));
});

describe("useSocialSignIn", () => {
	it("returns the expected shape from config", () => {
		const { result } = renderHook(() => useSocialSignIn("#", false, "signin"));

		expect(result.current).toMatchObject({
			facebookAppId: "fb-app-id",
			googleClientId: "google-client-id",
			appleTeamId: "apple-team-id",
			appleKeyId: "apple-key-id",
			appleUrlToReceiveAuthToken: "https://example.com/auth",
			oidcClients: [],
		});
	});

	it("does NOT call Identity.getConfig when configOptions is already set", () => {
		renderHook(() => useSocialSignIn("#", false, "signin"));

		// configOptions is set, so getConfig should NOT be called
		expect(mockIdentity.getConfig).not.toHaveBeenCalled();
	});

	it("calls Identity.getConfig when configOptions is null/undefined", async () => {
		mockIdentity.configOptions = null;
		useIdentity.mockImplementation(() => ({ Identity: mockIdentity }));

		// After getConfig runs, set configOptions so the hook can pick it up
		mockIdentity.getConfig.mockImplementation(async () => {
			mockIdentity.configOptions = {
				facebookAppId: "fetched-fb-id",
				googleClientId: "fetched-google-id",
			};
		});

		renderHook(() => useSocialSignIn("#", false, "signin"));

		await waitFor(() => expect(mockIdentity.getConfig).toHaveBeenCalled());
	});

	it("returns undefined config values when configOptions is null/undefined", () => {
		mockIdentity.configOptions = null;
		mockIdentity.getConfig = jest.fn(() => Promise.resolve());
		useIdentity.mockImplementation(() => ({ Identity: mockIdentity }));

		const { result } = renderHook(() => useSocialSignIn("#", false, "signin"));

		// Initial render: config initialised as {} because configOptions is null
		expect(result.current.facebookAppId).toBeUndefined();
		expect(result.current.googleClientId).toBeUndefined();
	});
});
