import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FormPasswordConfirm from ".";

describe("Form Password Confirm", () => {
	it("renders with required items", () => {
		render(<FormPasswordConfirm confirmLabel="Confirm" label="Password" name="field1" />);

		expect(screen.getByLabelText("Password")).not.toBeNull();
		expect(screen.getByLabelText("Confirm")).not.toBeNull();
	});

	it("renders with an error if the password is empty", () => {
		render(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				label="Password"
				name="field1"
				validationErrorMessage="Please enter something"
			/>
		);

		fireEvent.blur(screen.getByLabelText("Password"));

		expect(screen.getByText("Please enter something")).not.toBeNull();
	});

	it("renders with an error if the password confirm is not matching", () => {
		render(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmValidationErrorMessage="Must match password"
				label="Password"
				name="field1"
			/>
		);
		const passwordInput = screen.getByLabelText("Password");
		const confirmInput = screen.getByLabelText("Confirm");
		fireEvent.change(passwordInput, { target: { value: "thisIsMyPassword" } });
		fireEvent.change(confirmInput, { target: { value: "thisIsMyPassword!" } });
		fireEvent.blur(confirmInput);
		expect(screen.getByText("Must match password")).not.toBeNull();
	});

	it("renders with placeholders", () => {
		render(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmPlaceholder="Confirm Password"
				label="Password"
				name="field1"
				placeholder="Enter Password"
			/>
		);

		expect(screen.getByPlaceholderText("Enter Password")).not.toBeNull();
		expect(screen.getByPlaceholderText("Confirm Password")).not.toBeNull();
	});

	it("renders with tips", () => {
		render(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmTip="Confirm Tip"
				label="Password"
				tip="Password Tip"
				name="field1"
			/>
		);

		expect(screen.getByText("Password Tip")).not.toBeNull();
		expect(screen.getByText("Confirm Tip")).not.toBeNull();
	});

	it("renders errors if showDefaultError", () => {
		render(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmValidationErrorMessage="Must match password"
				label="Password"
				name="field1"
				showDefaultError
				validationErrorMessage="Please enter something"
			/>
		);

		expect(screen.getByText("Please enter something")).not.toBeNull();
		expect(screen.getByText("Must match password")).not.toBeNull();
	});

	it("renders errors if validation pattern is not met", () => {
		render(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmValidationErrorMessage="Must match password"
				label="Password"
				name="field1"
				showDefaultError
				validationPattern="^valid$"
				validationErrorMessage="Please enter something good"
			/>
		);

		const passwordInput = screen.getByLabelText("Password");
		fireEvent.change(passwordInput, { target: { value: "thisIsMyPassword" } });
		fireEvent.blur(passwordInput);
		expect(screen.getByText("Please enter something good")).not.toBeNull();
	});
});
