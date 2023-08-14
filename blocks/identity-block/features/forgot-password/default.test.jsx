import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ForgotPassword from "./default";
import useIdentity from "../../components/identity";

jest.mock("../../components/identity");

const resetMock = jest.fn(() => Promise.resolve());
const resetFailMock = jest.fn(() => Promise.reject());

jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Identity Password Reset Feature", () => {
	beforeEach(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(() => false),
				getConfig: jest.fn(() => ({})),
				requestResetPassword: resetMock,
			},
		}));
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("renders nothing if identity not initialized", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(() => false),
				getConfig: jest.fn(() => ({})),
			},
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
		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		await fireEvent.click(screen.getByRole("button"));
		expect(screen.getByText("identity-block.forgot-password-headline-submitted")).not.toBe(null);
		expect(screen.getByText("identity-block.forgot-password-instruction-submitted")).not.toBe(null);
	});
});

describe("Identity Password Reset Feature - Failing", () => {
	beforeEach(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(() => false),
				getConfig: jest.fn(() => ({})),
				requestResetPassword: resetFailMock,
			},
		}));
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("enter error state on failure to submit", async () => {
		render(<ForgotPassword />);
		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		await fireEvent.click(screen.getByRole("button"));
		await expect(resetFailMock).toHaveBeenCalled();
		expect(screen.getByText("identity-block.forgot-password-error")).not.toBe(null);
	});
});
