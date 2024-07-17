import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import useLogin from ".";

jest.mock("@wpmedia/arc-themes-components");

const defaultParams = {
	isAdmin: false,
	redirectURL: "/account/",
	resetPasswordURL: "/reset-password/",
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

const windowLocationValues = {
	assign: jest.fn((url) => { window.location = url }),
	origin: 'http://localhost',
	href: 'http://localhost',
	search: '',
	pathname: '/',
}

describe("useLogin()", () => {
	beforeEach(() => {
		Object.defineProperty(window, "location", {
			writable: true,
			value: windowLocationValues,
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
		expect(window.location).toBe(`http://localhost${defaultParams.redirectURL}`);
	});

	it("uses redirect query", async () => {
		Object.defineProperty(window, "location", {
			...windowLocationValues,
			writable: true,
			value: {
				search: "?test=123&redirect=/new-account/",
				origin: "http://localhost",
				pathname: "/",
			},
		});
		await render(<Test />);
		fireEvent.click(screen.getByRole("button"));
		expect(window.location).toBe("http://localhost/new-account/");
	});

	it("uses document referrer", async () => {
		const referrerURL = "http://referrer.com/article/1234";
		Object.defineProperty(document, "referrer", {
			value: referrerURL,
			configurable: true,
		});
		await render(<Test />);
		fireEvent.click(screen.getByRole("button"));
		expect(window.location).toBe("/article/1234");
		delete document.referrer;
	});

	it("uses redirectURL when referrer is the reset password page", async () => {
		const referrerURL = "http://localhost/reset-password/";
		Object.defineProperty(document, "referrer", {
			value: referrerURL,
			configurable: true,
		});
		Object.defineProperty(window, "location", {
			writable: true,
			value: {
				...windowLocationValues,
				origin: 'http://localhost',
				href: 'http://localhost',
				search: '?reset_password=true',
				pathname: '/',
			}
		});
		await render(<Test />);
		fireEvent.click(screen.getByRole("button"));
		expect(window.location).toBe("/account/");
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

		expect(window.location).toBe(defaultParams.redirectURL);
	});

	it("replaces potentially unsafe URLs in query param", async () => {
		Object.defineProperty(window, "location", {
			writable: true,
			value: {
				...windowLocationValues,
				search: "?test=123&redirect=https://somewhere.com",
				pathname: "/",
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

	it("should use redirectUrl from customFields if coming from /pagebulder/", async () => {
		const referrerURL = "http://localhost/pagebuilder/";
		Object.defineProperty(document, "referrer", {
			value: referrerURL,
			configurable: true,
		});
		Object.defineProperty(window, "location", {
			writable: true,
			value: {
				...windowLocationValues,
				origin: 'http://localhost',
				href: 'http://localhost',
				search: '',
				pathname: '/'
			}
		});
		await render(<Test />);
		fireEvent.click(screen.getByRole("button"));
		expect(window.location).toBe("/account/");
		delete document.referrer;
	});

	// it("should use redirectUrl from localStorage", async () => {
	// 	const referrerURL = "http://localhost/featured-articles/";
	// 	Object.defineProperty(document, "referrer", {
	// 		value: referrerURL,
	// 		configurable: true,
	// 	});
	// 	Object.defineProperty(window, "location", {
	// 		writable: true,
	// 		value: {
	// 			...windowLocationValues,
	// 			origin: 'http://localhost',
	// 			href: 'http://localhost',
	// 			search: '',
	// 			pathname: '/'
	// 		}
	// 	});

	// 	useIdentity.mockImplementation(() => ({
	// 		isInitialized: true,
	// 		Identity: {
	// 			isLoggedIn: jest.fn(() => true),
	// 			getConfig: jest.fn(() => ({})),
	// 		},
	// 	}));

	// 	await render(<Test />);

	// 	expect(localStorage.getItem("ArcXP_redirectUrl")).toBe('http://localhost/featured-articles/');

	// 	fireEvent.click(screen.getByRole("button"));
	// 	expect(window.location).toBe("/featured-articles/");
	// 	expect(localStorage.getItem("ArcXP_redirectUrl")).toBeNull();
	// 	delete document.referrer;
	// });
});
