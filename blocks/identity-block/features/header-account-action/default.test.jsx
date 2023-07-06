import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useFusionContext } from "fusion:context";

import HeaderAccountAction from "./default";
import useIdentity from "../../components/Identity";

jest.mock("../../components/Identity", () => ({
	__esModule: true,
	default: jest.fn(() => ({
		Identity: {
			isLoggedIn: jest.fn(() => true),
			getUserProfile: jest.fn(() => Promise.resolve()),
			logout: jest.fn(() => Promise.resolve()),
		},
		isInitialized: true,
	})),
}));

jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Subscriptions HeaderAccountAction", () => {
	it("renders", () => {
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});
		render(<HeaderAccountAction customFields={{ loginURL: "", createAccountURL: "" }} />);

		expect(screen.getAllByRole("button")).not.toBe(null);
	});

	it("should not render if not initialized", () => {
		useIdentity.mockReturnValueOnce(() => ({
			Identity: {
				isLoggedIn: jest.fn(() => true),
				getUserProfile: jest.fn(() => Promise.resolve()),
				logout: jest.fn(() => Promise.resolve()),
			},
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
			/>
		);
		const links = screen.queryAllByRole("link");
		expect(links).not.toBe(null);
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveAttribute("href", "/create-account");
		expect(links[1]).toHaveAttribute("href", "/login");
	});

	it("shows account manage url and logout url", async () => {
		useIdentity.mockImplementation(
			jest.fn(() => ({
				Identity: {
					isLoggedIn: jest.fn(() => true),
					getUserProfile: jest.fn(() => Promise.resolve({ username: "test" })),
					logout: jest.fn(() => Promise.resolve()),
				},
				isInitialized: true,
			}))
		);
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});

		await render(
			<HeaderAccountAction
				customFields={{
					manageAccountURL: "/manage",
					logoutURL: "/logout",
				}}
			/>
		);
		// Open user menu
		await fireEvent.click(screen.getByRole("button"));
		let links = screen.queryAllByRole("link");
		expect(links).not.toBe(null);
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveAttribute("href", "/manage");
		expect(links[1]).toHaveAttribute("href", "/logout");
		// Close user menu
		await fireEvent.click(screen.getByRole("button"));
		links = screen.queryAllByRole("link");
		expect(links).toHaveLength(0);

		useIdentity.mockClear();
	});

	it("calls the logout function", async () => {
		const logoutMock = jest.fn(() => Promise.resolve());
		useIdentity.mockImplementation(
			jest.fn(() => ({
				Identity: {
					isLoggedIn: jest.fn(() => true),
					getUserProfile: jest.fn(() => Promise.resolve({ username: "test" })),
					logout: logoutMock,
				},
				isInitialized: true,
			}))
		);
		useFusionContext.mockReturnValueOnce({
			arcSite: "arcxp",
		});

		await render(
			<HeaderAccountAction
				customFields={{
					manageAccountURL: "/manage",
					logoutURL: "/logout",
				}}
			/>
		);
		// Open user menu with desktop button
		await fireEvent.click(screen.getAllByRole("button")[0]);
		const links = screen.queryAllByRole("link");
		await fireEvent.click(links[1]);
		expect(logoutMock).toHaveBeenCalled();
		useIdentity.mockClear();
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
			/>
		);
		fireEvent.click(screen.getByRole("button"));
		// 4 total links with the mobile submenu open.
		expect(screen.queryAllByRole("link").length).toBe(4);

		fireEvent.click(screen.getByRole("button"));
		// Only 2 links when submenu is closed.
		expect(screen.queryAllByRole("link").length).toBe(2);
	});
});
