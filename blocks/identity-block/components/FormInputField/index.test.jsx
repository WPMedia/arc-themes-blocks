import React from 'react';
import { mount } from 'enzyme';

import FormInputField, { FIELD_TYPES } from '.';

describe('Form Input Field', () => {
  it('renders with a label', () => {
    const wrapper = mount(<FormInputField name="test" label="label text" />);

    expect(wrapper.find('label text')).not.toBe(null);
  });

  it('renders with a tip', () => {
    const wrapper = mount(<FormInputField name="test" tip="tip text" />);

    expect(wrapper.find('tip text')).not.toBe(null);
  });

  it('renders with an error', () => {
    const wrapper = mount(
      <FormInputField
        name="test"
        type={FIELD_TYPES.EMAIL}
        defaultValue="invalid"
        validationErrorMessage="error message"
      />,
    );

    wrapper.find('input').simulate('blur');

    expect(wrapper.find('error message')).not.toBe(null);
  });

  it('renders with an error by default', () => {
    const wrapper = mount(
      <FormInputField
        name="test"
        type={FIELD_TYPES.EMAIL}
        defaultValue="invalid"
        showDefaultError
        validationErrorMessage="error message"
      />,
    );

    expect(wrapper.find('error message')).not.toBe(null);
  });

  it('renders with an error only after blurring', () => {
    const wrapper = mount(
      <FormInputField
        name="test"
        type={FIELD_TYPES.EMAIL}
        defaultValue="invalid"
        validationErrorMessage="error message"
      />,
    );

    expect(wrapper.find('error message')).not.toExist();

    wrapper.find('input').simulate('change');

    expect(wrapper.find('error message')).not.toExist();

    wrapper.find('input').simulate('blur');

    expect(wrapper.find('error message')).not.toBe(null);
  });

  it('renders with an error overriding tip', () => {
    const wrapper = mount(
      <FormInputField
        name="test"
        type={FIELD_TYPES.EMAIL}
        defaultValue="invalid"
        tip="should not be found after change"
        validationErrorMessage="error message"
      />,
    );

    expect(wrapper.find('should not be found after change')).not.toBe(null);

    wrapper.find('input').simulate('blur');

    expect(wrapper.find('should not be found after change')).not.toExist();
    expect(wrapper.find('error message')).not.toBe(null);
  });
});
