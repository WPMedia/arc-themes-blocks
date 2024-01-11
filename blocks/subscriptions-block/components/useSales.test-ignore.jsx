import React from "react";
import { mount } from "enzyme";

import SalesObject from "@arc-publishing/sdk-sales";

import useSales from "./useSales";

jest.mock("@arc-publishing/sdk-identity", () => ({
	__esModule: true,
	default: {
		apiOrigin: "",
		options: jest.fn(),
	},
}));

jest.mock("@arc-publishing/sdk-sales", () => ({
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
			retail: {
				origin: "http://retail-origin/",
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

describe("Sales useSales Hook", () => {
	it("returns itself and changes the option to http://origin", () => {
		const Test = () => {
			const { Sales } = useSales();
			expect(Sales).toBe(SalesObject);
			return <div />;
		};
		mount(<Test />);
		expect(SalesObject.options).toHaveBeenLastCalledWith({
			apiOrigin: "http://retail-origin/",
			Identity: {
				apiOrigin: "",
				options: expect.any(Function),
			},
		});
	});

	it("initializes", () => {
		const testInitialization = jest.fn();

		const Test = () => {
			const { isInitialized } = useSales();
			testInitialization(isInitialized);
			return <div />;
		};

		mount(<Test />);

		expect(testInitialization).toHaveBeenCalledWith(false);
		expect(testInitialization).toHaveBeenLastCalledWith(true);
	});
});
