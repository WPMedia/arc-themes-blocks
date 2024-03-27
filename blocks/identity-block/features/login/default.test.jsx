import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import Login from "./default";

const defaultCustomFields = {
	redirectURL: "",
	redirectToPreviousPage: true,
	signUpURL: ""
};

const mockLogin = jest.fn(() => Promise.resolve());
const mockIdentity = {
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
	login: mockLogin,
};

const mockSales = {
	getConfig: jest.fn(() => {})
}

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			...mockIdentity,
		},
	})),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			...mockSales,
		},
	})),
}));
jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Identity Login Feature", () => {
	it("renders", () => {
		render(<Login customFields={defaultCustomFields} />);
		expect(screen.getByRole("form")).not.toBeNull();
	});

	it("shows login form", () => {
		render(<Login customFields={defaultCustomFields} />);
		expect(screen.getByRole("form")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.password")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.email-label")).not.toBeNull();
	});

	it("submits the login form", async () => {
		render(<Login customFields={defaultCustomFields} />);

		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
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

describe("Identity Login Feature - rejected Login, general message", () => {
	beforeEach(() => {
		mockLogin.mockRejectedValueOnce({ code: 0 });
		global.grecaptcha = {
			reset: jest.fn()
		}
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("rejects the login", async () => {
		render(<Login customFields={defaultCustomFields} />);

		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email@test.com" },
		});

		await waitFor(() => expect(screen.getByLabelText("identity-block.password")));
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisNotIsMyPassword" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(mockLogin).toHaveBeenCalled());
		await screen.findByText("identity-block.login-form-error.invalid-email-password");
	});
});

describe("Identity Login Feature - rejected Login, error code 130001", () => {
	beforeEach(() => {
		mockLogin.mockRejectedValueOnce({ code: 130001 });
		global.grecaptcha = {
			reset: jest.fn()
		}
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("rejects the login", async () => {

		render(<Login customFields={defaultCustomFields} />);

		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email@test.com" },
		});

		await waitFor(() => expect(screen.getByLabelText("identity-block.password")));
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisNotIsMyPassword" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(mockLogin).toHaveBeenCalled());
		await screen.findByText("identity-block.login-form-error.captcha-token-invalid");
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
