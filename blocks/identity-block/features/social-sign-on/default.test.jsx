import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import SocialSignOnBlock from './default';
import useIdentity from '../../components/Identity';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

jest.mock('../../components/Identity');

const defaultCustomFields = {
  redirectURL: '',
  redirectToPreviousPage: true,
};

describe('Subscriptions Social Login Feature', () => {
  it('renders nothing if identity not initialized', () => {
    useIdentity.mockImplementation(() => ({ isInitialized: false }));

    const uninitializedWrapper = shallow(
      <SocialSignOnBlock
        customFields={defaultCustomFields}
      />,
    );
    expect(uninitializedWrapper.html()).toBe(null);
  });
  it('renders', () => {
    useIdentity.mockImplementation(() => ({ isInitialized: true }));

    const uninitializedWrapper = shallow(
      <SocialSignOnBlock
        customFields={defaultCustomFields}
      />,
    );
    expect(uninitializedWrapper.html()).not.toBe(null);
  });
  it('renders SocialSignOn Component', () => {
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
        <SocialSignOnBlock
          customFields={defaultCustomFields}
        />,
      );
      expect(wrapper.html()).not.toBe(null);
      expect(wrapper.find('.xpmedia-subs-social-sign-on')).toHaveLength(1);
    });
  });
});
