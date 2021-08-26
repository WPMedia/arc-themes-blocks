import React from 'react';

import HeadlinedSubmitForm from '.';
import FormInputField, { FIELD_TYPES } from '../FormInputField';

export default {
  title: 'Blocks/Identity/Components/HeadlinedSubmitForm',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const basicForm = () => (
  <HeadlinedSubmitForm
    headline="Sign Up"
    buttonLabel="Submit"
  >
    <FormInputField
      label="Text Field"
      name="field1"
    />
    <FormInputField
      label="Text Field2"
      name="field2"
    />
  </HeadlinedSubmitForm>
);

export const errorForm = () => (
  <HeadlinedSubmitForm
    headline="Sign Up"
    buttonLabel="Submit"
  >
    <FormInputField
      defaultValue="invalid!email.com"
      label="Email"
      name="field1"
      showDefaultError
      type={FIELD_TYPES.EMAIL}
    />
  </HeadlinedSubmitForm>
);
