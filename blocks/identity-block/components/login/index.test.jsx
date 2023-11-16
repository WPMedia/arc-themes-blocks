import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import useLogin from ".";

jest.mock("@wpmedia/arc-themes-components");

const defaultParams = {
	isAdmin: false,
	redirectURL: "/account/",
	redirectToPreviousPage: true,
	loggedInPageLocation: "/account-2/",
};

const Test = (props) => {
	const { loginRedirect } = useLogin({
		...defaultParams,
		...props,
	});
	return (
		<div>
			<button
				onClick={() => {
					window.location = loginRedirect;
				}}
				type="button"
			>
				Test
			</button>
		</div>
	);
};

describe("useLogin()", () => {
	beforeEach(() => {
		Object.defineProperty(window, "location", {
			writable: true,
		});
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				isLoggedIn: jest.fn(() => false),
				getConfig: jest.fn(() => ({})),
			},
		}));
	});

	afterEach(() => {
		delete window.location;
	});

	it("uses the passed in redirect URL", async () => {
		await render(<Test />);
		fireEvent.click(screen.getByRole("button"));
		expect(window.location).toBe(defaultParams.redirectURL);
	});

	it("uses redirect query", async () => {
		Object.defineProperty(window, "location", {
			writable: true,
			value: {
				search: "?test=123&redirect=/new-account/",
			},
		});
		await render(<Test />);
		fireEvent.click(screen.getByRole("button"));
		expect(window.location).toBe("/new-account/");
	});

	it("uses document referrer", async () => {
		const referrerURL = "http://referrer.com";
		Object.defineProperty(document, "referrer", {
			value: referrerURL,
			configurable: true,
		});
		await render(<Test />);
		fireEvent.click(screen.getByRole("button"));
		expect(window.location).toBe(referrerURL);
		delete document.referrer;
	});

	it("redirects when already logged in", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				isLoggedIn: jest.fn(() => true),
				getConfig: jest.fn(() => ({})),
			},
		}));
		await render(<Test />);
		expect(window.location).toBe(defaultParams.loggedInPageLocation);
	});

	it("replaces potentially unsafe URLs in query param", async () => {
		Object.defineProperty(window, "location", {
			writable: true,
			value: {
				search: "?test=123&redirect=https://somewhere.com",
			},
		});
		await render(<Test />);
		fireEvent.click(screen.getByRole("button"));
		expect(window.location).toBe("/");
	});

	it("replaces potentially unsafe URLs in redirectURL parameter", async () => {
		await render(<Test redirectURL="https://somewhere.com" />);
		fireEvent.click(screen.getByRole("button"));
		expect(window.location).toBe("/");
	});

	it("replaces potentially unsafe URLs in loggedInPageLocation parameter", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				isLoggedIn: jest.fn(() => true),
				getConfig: jest.fn(() => ({})),
			},
		}));
		await render(<Test loggedInPageLocation="https://somewhere.com" />);
		expect(window.location).toBe("/");
	});
});
