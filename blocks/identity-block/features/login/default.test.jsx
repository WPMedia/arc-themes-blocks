import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";

import Login, {definedMessageByCode}  from "./default";

const defaultCustomFields = {
	redirectURL: "",
	redirectToPreviousPage: true,
	signUpURL: "",
};

jest.mock("@arc-publishing/sdk-identity", () => ({
	__esModule: true,
	default: {
		apiOrigin: "http://origin/",
		options: jest.fn(),
	},
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
			}
		},
	})),
);

const mockLogin = jest.fn(() => Promise.resolve());
const mockIdentity = {
	apiOrigin: "http://origin/",
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
	login: mockLogin,
};

const mockSales = {
	getConfig: jest.fn(() => {}),
};

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
	BotChallengeProtection: ({ challengeIn= 'login' }) => <div data-testid={`reCapctha-${challengeIn}`} />
}));

jest.mock("../../components/login", () => ({
	__esModule: true,
	default: jest.fn(() => ({
	  loginRedirect: jest.fn(),
	})),
  }));

describe("Identity Login Feature", () => {
	it("renders", async () => {
		render(<Login customFields={defaultCustomFields} />);
		expect(screen.getByRole("form")).not.toBeNull();
		expect(screen.getByTestId("reCapctha-signin")).not.toBeNull();
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
			reset: jest.fn(),
		};
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
		mockLogin.mockRejectedValueOnce({ code: 130001 }); // eslint-disable-line
		global.grecaptcha = {
			reset: jest.fn(),
		};
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

	it("renders null if identity not initialized", async () => {
		render(<Login customFields={defaultCustomFields} />);
		expect(screen.queryAllByRole("button")).toEqual([]);
	});
});

describe("Define message by code", () => {
	it("returns generic message if code doesn't exist", () => {
		const result = definedMessageByCode("123");
		expect(result).toEqual("identity-block.login-form-error.invalid-email-password");
	});

	it("returns generic message if code is undefined", () => {
		const result = definedMessageByCode();
		expect(result).toEqual("identity-block.login-form-error.invalid-email-password");
	});

	it("return message if code exists", () => {
		const result = definedMessageByCode(100015);
		expect(result).toEqual("identity-block.login-form-error.account-is-disabled");
	});
});