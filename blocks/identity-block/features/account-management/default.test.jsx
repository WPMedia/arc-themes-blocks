import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import useIdentity from "../../components/identity";
import AccountManagement, { AccountManagementPresentational } from "./default";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);

jest.mock("../../components/identity");

jest.mock("./_children/PasswordEditableFieldContainer", () => () => {
	const MockName = "password-editable-field-container-mock";
	return (
		<MockName>
			<span>Password</span>
		</MockName>
	);
});

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../intl.json")[phrase][locale]),
	})),
}));

const userProfileMock = jest.fn(() =>
	Promise.resolve({ email: "test@domain.com", identities: [] })
);

describe("Account management", () => {
	afterAll(() => {
		jest.restoreAllMocks();
	});

	it("renders header text", () => {
		render(<AccountManagementPresentational header="header" />);
		expect(screen.getByText("header")).not.toBeNull();
	});

	it("should render account management if logged in and initialized", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		await act(async () => {
			await render(<AccountManagement customFields={{}} />);
		});
		await userProfileMock;

		expect(screen.getByText("Account Information")).not.toBeNull();
	});

	it("should not render if not logged in and not initialized", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			isLoggedIn: () => false,
			Identity: {
				isLoggedIn: jest.fn(async () => false),
				getConfig: jest.fn(async () => ({})),
			},
		}));
		let container;
		await act(async () => {
			({ container } = await render(<AccountManagement customFields={{}} />));
		});
		expect(container).toBeEmptyDOMElement();
	});

	it("shows email input editable field if showing email", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		await act(async () => {
			await render(<AccountManagement customFields={{ showEmail: true }} />);
		});
		await userProfileMock;
		expect(screen.getByText("Email address")).not.toBeNull();
	});

	it("hides email input editable field if showing email", () => {
		render(<AccountManagement customFields={{ showEmail: false }} />);
		expect(screen.queryByText("Email address")).toBeNull();
	});

	it("shows password input editable field if showing password", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		await act(async () => {
			await render(<AccountManagement customFields={{ showPassword: true }} />);
		});
		await userProfileMock;
		expect(screen.getByText("Password")).not.toBeNull();
	});

	it("hides password input editable field if showing password", () => {
		render(<AccountManagement customFields={{ showPassword: false }} />);
		expect(screen.queryByText("Password")).toBeNull();
	});
});
