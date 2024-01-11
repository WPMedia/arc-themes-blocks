import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useIdentity } from "@wpmedia/arc-themes-components";
import AccountManagement, { AccountManagementPresentational } from "./default";

import EmailEditableFieldContainer from "./_children/EmailEditableFieldContainer";
import PasswordEditableFieldContainer from "./_children/PasswordEditableFieldContainer";
import SocialEditableSection from "./_children/SocialEditableSection";

jest.mock("./_children/EmailEditableFieldContainer", () => () => <div>Email</div>);
jest.mock("./_children/PasswordEditableFieldContainer", () => () => <div>Password</div>);
jest.mock("./_children/SocialEditableSection", () => () => <div>Social</div>);

jest.mock("@wpmedia/arc-themes-components");

const userProfileMock = jest.fn(() =>
	Promise.resolve({ email: "test@domain.com", identities: [] }),
);

describe("Account management", () => {
	afterAll(() => {
		jest.restoreAllMocks();
	});

	it("renders header text", async () => {
		render(<AccountManagementPresentational header="header" />);
		await expect(screen.findByText("header")).not.toBeNull();
	});

	it("should render account management if logged in and initialized", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		render(<AccountManagement customFields={{}} />);
		await expect(screen.findByText("Account Information")).not.toBeNull();
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
		await expect(screen.findByText("Email")).not.toBeNull();
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
		await expect(screen.findByText("Password")).not.toBeNull();
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
		await expect(screen.findByText("Password")).not.toBeNull();
	});

	it("hides social profile if showing social", async () => {
		render(<AccountManagement customFields={{ showSocialProfile: false }} />);
		expect(screen.queryByText("Password")).toBeNull();
	});
});
