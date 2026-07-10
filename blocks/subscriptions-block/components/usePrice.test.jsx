import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import usePrice from "./usePrice";

const originalFetch = global.fetch;

jest.mock("fusion:properties", () =>
	jest.fn(() => ({ api: { retail: { origin: "https://api.example.com" } } })),
);

const TestComponent = ({ onResult, priceCode, cycleIndex, startDate }) => {
	const result = usePrice({ priceCode, cycleIndex, startDate });
	onResult(result);
	return null;
};

describe("usePrice", () => {
	beforeEach(() => {
		useFusionContext.mockReturnValue({ arcSite: "test-site" });
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ pricingStrategy: { name: "Monthly", amount: "10.00" } }),
			}),
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
		global.fetch = originalFetch;
	});

	it("returns isFetching true initially", () => {
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} priceCode="ABC" cycleIndex={1} startDate={12345} />);
		expect(onResult.mock.calls[0][0].isFetching).toBe(true);
	});

	it("fetches price data and returns it", async () => {
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} priceCode="ABC" cycleIndex={1} startDate={12345} />);
		await waitFor(() => {
			const lastResult = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(lastResult.isFetching).toBe(false);
		});
		const lastResult = onResult.mock.calls[onResult.mock.calls.length - 1][0];
		expect(lastResult.price).not.toBeNull();
	});

	it("sets error when fetch fails", async () => {
		global.fetch = jest.fn(() => Promise.reject(new Error("fetch error")));
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} priceCode="ABC" cycleIndex={1} startDate={12345} />);
		await waitFor(() => {
			const lastResult = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(lastResult.error).toContain("Error in fetching price details");
		});
	});

	it("sets error when origin is not configured", async () => {
		getProperties.mockReturnValueOnce({ api: { retail: { origin: null } } });
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} priceCode="ABC" cycleIndex={1} startDate={12345} />);
		await waitFor(() => {
			const lastResult = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(lastResult.error).toContain("Origin properties not set");
		});
	});

	it("returns fetchPrice function", async () => {
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} priceCode="ABC" cycleIndex={1} startDate={12345} />);
		expect(typeof onResult.mock.calls[0][0].fetchPrice).toBe("function");
	});
});
