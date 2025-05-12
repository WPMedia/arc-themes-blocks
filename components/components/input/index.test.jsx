import { render, screen, fireEvent } from "@testing-library/react";

import Input from ".";

describe("Input", () => {
	it("should render original and additional classes", () => {
		const ORIGINAL_CLASS = "c-input";
		const ADDITIONAL_CLASS = "additionalClass1";
		render(<Input label="label" name="name" className={ADDITIONAL_CLASS} />);
		expect(screen.getByTestId("label-container")).toHaveClass(ORIGINAL_CLASS);
		expect(screen.getByTestId("label-container")).toHaveClass(ADDITIONAL_CLASS);
	});

	it("should render original and radio classes if type === radio", () => {
		const ORIGINAL_CLASS = "c-input";
		const ADDITIONAL_CLASS = "additionalClass1";
		render(<Input label="label" type="radio" name="name" className={ADDITIONAL_CLASS} />);
		expect(screen.getByTestId("label-container")).toHaveClass(ORIGINAL_CLASS);
		expect(screen.getByTestId("label-container")).toHaveClass('c-input__radio');
	});

	it("renders with a label", () => {
		render(<Input name="test" label="label text" />);
		expect(screen.getByText("label text")).toBeInTheDocument();
	});

	it("renders with a tip", () => {
		render(<Input name="test" label="label" tip="tip text" />);
		expect(screen.getByText("tip text")).toBeInTheDocument();
	});

	it("renders with a placeholder", () => {
		render(<Input name="test" label="label" placeholder="Placeholder" />);
		expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
	});

	it("shows an error", () => {
		render(
			<Input
				name="test"
				showDefaultError
				label="input-label"
				validationErrorMessage="There has been an error"
				validationPattern="^valid$"
			/>,
		);
		fireEvent.change(screen.getByRole("textbox"), { target: { value: "f" } });
		expect(screen.getByText("There has been an error")).toBeInTheDocument();
	});

	it("shows error after blur and then typing", () => {
		render(<Input name="test" showDefaultError label="input-label" validationPattern="^valid$" />);
		fireEvent.blur(screen.getByRole("textbox"));
		fireEvent.change(screen.getByRole("textbox"), { target: { value: "f" } });
		// shows alert without an error message
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("shows hidden class if hidden true", () => {
		render(<Input name="test" label="label" hidden />);
		expect(screen.getByTestId("label-container")).toHaveClass("c-input--hidden");
	});

	it("renders autocomplete property", () => {
		render(<Input name="test" label="label" autoComplete="on" />);
		expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "on");
	});

	it("renders default value", () => {
		render(<Input name="test" label="label" defaultValue="default value" />);
		expect(screen.getByRole("textbox")).toHaveValue("default value");
	});

	it("renders required field", () => {
		render(<Input name="test" label="label" required />);
		expect(screen.getByRole("textbox")).toHaveAttribute("required");
	});

	it("renders a select dropdown", () => {
		render(
			<Input
				defaultValue="option1"
				name="test"
				label="label"
				options={[
					{ label: "Option 1", value: "option1" },
					{ label: "Option 2", value: "option2" },
				]}
				type="select"
			/>,
		);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
		expect(screen.getByRole("option", { name: "Option 1" }).selected).toBe(true);
		expect(screen.getByRole("option", { name: "Option 2" }).selected).toBe(false);
	});
});
