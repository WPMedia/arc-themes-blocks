import React from 'react';
import { shallow } from 'enzyme';
import Signup from './default';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

it('renders nothing if identity not initialized', () => {
  const wrapper = shallow(<Signup customFields={{ redirectURL: '' }} />);
  expect(wrapper.html()).toBe(null);
});
