import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFusionContext } from "fusion:context";
import { useIdentity } from "@wpmedia/arc-themes-components";
import HeaderAccountAction from "./default";

jest.mock("@wpmedia/arc-themes-components");

jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Subscriptions HeaderAccountAction", () => {
	const getUserProfileMock = jest.fn(() => Promise.resolve({ username: "test" }));
	const loginMock = jest.fn(() => Promise.resolve());
	const logoutMock = jest.fn(() => Promise.resolve());
	const isLoggedInMock = jest.fn(() => false);

	const IdentityDefaults = {
		isLoggedIn: isLoggedInMock,
		getConfig: jest.fn(() => ({})),
		getUserProfile: getUserProfileMock,
		login: loginMock,
		logout: logoutMock,
	};

	beforeEach(() => {
		useIdentity.mockImplementation(() => ({
			Identity: IdentityDefaults,
			isInitialized: true,
		}));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});
		render(<HeaderAccountAction customFields={{ loginURL: "", createAccountURL: "" }} />);

		expect(screen.getAllByRole("button")).not.toBe(null);
	});

	it("should not render if not initialized", () => {
		useIdentity.mockImplementation(() => ({
			Identity: IdentityDefaults,
			isInitialized: false,
		}));
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});
		render(<HeaderAccountAction customFields={{ loginURL: "", createAccountURL: "" }} />);

		expect(screen.queryAllByRole("button")).toEqual([]);
	});

	it("shows sign in url and create account url", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});

		render(
			<HeaderAccountAction
				customFields={{
					loginURL: "/login",
					createAccountURL: "/create-account",
				}}
			/>,
		);
		const links = screen.queryAllByRole("link");
		expect(links).not.toBe(null);
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveAttribute("href", "/create-account");
		expect(links[1]).toHaveAttribute("href", "/login");
	});

	it("shows account manage url and logout url", async () => {
		isLoggedInMock.mockReturnValue(() => true);
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});

		render(
			<HeaderAccountAction
				customFields={{
					manageAccountURL: "/manage",
					logoutURL: "/logout",
				}}
			/>,
		);
		await waitFor(() => expect(screen.getByRole("button")));
		// console.log(screen.debug());
		// Open user menu
		fireEvent.click(screen.getByRole("button"));
		await waitFor(() => expect(screen.queryAllByRole("link")));
		let links = screen.queryAllByRole("link");
		expect(links).not.toBe(null);
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveAttribute("href", "/manage");
		expect(links[1]).toHaveAttribute("href", "/logout");
		// Close user menu
		fireEvent.click(screen.getByRole("button"));
		links = screen.queryAllByRole("link");
		expect(links).toHaveLength(0);
	});

	it("calls the logout function", async () => {
		isLoggedInMock.mockReturnValue(() => true);
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});

		render(
			<HeaderAccountAction
				customFields={{
					manageAccountURL: "/manage",
					logoutURL: "/logout",
				}}
			/>,
		);
		await waitFor(() => expect(screen.getByRole("button")));
		// Open user menu with desktop button
		fireEvent.click(screen.getAllByRole("button")[0]);
		await waitFor(() => expect(screen.queryAllByRole("link")));
		const links = screen.queryAllByRole("link");
		fireEvent.click(links[1]);
		expect(logoutMock).toHaveBeenCalled();
	});

	it("toggles the submenu when clicking on the mobile header button", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});

		render(
			<HeaderAccountAction
				customFields={{
					loginURL: "https://www.google.com",
					createAccountURL: "https://www.google.com",
				}}
			/>,
		);
		fireEvent.click(screen.getByRole("button"));
		// 4 total links with the mobile submenu open.
		expect(screen.queryAllByRole("link").length).toBe(4);

		fireEvent.click(screen.getByRole("button"));
		// Only 2 links when submenu is closed.
		expect(screen.queryAllByRole("link").length).toBe(2);
	});
});
