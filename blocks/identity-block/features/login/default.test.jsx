import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./default";

import useIdentity from "../../components/identity";

jest.mock("../../components/identity");

const defaultCustomFields = {
	redirectURL: "",
	redirectToPreviousPage: true,
};

const loginMock = jest.fn(() => Promise.resolve({}));

jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Identity Login Feature", () => {
	beforeEach(async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(async () => false),
				getConfig: jest.fn(async () => ({})),
				login: loginMock,
			},
		}));
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it("renders nothing if identity not initialized", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(async () => false),
				getConfig: jest.fn(async () => ({})),
			},
		}));
		await render(<Login customFields={defaultCustomFields} />);
		expect(screen.queryAllByRole("button")).toEqual([]);
	});

	it("renders", async () => {
		await render(<Login customFields={defaultCustomFields} />);
		expect(screen.queryByRole("form")).not.toBeNull();
	});

	it("shows login form", async () => {
		await render(<Login customFields={defaultCustomFields} />);
		expect(screen.queryByRole("form")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.password")).not.toBeNull();
		expect(screen.getByLabelText("identity-block.email")).not.toBeNull();
	});

	it("uses redirect query", async () => {
		global.window = Object.create(window);
		Object.defineProperty(window, "location", {
			writable: true,
			value: {
				search: "?test=123&redirect=https://arcxp.com",
			},
		});

		await render(<Login customFields={defaultCustomFields} />);

		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisIsMyPassword" },
		});
		fireEvent.click(screen.getByRole("button"));

		await loginMock;

		expect(loginMock).toHaveBeenCalled();
		expect(window.location).toBe("https://arcxp.com");

		delete global.window.location;
	});

	it("uses document referrer", async () => {
		const referrerURL = "http://referrer.com";
		Object.defineProperty(document, "referrer", {
			value: referrerURL,
			configurable: true,
		});

		await render(<Login customFields={defaultCustomFields} />);

		fireEvent.change(screen.getByLabelText("identity-block.email"), {
			target: { value: "email@test.com" },
		});
		fireEvent.change(screen.getByLabelText("identity-block.password"), {
			target: { value: "thisIsMyPassword" },
		});
		fireEvent.click(screen.getByRole("button"));

		await loginMock;

		expect(loginMock).toHaveBeenCalled();
		expect(window.location).toBe(referrerURL);
	});
});
