import React, { useState } from "react";
import { Input } from "@wpmedia/arc-themes-components";

const FormPasswordConfirm = ({
	autoComplete,
	confirmLabel,
	confirmPlaceholder,
	confirmTip,
	confirmValidationErrorMessage,
	label,
	name,
	placeholder,
	showDefaultError = false,
	tip,
	validationPattern,
	validationErrorMessage,
	tipPasswordMessage,
	className
}) => {
	const [password, setPassword] = useState("");

	const escapeForHtmlPattern = (value) =>{
		const specialChars = /[.*+?^${}()|[\]\\]/g;
		const newValue = value.replace(specialChars, '\\$&');
		return newValue;
	};

	const fieldParameters = {
		...(autoComplete ? { autoComplete } : {}),
		...(placeholder ? { placeholder } : {}),
		...(showDefaultError ? { showDefaultError } : {}),
		...(tip ? { tip } : {}),
		...(validationErrorMessage ? { validationErrorMessage } : {}),
		...(validationPattern ? { validationPattern } : {}),
	};

	const confirmFieldParameters = {
		...(autoComplete ? { autoComplete } : {}),
		...(confirmPlaceholder ? { placeholder: confirmPlaceholder } : {}),
		...(showDefaultError ? { showDefaultError } : {}),
		...(confirmTip ? { tip: confirmTip } : {}),
		...(confirmValidationErrorMessage
			? { validationErrorMessage: confirmValidationErrorMessage }
			: {}),
	};

	return (
		<>
			<Input
				{...fieldParameters}
				label={label}
				name={name}
				onChange={({ value }) => setPassword(value)}
				required
				type="password"
				tip = {tipPasswordMessage}
			/>
			<Input
				{...confirmFieldParameters}
				label={confirmLabel}
				name={`${name}-confirmation`}
				required
				type="password"
				validationPattern={escapeForHtmlPattern(password)}
				className={className}
			/>
		</>
	);
};

export default FormPasswordConfirm;
