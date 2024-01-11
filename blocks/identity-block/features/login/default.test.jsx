import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./default";
import { useIdentity } from "@wpmedia/arc-themes-components";

const defaultCustomFields = {
	redirectURL: "",
	redirectToPreviousPage: true,
};

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

describe("Identity Login Feature", () => {
	it("renders", () => {
		render(<Login customFields={defaultCustomFields} />);
		expect(screen.queryByRole("form")).not.toBeNull();
	});

	it("shows login form", () => {
		render(<Login customFields={defaultCustomFields} />);
		expect(screen.queryByRole("form")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.password")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.email")).not.toBeNull();
	});

	it("submits the login form", async () => {
		render(<Login customFields={defaultCustomFields} />);

		await waitFor(() => expect(screen.getByLabelText("identity-block.email")));
		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		await waitFor(() => expect(screen.getByLabelText("identity-block.password")));
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisIsMyPassword" },
		});
		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(mockLogin).toHaveBeenCalled());
	});
});

describe("Identity Login Feature - rejected Login", () => {
	beforeEach(() => {
		mockLogin.mockImplementation(() => Promise.reject());
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("rejects the login", async () => {
		render(<Login customFields={defaultCustomFields} />);

		await waitFor(() => expect(screen.getByLabelText("identity-block.email")));
		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});

		await waitFor(() => expect(screen.getByLabelText("identity-block.password")));
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisNotIsMyPassword" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(mockLogin).toHaveBeenCalled());
		await waitFor(() => screen.getByText("identity-block.login-form-error"));
	});
});

describe("Identity Login Feature - unInitialized", () => {
	beforeEach(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			Identity: {
				...mockIdentity,
			},
		}));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders nothing if identity not initialized", () => {
		render(<Login customFields={defaultCustomFields} />);
		expect(screen.queryAllByRole("button")).toEqual([]);
	});
});
