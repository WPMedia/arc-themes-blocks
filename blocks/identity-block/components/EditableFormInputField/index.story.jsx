import React from 'react';

import EditableFormInput from '.';
import FormInputField, { FIELD_TYPES } from '../FormInputField';

export default {
  title: 'Blocks/Identity/Components/EditableFormInput',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const emailField = () => (
  <EditableFormInput
    initialValue="jennylopez@email.com"
    label="Email address"
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
