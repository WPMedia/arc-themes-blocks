import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Login from './default';

import useIdentity from '../../components/Identity';
jest.mock('../../components/Identity')

const defaultCustomFields = {
  redirectURL: '',
  redirectToPreviousPage: true,
  forgotPasswordUrl: '',
  signupURL: ''
};

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('react-google-recaptcha');
describe('Subscriptions Login Feature', () => {
  let wrapper;
  beforeEach(() => {
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      isLoggedIn: () => true,
      Identity: {
        isLoggedIn: jest.fn(async () => await act(async () => false)),
        getConfig: jest.fn(async () => await act(async () => ({})))
      }
    }))
    act(async () => {
      wrapper = await mount(
        <Login
          customFields={defaultCustomFields}
        />
      );
    });
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders nothing if identity not initialized', () => {
    useIdentity.mockImplementation(() => ({
      isInitialized: false,
      isLoggedIn: () => true,
      Identity: {
        isLoggedIn: jest.fn(async () => false),
        getConfig: jest.fn(async () => ({}))
      }
    }));
    const wrapper = shallow(
      <Login
        customFields={defaultCustomFields}
      />
    );
    expect(wrapper.html()).toBe(null);
  });
  it('renders', () => {
    expect(wrapper.html()).not.toBe(null);
  });
  it('shows login form', () => {
    expect(wrapper.find('form.xpmedia-form-submittable')).toHaveLength(1);
    expect(wrapper.find('input.xpmedia-form-field-input')).toHaveLength(2);
    expect(wrapper.find('form.xpmedia-form-submittable button')).toHaveLength(1);
  });
  it('shows forgot password & register links', () => {});
});
