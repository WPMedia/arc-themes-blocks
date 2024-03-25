import React from "react";
import { render, screen } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import BotChallengeProtection from ".";

const mockLogin = jest.fn(() => Promise.resolve());

const mockIdentity = {
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
	login: mockLogin,
};

const mockSales = {
	getConfig: jest.fn(() => {})
}

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			...mockIdentity,
		},
	})),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			...mockSales,
		},
	})),
}));

describe("Bot challenge protection", () => {
	it("renders with required items", () => {
		render(<BotChallengeProtection challengeIn="signin" />);

		expect(screen.getByTestId("bot-challege-protection-container")).not.toBeNull();
	});
	it("it does not render if identity is not initialized", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			Identity: {
				...mockIdentity,
			},
		}))
		render(<BotChallengeProtection challengeIn="test" />);
		expect(screen.queryByTestId("bot-challege-protection-container")).toBeNull();
	});
});
