import { renderHook, waitFor } from "@testing-library/react";

import useIdentity from "../use-identity";
import useSales from "../use-sales";
import useRecaptcha from ".";

jest.mock("node-fetch", () => jest.fn());

jest.mock("../use-identity");
jest.mock("../use-sales");

const mockLogin = jest.fn(() => Promise.resolve());

jest.mock("@arc-publishing/sdk-identity", () => ({
	__esModule: true,
	default: {
		apiOrigin: "",
		options: jest.fn(),
	},
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		// arcSite
		api: {
			identity: {
				origin: "http://origin/",
			},
		},
	})),
);

jest.mock("fusion:context", () => ({
	__esModule: true,
	useFusionContext: () => ({
		arcSite: "Test Site",
	}),
}));

jest.mock("node-fetch", () => ({}));

const mockSales = {
	getConfig: jest.fn(() => ({
		checkoutRecaptchaEnabled: true,
	})),
};

const mockIdentity = {
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({
		recaptchaSiteKey: "recaptchaSiteKey",
		recaptchaScore: "0.7",
		signupRecaptcha: true,
		signinRecaptcha: true,
		magicLinkRecaptcha: true,
	})),
	login: mockLogin,
};

describe("useRecaptcha", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it.only("returns V3 enabled values when challengeIn is signin", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));

		useSales.mockImplementation(() => ({
			isInitialized: true,
			Sales: {
				...mockSales,
			},
		}));

		const { result } = renderHook(() => useRecaptcha("signin"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual("V3"));
		await waitFor(() => expect(result.current.siteKey).toEqual("recaptchaSiteKey"));
		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(true));
	});

	it.only("returns V2 enabled values when challengeIn is signin", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				getConfig: jest.fn(() => ({
					recaptchaSiteKey: "recaptchaSiteKey",
					recaptchaScore: "-1",
					signupRecaptcha: true,
					signinRecaptcha: true,
					magicLinkRecaptcha: true,
				})),
			},
		}));

		useSales.mockImplementation(() => ({
			isInitialized: true,
			Sales: {
				...mockSales,
			},
		}));

		const { result } = renderHook(() => useRecaptcha("signin"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual("V2"));
		await waitFor(() => expect(result.current.siteKey).toEqual("recaptchaSiteKey"));
		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(true));
	});

	it.only("returns V3 enabled when challengeIn is signup", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));

		useSales.mockImplementation(() => ({
			isInitialized: true,
			Sales: {
				...mockSales,
			},
		}));

		const { result } = renderHook(() => useRecaptcha("signup"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual("V3"));
		await waitFor(() => expect(result.current.siteKey).toEqual("recaptchaSiteKey"));
		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(true));
	});

	it.only("returns V3 enabled when challengeIn is checkout", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));

		useSales.mockImplementation(() => ({
			isInitialized: true,
			Sales: {
				...mockSales,
			},
		}));

		const { result } = renderHook(() => useRecaptcha("checkout"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual("V3"));
		await waitFor(() => expect(result.current.siteKey).toEqual("recaptchaSiteKey"));
		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(true));
	});

	it.only("returns V3 enabled when challengeIn is magicLink", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));

		useSales.mockImplementation(() => ({
			isInitialized: true,
			Sales: {
				...mockSales,
			},
		}));

		const { result } = renderHook(() => useRecaptcha("magicLink"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual("V3"));
		await waitFor(() => expect(result.current.siteKey).toEqual("recaptchaSiteKey"));
		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(true));
	});

	it.only("returns V3 disabled  when challengeIn for signin is false", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				getConfig: jest.fn(() => ({
					recaptchaSiteKey: "recaptchaSiteKey",
					recaptchaScore: "0.7",
					signupRecaptcha: true,
					signinRecaptcha: false,
					magicLinkRecaptcha: true,
				})),
			},
		}));

		useSales.mockImplementation(() => ({
			isInitialized: true,
			Sales: {
				...mockSales,
			},
		}));

		const { result } = renderHook(() => useRecaptcha("signin"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual(undefined));
		await waitFor(() => expect(result.current.siteKey).toEqual(undefined));
		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(false));
	});
});
