import React from 'react';
import { mount } from 'enzyme';

import HeadlinedSubmitForm from '.';

describe('Headlined Submit Form', () => {
  it('renders with required items', () => {
    const wrapper = mount(<HeadlinedSubmitForm
      headline="Sign Up"
      buttonLabel="Submit"
    />);

    expect(wrapper.find('form').at(0)).not.toBeNull();
    expect(wrapper.find('form[aria-label="Sign Up"]').at(0)).not.toBeNull();
    expect(wrapper.find('button').at(0)).not.toBeNull();
  });

  it('does not submit if the input is invalid', () => {
    const callback = jest.fn();

    const wrapper = mount(
      <HeadlinedSubmitForm
        headline="Sign Up"
        buttonLabel="Submit"
        onSubmit={callback}
      >
        <input name="inputField" type="email" defaultValue="invalid" />
      </HeadlinedSubmitForm>,
    );

    wrapper.find('form').simulate('submit');

    expect(callback).not.toHaveBeenCalled();
  });

  it('does submit if the input is valid', () => {
    const callback = jest.fn();

    const wrapper = mount(
      <HeadlinedSubmitForm
        headline="Sign Up"
        buttonLabel="Submit"
        onSubmit={callback}
      >
        <input name="inputField" type="email" defaultValue="valid@email.com" />
      </HeadlinedSubmitForm>,
    );

    wrapper.find('form').simulate('submit');

    expect(callback).toHaveBeenCalledWith({
      inputField: 'valid@email.com',
    });
  });

  it('shows a form error is text is passed in', () => {
    const wrapper = mount(
      <HeadlinedSubmitForm
        headline="Sign Up"
        buttonLabel="Submit"
        formErrorText="This should show up in the error field"
      >
        <input name="inputField" type="email" defaultValue="valid@email.com" />
      </HeadlinedSubmitForm>,
    );

    expect(wrapper.find('.xpmedia-form-error').at(0).text().includes('This should show up in the error field'));
  });
});
