import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OneTimePassword from "./default";
import { useIdentity } from "@wpmedia/arc-themes-components";

const mockLogin = jest.fn(() => Promise.resolve());
const mockIdentity = {
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
	login: mockLogin,
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			...mockIdentity,
		},
	})),
}));
jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Identity Login Feature - unInitialized", () => {
	beforeEach(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders", () => {
		render(<OneTimePassword />);
		screen.debug();
		// expect(screen.queryAllByRole("button")).toEqual([]);
	});
});
