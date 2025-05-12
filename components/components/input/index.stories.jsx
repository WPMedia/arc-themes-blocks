import Input, { FIELD_TYPES } from ".";

export default {
	title: "Components/Input",
	component: Input,
};

export const AutocompleteNewPassword = {
	render: () => (
		<Input
			defaultValue=""
			name="password-new-one"
			type={FIELD_TYPES.PASSWORD}
			label="Password"
			autoComplete="new-password"
		/>
	),
};

export const DefaultTextInput = {
	render: () => <Input label="Plain Text Field" name="field1" />,
};

export const EmailField = {
	render: () => (
		<Input
			defaultValue="my@valid.email"
			name="field8"
			type={FIELD_TYPES.EMAIL}
			label="Email Address"
		/>
	),
};

export const EmailFieldWithError = {
	render: () => (
		<Input
			defaultValue="my?invalid.email"
			name="field9"
			showDefaultError
			type={FIELD_TYPES.EMAIL}
			label="Email Address"
		/>
	),

	name: "Email field With Error",
};

export const InputSizes = {
	render: () => <Input label="Large" name="field1" />,
};

export const InputStates = {
	render: () => <Input label="Text Field" name="field1" />,
};

export const PasswordField = {
	render: () => (
		<Input defaultValue="mypassword" name="field10" type={FIELD_TYPES.PASSWORD} label="Password" />
	),
};

export const SelectField = {
	render: () => (
		<Input
			label="Dropdown"
			name="password-new-one"
			optionLabelKey="label"
			options={[
				{
					label: "Option 1",
					value: "option1",
				},
				{
					label: "Option 2",
					value: "option2",
				},
				{
					label: "Option 3",
					value: "option3",
				},
			]}
			optionValueKey="value"
			type={FIELD_TYPES.SELECT}
		/>
	),
};

export const TextInputWithError = {
	render: () => <Input label="Plain Text Field" name="field3" required showDefaultError />,
};

export const TextInputWithPlaceholder = {
	render: () => <Input label="Plain Text Field" name="field4" placeholder="Placeholder" />,
};

export const WithFieldTip = {
	render: () => <Input label="Plain Text Field" name="field5" tip="Enter some text." />,
};

export const WithFieldTipAndCustomError = {
	render: () => (
		<Input
			label="Plain Text Field"
			name="field7"
			tip="Enter some text."
			required
			showDefaultError
			validationErrorMessage="This is a custom error."
		/>
	),

	name: "With Field Tip and Custom Error",
};

export const WithFieldTipAndError = {
	render: () => (
		<Input
			label="Plain Text Field"
			name="field6"
			tip="Enter some text."
			required
			showDefaultError
		/>
	),

	name: "With Field Tip and Error",
};

export const WithoutAutocomplete = {
	render: () => (
		<Input
			defaultValue=""
			name="email"
			type={FIELD_TYPES.EMAIL}
			label="Email Address"
			autoComplete="off"
		/>
	),
};
