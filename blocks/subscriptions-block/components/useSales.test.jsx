import React from "react";
import { render } from "@testing-library/react";
import Identity from "@arc-publishing/sdk-identity";
import Sales from "@arc-publishing/sdk-sales";
import { useFusionContext } from "fusion:context";

import useSales from "./useSales";

jest.mock("@arc-publishing/sdk-identity", () => ({
	__esModule: true,
	default: {
		apiOrigin: null,
		options: jest.fn(),
	},
}));

jest.mock("@arc-publishing/sdk-sales", () => ({
	__esModule: true,
	default: {
		apiOrigin: null,
		options: jest.fn(),
	},
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: { origin: "https://identity.example.com" },
			retail: { origin: "https://retail.example.com" },
		},
	})),
);

const TestComponent = ({ onResult }) => {
	const result = useSales();
	onResult(result);
	return null;
};

describe("useSales", () => {
	beforeEach(() => {
		Sales.apiOrigin = null;
		Identity.apiOrigin = null;
		useFusionContext.mockReturnValue({ arcSite: "test-site" });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns Sales object and isInitialized", () => {
		const onResult = jest.fn();
		render(<TestComponent onResult={onResult} />);
		const result = onResult.mock.calls[0][0];
		expect(result).toHaveProperty("Sales");
		expect(result).toHaveProperty("isInitialized");
	});

	it("initializes Sales with apiOrigin when not already initialized", () => {
		render(<TestComponent onResult={jest.fn()} />);
		expect(Sales.options).toHaveBeenCalled();
	});

	it("initializes Identity with apiOrigin when not already initialized", () => {
		render(<TestComponent onResult={jest.fn()} />);
		expect(Identity.options).toHaveBeenCalled();
	});

	it("does not re-initialize Sales when already initialized", () => {
		Sales.apiOrigin = "https://already.set";
		render(<TestComponent onResult={jest.fn()} />);
		expect(Sales.options).not.toHaveBeenCalled();
	});
});
