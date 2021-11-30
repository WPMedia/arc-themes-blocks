import React from 'react';
import { mount } from 'enzyme';

import EditableFormInputField, { ConditionalFormContainer } from '.';

describe('Editable form input field', () => {
  it('conditional form renders a form when show form elected', () => {
    const wrapper = mount(
      <ConditionalFormContainer showForm />,
    );
    expect(wrapper.find('form').length).toBe(1);
  });
  it('conditional form does not render a form when show form not elected', () => {
    const wrapper = mount(
      <ConditionalFormContainer showForm={false} />,
    );
    expect(wrapper.find('form').length).toBe(0);
  });
  it('editable form field shows initial value, label, and edit button when not editable and hides children', () => {
    const wrapper = mount(
      <EditableFormInputField
        initialValue="initial value"
        editText="edit text"
        label="label"
        onSubmit={() => {}}
      >
        <p id="test-child">Test child</p>
      </EditableFormInputField>,
    );
    expect(wrapper.find('.editable-form-input--value-text').length).toBe(1);
    expect(wrapper.find('.editable-form-input--value-text').text()).toBe('initial value');
    expect(wrapper.find('.editable-form-input--label-text').text()).toBe('label');
    expect(wrapper.find('button.editable-form-input--edit-button-link').text()).toBe('edit text');
    expect(wrapper.find('#test-child').length).toBe(0);
  });
  it('editable form field hides edit button when editable and shows children', async () => {
    const wrapper = mount(
      <EditableFormInputField
        initialValue="initial value"
        editText="edit text"
        label="label"
        onSubmit={() => {}}
      >
        <p id="test-child">Test child</p>
      </EditableFormInputField>,
    );

    wrapper.find('button.editable-form-input--edit-button-link').simulate('click');
    expect(wrapper.find('#test-child').length).toBe(1);
    expect(wrapper.find('.editable-form-input--value-text').length).toBe(0);
    expect(wrapper.find('.editable-form-input--value-text').length).toBe(0);
  });
});
