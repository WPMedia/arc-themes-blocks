import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useIdentity } from "@wpmedia/arc-themes-components";

import ResetPassword from "./default";
import FormPasswordConfirm from "../../components/form-password-confirm";

const successActionURL = "/account/login/";

jest.mock("../../components/form-password-confirm");

const mockLogin = jest.fn(() => Promise.resolve());

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			isLoggedIn: jest.fn(() => true),
			getConfig: jest.fn(() => ({})),
			login: mockLogin,
		},
	})),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "arc-demo-5",
		siteProperties: {
			locale: "en",
		},
	})),
}));

FormPasswordConfirm.mockImplementation(() => (
	<input name="newPassword" defaultValue="notTestingThisComponent" />
));

const resetPasswordMock = jest.fn(() => Promise.resolve());
const resetPasswordMockFail = jest.fn(() => Promise.reject());

const Identity = {
	getConfig: () => Promise.resolve({}),
	resetPassword: resetPasswordMock,
};

window.history.pushState({}, "", "/?nonce=abcd");

describe("Identity Password Reset Feature - unInitialized", () => {
	beforeAll(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			Identity,
		}));
	});
	afterAll(() => {
		jest.clearAllMocks();
	});

	it("renders nothing if identity not initialized", () => {
		render(<ResetPassword customFields={{ successActionURL }} />);
		expect(screen.queryByRole("form")).toBeNull();
	});
});

describe("Identity Password Reset Feature", () => {
	const assignMock = jest.fn();
	beforeAll(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity,
		}));
		Object.defineProperty(window, "location", {
			value: {
				origin: "http://localhost",
				...window.location,
				assign: assignMock,
			},
			writable: true,
		});
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("renders", () => {
		render(<ResetPassword customFields={{ successActionURL }} />);
		expect(screen.getByRole("form")).not.toBeNull();
	});

	it("shows submit form", () => {
		render(<ResetPassword customFields={{ successActionURL }} />);
		expect(screen.getByText("identity-block.reset-password-headline")).not.toBeNull();
		expect(screen.getByText("identity-block.reset-password-instruction")).not.toBeNull();
		expect(screen.getByText("identity-block.reset-password-submit")).not.toBeNull();
	});

	it("updates the page on submit and redirects the user to login when done", async () => {
		render(<ResetPassword customFields={{ successActionURL }} />);
		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));
		await waitFor(() => expect(resetPasswordMock).toHaveBeenCalled());
		expect(screen.getByText("identity-block.reset-password-headline-submitted")).not.toBeNull();
		expect(screen.getByText("identity-block.reset-password-instruction-submitted")).not.toBeNull();
		expect(screen.getByText("identity-block.reset-password-submit-submitted")).not.toBeNull();
		fireEvent.click(screen.getByRole("button"));
		expect(assignMock).toHaveBeenCalled();
	});
});

describe("Identity Password Reset Feature - Failing reset request", () => {
	beforeAll(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...Identity,
				resetPassword: resetPasswordMockFail,
			},
		}));
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("updates the page on submit to failing state", async () => {
		render(<ResetPassword customFields={{ successActionURL }} />);
		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));
		await waitFor(() => expect(resetPasswordMockFail).toHaveBeenCalled());
		expect(screen.getByText("identity-block.reset-password-error")).not.toBeNull();
	});
});

window.history.back();
