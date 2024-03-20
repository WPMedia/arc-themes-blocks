import React from "react";
import { render, screen } from "@testing-library/react";
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
});
