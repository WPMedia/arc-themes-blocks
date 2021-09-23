import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import SocialSignOn from './index';
import useIdentity from '../Identity';

jest.mock('../Identity');

describe('Subscriptions Social Login Component', () => {
  it('renders nothing if identity not initialized', () => {
    useIdentity.mockImplementation(() => ({ isInitialized: false }));

    const uninitializedWrapper = shallow(
      <SocialSignOn onError={() => null} redirectURL="#" />,
    );
    expect(uninitializedWrapper.html()).toBe(null);
  });
  it('renders', () => {
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      isLoggedIn: () => true,
      Identity: {
        isLoggedIn: jest.fn(async () => false),
        getConfig: jest.fn(async () => Promise.resolve({
          signinRecaptcha: false,
          recaptchaSiteKey: '6LdXKVQcAAAAAO2tv3GdUbSK-1vcgujX6cP0IgF_',
        })),
        initGoogleLogin: jest.fn(async () => Promise.resolve({
          init: true,
        })),
        initializeFacebook: jest.fn(async () => Promise.resolve({
          init: true,
        })),
        configOptions: {
          googleClientId: true,
          facebookAppId: true,
        },
      },
    }));

    const wrapper = shallow(
      <SocialSignOn onError={() => null} redirectURL="#" />,
    );
    expect(wrapper.html()).not.toBe(null);
  });
  it('renders placeholders for Google and Facebook sign-in buttons', () => {
    let wrapper;
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      isLoggedIn: () => true,
      Identity: {
        isLoggedIn: jest.fn(async () => false),
        getConfig: jest.fn(async () => Promise.resolve({
          signinRecaptcha: false,
          recaptchaSiteKey: '6LdXKVQcAAAAAO2tv3GdUbSK-1vcgujX6cP0IgF_',
        })),
        initGoogleLogin: jest.fn(async () => Promise.resolve({
          init: true,
        })),
        initializeFacebook: jest.fn(async () => Promise.resolve({
          init: true,
        })),
        configOptions: {
          googleClientId: true,
          facebookAppId: true,
        },
      },
    }));
    act(() => {
      wrapper = mount(
        <SocialSignOn onError={() => null} redirectURL="#" />,
      );
      expect(wrapper.find('#google-sign-in-button')).toHaveLength(1);
      expect(wrapper.find('.fb-login-button')).toHaveLength(1);
    });
  });
});
