import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./default";
import { useIdentity } from "@wpmedia/arc-themes-components";

jest.mock("@wpmedia/arc-themes-components");
jest.mock("fusion:properties", () => jest.fn(() => ({})));

const defaultCustomFields = {
	redirectURL: "",
	redirectToPreviousPage: true,
};

const loginMock = jest.fn(() => Promise.resolve());
const loginMockFail = jest.fn(() => Promise.reject());

const IdentityDefaults = {
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
	login: loginMock,
};

describe("Identity Login Feature", () => {
	beforeEach(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...IdentityDefaults,
			},
		}));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders nothing if identity not initialized", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			Identity: {
				...IdentityDefaults,
			},
		}));
		render(<Login customFields={defaultCustomFields} />);
		expect(screen.queryAllByRole("button")).toEqual([]);
	});

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

	it("submits the login form", () => {
		render(<Login customFields={defaultCustomFields} />);

		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisIsMyPassword" },
		});
		fireEvent.click(screen.getByRole("button"));

		expect(loginMock).toHaveBeenCalled();
	});

	it("rejects the login", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...IdentityDefaults,
				login: loginMockFail,
			},
		}));

		render(<Login customFields={defaultCustomFields} />);

		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisNotIsMyPassword" },
		});
		await fireEvent.click(screen.getByRole("button"));
		await expect(loginMockFail).toHaveBeenCalled();
		expect(screen.getByText("identity-block.login-form-error")).not.toBeNull();
	});
});
