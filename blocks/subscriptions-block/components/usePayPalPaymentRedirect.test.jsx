import { waitFor, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import usePayPalPaymentRedirect from "./usePayPalPaymentRedirect";
import { ARCXP_ORDERNUMBER } from "../utils/constants";

// ---- Mutable per-test hook state (must be prefixed with `mock` for jest.mock hoisting rules) ----
let mockIdentityState;
let mockSalesState;

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: { origin: "http://test" },
			sales: { origin: "http://test" },
			retail: { origin: "http://test", endpoint: "/retail/public/v1/offer/live/" },
		},
	})),
);

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),

	// IMPORTANT: Always return the *current* per-test state objects.
	useIdentity: jest.fn(() => mockIdentityState),
	useSales: jest.fn(() => mockSalesState),
}));

const paypal = { paymentMethodType: 10, paymentMethodID: 4339 };
const paypalToken = "12345";
const successURL = "/success/";
const loginURL = "/login/";

let href = "";

// Hook reads localStorage[ARCXP_ORDERNUMBER], not getItem()
// Ensure named property access works in JSDOM.
const setOrderNumber = (value) => {
	localStorage[ARCXP_ORDERNUMBER] = value;
	localStorage.setItem(ARCXP_ORDERNUMBER, value);
};

beforeEach(() => {
	jest.clearAllMocks();
	localStorage.clear();

	href = "";
	Object.defineProperty(window, "location", {
		value: {
			...window.location,
			get href() {
				return href;
			},
			set href(value) {
				href = value;
			},
		},
		writable: true,
	});

	// Default per-test states (can be overridden in each test)
	mockIdentityState = {
		Identity: {
			isLoggedIn: jest.fn(async () => true),
		},
	};

	mockSalesState = {
		Sales: {
			finalizePayment: jest.fn(async () => {}),
		},
	};
});

describe("usePayPalPaymentRedirect Hook", () => {
	test("returns isLoggedIn false and user is redirected to /login page", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => false),
			},
		};

		// IMPORTANT: do NOT set an order number in this test.
		renderHook(() =>
			usePayPalPaymentRedirect(paypal, paypalToken, successURL, loginURL),
		);

		await waitFor(() => expect(window.location.href).toBe("/login/"));
	});

	test("returns isLoggedIn true and user is redirected to /success page", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
			},
		};

		setOrderNumber("DPY0JRVDX0LIHOYO");

		renderHook(() =>
			usePayPalPaymentRedirect(paypal, paypalToken, successURL, loginURL),
		);

		await waitFor(() => expect(window.location.href).toBe("/success/"));
	});

	test("returns isLoggedIn true and user keeps on page, since finalize payment failed", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
			},
		};

		const err = Object.assign(new Error("finalize failed"), { code: 0 });
		const finalizePayment = jest.fn(() => Promise.reject(err));

		mockSalesState = {
			Sales: {
				finalizePayment,
			},
		};

		setOrderNumber("DPY0JRVDX0LIHOYO");

		const { result } = renderHook(() =>
			usePayPalPaymentRedirect(paypal, paypalToken, successURL, loginURL),
		);

		await waitFor(() => expect(finalizePayment).toHaveBeenCalled());
		await waitFor(() => expect(result.current.error).toBe(err));
		await waitFor(() => expect(result.current.isCheckingPaypal).toBe(false));

		expect(window.location.href).toBe("");
	});
});
