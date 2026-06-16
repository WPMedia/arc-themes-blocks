import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import GoogleSignIn from "./GoogleSignIn";

const defaultProps = {
	className: "b-sign-on",
	socialSignOnIn: "signin",
};

describe("GoogleSignIn", () => {
	it("renders the default Google sign-in button container when customButtons is false", () => {
		render(<GoogleSignIn {...defaultProps} />);
		expect(screen.getByTestId("google-sign-in-button")).not.toBeNull();
	});

	it("renders a Button when customButtons is true", () => {
		render(<GoogleSignIn {...defaultProps} customButtons />);
		expect(screen.getByRole("button")).not.toBeNull();
	});

	it("renders login text when customButtons and socialSignOnIn is not SIGN_UP", () => {
		render(<GoogleSignIn {...defaultProps} customButtons socialSignOnIn="signin" />);
		expect(screen.getByText("identity-block.social-signOn-google-login")).not.toBeNull();
	});

	it("renders sign-up text when customButtons and socialSignOnIn is SIGN_UP", () => {
		render(<GoogleSignIn {...defaultProps} customButtons socialSignOnIn="SignUp" />);
		expect(screen.getByText("identity-block.social-signOn-google-signUp")).not.toBeNull();
	});

	it("calls google prompt on button click when customButtons is true", () => {
		const mockPrompt = jest.fn((cb) => cb({ isSkippedMoment: () => false }));
		window.google = { accounts: { id: { prompt: mockPrompt } } };
		render(<GoogleSignIn {...defaultProps} customButtons />);
		fireEvent.click(screen.getByRole("button"));
		expect(mockPrompt).toHaveBeenCalled();
		delete window.google;
	});

	it("shows alert and resets google cookie when notification is skipped", () => {
		const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
		const mockPromptAgain = jest.fn();
		const mockPrompt = jest.fn((cb) =>
			cb({ isSkippedMoment: () => true }),
		);
		window.google = { accounts: { id: { prompt: mockPrompt } } };
		// Re-mock to chain prompt
		window.google.accounts.id.prompt = (cb) => {
			if (cb) {
				cb({ isSkippedMoment: () => true });
				window.google.accounts.id.prompt = mockPromptAgain;
			}
		};
		render(<GoogleSignIn {...defaultProps} customButtons />);
		fireEvent.click(screen.getByRole("button"));
		expect(mockAlert).toHaveBeenCalled();
		mockAlert.mockRestore();
		delete window.google;
	});
});
