import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import PasswordEditableFieldContainer from "./PasswordEditableFieldContainer";
import FormPasswordConfirm from "../../../components/form-password-confirm";

jest.mock("../../../components/form-password-confirm", () => () => <div>Password Confirm</div>);

describe("PasswordEditableFieldContainer", () => {
	it("should render component with Add Password label", async () => {
		render(<PasswordEditableFieldContainer blockClassName="testClass" email="email" />);
		expect(await screen.findByText("identity-block.add-password")).not.toBeNull();
	});

	it("should render component with password placeholder label", async () => {
		render(<PasswordEditableFieldContainer blockClassName="testClass" email="email" hasPassword />);
		expect(await screen.findByText("identity-block.password-placeholder")).not.toBeNull();
	});

	it("renders current password field and password confirm fields when hasPassword and editing", async () => {
		render(<PasswordEditableFieldContainer blockClassName="testClass" email="email" hasPassword />);
		expect(await screen.findByText("identity-block.password-placeholder")).not.toBeNull();
		fireEvent.click(screen.getByRole("button"));
		expect(screen.getByLabelText("identity-block.current-password")).not.toBeNull();
		expect(screen.getByText("Password Confirm")).not.toBeNull();
	});

	it("renders only password confirm fields when NOT hasPassword and editing", async () => {
		render(<PasswordEditableFieldContainer blockClassName="testClass" email="email" />);
		expect(await screen.findByText("identity-block.add-password")).not.toBeNull();
		fireEvent.click(screen.getByRole("button"));
		expect(screen.getByText("Password Confirm")).not.toBeNull();
	});
});
