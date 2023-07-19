import passwordValidationMessage from "./password-validation-message";

describe("Validate Password Message", () => {
	it("returns default message if no options", () => {
		const defaultMessage = "default message output";
		const message = passwordValidationMessage({ defaultMessage });

		expect(message).toBe(defaultMessage);
	});

	it("returns default message and all message", () => {
		const defaultMessage = "default message output";
		const message = passwordValidationMessage({
			defaultMessage,
			options: {
				lowercase: { value: 1, message: "lowercase message" },
				uppercase: { value: 1, message: "uppercase message" },
				minLength: { value: 1, message: "minLength message" },
				numbers: { value: 1, message: "numbers message" },
				specialCharacters: { value: 1, message: "specialCharacters message" },
			},
		});

		expect(message).toBe(
			`${defaultMessage} lowercase message uppercase message minLength message numbers message specialCharacters message`
		);
	});

	it("returns default message and lowercase message", () => {
		const defaultMessage = "default message output";
		const message = passwordValidationMessage({
			defaultMessage,
			options: {
				lowercase: { value: 1, message: "lowercase message" },
			},
		});

		expect(message).toBe(`${defaultMessage} lowercase message`);
	});

	it("returns default message and uppercase message", () => {
		const defaultMessage = "default message output";
		const message = passwordValidationMessage({
			defaultMessage,
			options: {
				uppercase: { value: 1, message: "uppercase message" },
			},
		});

		expect(message).toBe(`${defaultMessage} uppercase message`);
	});

	it("returns default message and minLength message", () => {
		const defaultMessage = "default message output";
		const message = passwordValidationMessage({
			defaultMessage,
			options: {
				minLength: { value: 1, message: "minLength message" },
			},
		});

		expect(message).toBe(`${defaultMessage} minLength message`);
	});

	it("returns default message and numbers message", () => {
		const defaultMessage = "default message output";
		const message = passwordValidationMessage({
			defaultMessage,
			options: {
				numbers: { value: 1, message: "numbers message" },
			},
		});

		expect(message).toBe(`${defaultMessage} numbers message`);
	});

	it("returns default message and specialCharacters message", () => {
		const defaultMessage = "default message output";
		const message = passwordValidationMessage({
			defaultMessage,
			options: {
				specialCharacters: { value: 1, message: "specialCharacters message" },
			},
		});

		expect(message).toBe(`${defaultMessage} specialCharacters message`);
	});
});
