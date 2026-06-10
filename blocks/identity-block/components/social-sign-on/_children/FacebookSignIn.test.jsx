import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import FacebookSignIn from "./FacebookSignIn";

const defaultProps = {
	className: "b-sign-on",
	socialSignOnIn: "signin",
};

describe("FacebookSignIn", () => {
	it("renders the default FB login button container when customButtons is false", () => {
		render(<FacebookSignIn {...defaultProps} />);
		expect(screen.getByTestId("fb-login-button")).not.toBeNull();
	});

	it("renders a Button when customButtons is true", () => {
		render(<FacebookSignIn {...defaultProps} customButtons />);
		expect(screen.getByRole("button")).not.toBeNull();
	});

	it("renders login text when customButtons and socialSignOnIn is not SIGN_UP", () => {
		render(<FacebookSignIn {...defaultProps} customButtons socialSignOnIn="signin" />);
		expect(screen.getByText("identity-block.social-signOn-facebook-login")).not.toBeNull();
	});

	it("renders sign-up text when customButtons and socialSignOnIn is SIGN_UP", () => {
		render(<FacebookSignIn {...defaultProps} customButtons socialSignOnIn="SignUp" />);
		expect(screen.getByText("identity-block.social-signOn-facebook-signUp")).not.toBeNull();
	});

	it("uses login_with data-button-type when not signing up", () => {
		render(<FacebookSignIn {...defaultProps} socialSignOnIn="signin" />);
		const fbContainer = screen.getByTestId("fb-login-button");
		const allElements = within(fbContainer).getAllByRole("generic");
		expect(allElements[0]).toHaveAttribute("data-button-type", "login_with");
	});

	it("uses continue_with data-button-type when signing up", () => {
		render(<FacebookSignIn {...defaultProps} socialSignOnIn="SignUp" />);
		const fbContainer = screen.getByTestId("fb-login-button");
		const allElements = within(fbContainer).getAllByRole("generic");
		expect(allElements[0]).toHaveAttribute("data-button-type", "continue_with");
	});
});
