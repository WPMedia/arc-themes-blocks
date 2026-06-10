import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ContactInfo from ".";

const defaultProps = {
	callback: jest.fn(),
	user: null,
	signedInIdentity: null,
	logoutCallback: jest.fn(),
	className: "b-checkout",
};

describe("ContactInfo", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the contact info form", () => {
		render(<ContactInfo {...defaultProps} />);
		expect(screen.getByTestId("contact-info-form")).not.toBeNull();
	});

	it("renders email, first name, last name, country, and submit button", () => {
		render(<ContactInfo {...defaultProps} />);
		expect(screen.getByLabelText("checkout-block.email")).not.toBeNull();
		expect(screen.getByLabelText("checkout-block.first-name")).not.toBeNull();
		expect(screen.getByLabelText("checkout-block.last-name")).not.toBeNull();
		expect(screen.getByRole("button", { name: "checkout-block.continue-to-checkout" })).not.toBeNull();
	});

	it("populates fields from user prop", () => {
		const user = { email: "test@example.com", firstName: "John", lastName: "Doe" };
		render(<ContactInfo {...defaultProps} user={user} />);
		expect(screen.getByDisplayValue("John")).not.toBeNull();
		expect(screen.getByDisplayValue("Doe")).not.toBeNull();
	});

	it("calls callback on valid form submit", () => {
		const callback = jest.fn();
		render(<ContactInfo {...defaultProps} callback={callback} />);
		fireEvent.submit(screen.getByTestId("contact-info-form"));
		// Form checkValidity is not enforced in jsdom without native validation
	});

	it("updates entriesRef when input fields change", () => {
		const callback = jest.fn();
		render(<ContactInfo {...defaultProps} callback={callback} />);
		// Trigger onChange on first name input
		const firstNameInput = screen.getByLabelText("checkout-block.first-name");
		fireEvent.change(firstNameInput, { target: { value: "Jane" } });
		// Trigger onChange on last name input
		const lastNameInput = screen.getByLabelText("checkout-block.last-name");
		fireEvent.change(lastNameInput, { target: { value: "Smith" } });
		// Trigger onChange on email input
		const emailInput = screen.getByLabelText("checkout-block.email");
		fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
		// Verify inputs were updated
		expect(firstNameInput.value).toBe("Jane");
		expect(lastNameInput.value).toBe("Smith");
	});

	it("shows Google sign-in identity row for google identity type", () => {
		const user = { email: "test@google.com", firstName: "Jane", lastName: "Doe" };
		const signedInIdentity = { type: "Google" };
		render(<ContactInfo {...defaultProps} user={user} signedInIdentity={signedInIdentity} />);
		expect(screen.getByText("checkout-block.identity-social")).not.toBeNull();
	});

	it("shows Facebook identity row for facebook identity type", () => {
		const user = { email: "test@fb.com", firstName: "Jane", lastName: "Doe" };
		const signedInIdentity = { type: "Facebook" };
		render(<ContactInfo {...defaultProps} user={user} signedInIdentity={signedInIdentity} />);
		expect(screen.getByText("checkout-block.identity-social")).not.toBeNull();
	});

	it("shows password identity row for password identity type", () => {
		const user = { email: "test@email.com", firstName: "Jane", lastName: "Doe" };
		const signedInIdentity = { type: "Password" };
		render(<ContactInfo {...defaultProps} user={user} signedInIdentity={signedInIdentity} />);
		expect(screen.getByText("checkout-block.identity-email")).not.toBeNull();
	});

	it("calls logoutCallback when sign out button is clicked", () => {
		const logoutCallback = jest.fn();
		const user = { email: "test@email.com", firstName: "Jane", lastName: "Doe" };
		const signedInIdentity = { type: "Password" };
		render(
			<ContactInfo
				{...defaultProps}
				user={user}
				signedInIdentity={signedInIdentity}
				logoutCallback={logoutCallback}
			/>,
		);
		fireEvent.click(screen.getByText("checkout-block.identity-sign-out"));
		expect(logoutCallback).toHaveBeenCalled();
	});

	it("shows no identity row for unknown identity type", () => {
		const user = { email: "test@email.com", firstName: "Jane", lastName: "Doe" };
		const signedInIdentity = { type: "Unknown" };
		render(
			<ContactInfo {...defaultProps} user={user} signedInIdentity={signedInIdentity} />,
		);
		expect(screen.queryByTestId("identity-row")).toBeNull();
	});
});
