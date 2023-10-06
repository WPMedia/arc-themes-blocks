import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useIdentity from "../../../components/identity";
import PasswordEditableFieldContainer from "./PasswordEditableFieldContainer";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);

jest.mock("../../../components/identity");

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../../intl.json")[phrase][locale]),
	})),
}));

const responseData = {
	pwLowercase: "1",
	pwMinLength: "1",
	pwPwNumbers: "1",
	pwSpecialCharacters: "1",
	pwUppercase: "1",
};

const getConfigMock = jest.fn(() => Promise.resolve(responseData));

describe("PasswordEditableFieldContainer", () => {
	afterAll(() => {
		jest.restoreAllMocks();
	});

	it("should render component with Add Password label", async () => {
		useIdentity.mockImplementation(() => ({
			Identity: {
				getConfig: getConfigMock,
			},
		}));

		await act(async () => {
			await render(<PasswordEditableFieldContainer />);
		});
		await getConfigMock;
		expect(screen.getByText("Add Password")).not.toBeNull();
	});

	it("should render component with password placeholder label", async () => {
		useIdentity.mockImplementation(() => ({
			Identity: {
				getConfig: getConfigMock,
			},
		}));

		await act(async () => {
			await render(<PasswordEditableFieldContainer hasPassword />);
		});
		await getConfigMock;
		expect(screen.getByText("**********")).not.toBeNull();
	});

	it("renders current password field and password confirm fields when hasPassword and editing", async () => {
		useIdentity.mockImplementation(() => ({
			Identity: {
				getConfig: getConfigMock,
			},
		}));

		await act(async () => {
			await render(<PasswordEditableFieldContainer hasPassword />);
		});
		await getConfigMock;
		expect(screen.getByText("**********")).not.toBeNull();
		fireEvent.click(screen.getByRole("button"));
		expect(screen.getByLabelText("Current Password")).not.toBeNull();
		expect(screen.getByLabelText("New Password")).not.toBeNull();
		expect(screen.getByLabelText("Confirm password")).not.toBeNull();
	});

	it("renders only password confirm fields when NOT hasPassword and editing", async () => {
		useIdentity.mockImplementation(() => ({
			Identity: {
				getConfig: getConfigMock,
			},
		}));

		await act(async () => {
			await render(<PasswordEditableFieldContainer />);
		});
		await getConfigMock;
		expect(screen.getByText("Add Password")).not.toBeNull();
		fireEvent.click(screen.getByRole("button"));
		expect(screen.getByLabelText("New Password")).not.toBeNull();
		expect(screen.getByLabelText("Confirm password")).not.toBeNull();
	});
});
