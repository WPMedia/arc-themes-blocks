import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import EditableFormInputField, { ConditionalFormContainer } from ".";

describe("Editable form input field", () => {
	it("conditional form renders a form when show form elected", () => {
		render(<ConditionalFormContainer showForm />);
		expect(screen.getByTestId("conditional-form")).not.toBeNull();
	});

	it("conditional form does not render a form when show form not elected", () => {
		render(<ConditionalFormContainer showForm={false} />);
		expect(screen.queryByTestId("conditional-form")).toBeNull();
	});

	it("editable form field shows initial value, label, and edit button when not editable and hides children", () => {
		render(
			<EditableFormInputField
				initialValue="initial value"
				editText="edit text"
				label="label"
				onSubmit={() => {}}
			>
				<p id="test-child">Test child</p>
			</EditableFormInputField>
		);
		expect(screen.getByText("initial value")).not.toBeNull();
		expect(screen.getByText("edit text")).not.toBeNull();
		expect(screen.getByText("label")).not.toBeNull();
	});

	it("shows error text if passed in with formErrorText prop", () => {
		render(
			<EditableFormInputField
				initialValue="initial value"
				editText="edit text"
				label="label"
				onSubmit={() => {}}
				formErrorText="Error Text"
			>
				<p id="test-child">Test child</p>
			</EditableFormInputField>
		);

		expect(screen.getByText("Error Text")).not.toBeNull();
	});

	it("editable form field hides edit button when editable and shows children", async () => {
		render(
			<EditableFormInputField
				initialValue="initial value"
				editText="edit text"
				label="label"
				onSubmit={() => {}}
			>
				<p id="test-child">Test child</p>
			</EditableFormInputField>
		);

		fireEvent.click(screen.getByRole("button"));
		expect(screen.queryByText("initial value")).toBeNull();
		expect(screen.queryByText("edit text")).toBeNull();
	});

	it("does not submit if the input is invalid", () => {
		const callback = jest.fn(() => Promise.resolve());

		render(
			<ConditionalFormContainer onSubmit={callback} setIsEditable={() => {}} showForm>
				<input name="inputField" type="email" defaultValue="invalid" />
			</ConditionalFormContainer>
		);

		fireEvent.submit(screen.getByTestId("conditional-form"));

		expect(callback).not.toHaveBeenCalled();
	});

	it("does submit if the input is valid", () => {
		const callback = jest.fn(() => Promise.resolve());

		render(
			<ConditionalFormContainer onSubmit={callback} showForm setIsEditable={() => {}}>
				<input name="inputField" type="email" defaultValue="valid@email.com" />
			</ConditionalFormContainer>
		);

		fireEvent.submit(screen.getByTestId("conditional-form"));

		expect(callback).toHaveBeenCalledWith({
			inputField: "valid@email.com",
		});
	});

	it("calls passed in cancelEdit function when using cancel button", () => {
		const callback = jest.fn();

		render(
			<EditableFormInputField
				cancelEdit={callback}
				cancelText="cancel change"
				formErrorText="Error"
			>
				<input name="inputField" type="email" defaultValue="invalid" />
			</EditableFormInputField>
		);

		fireEvent.click(screen.getByText("cancel change"));

		expect(callback).toHaveBeenCalled();
	});

	it("calls passed in cancelEdit function when using cancel button", () => {
		render(
			<EditableFormInputField formErrorText="Error">
				<input name="inputField" type="email" defaultValue="invalid" />
			</EditableFormInputField>
		);

		expect(screen.getByText("Error")).not.toBeNull();
	});
});
