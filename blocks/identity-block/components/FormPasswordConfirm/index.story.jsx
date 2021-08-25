import React from 'react';

import FormPasswordConfirm from '.';

export default {
  title: 'Blocks/Identity/Components/PasswordConfirm',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const confirmPassword = () => (
  <FormPasswordConfirm
    confirmLabel="Confirm password"
    label="Password"
    name="field1"
  />
);

export const confirmPasswordErrorStates = () => (
  <FormPasswordConfirm
    confirmLabel="Confirm password"
    confirmValidationErrorMessage="Must match password"
    label="Password"
    name="field2"
    showDefaultError
    validationErrorMessage="Please enter something"
  />
);

export const confirmPasswordPlaceholders = () => (
  <FormPasswordConfirm
    confirmLabel="Confirm password"
    confirmPlaceholder="Confirm your password"
    label="Password"
    name="field2"
    placeholder="Enter a password"
  />
);
