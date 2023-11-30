import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ForgotPassword from "./default";

jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Identity Password Reset Feature", () => {
	const mockReset = jest.fn(() => Promise.resolve());
	beforeEach(() => {
		jest.mock("@wpmedia/arc-themes-components", () => ({
			__esModule: true,
			useIdentity: jest.fn(() => ({
				Identity: {
					isLoggedIn: jest.fn(() => false),
					getConfig: jest.fn(() => ({})),
					requestResetPassword: mockReset,
				},
				isInitialized: true,
			})),
		}));
		// useIdentity.mockImplementation(() => ({
		// 	Identity: {
		// 		isLoggedIn: jest.fn(() => false),
		// 		getConfig: jest.fn(() => ({})),
		// 		requestResetPassword: mockReset,
		// 	},
		// 	isInitialized: true,
		// }));
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("renders nothing if identity not initialized", () => {
		jest.mock("@wpmedia/arc-themes-components", () => ({
			__esModule: true,
			useIdentity: jest.fn(() => ({
				Identity: {
					isLoggedIn: jest.fn(() => false),
					getConfig: jest.fn(() => ({})),
					requestResetPassword: mockReset,
				},
				isInitialized: false,
			})),
		}));
		render(<ForgotPassword />);
		expect(screen.queryByRole("form")).toBe(null);
	});

	it("renders", () => {
		render(<ForgotPassword />);
		expect(screen.queryByRole("form")).not.toBe(null);
	});

	it("shows submit form", () => {
		render(<ForgotPassword />);
		expect(screen.queryByRole("form")).not.toBe(null);
		expect(screen.getByText("identity-block.forgot-password-instruction")).not.toBe(null);
		expect(screen.getByLabelText("identity-block.email")).not.toBe(null);
		expect(screen.getByRole("button")).not.toBe(null);
	});

	it("uses updates the form on submit", async () => {
		render(<ForgotPassword />);
		await waitFor(() => expect(screen.getByLabelText("identity-block.email")));
		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));
		await waitFor(() =>
			expect(screen.getByText("identity-block.forgot-password-headline-submitted")),
		);
		expect(screen.getByText("identity-block.forgot-password-headline-submitted")).not.toBe(null);
		expect(screen.getByText("identity-block.forgot-password-instruction-submitted")).not.toBe(null);
	});
});

describe("Identity Password Reset Feature - Failing", () => {
	const mockResetFail = jest.fn(() => Promise.reject());
	beforeEach(() => {
		jest.mock("@wpmedia/arc-themes-components", () => ({
			__esModule: true,
			useIdentity: jest.fn(() => ({
				Identity: {
					isLoggedIn: jest.fn(() => false),
					getConfig: jest.fn(() => ({})),
					requestResetPassword: mockResetFail,
				},
				isInitialized: true,
			})),
		}));
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("enter error state on failure to submit", async () => {
		render(<ForgotPassword />);
		await waitFor(() => expect(screen.getByLabelText("identity-block.email")));
		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));
		await waitFor(() => expect(mockResetFail).toHaveBeenCalled());
		await waitFor(() =>
			expect(screen.getByText("identity-block.forgot-password-error")).not.toBe(null),
		);
	});
});
