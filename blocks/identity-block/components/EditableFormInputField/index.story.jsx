import React from 'react';

import EditableFormInput from '.';

export default {
  title: 'Blocks/Identity/Components/EditableFormInput',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const emailField = () => (
  <EditableFormInput
    initialValue="test"
    error=""
    label="Email address"
    validationMessage="Please enter a valid email address"
  />
);
