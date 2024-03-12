import React from "react";
import { render, screen } from "@testing-library/react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import BotChallengeProtection from ".";

jest.mock("@wpmedia/arc-themes-components");

describe("Bot challenge protection", () => {
	it("renders with required items", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => false,
			Identity: {}
		}));
		render(<BotChallengeProtection challengeIn="signin" />);

		expect(screen.getByTestId("bot-challege-protection-container")).not.toBeNull();
	});
});
