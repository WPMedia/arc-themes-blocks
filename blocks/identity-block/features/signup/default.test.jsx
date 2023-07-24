import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Signup from "./default";
import useIdentity from "../../components/identity";

jest.mock("fusion:properties", () => jest.fn(() => ({})));

jest.mock("../../components/identity");

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
});
