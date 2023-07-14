import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import HeadlinedSubmitForm from ".";

describe("Headlined Submit Form", () => {
	it("renders with required items", () => {
		render(<HeadlinedSubmitForm headline="Sign Up" buttonLabel="Submit" />);

		expect(screen.getByRole("form")).not.toBeNull();
		expect(screen.getByRole("button")).not.toBeNull();
	});

	it("does not submit if the input is invalid", () => {
		const callback = jest.fn();

		render(
			<HeadlinedSubmitForm headline="Sign Up" buttonLabel="Submit" onSubmit={callback}>
				<input name="inputField" type="email" defaultValue="invalid" />
			</HeadlinedSubmitForm>
		);

		fireEvent.click(screen.getByRole("button"));

		expect(callback).not.toHaveBeenCalled();
	});

	it("does submit if the input is valid", () => {
		const callback = jest.fn();

		render(
			<HeadlinedSubmitForm headline="Sign Up" buttonLabel="Submit" onSubmit={callback}>
				<input name="inputField" type="email" defaultValue="valid@email.com" />
			</HeadlinedSubmitForm>
		);

		fireEvent.click(screen.getByRole("button"));

		expect(callback).toHaveBeenCalledWith({
			inputField: "valid@email.com",
		});
	});

	it("shows a form error is text is passed in", () => {
		render(
			<HeadlinedSubmitForm
				headline="Sign Up"
				buttonLabel="Submit"
				formErrorText="This should show up in the error field"
			>
				<input name="inputField" type="email" defaultValue="valid@email.com" />
			</HeadlinedSubmitForm>
		);

		expect(screen.getByText("This should show up in the error field")).not.toBeNull();
	});
});
