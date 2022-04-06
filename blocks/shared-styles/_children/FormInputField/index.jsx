import React, { useEffect, useState, useRef } from "react";
import PropTypes from "@arc-fusion/prop-types";

import { PrimaryFont } from "@wpmedia/shared-styles";

import "./styles.scss";

export const FIELD_TYPES = {
	EMAIL: "email",
	TEXT: "text",
	PASSWORD: "password",
	SELECT: "select",
};

const FormInputField = ({
	autoComplete,
	defaultValue = "",
	label,
	name,
	onChange = () => {},
	placeholder,
	required = false,
	hidden = false,
	options = null, // Array of objects. Used for select list - used if type = FIELD_TYPES.SELECT.
	optionValueKey, // Value key to use in the options objects
	optionLabelKey, // Label key to use in the options objects
	showDefaultError = false,
	tip,
	type = FIELD_TYPES.TEXT,
	validationErrorMessage,
	validationPattern,
}) => {
	const [valid, setValid] = useState(true);
	const [value, setValue] = useState(defaultValue);
	const [initialBlur, setInitialBlur] = useState(showDefaultError);
	const inputElement = useRef();

	useEffect(() => {
		if (initialBlur) {
			if (validationErrorMessage) {
				inputElement.current.setCustomValidity("");
			}
			const isValid = inputElement.current?.checkValidity();
			if (!isValid && validationErrorMessage) {
				inputElement.current.setCustomValidity(validationErrorMessage);
			}
			setValid(isValid);
		}
	}, [initialBlur, inputElement, validationErrorMessage, validationPattern, value]);

	const handleBlur = () => {
		setInitialBlur(true);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
		onChange({ value: event.target.value });
	};

	const infoId = `id_${name}_error`;
	const inputId = `id_${name}_input`;

	const fieldParameters = {
		...(autoComplete ? { autoComplete } : {}),
		...(defaultValue !== "" ? { defaultValue } : {}),
		...(validationPattern ? { pattern: validationPattern } : {}),
		...(placeholder ? { placeholder, "aria-placeholder": placeholder } : {}),
		...(required ? { required } : {}),
		...(tip || !valid ? { "aria-describedby": infoId } : {}),
		...(!valid ? { "aria-invalid": true } : {}),
	};

	return (
		<PrimaryFont as="div" className="xpmedia-form-field">
			<label
				className={`xpmedia-form-field-label ${hidden ? " xpmedia-form-field-hidden" : ""}`}
				htmlFor={inputId}
			>
				{label}
			</label>
			{type === FIELD_TYPES.SELECT ? (
				<select
					className={[
						"xpmedia-form-field-input",
						...(hidden ? ["xpmedia-form-field-hidden"] : []),
						...(!valid ? ["xpmedia-form-field-input--error"] : []),
					].join(" ")}
					id={inputId}
					name={name}
					onBlur={handleBlur}
					onChange={handleChange}
					ref={inputElement}
					{...fieldParameters}
				>
					{options &&
						options.map((option) => (
							<option key={option[optionValueKey]} value={option[optionValueKey]}>
								{option[optionLabelKey]}
							</option>
						))}
				</select>
			) : (
				<input
					className={[
						"xpmedia-form-field-input",
						...(hidden ? ["xpmedia-form-field-hidden"] : []),
						...(!valid ? ["xpmedia-form-field-input--error"] : []),
					].join(" ")}
					id={inputId}
					name={name}
					type={type}
					onBlur={handleBlur}
					onChange={handleChange}
					ref={inputElement}
					{...fieldParameters}
				/>
			)}

			{tip || !valid ? (
				<div
					className={[
						"xpmedia-form-field-tip",
						...(!valid ? ["xpmedia-form-field-tip--error"] : []),
					].join(" ")}
					id={infoId}
				>
					{!valid && inputElement.current?.validationMessage ? (
						<span role="alert">{`${inputElement.current.validationMessage} `}</span>
					) : null}
					{tip ? <span>{tip}</span> : null}
				</div>
			) : null}
		</PrimaryFont>
	);
};

FormInputField.propTypes = {
	defaultValue: PropTypes.string,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	hidden: PropTypes.bool,
	options: PropTypes.array,
	optionValueKey: PropTypes.string,
	optionLabelKey: PropTypes.string,
	showDefaultError: PropTypes.bool,
	tip: PropTypes.string,
	type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
	validationErrorMessage: PropTypes.string,
	validationPattern: PropTypes.string,
};

export default FormInputField;
