import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ForgotPassword from './default';

import useIdentity from '../../components/Identity';

jest.mock('../../components/Identity');

const resetMock = jest.fn(() => Promise.resolve());
const resetFailMock = jest.fn(() => Promise.reject());

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    t: jest.fn((phrase) => ({
      'identity-block.email': 'Email',
      'identity-block.email-requirements': 'Email Required',
      'identity-block.forgot-password-error': 'Uh oh!',
      'identity-block.forgot-password-headline': 'Headline',
      'identity-block.forgot-password-headline-submitted': 'Congratulations!',
      'identity-block.forgot-password-instruction': 'Do the email thing',
      'identity-block.forgot-password-instruction-submitted': 'You did the thing!',
      'identity-block.forgot-password-submit': 'Submit',
      undefined: '',
    }[phrase])),
  })),
}));

describe('Identity Password Reset Feature', () => {
  let wrapper;
  beforeEach(async () => {
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      isLoggedIn: () => true,
      Identity: {
        isLoggedIn: jest.fn(async () => false),
        getConfig: jest.fn(async () => ({})),
        requestResetPassword: resetMock,
      },
    }));
    await act(async () => {
      wrapper = await mount(
        <ForgotPassword />,
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
      <ForgotPassword />,
    );
    expect(uninitializedWrapper.html()).toBe(null);
  });

  it('renders', () => {
    expect(wrapper.html()).not.toBe(null);
  });

  it('shows submit form', () => {
    expect(wrapper.find('div.xpmedia-forgot-password-instruction')).toHaveLength(1);
    expect(wrapper.find('input.xpmedia-form-field-input')).toHaveLength(1);
    expect(wrapper.find('form.xpmedia-form-submittable button')).toHaveLength(1);

    expect(wrapper.find('input.xpmedia-form-field-input').at(0).prop('autoComplete')).toBe('email');
  });

  it('uses updates the form on submit', async () => {
    const submitWrapper = mount(
      <ForgotPassword />,
    );

    submitWrapper.find('input[type="email"]').instance().value = 'test@test.com';

    await act(async () => {
      submitWrapper.find('form').simulate('submit');
      await resetMock;
      expect(resetMock).toHaveBeenCalled();
      submitWrapper.update();
    });

    expect(submitWrapper.find('h2.xpmedia-forgot-password-headline')).toHaveLength(1);
    expect(submitWrapper.find('div.xpmedia-forgot-password-instruction')).toHaveLength(1);
  });
});

describe('Identity Password Reset Feature - Failing', () => {
  let wrapper;
  beforeEach(async () => {
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      isLoggedIn: () => true,
      Identity: {
        isLoggedIn: jest.fn(async () => false),
        getConfig: jest.fn(async () => ({})),
        requestResetPassword: resetFailMock,
      },
    }));
    await act(async () => {
      wrapper = await mount(
        <ForgotPassword />,
      );
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('enter error state on failure to submit', async () => {
    wrapper.find('input[type="email"]').instance().value = 'test@test.com';

    await act(async () => {
      wrapper.find('form').simulate('submit');
      await resetFailMock;
      expect(resetFailMock).toHaveBeenCalled();
      wrapper.update();
    });

    wrapper.update();

    expect(wrapper.find('section.xpmedia-form-error')).toHaveLength(1);
  });
});
