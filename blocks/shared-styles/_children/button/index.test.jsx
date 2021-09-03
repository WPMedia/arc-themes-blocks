import React from 'react';
import { mount } from 'enzyme';
import Button from '.';
import { BUTTON_SIZES, BUTTON_TYPES } from '../..';

it('renders medium button by default', () => {
  const wrapper = mount(<Button />);

  expect(wrapper.find('button').prop('className')).toContain('xpmedia-button--medium');
});

it('renders large button if buttonSize is large', () => {
  const wrapper = mount(<Button buttonSize={BUTTON_SIZES.LARGE} />);

  expect(wrapper.find('button').prop('className')).toContain('xpmedia-button--large');
});

it('renders small button if buttonSize is small', () => {
  const wrapper = mount(<Button buttonSize={BUTTON_SIZES.SMALL} />);

  expect(wrapper.find('button').prop('className')).toContain('xpmedia-button--small');
});

it('renders a label and a found user icon for buttonType', () => {
  const wrapper = mount(<Button
    buttonType={BUTTON_TYPES.LABEL_AND_ICON}
    text="Hello button and icon"
    iconType="user"
  />);

  expect(wrapper.find('div').prop('className')).toContain('xpmedia-button--left-icon-container');
  expect(wrapper.find('svg')).toHaveLength(1);
});

it('renders a label and a found user icon for buttonType', () => {
  const wrapper = mount(<Button
    buttonType={BUTTON_TYPES.LABEL_AND_ICON}
    text="Hello button and icon"
    iconType="something else"
  />);

  expect(wrapper.find('div').prop('className')).toContain('xpmedia-button--left-icon-container');
  expect(wrapper.find('svg')).toHaveLength(0);
  expect(wrapper.text()).toEqual('Hello button and icon');
});

it('renders only icon for buttonType', () => {
  const wrapper = mount(<Button
    buttonType={BUTTON_TYPES.ICON_ONLY}
    iconType="user"
    text="Do not show this text"
    ariaLabel="User icon here"
  />);

  expect(wrapper.find('svg')).toHaveLength(1);
  expect(wrapper.text()).toEqual('');
});

it('renders with classname full width', () => {
  const wrapper = mount(<Button
    fullWidth
  />);

  expect(wrapper.find('button').prop('className')).toContain('xpmedia-button--full-width');
});

it('shows text if no aria label as aria label', () => {
  const wrapper = mount(<Button
    text="Show this as aria label"
    buttonType={BUTTON_TYPES.ICON_ONLY}
  />);

  expect(wrapper.find('button').prop('aria-label')).toEqual('Show this as aria label');
});
