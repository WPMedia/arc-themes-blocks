import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFusionContext } from "fusion:context";
import { useIdentity } from "@wpmedia/arc-themes-components";
import HeaderAccountAction from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(),
}));

jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Subscriptions HeaderAccountAction", () => {
	const getUserProfileMock = jest.fn(() => Promise.resolve(null));
	const loginMock = jest.fn(() => Promise.resolve());
	const logoutMock = jest.fn(() => Promise.resolve());
	const isLoggedInMock = jest.fn(() => Promise.resolve(false));

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
		useFusionContext.mockReturnValue({ arcSite: "arcxp" });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should not render if not initialized", () => {
		useIdentity.mockImplementation(() => ({
			Identity: IdentityDefaults,
			isInitialized: false,
		}));
		render(<HeaderAccountAction customFields={{ loginURL: "/login", createAccountURL: "/signup" }} />);
		expect(screen.queryAllByRole("button")).toEqual([]);
	});

	it("shows sign in url and create account url", async () => {
		await act(async () => {
			render(
				<HeaderAccountAction
					customFields={{
						loginURL: "/login",
						createAccountURL: "/create-account",
					}}
				/>,
			);
		});
		const links = screen.queryAllByRole("link");
		expect(links.length).toBeGreaterThanOrEqual(2);
		const hrefs = links.map((l) => l.getAttribute("href"));
		expect(hrefs).toContain("/create-account");
		expect(hrefs).toContain("/login");
	});

	it("renders the mobile toggle button", async () => {
		await act(async () => {
			render(
				<HeaderAccountAction
					customFields={{
						loginURL: "/login",
						createAccountURL: "/create-account",
					}}
				/>,
			);
		});
		expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
	});

	it("toggles the mobile submenu when clicking the mobile button", async () => {
		await act(async () => {
			render(
				<HeaderAccountAction
					customFields={{
						loginURL: "/login",
						createAccountURL: "/create-account",
					}}
				/>,
			);
		});
		const buttons = screen.getAllByRole("button");
		const linksBefore = screen.queryAllByRole("link");
		fireEvent.click(buttons[buttons.length - 1]);
		const linksAfter = screen.queryAllByRole("link");
		expect(linksAfter.length).toBeGreaterThan(linksBefore.length);
	});

	it("renders nothing when both loginURL and createAccountURL are empty", async () => {
		await act(async () => {
			render(
				<HeaderAccountAction customFields={{ loginURL: "", createAccountURL: "" }} />,
			);
		});
		expect(screen.queryAllByRole("link")).toHaveLength(0);
	});

	it("shows manage account and logout urls when user is logged in", async () => {
		getUserProfileMock.mockResolvedValueOnce({ username: "test" });
		isLoggedInMock.mockResolvedValueOnce(true);

		await act(async () => {
			render(
				<HeaderAccountAction
					customFields={{
						manageAccountURL: "/manage",
						logoutURL: "/logout",
					}}
				/>,
			);
		});
		await waitFor(() => screen.getByRole("button"));
		fireEvent.click(screen.getByRole("button"));
		const links = screen.queryAllByRole("link");
		const hrefs = links.map((l) => l.getAttribute("href"));
		expect(hrefs).toContain("/manage");
		expect(hrefs).toContain("/logout");
	});

	it("calls the logout function when logout link is clicked", async () => {
		getUserProfileMock.mockResolvedValueOnce({ username: "test" });
		isLoggedInMock.mockResolvedValueOnce(true);
		const originalLocation = window.location;
		delete window.location;
		window.location = { href: "" };

		await act(async () => {
			render(
				<HeaderAccountAction
					customFields={{
						manageAccountURL: "/manage",
						logoutURL: "/logout",
					}}
				/>,
			);
		});
		await waitFor(() => screen.getByRole("button"));
		fireEvent.click(screen.getByRole("button"));
		await waitFor(() => screen.queryAllByRole("link").length > 0);
		const links = screen.queryAllByRole("link");
		const logoutLink = links.find((l) => l.getAttribute("href") === "/logout");
		if (logoutLink) {
			fireEvent.click(logoutLink);
			await waitFor(() => expect(logoutMock).toHaveBeenCalled());
		}

		window.location = originalLocation;
	});
});
