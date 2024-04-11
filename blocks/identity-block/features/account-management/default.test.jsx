import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useIdentity } from "@wpmedia/arc-themes-components";
import AccountManagement, { AccountManagementPresentational } from "./default";

jest.mock("./_children/EmailEditableFieldContainer", () => () => <div>Email</div>);
jest.mock("./_children/PasswordEditableFieldContainer", () => () => <div>Password</div>);
jest.mock("./_children/SocialEditableSection", () => () => <div>Social</div>);

jest.mock("fusion:context", () => ({
	useFusionContext: () => ({ isAdmin: false, globalContent: { credits: {} } }),
}));
jest.mock("fusion:properties", () => jest.fn(() => ({})));

const defaultCustomFields = {
	redirectURL: "",
	showEmail: true,
	showPassword: true,
	showSocialProfile: false,
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
			},
		},
	})),
);

const mockLogin = jest.fn(() => Promise.resolve());
const mockIdentity = {
	apiOrigin: "http://origin/",
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
	getUserProfile: jest.fn(() => ({})),
	login: mockLogin,
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			...mockIdentity,
		},
	})),
	Heading: ({ children }) => <div data-testid="Heading"> {children} </div>,
	Input: ({ type, label }) => (
		<div>
			<label>{label}</label>
			<input type={type} />
		</div>
	),
}));

const userProfileMock = jest.fn(() =>
	Promise.resolve({ email: "test@domain.com", identities: [] }),
);

describe("Account management", () => {
	afterAll(() => {
		jest.restoreAllMocks();
	});

	it("renders header text", async () => {
		render(<AccountManagementPresentational header="header" />);
		const title = screen.getByText("header");
		expect(title).not.toBeNull();
	});

	it("should render account management if logged in and initialized", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				apiOrigin: "http://origin/",
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		render(<AccountManagement customFields={defaultCustomFields} />);

		await waitFor(() => expect(screen.getByText("identity-block.account-information")).not.toBeNull()); // eslint-disable-line
	});

	it("should not render if not logged in and not initialized", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			Identity: {
				isLoggedIn: jest.fn(async () => false),
				getConfig: jest.fn(async () => ({})),
			},
		}));
		const { container } = render(<AccountManagement customFields={{}} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("shows email input editable field if showing email", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		render(<AccountManagement customFields={{ showEmail: true }} />);

		await waitFor(() => expect(screen.getByText("Email")).not.toBeNull()); // eslint-disable-line
	});

	it("hides email input editable field if showing email", () => {
		render(<AccountManagement customFields={{ showEmail: false }} />);
		expect(screen.queryByText("Email")).toBeNull();
	});

	it("shows password input editable field if showing password", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		render(<AccountManagement customFields={{ showPassword: true }} />);

		await waitFor(() => expect(screen.getByText("Password")).not.toBeNull()); // eslint-disable-line
	});

	it("hides password input editable field if showing password", async () => {
		render(<AccountManagement customFields={{ showPassword: false }} />);
		expect(screen.queryByText("Password")).toBeNull();
	});

	it("shows social profile if showing social", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		render(<AccountManagement customFields={{ showSocialProfile: true }} />);

		await waitFor(() => expect(screen.getByText("Social")).not.toBeNull()); // eslint-disable-line
	});

	it("hides social profile if showing social", async () => {
		render(<AccountManagement customFields={{ showSocialProfile: false }} />);
		expect(screen.queryByText("Password")).toBeNull();
	});
});
