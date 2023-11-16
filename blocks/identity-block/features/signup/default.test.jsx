import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import Signup from "./default";

jest.mock("fusion:properties", () => jest.fn(() => ({})));

jest.mock("@wpmedia/arc-themes-components");

describe("With unintialized identity", () => {
	it("renders nothing if identity not initialized", () => {
		useIdentity.mockImplementation(() => ({ isInitialized: false }));

		render(<Signup customFields={{ redirectURL: "" }} />);
		expect(screen.queryByRole("form")).toBeNull();
	});
});

describe("With initialized identity", () => {
	it("renders something", () => {
		useIdentity.mockImplementation(() => ({ isInitialized: true }));
		render(<Signup customFields={{ redirectURL: "/sign-up", redirectToPreviousPage: true }} />);

		expect(screen.getByRole("form")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.email")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.password")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.confirm-password")).not.toBeNull();
	});

	it("submits the form", () => {
		const signUpMock = jest.fn(() => Promise.resolve());
		useIdentity.mockImplementation(
			jest.fn(() => ({
				Identity: {
					getConfig: jest.fn(() => Promise.resolve()),
					signUp: signUpMock,
				},
				isInitialized: true,
			}))
		);
		render(<Signup customFields={{ redirectURL: "/sign-up", redirectToPreviousPage: true }} />);

		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisIsMyPassword" },
		});
		fireEvent.change(screen.getByLabelText("identity-block.confirm-password"), {
			target: { value: "thisIsMyPassword" },
		});
		fireEvent.click(screen.getByRole("button"));
		expect(signUpMock).toHaveBeenCalledWith(
			{
				userName: "email@test.com",
				credentials: "thisIsMyPassword",
			},
			{
				email: "email@test.com",
			}
		);
	});

	it("rejects the form", async () => {
		const signUpMock = jest.fn(() => Promise.reject());
		useIdentity.mockImplementation(
			jest.fn(() => ({
				Identity: {
					getConfig: jest.fn(() => Promise.resolve()),
					signUp: signUpMock,
				},
				isInitialized: true,
			}))
		);
		render(<Signup customFields={{ redirectURL: "/sign-up", redirectToPreviousPage: true }} />);

		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email-already-exists@test.com" },
		});
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisIsMyPassword" },
		});
		fireEvent.change(screen.getByLabelText("identity-block.confirm-password"), {
			target: { value: "thisIsMyPassword" },
		});
		await fireEvent.click(screen.getByRole("button"));
		await expect(signUpMock).toHaveBeenCalledWith(
			{
				userName: "email-already-exists@test.com",
				credentials: "thisIsMyPassword",
			},
			{
				email: "email-already-exists@test.com",
			}
		);
		expect(screen.getByText("identity-block.sign-up-form-error")).not.toBeNull();
	});
});
