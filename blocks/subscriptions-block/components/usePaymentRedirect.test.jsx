import React from "react";
import { act, render } from "@testing-library/react";
import useSales from "./useSales";
import { usePaymentRedirect } from "./usePaymentRedirect";

jest.mock("./useSales");
jest.mock("../features/checkout/default", () => ({
	LABEL_ORDER_NUMBER_PAYPAL: "paypal_order_number",
}));

const mockSales = {
	getOrderDetails: jest.fn(),
	initializePayment: jest.fn(),
	finalizePayment: jest.fn(),
};

const TestComponent = ({ onResult, ...props }) => {
	const result = usePaymentRedirect(
		props.paymentMethodType,
		props.orderNumber,
		props.token,
		props.redirectURLParameterName,
		props.successURL,
	);
	onResult(result);
	return null;
};

describe("usePaymentRedirect", () => {
	beforeEach(() => {
		useSales.mockReturnValue({ Sales: mockSales, isInitialized: true });
		delete window.location;
		window.location = { href: "" };
		localStorage.clear();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns no error initially when no orderNumber is provided", async () => {
		const onResult = jest.fn();
		await act(async () => {
			render(<TestComponent onResult={onResult} paymentMethodType={null} orderNumber={null} />);
		});
		const result = onResult.mock.calls[0][0];
		expect(result.error).toBeUndefined();
	});

	it("fetches order details when orderNumber and paymentMethodType are provided", async () => {
		mockSales.getOrderDetails.mockResolvedValue({ orderNumber: "ORD-001" });
		mockSales.initializePayment.mockResolvedValue({ parameter1: "/redirect" });

		const onResult = jest.fn();
		await act(async () => {
			render(
				<TestComponent
					onResult={onResult}
					paymentMethodType={{ paymentMethodID: "pm_test" }}
					orderNumber="ORD-001"
					successURL="/success"
				/>,
			);
		});
		expect(mockSales.getOrderDetails).toHaveBeenCalledWith("ORD-001");
	});

	it("sets error when getOrderDetails fails", async () => {
		const fetchError = new Error("Network error");
		mockSales.getOrderDetails.mockRejectedValue(fetchError);

		const onResult = jest.fn();
		await act(async () => {
			render(
				<TestComponent
					onResult={onResult}
					paymentMethodType={{ paymentMethodID: "pm_test" }}
					orderNumber="ORD-001"
					successURL="/success"
				/>,
			);
		});
		const lastResult = onResult.mock.calls[onResult.mock.calls.length - 1][0];
		expect(lastResult.error).toBe(fetchError);
	});

	it("initializes payment when token is not provided", async () => {
		mockSales.getOrderDetails.mockResolvedValue({ orderNumber: "ORD-001" });
		mockSales.initializePayment.mockResolvedValue({ parameter1: "/payment-page" });

		await act(async () => {
			render(
				<TestComponent
					onResult={jest.fn()}
					paymentMethodType={{ paymentMethodID: "pm_test" }}
					orderNumber="ORD-001"
					successURL="/success"
				/>,
			);
		});
		expect(mockSales.initializePayment).toHaveBeenCalled();
	});

	it("finalizes payment when token is provided", async () => {
		mockSales.getOrderDetails.mockResolvedValue({ orderNumber: "ORD-001" });
		mockSales.finalizePayment.mockResolvedValue({ status: "Paid" });

		await act(async () => {
			render(
				<TestComponent
					onResult={jest.fn()}
					paymentMethodType={{ paymentMethodID: "pm_test" }}
					orderNumber="ORD-001"
					token="TOKEN-123"
					successURL="/success"
				/>,
			);
		});
		expect(mockSales.finalizePayment).toHaveBeenCalled();
	});

	it("sets error when initializePayment throws", async () => {
		mockSales.getOrderDetails.mockResolvedValue({ orderNumber: "ORD-001" });
		const initError = new Error("Init failed");
		mockSales.initializePayment.mockRejectedValue(initError);

		const onResult = jest.fn();
		await act(async () => {
			render(
				<TestComponent
					onResult={onResult}
					paymentMethodType={{ paymentMethodID: "pm_test" }}
					orderNumber="ORD-001"
					successURL="/success"
				/>,
			);
		});
		const lastResult = onResult.mock.calls[onResult.mock.calls.length - 1][0];
		expect(lastResult.error).toBe(initError);
	});

	it("sets error when finalizePayment throws", async () => {
		mockSales.getOrderDetails.mockResolvedValue({ orderNumber: "ORD-001" });
		const finalizeError = new Error("Finalize failed");
		mockSales.finalizePayment.mockRejectedValue(finalizeError);

		const onResult = jest.fn();
		await act(async () => {
			render(
				<TestComponent
					onResult={onResult}
					paymentMethodType={{ paymentMethodID: "pm_test" }}
					orderNumber="ORD-001"
					token="TOKEN-123"
					successURL="/success"
				/>,
			);
		});
		const lastResult = onResult.mock.calls[onResult.mock.calls.length - 1][0];
		expect(lastResult.error).toBe(finalizeError);
	});
});
