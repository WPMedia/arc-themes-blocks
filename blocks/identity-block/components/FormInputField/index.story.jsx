import React from 'react';

import FormInputField, { FIELD_TYPES } from '.';

export default {
  title: 'Blocks/Identity/InputField',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const textField = () => (
  <FormInputField
    label="Plain Text Field"
    name="field1"
  />
);

export const textFieldRequired = () => (
  <FormInputField
    label="Plain Text Field"
    name="field3"
    required
  />
);

export const textFieldPlaceholder = () => (
  <FormInputField
    label="Plain Text Field"
    name="field4"
    placeholder="Placeholder"
  />
);

export const textFieldTip = () => (
  <FormInputField
    label="Plain Text Field"
    name="field5"
    tip="Enter some text."
  />
);

export const textFieldTipError = () => (
  <FormInputField
    isDefaultError
    label="Plain Text Field"
    name="field6"
    tip="Enter some text."
    required
  />
);

export const textFieldCustomError = () => (
  <FormInputField
    isDefaultError
    label="Plain Text Field"
    name="field7"
    tip="Enter some text."
    required
    validationErrorMessage="This is a custom error."
  />
);

export const emailField = () => (
  <FormInputField
    defaultValue="my@valid.email"
    name="field8"
    type={FIELD_TYPES.EMAIL}
    label="Email Address"
  />
);

export const emailFieldError = () => (
  <FormInputField
    isDefaultError
    defaultValue="my?invalid.email"
    name="field9"
    type={FIELD_TYPES.EMAIL}
    label="Email Address"
  />
);

export const textFieldMinSizeError = () => (
  <FormInputField
    isDefaultError
    defaultValue="1"
    name="field10"
    label="Text Field (Minimum 3)"
    minLength="3"
  />
);

export const textFieldMaxSizeError = () => (
  <FormInputField
    isDefaultError
    defaultValue="1234"
    name="field11"
    label="Text Field (Maximum 3)"
    maxLength="3"
  />
);

export const passwordField = () => (
  <FormInputField
    defaultValue="password"
    name="field12"
    type={FIELD_TYPES.PASSWORD}
    label="Password"
  />
);

export const multipleFields = () => (
  <form>
    <FormInputField
      label="Blank field with tip"
      name="field13"
      tip="This is a tip."
    />
    <FormInputField
      defaultValue="my@valid.email"
      name="field14"
      type={FIELD_TYPES.EMAIL}
      label="Email Address"
    />
    <FormInputField
      defaultValue="password"
      name="field15"
      type={FIELD_TYPES.PASSWORD}
      label="Password"
    />
  </form>
);
