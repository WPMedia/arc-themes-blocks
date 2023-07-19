const passwordValidationMessage = ({
	defaultMessage,
	options = {
		lowercase: {
			value: 0,
			message: "",
		},
		uppercase: {
			value: 0,
			message: "",
		},
		minLength: {
			value: 0,
			message: "",
		},
		numbers: {
			value: 0,
			message: "",
		},
		specialCharacters: {
			value: 0,
			message: "",
		},
	},
}) => {
	const message = [defaultMessage];
	Object.keys(options).forEach((item) => {
		if (options[item].value > 0) {
			message.push(options[item].message);
		}
	});

	return message.join(" ");
};

export default passwordValidationMessage;
