import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OneTimePassword from "./default";
import { useIdentity } from "@wpmedia/arc-themes-components";

const mockSubmitForm = jest.fn(() => Promise.resolve());
const mockIdentity = {
	requestOTALink: mockSubmitForm,
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: false,
		Identity: {
			...mockIdentity,
		},
	})),
	BotChallengeProtection: ({ challengeIn= 'magicLink' }) => <div data-testid={`reCapctha-${challengeIn}`} />
}));
jest.mock("fusion:properties", () => jest.fn(() => ({})));

describe("Identity One Time Password Request Form - Arc Block", () => {
	beforeEach(() => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
			},
		}));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Renders", () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			Identity: {
				...mockIdentity,
			},
		}));

		render(<OneTimePassword />);
		
		expect(screen.queryAllByRole("form").length).toEqual(0);
	});

	it("Does not render if Identity isn't initialized", () => {
		render(<OneTimePassword />);
		
		expect(screen.queryAllByRole("form").length).toEqual(1);
		expect(screen.getByTestId('reCapctha-magicLink')).toBeTruthy();
	});

	it("Should be able submit form", async () => {
		render(<OneTimePassword />);
		
		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email@test.com" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(mockSubmitForm).toHaveBeenCalled());
		await waitFor(() => expect(screen.getByText("identity-block.ota-success-heading")));
		await waitFor(() => expect(screen.getByText("identity-block.ota-success-body")));
	});

	it("Form submission handles 130001 error", async () => {
		const error = new Error("Captcha token invalid");
		error.code = "130001";

		const errorMessage = jest.fn(() => Promise.reject(error));

		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
				requestOTALink: errorMessage,
			},
		}));

		render(<OneTimePassword />);
		
		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email@test.com" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(errorMessage).toHaveBeenCalled());
	});

	it("Form submission handle other errors", async () => {
		const error = new Error("Fake error");
		error.code = "30001";

		const errorMessage = jest.fn(() => Promise.reject(error));

		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			Identity: {
				...mockIdentity,
				requestOTALink: errorMessage,
			},
		}));

		render(<OneTimePassword />);
		
		await waitFor(() => expect(screen.getByLabelText("identity-block.email-label")));
		fireEvent.change(screen.getByLabelText("identity-block.email-label"), {
			target: { value: "email@test.com" },
		});

		await waitFor(() => expect(screen.getByRole("button")));
		fireEvent.click(screen.getByRole("button"));

		await waitFor(() => expect(errorMessage).toHaveBeenCalled());
	});
});
