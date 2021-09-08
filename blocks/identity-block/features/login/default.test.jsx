import React from 'react';
import { shallow } from 'enzyme';
import Login from './default';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

it('renders nothing if identity not initialized', () => {
  const wrapper = shallow(<Login customFields={{ redirectURL: '' }} />);
  expect(wrapper.html()).toBe(null);
});
