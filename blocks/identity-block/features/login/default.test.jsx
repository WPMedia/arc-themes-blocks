import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Login from './default';

import useIdentity from '../../components/Identity';

jest.mock('../../components/Identity');

const defaultCustomFields = {
  redirectURL: '',
  redirectToPreviousPage: true,
};

const loginMock = jest.fn(() => Promise.resolve({}));

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

describe('Identity Login Feature', () => {
  let wrapper;
  beforeEach(async () => {
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      isLoggedIn: () => true,
      Identity: {
        isLoggedIn: jest.fn(async () => false),
        getConfig: jest.fn(async () => ({})),
        login: loginMock,
      },
    }));
    await act(async () => {
      wrapper = await mount(
        <Login
          customFields={defaultCustomFields}
        />,
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
        getConfig: jest.fn(async () => ({})),
      },
    }));
    const uninitializedWrapper = mount(
      <Login
        customFields={defaultCustomFields}
      />,
    );
    expect(uninitializedWrapper.html()).toBe(null);
  });

  it('renders', () => {
    expect(wrapper.html()).not.toBe(null);
  });

  it('shows login form', () => {
    expect(wrapper.find('form.xpmedia-form-submittable')).toHaveLength(1);
    expect(wrapper.find('input.xpmedia-form-field-input')).toHaveLength(2);
    expect(wrapper.find('form.xpmedia-form-submittable button')).toHaveLength(1);

    expect(wrapper.find('input.xpmedia-form-field-input').at(0).prop('autoComplete')).toBe('email');
    expect(wrapper.find('input.xpmedia-form-field-input').at(1).prop('autoComplete')).toBe('current-password');
  });

  it('uses redirect query', async () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        search: '?test=123&redirect=https://arcxp.com',
      },
    });

    const redirectWrapper = mount(
      <Login
        customFields={defaultCustomFields}
      />,
    );

    redirectWrapper.find('input[type="email"]').instance().value = 'test@test.com';
    redirectWrapper.find('input[type="password"]').instance().value = 'ABC123!';

    redirectWrapper.find('form').simulate('submit');

    await loginMock;

    expect(loginMock).toHaveBeenCalled();
    expect(window.location).toBe('https://arcxp.com');

    delete global.window.location;
  });

  it('uses document referrer', async () => {
    const referrerURL = 'http://referrer.com';
    Object.defineProperty(document, 'referrer', { value: referrerURL, configurable: true });

    const redirectWrapper = mount(
      <Login
        customFields={defaultCustomFields}
      />,
    );

    redirectWrapper.find('input[type="email"]').instance().value = 'test@test.com';
    redirectWrapper.find('input[type="password"]').instance().value = 'ABC123!';

    redirectWrapper.find('form').simulate('submit');

    await loginMock;

    expect(loginMock).toHaveBeenCalled();
    expect(window.location).toBe(referrerURL);
  });
});
