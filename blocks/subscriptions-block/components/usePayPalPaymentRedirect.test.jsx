import { waitFor, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import usePayPalPaymentRedirect from "./usePayPalPaymentRedirect";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: {
				origin: "http://test",
			},
			sales: {
				origin: "http://test",
			},
			retail: {
				origin: "http://test",
				endpoint: "/retail/public/v1/offer/live/",
			},
		},
	})),
);

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			finalizePayment: jest.fn(async () => {}),
		},
	})),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		// Identity: {
		// 	isLoggedIn: jest.fn(() => false),
		// },
	})),
}));

const paypal = {
	paymentMethodType: 10,
	paymentMethodID: 4339,
};
const paypalToken = "12345";
const successURL = "/success/";
const loginURL = "/login/";

let href = "";
		delete window.location;
		window.location = {
			set href(value) {
				href = value;
			},
			get href() {
				return href;
			},
		};

describe("usePayPalPaymentRedirect Hook", () => {
	test("returns isLoggedIn false and user is redirected to /login page", async () => {

        jest.spyOn(require("@wpmedia/arc-themes-components"), "useIdentity").mockReturnValue({
			Identity: {
				isLoggedIn: jest.fn(() => false),
			},
		});

		localStorage.setItem("ArcXP_orderNumber", "DPY0JRVDX0LIHOYO");

		const { result } = renderHook(() =>
			usePayPalPaymentRedirect(paypal, paypalToken, successURL, loginURL),
		);

		expect(result.current.error).toBe(undefined);
		expect(result.current.isCheckingPaypal).toBe(false);

        await waitFor(() => {
            expect(window.location.href).toBe("/login/");
        });
	});

    test("returns isLoggedIn true and user is redirected to /success page", async () => {

        jest.spyOn(require("@wpmedia/arc-themes-components"), "useIdentity").mockReturnValue({
			Identity: {
				isLoggedIn: jest.fn(() => true),
			},
		});

		localStorage.setItem("ArcXP_orderNumber", "DPY0JRVDX0LIHOYO");

		const { result } = renderHook(() =>
			usePayPalPaymentRedirect(paypal, paypalToken, successURL, loginURL),
		);

		expect(result.current.error).toBe(undefined);
		expect(result.current.isCheckingPaypal).toBe(false);

        await waitFor(() => {
            expect(window.location.href).toBe("/success/");
        });
	});

    test("returns isLoggedIn true and user keeps on page, since finalize payment failed", async () => {

        jest.spyOn(require("@wpmedia/arc-themes-components"), "useIdentity").mockReturnValue({
			Identity: {
				isLoggedIn: jest.fn(() => true),
			},
		});

        jest.spyOn(require("@wpmedia/arc-themes-components"), "useSales").mockReturnValue({
			Sales: {
                isInitialized: true,
				finalizePayment: jest.fn(() => Promise.reject(new Error({code: 0})))
			},
		});

		localStorage.setItem("ArcXP_orderNumber", "DPY0JRVDX0LIHOYO");

		const { result } = renderHook(() =>
			usePayPalPaymentRedirect(paypal, paypalToken, successURL, loginURL),
		);

		expect(result.current.error).toBe(undefined);
		expect(result.current.isCheckingPaypal).toBe(false);

        await waitFor(() => {
            expect(result.current.error).toEqual(new Error({ code: 0 }));
        });

	});
});
