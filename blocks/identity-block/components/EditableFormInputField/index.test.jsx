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

  it('shows error text if passed in with formErrorText prop', () => {
    const wrapper = mount(
      <EditableFormInputField
        initialValue="initial value"
        editText="edit text"
        label="label"
        onSubmit={() => {}}
        formErrorText="Error Text"
      >
        <p id="test-child">Test child</p>
      </EditableFormInputField>,
    );

    expect(wrapper.find('#test-child').length).toBe(1);
    expect(wrapper.find('.xpmedia-form-error').text()).toBe('Error Text');
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

  it('does not submit if the input is invalid', () => {
    const callback = jest.fn(() => Promise.resolve());

    const wrapper = mount(
      <ConditionalFormContainer
        onSubmit={callback}
        setIsEditable={() => {}}
        showForm
      >
        <input name="inputField" type="email" defaultValue="invalid" />
      </ConditionalFormContainer>,
    );

    wrapper.find('form').simulate('submit');

    expect(callback).not.toHaveBeenCalled();
  });

  it('does submit if the input is valid', () => {
    const callback = jest.fn(() => Promise.resolve());

    const wrapper = mount(
      <ConditionalFormContainer
        onSubmit={callback}
        showForm
        setIsEditable={() => {}}
      >
        <input name="inputField" type="email" defaultValue="valid@email.com" />
      </ConditionalFormContainer>,
    );

    wrapper.find('form').simulate('submit');

    expect(callback).toHaveBeenCalledWith({
      inputField: 'valid@email.com',
    });
  });

  it('calls passed in cancelEdit function when using cancel button', () => {
    const callback = jest.fn();

    const wrapper = mount(
      <EditableFormInputField
        cancelEdit={callback}
        formErrorText="Error"
      >
        <input name="inputField" type="email" defaultValue="invalid" />
      </EditableFormInputField>,
    );

    wrapper.find('button[type="button"]').simulate('click');

    expect(callback).toHaveBeenCalled();
  });

  it('calls passed in cancelEdit function when using cancel button', () => {
    const wrapper = mount(
      <EditableFormInputField
        formErrorText="Error"
      >
        <input name="inputField" type="email" defaultValue="invalid" />
      </EditableFormInputField>,
    );

    expect(wrapper.find('.xpmedia-form-error').text()).toBe('Error');
  });
});
