import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Login from './default';
import useIdentity from '../../components/Identity';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

jest.mock('react-google-recaptcha', () => function ReCaptcha() {
  return (
    <div>
      ReCaptcha
    </div>
  );
});

jest.mock('../../components/SocialSignOn', () => function SocialSignOn() {
  return (
    <div>
      Sign in with Google
    </div>
  );
});

jest.mock('../../components/Identity');

const defaultCustomFields = {
  redirectURL: '',
  redirectToPreviousPage: true,
};

describe('Subscriptions Login Feature', () => {
  it('renders nothing if identity not initialized', () => {
    useIdentity.mockImplementation(() => ({ isInitialized: false }));

    const wrapper = shallow(<Login
      customFields={defaultCustomFields}
    />);
    expect(wrapper.html()).toBe(null);
  });
  it('renders', () => {
    useIdentity.mockImplementation(() => ({ isInitialized: true }));
    const wrapper = shallow(<Login
      customFields={defaultCustomFields}
    />);
    expect(wrapper.html()).not.toBe(null);
  });
  it('shows login form', () => {
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
        <Login
          customFields={defaultCustomFields}
        />,
      );
      expect(wrapper.html()).not.toBe(null);
      expect(wrapper.find('form.xpmedia-form-submittable')).toHaveLength(1);
      expect(wrapper.find('input.xpmedia-form-field-input')).toHaveLength(2);
      expect(wrapper.find('form.xpmedia-form-submittable button')).toHaveLength(1);
    });
  });
});
