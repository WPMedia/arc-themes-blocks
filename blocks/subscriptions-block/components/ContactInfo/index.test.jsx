import React from 'react';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import ContactInfo from '.';

describe('ContactInfo', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    getProperties.mockImplementation(() => (
      { locale: [] }));

    getTranslatedPhrases.mockImplementation(() => (
      { t: jest.fn().mockReturnValue('Some mock text') }));
  });

  it('renders form and associated inputs', () => {
    const mockCallBack = jest.fn();
    const mockCallBack2 = jest.fn();
    const wrapper = mount(
      <ContactInfo
        callback={mockCallBack}
        user={false}
        logoutCallback={mockCallBack2}
      />,
    );

    expect(wrapper.find('.xpmedia-subscriptions-contact-info').exists()).toBe(true);
    expect(wrapper.find('input').length).toEqual(3);
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('Does not call form callback when form is not filled out', () => {
    const mockCallBack = jest.fn();
    const mockCallBack2 = jest.fn();
    const wrapper = mount(
      <ContactInfo
        callback={mockCallBack}
        user={false}
        logoutCallback={mockCallBack2}
      />,
    );
    const btn = wrapper.find('Button');
    btn.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });
  it('renders sign out button when user is signed in', () => {
    const mockCallBack = jest.fn();
    const mockCallBack2 = jest.fn();
    const wrapper = mount(
      <ContactInfo
        callback={mockCallBack}
        user={{
          email: 'arcuser@gmail.com',
          firstName: 'Arc',
          lastName: 'Xp',
          identities: [{
            type: 'Google',
          }],
        }}
        logoutCallback={mockCallBack2}
      />,
    );

    expect(wrapper.find('.sign-out-btn').exists()).toBe(true);
  });
  it('renders text and icon indicating user is signed in through Google', () => {
    const mockCallBack = jest.fn();
    const mockCallBack2 = jest.fn();
    const wrapper = mount(
      <ContactInfo
        callback={mockCallBack}
        user={{
          email: 'arcuser@gmail.com',
          firstName: 'Arc',
          lastName: 'Xp',
          identities: [{
            type: 'Google',
          }],
        }}
        logoutCallback={mockCallBack2}
      />,
    );

    expect(wrapper.find('.identity-row').exists()).toBe(true);
    expect(wrapper.find("[data-testid='google-icon']").length).toBe(1);
  });
  it('renders text and icon indicating user is signed in through Facebook', () => {
    const mockCallBack = jest.fn();
    const mockCallBack2 = jest.fn();
    const wrapper = mount(
      <ContactInfo
        callback={mockCallBack}
        user={{
          email: 'arcuser@gmail.com',
          firstName: 'Arc',
          lastName: 'Xp',
          identities: [{
            type: 'Facebook',
          }],
        }}
        logoutCallback={mockCallBack2}
      />,
    );

    expect(wrapper.find('.identity-row').exists()).toBe(true);
    expect(wrapper.find("[data-testid='facebook-icon']").length).toBe(1);
  });
  it('renders text indicating user is signed in through password', () => {
    const mockCallBack = jest.fn();
    const mockCallBack2 = jest.fn();
    const wrapper = mount(
      <ContactInfo
        callback={mockCallBack}
        user={{
          email: 'arcuser@gmail.com',
          firstName: 'Arc',
          lastName: 'Xp',
          identities: [{
            type: 'password',
          }],
        }}
        logoutCallback={mockCallBack2}
      />,
    );

    expect(wrapper.find('.identity-row').exists()).toBe(true);
  });
});
