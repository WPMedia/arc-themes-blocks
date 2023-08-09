import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useFusionContext } from "fusion:context";
import LoginLinks from "./default";

useFusionContext.mockImplementation(
	jest.fn(() => ({
		siteProperties: {
			locale: "en",
		},
	}))
);

describe("LoginLinks", () => {
	it("renders nothing by default", () => {
		render(<LoginLinks customFields={{}} />);
		expect(screen.queryAllByRole("link")).toEqual([]);
	});

	it("renders login and sign up links", () => {
		render(<LoginLinks customFields={{ showLogin: true, showSignUp: true }} />);
		expect(screen.getAllByRole("link")).toHaveLength(2);
	});

	it("renders only login link", () => {
		render(<LoginLinks customFields={{ showLogin: true }} />);
		expect(screen.getByRole("link")).toHaveAttribute("href", "/account/login/");
	});

	it("renders only sign up link", () => {
		render(<LoginLinks customFields={{ showSignUp: true }} />);
		expect(screen.getByRole("link")).toHaveAttribute("href", "/account/signup/");
	});

	it("renders only forgot password link", () => {
		render(<LoginLinks customFields={{ showForgot: true }} />);
		expect(screen.getByRole("link")).toHaveAttribute("href", "/account/forgot-password/");
	});

	it("renders custom link URLs", () => {
		const customFields = {
			showLogin: true,
			showSignUp: true,
			showForgot: true,
			loginURL: "custom-login",
			forgotURL: "custom-forgot",
			signUpURL: "custom-signup",
		};
		render(<LoginLinks customFields={customFields} />);
		const links = screen.getAllByRole("link");
		expect(links[0]).toHaveAttribute("href", customFields.loginURL);
		expect(links[1]).toHaveAttribute("href", customFields.forgotURL);
		expect(links[2]).toHaveAttribute("href", customFields.signUpURL);
	});
});
