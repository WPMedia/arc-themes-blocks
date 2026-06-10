import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useIdentity } from "@wpmedia/arc-themes-components";

import SocialSignOnEditableFieldContainer from "./SocialSignOnEditableContainer";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(),
}));

const defaultProps = {
	blockClassName: "b-account",
	type: "Google",
	isConnected: false,
	socialIcon: <span data-testid="icon" />,
	onDisconnectFunction: jest.fn(),
};

describe("SocialSignOnEditableFieldContainer", () => {
	beforeEach(() => {
		useIdentity.mockReturnValue({
			Identity: { initAppleSignOn: jest.fn() },
			isInitialized: true,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the social sign-on container", () => {
		render(<SocialSignOnEditableFieldContainer {...defaultProps} />);
		expect(screen.getByText("Google")).toBeInTheDocument();
	});

	it("shows disconnect button when isConnected is true", () => {
		const onDisconnect = jest.fn();
		render(
			<SocialSignOnEditableFieldContainer
				{...defaultProps}
				isConnected
				onDisconnectFunction={onDisconnect}
			/>,
		);
		expect(screen.getByText("identity-block.disconnect-account")).not.toBeNull();
	});

	it("calls onDisconnectFunction when disconnect button is clicked", () => {
		const onDisconnect = jest.fn();
		render(
			<SocialSignOnEditableFieldContainer
				{...defaultProps}
				isConnected
				onDisconnectFunction={onDisconnect}
			/>,
		);
		fireEvent.click(screen.getByText("identity-block.disconnect-account"));
		expect(onDisconnect).toHaveBeenCalled();
	});

	it("shows connect button when isConnected is false", () => {
		render(<SocialSignOnEditableFieldContainer {...defaultProps} />);
		expect(screen.getByText("identity-block.connect-identity")).not.toBeNull();
	});

	it("calls google prompt when connect button clicked for Google type", () => {
		const mockPrompt = jest.fn();
		window.google = { accounts: { id: { prompt: mockPrompt } } };
		render(<SocialSignOnEditableFieldContainer {...defaultProps} type="Google" />);
		fireEvent.click(screen.getByText("identity-block.connect-identity"));
		expect(mockPrompt).toHaveBeenCalled();
		delete window.google;
	});

	it("calls onFacebookSignOn when connect button clicked for Facebook type", () => {
		const mockFB = jest.fn();
		window.onFacebookSignOn = mockFB;
		render(<SocialSignOnEditableFieldContainer {...defaultProps} type="Facebook" />);
		fireEvent.click(screen.getByText("identity-block.connect-identity"));
		expect(mockFB).toHaveBeenCalled();
		delete window.onFacebookSignOn;
	});

	it("calls Identity.initAppleSignOn when connect button clicked for Apple type", () => {
		const initAppleSignOn = jest.fn();
		useIdentity.mockReturnValue({
			Identity: { initAppleSignOn },
			isInitialized: true,
		});
		render(<SocialSignOnEditableFieldContainer {...defaultProps} type="Apple" />);
		fireEvent.click(screen.getByText("identity-block.connect-identity"));
		expect(initAppleSignOn).toHaveBeenCalled();
	});

	it("renders the social icon", () => {
		render(<SocialSignOnEditableFieldContainer {...defaultProps} />);
		expect(screen.getByTestId("icon")).not.toBeNull();
	});

	it("renders the type name", () => {
		render(<SocialSignOnEditableFieldContainer {...defaultProps} type="Twitter" />);
		expect(screen.getByText("Twitter")).not.toBeNull();
	});
});
