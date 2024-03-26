import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import BotChallengeProtection from ".";
import * as useRecaptcha from "../../utils/useRecaptcha";

jest.mock("../../utils/useRecaptcha");

const mockLogin = jest.fn(() => Promise.resolve());

const mockIdentity = {
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
	login: mockLogin,
};

const mockSales = {
	getConfig: jest.fn(() => {}),
};

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
	it("renders with required items", async () => {
		useRecaptcha.default.mockReturnValue({
			recaptchaVersion: "V2",
			siteKey: "123",
			isRecaptchaEnabled: true,
		});

		render(<BotChallengeProtection challengeIn="signin" />);

		await waitFor(() => {
			expect(screen.getByTestId("bot-challege-protection-container")).not.toBeNull();
		});
	});
	it("it does not render if identity is not initialized", () => {

		useRecaptcha.default.mockReturnValue({
			recaptchaVersion: "V2",
			siteKey: "123",
			isRecaptchaEnabled: true,
		});

		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			Identity: {
				...mockIdentity,
			},
		}));
		render(<BotChallengeProtection challengeIn="test" />);
		expect(screen.queryByTestId("bot-challege-protection-container")).toBeNull();
	});
});
