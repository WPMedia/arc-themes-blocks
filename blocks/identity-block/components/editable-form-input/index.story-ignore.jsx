import React from "react";

import { FormInputField, FIELD_TYPES } from "@wpmedia/shared-styles";
import EditableFormInput from ".";

export default {
	title: "Blocks/Identity/Components/EditableFormInput",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const emailField = () => (
	<EditableFormInput
		initialValue="jennylopez@email.com"
		label="Email address"
		editText="Edit"
		saveText="Save"
		cancelText="Cancel"
	>
		<FormInputField
			type={FIELD_TYPES.EMAIL}
			label="Email address"
			defaultValue="jennylopez@email.com"
			showDefaultError={false}
			required
			autoComplete="email"
			name="email"
			validationErrorMessage="Please enter a valid email address"
		/>
	</EditableFormInput>
);
