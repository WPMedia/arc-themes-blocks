import React from 'react';
import { mount, shallow } from 'enzyme';

import SocialEditableSection from './SocialEditableSection';
import useSocialSignIn from '../../../components/SocialSignOn/utils/useSocialSignIn';

jest.mock('../../../components/SocialSignOn/utils/useSocialSignIn');

jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
}))));

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../../intl.json')[phrase][locale]) })),
}));

describe('SocialEditableSection', () => {
  it('should render facebook and google with google and facebook app id', () => {
    useSocialSignIn.mockImplementation(() => ({
      isFacebookInitialized: true,
      isGoogleInitialized: true,
      facebookAppId: '123',
      googleClientId: '456',
    }));

    const wrapper = shallow(<SocialEditableSection />);
    expect(wrapper.find('FacebookSignIn')).toHaveLength(1);
    expect(wrapper.find('GoogleSignIn')).toHaveLength(1);
  });
  it('should not render facebook and google without id', () => {
    useSocialSignIn.mockImplementation(() => ({
      isFacebookInitialized: false,
      isGoogleInitialized: false,
      facebookAppId: '123',
      googleClientId: '456',
    }));

    const wrapper = shallow(<SocialEditableSection />);
    expect(wrapper.find('FacebookSignIn')).toHaveLength(0);
    expect(wrapper.find('GoogleSignIn')).toHaveLength(0);
  });
  it('should render facebook only with google uninitialized', () => {
    useSocialSignIn.mockImplementation(() => ({
      isFacebookInitialized: true,
      isGoogleInitialized: false,
      facebookAppId: '123',
      googleClientId: '456',
    }));

    const wrapper = mount(<SocialEditableSection />);
    expect(wrapper.find('FacebookSignIn')).toHaveLength(1);
    expect(wrapper.find('GoogleSignIn')).toHaveLength(0);
  });

  it('should show text based on hasGoogle and hasFacebook props', () => {
    useSocialSignIn.mockImplementation(() => ({
      isFacebookInitialized: true,
      isGoogleInitialized: true,
      facebookAppId: '123',
      googleClientId: '456',
    }));

    const wrapper = mount(<SocialEditableSection
      hasFacebook
      hasGoogle
      hasPasswordAccount
    />);
    expect(wrapper.find('span').at(0).text()).toEqual('Connected ');
  });
});
