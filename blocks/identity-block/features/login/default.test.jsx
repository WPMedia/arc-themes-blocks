import React from 'react';
import { shallow, mount } from 'enzyme';
import { useFusionContext } from 'fusion:context';
import Login from './default';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('react-google-recaptcha');
jest.mock('../../components/Identity', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isInitialized: true, isLoggedIn: () => true })),
}));


describe('Subscriptions Login Feature', () => {
  it('renders nothing if identity not initialized', () => {
    const wrapper = shallow(
      <Login
        customFields={{
          redirectURL: '',
          redirectToPreviousPage: true,
          forgotPasswordUrl: '',
          signupURL: ''
        }}
      />
    );
    expect(wrapper.html()).toBe(null);
  });
  it('renders', () => {
    const wrapper = mount(
      <Login
        customFields={{
          redirectURL: '',
          redirectToPreviousPage: true,
          forgotPasswordUrl: '',
          signupURL: ''
        }}
      />
    );
    expect(wrapper.html()).not.toBe(null);
  });
});
