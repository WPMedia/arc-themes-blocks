import { render, screen } from "@testing-library/react";
import useIdentity from "../../utils/hooks/use-identity";
import BotChallengeProtection from ".";
import useRecaptcha from "../../utils/hooks/use-reCaptcha";

jest.mock("../../utils/hooks/use-reCaptcha");
jest.mock("../../utils/hooks/use-identity");

const mockLogin = jest.fn(() => Promise.resolve());

const mockIdentity = {
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
	login: mockLogin,
};

const mockProps = {
	className: "test-class",
	challengeIn: "signin",
	setCaptchaToken: () => jest.fn(),
	captchaError: null,
	error: null,
	setCaptchaError: () => jest.fn(),
	captchaErrorText: "Test error message",
	resetRecaptcha: true,
};

describe("Bot challenge protection", () => {
	it("renders with required items", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));

		useRecaptcha.mockImplementation(() => ({
			recaptchaVersion: "V2",
			siteKey: "123",
			isRecaptchaEnabled: true,
		}));

		render(<BotChallengeProtection {...mockProps} challengeIn="signin" />);

		expect(screen.getByTestId("bot-challege-protection-container-V2")).not.toBeNull();
	});
	it("it does not render if identity is not initialized", () => {
		useRecaptcha.mockReturnValue({
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
		render(<BotChallengeProtection {...mockProps} challengeIn="signin" />);
		expect(screen.queryByTestId("bot-challege-protection-container")).toBeNull();
	});

	it("Should render reCaptchaV2 component", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));

		useRecaptcha.mockReturnValue({
			recaptchaVersion: "V2",
			siteKey: "123",
			isRecaptchaEnabled: true,
		});

		const { getByTestId } = render(<BotChallengeProtection {...mockProps} challengeIn="signin" />);
		// eslint-disable-next-line
		expect(getByTestId("bot-challege-protection-container-V2")).toBeInTheDocument();
	});

	it("should render ReCAPTCHA v3 component", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));

		useRecaptcha.mockReturnValue({
			recaptchaVersion: "V3",
			siteKey: "123",
			isRecaptchaEnabled: true,
		});

		const { getByTestId } = render(<BotChallengeProtection {...mockProps} challengeIn="signin" />);
		// eslint-disable-next-line
		expect(getByTestId("bot-challege-protection-container-V3")).toBeInTheDocument();
	});

	it("should reset ReCAPTCHA if there is captchaError or error", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));

		useRecaptcha.mockReturnValue({
			recaptchaVersion: "V3",
			siteKey: "123",
			isRecaptchaEnabled: true,
		});

		const { getByTestId } = render(<BotChallengeProtection {...mockProps} challengeIn="signin" />);
		// eslint-disable-next-line
		expect(getByTestId("bot-challege-protection-container-V3")).toBeInTheDocument();
	});

	it("reCaptcha is not rendered if siteKey doesn't exist", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));

		useRecaptcha.mockReturnValue({
			recaptchaVersion: "V2",
			siteKey: null,
			isRecaptchaEnabled: true,
		});

		render(<BotChallengeProtection {...mockProps} challengeIn="signin" />);

		expect(screen.queryByTestId("bot-challege-protection-container")).toBeNull();
	});
});
