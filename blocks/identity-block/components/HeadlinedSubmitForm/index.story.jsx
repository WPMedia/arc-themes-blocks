import React from 'react';

import { FormInputField, FIELD_TYPES } from '@wpmedia/shared-styles';
import HeadlinedSubmitForm from '.';
import FormPasswordConfirm from '../FormPasswordConfirm';

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
    formErrorText="Unable to submit your request.  Please correct any issues and re-submit."
  >
    <FormInputField
      defaultValue="invalid!email.com"
      label="Email"
      name="field1"
      showDefaultError
      type={FIELD_TYPES.EMAIL}
    />
    <FormPasswordConfirm
      confirmLabel="Confirm password"
      confirmPlaceholder="Confirm your password"
      label="Password"
      name="field2"
      placeholder="Enter a password"
    />
  </HeadlinedSubmitForm>
);
