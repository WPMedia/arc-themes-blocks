import { renderHook, waitFor } from "@testing-library/react";

import usePaymentOptions, { getPaymentMethodByID } from "./usePaymentOptions";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			sales: {
				origin: "http://origin/",
			},
		},
	})),
);

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			getPaymentOptions: jest.fn().mockResolvedValue([
                { paymentMethodID: 4336, paymentMethodType: 18 },
                { paymentMethodID: 4339, paymentMethodType: 10 },
                { paymentMethodID: 4340, paymentMethodType: 18 },
            ]),
		},
	}))
}));

describe("Identity usePaymentOptions Hook", () => {
	test("returns correct payment option for Stripe", () => {
		const paymentOptions = [
			{ paymentMethodID: 4336, paymentMethodType: 18 },
			{ paymentMethodID: 4339, paymentMethodType: 10 },
			{ paymentMethodID: 4340, paymentMethodType: 18 },
		];
		const result = getPaymentMethodByID(paymentOptions, 18, 4340);
		expect(result).toEqual({ paymentMethodID: 4340, paymentMethodType: 18 });

		const result2 = getPaymentMethodByID(paymentOptions, 18, 4336);
		expect(result2).toEqual({ paymentMethodID: 4336, paymentMethodType: 18 });

		const result3 = getPaymentMethodByID(paymentOptions, 18, 49390);
		expect(result3).toEqual({ paymentMethodID: 4336, paymentMethodType: 18 });

		const result4 = getPaymentMethodByID(paymentOptions, 18, undefined);
		expect(result4).toEqual({ paymentMethodID: 4336, paymentMethodType: 18 });
	});

	test("returns payment option with min paymentMethodID for Stripe", () => {
		const paymentOptions = [
			{ paymentMethodID: 4336, paymentMethodType: 18 },
			{ paymentMethodID: 4339, paymentMethodType: 10 },
			{ paymentMethodID: 4340, paymentMethodType: 18 },
		];
		const result3 = getPaymentMethodByID(paymentOptions, 18, 49390);
		expect(result3).toEqual({ paymentMethodID: 4336, paymentMethodType: 18 });

		const result4 = getPaymentMethodByID(paymentOptions, 18, undefined);
		expect(result4).toEqual({ paymentMethodID: 4336, paymentMethodType: 18 });
	});

	test("returns correct payment option for PayPal", () => {
		const paymentOptions = [
			{ paymentMethodID: 4336, paymentMethodType: 18 },
			{ paymentMethodID: 4339, paymentMethodType: 10 },
			{ paymentMethodID: 4340, paymentMethodType: 18 },
		];
		const result = getPaymentMethodByID(paymentOptions, 10);
		expect(result).toEqual({ paymentMethodID: 4339, paymentMethodType: 10 });
	});
});

describe("usePaymentOptions hook", () => {
	test("returns payment options correctly", async () => {
		const { result } = renderHook(() => usePaymentOptions(4336));

        expect(result.current.stripeIntents).toBe(undefined);
		expect(result.current.paypal).toBe(undefined);
		expect(result.current.error).toBe(undefined);
        expect(result.current.isFetching).toBe(true);

		await waitFor(() => expect(result.current.stripeIntents).toEqual({ paymentMethodID: 4336, paymentMethodType: 18 }));
        await waitFor(() => expect(result.current.paypal).toEqual({ paymentMethodID: 4339, paymentMethodType: 10 }));
        await waitFor(() => expect(result.current.error).toEqual(undefined));
		await waitFor(() => expect(result.current.isFetching).toEqual(false));
	});
});
