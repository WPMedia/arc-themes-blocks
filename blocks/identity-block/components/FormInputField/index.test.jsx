import React from 'react';
import { mount } from 'enzyme';

import FormInputField, { FIELD_TYPES } from '.';

describe('Form Input Field', () => {
  it('renders with a label', () => {
    const wrapper = mount(<FormInputField name="test" label="label text" />);

    expect(wrapper.text().includes('label text')).toBe(true);
  });

  it('renders with a tip', () => {
    const wrapper = mount(<FormInputField name="test" tip="tip text" />);

    expect(wrapper.text().includes('tip text')).toBe(true);
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

    wrapper.find('input').simulate('change');

    expect(wrapper.text().includes('error message')).toBe(true);
  });

  it('renders with a placeholder', () => {
    const wrapper = mount(
      <FormInputField
        name="test"
        placeholder="Placeholder"
      />,
    );

    expect(wrapper.find('input[placeholder="Placeholder"]').length).toBe(1);
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

    expect(wrapper.text().includes('error message')).toBe(true);
  });

  it('renders with an error after changing', () => {
    const wrapper = mount(
      <FormInputField
        name="test"
        type={FIELD_TYPES.EMAIL}
        defaultValue="invalid"
        validationErrorMessage="error message"
      />,
    );

    expect(wrapper.find('span')).not.toExist();

    wrapper.find('input').at(0).simulate('change');
    wrapper.find('input').at(0).simulate('blur');

    expect(wrapper.find('span').length).toBe(1);
  });

  it('renders with an error overriding tip', () => {
    const wrapper = mount(
      <FormInputField
        name="test"
        type={FIELD_TYPES.EMAIL}
        defaultValue="invalid"
        tip="should be found before/after change"
        validationErrorMessage="error message"
      />,
    );

    expect(wrapper.text().includes('should be found before/after change')).toBe(true);

    wrapper.find('input').at(0).simulate('change');

    expect(wrapper.text().includes('should be found before/after change')).toBe(true);
    expect(wrapper.text().includes('error message')).toBe(true);
  });

  it('renders with an error on custom patterns', () => {
    const wrapper = mount(
      <FormInputField
        name="test"
        defaultValue="invalid"
        validationErrorMessage="error message"
        validationPattern="^valid$"
      />,
    );

    wrapper.find('input').at(0).simulate('change');

    expect(wrapper.text().includes('error message')).toBe(true);
  });

  it('renders with an error on blank required', () => {
    const wrapper = mount(
      <FormInputField
        name="test"
        required
        validationErrorMessage="error message"
        validationPattern="^valid$"
      />,
    );

    wrapper.find('input').at(0).simulate('blur');

    expect(wrapper.text().includes('error message')).toBe(true);
  });
});
