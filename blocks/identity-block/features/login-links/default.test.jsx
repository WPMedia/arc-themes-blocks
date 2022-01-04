import React from 'react';
import { mount } from 'enzyme';
import LoginLinks from './default';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

describe('LoginLinks', () => {
  it('renders nothing by default', () => {
    const wrapper = mount(<LoginLinks customFields={{}} />);
    expect(wrapper.html()).toBe(null);
  });

  it('renders login and sign up links', () => {
    const wrapper = mount(<LoginLinks customFields={{ showLogin: true, showSignUp: true }} />);
    expect(wrapper.find('a').length).toBe(2);
  });

  it('renders only login link', () => {
    const wrapper = mount(<LoginLinks customFields={{ showLogin: true }} />);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').prop('href')).toBe('/account/login/');
  });

  it('renders only sign up link', () => {
    const wrapper = mount(<LoginLinks customFields={{ showSignUp: true }} />);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').prop('href')).toBe('/account/signup/');
  });

  it('renders only forgot password link', () => {
    const wrapper = mount(<LoginLinks customFields={{ showForgot: true }} />);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').prop('href')).toBe('/account/forgot-password/');
  });
});
