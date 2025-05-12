import { useEffect, useState, useRef } from "react";

import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-input";

export const FIELD_TYPES = {
	EMAIL: "email",
	PASSWORD: "password",
	TEXT: "text",
	SELECT: "select",
	RADIO: "radio",
};

const INPUT_SIZE = {
	LARGE: "large",
	SMALL: "small",
};

const INPUT_STATUS = {
	DEFAULT: "default",
	ERROR: "error",
	SUCCESS: "success",
	WARNING: "warning",
};

const getDerivedInputState = ({ valid, inputState }) => {
	// regex input validation overrides props input state
	if (!valid) {
		return INPUT_STATUS.ERROR;
	}

	// falls back to default if no props input state
	return inputState || INPUT_STATUS.DEFAULT;
};

const Input = ({
	autoComplete,
	className,
	defaultValue,
	hidden,
	inputState,
	label,
	name,
	onChange,
	checked,
	optionLabelKey,
	options,
	optionValueKey,
	placeholder,
	required,
	showDefaultError,
	size,
	tip,
	type,
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

	// derive input state for determining variant class names
	const derivedInputState = getDerivedInputState({ valid, inputState });

	// todo: implement hidden in parent div rather than label, input, etc
	const containerClassNames = [
		COMPONENT_CLASS_NAME,
		className,
		`${COMPONENT_CLASS_NAME}--${size}`,
		// hidden overrides input state
		hidden ? `${COMPONENT_CLASS_NAME}--hidden` : `${COMPONENT_CLASS_NAME}--${derivedInputState}`,
		type === FIELD_TYPES.RADIO ? `${COMPONENT_CLASS_NAME}__radio` : undefined
	]
		.filter((classString) => classString)
		.join(" ");

	return (
		<div className={containerClassNames} data-testid="label-container">
			{type !== FIELD_TYPES.RADIO && (
				<label className={`${COMPONENT_CLASS_NAME}__label`} htmlFor={inputId}>
					{label}
				</label>
			)}
			{type === FIELD_TYPES.SELECT ? (
				<select
					className={`${COMPONENT_CLASS_NAME}__input ${COMPONENT_CLASS_NAME}__dropdown`}
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
					className={`${COMPONENT_CLASS_NAME}__input`}
					key={optionValueKey}
					id={inputId}
					name={name}
					type={type}
					onBlur={handleBlur}
					checked={checked}
					onChange={handleChange}
					ref={inputElement}
					{...fieldParameters}
				/>
			)}
			{type === FIELD_TYPES.RADIO && (
				<label className={`${COMPONENT_CLASS_NAME}__label`} htmlFor={inputId}>
					{label}
				</label>
			)}
			{tip || !valid ? (
				<div className={`${COMPONENT_CLASS_NAME}__tip`} id={infoId}>
					{!valid && inputElement.current?.validationMessage && (
						<span role="alert">{`${inputElement.current.validationMessage} `}</span>
					)}
					{tip && valid && <span>{tip}</span>}
				</div>
			) : null}
		</div>
	);
};

Input.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Default value for the input */
	defaultValue: PropTypes.string,
	/** Whether the input, label, and tip are hidden */
	hidden: PropTypes.bool,
	/** Status of the input passed down */
	inputState: PropTypes.oneOf(Object.values(INPUT_STATUS)),
	/** Label for the input for indicating to users input's purpose */
	label: PropTypes.string.isRequired,
	/** Name of the input for submitting data */
	name: PropTypes.string.isRequired,
	/** Callback function for when the input's value changes */
	onChange: PropTypes.func,
	/** Label key for the option objects */
	optionLabelKey: PropTypes.string,
	/** Array of option objects if type = FIELD_TYPES.SELECT */
	options: PropTypes.array,
	/** Value key for the option objects */
	optionValueKey: PropTypes.string,
	/** Check status for radioButton */
	checked: PropTypes.bool,
	/** Placeholder text for the input */
	placeholder: PropTypes.string,
	/** Whether the input is required */
	required: PropTypes.bool,
	/** Whether to show the default error message */
	showDefaultError: PropTypes.bool,
	/** Size of the input */
	size: PropTypes.oneOf(Object.values(INPUT_SIZE)),
	/** Tip for the input. Shown on the page as a hint for users */
	tip: PropTypes.string,
	/** Type of the input based on available types listed */
	type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
	/** The error message shown upon invalid input that doesn't meet `validationPattern` */
	validationErrorMessage: PropTypes.string,
	/** Validation Pattern is a regex pattern for handling errors */
	validationPattern: PropTypes.string,
};

Input.defaultProps = {
	defaultValue: "",
	hidden: false,
	onChange: () => {},
	optionLabelKey: "label",
	optionValueKey: "value",
	required: false,
	showDefaultError: false,
	size: INPUT_SIZE.LARGE,
	type: FIELD_TYPES.TEXT,
};

export default Input;
