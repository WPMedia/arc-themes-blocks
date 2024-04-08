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
}) => {
	const [password, setPassword] = useState("");

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
			/>
			<Input
				{...confirmFieldParameters}
				label={confirmLabel}
				name={`${name}-confirmation`}
				required
				type="password"
				validationPattern={`^${password}$`}
			/>
		</>
	);
};

export default FormPasswordConfirm;
