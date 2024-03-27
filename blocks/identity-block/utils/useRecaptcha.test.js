import React from "react";
import { waitFor, renderHook } from "@testing-library/react";
import useRecaptcha from "./useRecaptcha";
import { useIdentity } from "@wpmedia/arc-themes-components";

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

jest.mock("@arc-publishing/sdk-identity", () => ({
	__esModule: true,
	default: {
		apiOrigin: "",
		options: jest.fn(),
	},
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
			},
			retail: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
				endpoint: "/retail/public/v1/offer/live/",
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

const mockIdentity = {
	getConfig: jest.fn(() =>
		Promise.resolve({
			signupRecaptcha: true,
			signinRecaptcha: true,
            magicLinkRecaptcha: true,
			recaptchaScore: "-1",
			recaptchaSiteKey: "6LemcOMhAAAAAEGptytQEAMK_SfH4ZAGJ_e4652C",
		}),
	),
};

const mockSales = {
	getConfig: jest.fn(() =>
		Promise.resolve({
            checkoutRecaptchaEnabled: false,
		}),
	),
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			...mockIdentity,
		},
	})),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			...mockSales,
		},
	})),
}));

describe("useRecaptcha", () => {
	it("reCaptcha v2 enabled for signIn", async () => {
		const { result } = renderHook(() => useRecaptcha("signin"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual("V2"));

		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(true));

		await waitFor(() =>
			expect(result.current.siteKey).toEqual("6LemcOMhAAAAAEGptytQEAMK_SfH4ZAGJ_e4652C"),
		);
	});

    it("reCaptcha v2 enabled for signUp", async () => {
		const { result } = renderHook(() => useRecaptcha("signup"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual("V2"));

		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(true));

		await waitFor(() =>
			expect(result.current.siteKey).toEqual("6LemcOMhAAAAAEGptytQEAMK_SfH4ZAGJ_e4652C"),
		);
	});

    it("reCaptcha v2 enabled for magicLink", async () => {
		const { result } = renderHook(() => useRecaptcha("magicLink"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual("V2"));

		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(true));

		await waitFor(() =>
			expect(result.current.siteKey).toEqual("6LemcOMhAAAAAEGptytQEAMK_SfH4ZAGJ_e4652C"),
		);
	});

    it("reCaptcha v2 enabled for magicLink", async () => {
		const { result } = renderHook(() => useRecaptcha("magicLink"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual("V2"));

		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(true));

		await waitFor(() =>
			expect(result.current.siteKey).toEqual("6LemcOMhAAAAAEGptytQEAMK_SfH4ZAGJ_e4652C"),
		);
	});

    it("reCaptcha v2 disabled for signIn", async () => {

        useIdentity.mockReturnValueOnce({
            isInitialized: true,
            Identity: {
              getConfig: jest.fn(() =>
                Promise.resolve({
                  signupRecaptcha: false, // Change the mocked data here
                  signinRecaptcha: false,
                  magicLinkRecaptcha: false,
                  recaptchaScore: "-1",
                  recaptchaSiteKey: "6LemcOMhAAAAAEGptytQEAMK_SfH4ZAGJ_e4652C",
                }),
              ),
            },
          });

        const { result } = renderHook(() => useRecaptcha("signin"));

		expect(result.current.recaptchaVersion).toBe(undefined);
		expect(result.current.siteKey).toBe(undefined);
		expect(result.current.isRecaptchaEnabled).toBe(false);

		await waitFor(() => expect(result.current.recaptchaVersion).toEqual(undefined));

		await waitFor(() => expect(result.current.isRecaptchaEnabled).toEqual(false));

		await waitFor(() =>
			expect(result.current.siteKey).toEqual(undefined),
		);
	});
});
