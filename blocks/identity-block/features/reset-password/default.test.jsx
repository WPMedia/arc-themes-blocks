import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import ResetPassword, { ResetPasswordPresentation } from './default';
import FormPasswordConfirm from '../../components/FormPasswordConfirm';
import useIdentity from '../../components/Identity';

const successActionURL = '/account/login/';

jest.mock('../../components/FormPasswordConfirm');
jest.mock('../../components/Identity');

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'arc-demo-5',
  })),
}));
jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
}))));

FormPasswordConfirm.mockImplementation(() => (
  <input name="newPassword" defaultValue="notTestingThisComponent" />
));

const phrases = {
  t: (phrase) => ({
    'identity-block.confirm-password': 'Confirm Password',
    'identity-block.confirm-password-error': 'Passwords must match',
    'identity-block.password': 'Password',
    'identity-block.password-requirements': 'Passwords must meet our strict requirements.',
    'identity-block.password-requirements-characters': 'Characters',
    'identity-block.password-requirements-lowercase': 'Lowercase',
    'identity-block.password-requirements-numbers': 'Numbers',
    'identity-block.password-requirements-uppercase': 'Uppercase',
    'identity-block.reset-password-error': 'There was an error with your password',
    'identity-block.reset-password-headline': 'Create your new password',
    'identity-block.reset-password-headline-submitted': 'New password saved',
    'identity-block.reset-password-instruction': 'Enter a new password for your account.',
    'identity-block.reset-password-instruction-submitted': 'Your new password has been saved.',
    'identity-block.reset-password-submit': 'Continue',
    'identity-block.reset-password-submit-submitted': 'Continue to Login',
  }[phrase]),
};

const resetPasswordMock = jest.fn(() => Promise.resolve());
const resetPasswordMockFail = jest.fn(() => Promise.reject());

const Identity = {
  getConfig: () => Promise.resolve({}),
  resetPassword: resetPasswordMock,
};

describe('Identity Password Reset Feature - wrapper', () => {
  beforeAll(() => {
    useIdentity.mockImplementation(() => ({
      isInitialized: false,
      Identity,
    }));
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('renders', () => {
    const wrapper = shallow(
      <ResetPassword customFields={{ successActionURL }} />,
    );
    expect(wrapper.html()).not.toBe(null);
  });
});

window.history.pushState({}, '', '/?nonce=abcd');

describe('Identity Password Reset Feature - unInitialized', () => {
  beforeAll(() => {
    useIdentity.mockImplementation(() => ({
      isInitialized: false,
      Identity,
    }));
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders nothing if identity not initialized', async (done) => {
    await act(async () => {
      const wrapper = await mount(
        <ResetPasswordPresentation phrases={phrases} successActionUrl={successActionURL} />,
      );
      expect(wrapper.html()).toBe(null);
      done();
    });
  });
});

describe('Identity Password Reset Feature', () => {
  const assignMock = jest.fn();
  let wrapper;

  beforeAll(async () => {
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      Identity,
    }));
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        assign: assignMock,
      },
      writable: true,
    });

    await act(async () => {
      wrapper = await mount(
        <ResetPasswordPresentation phrases={phrases} successActionUrl={successActionURL} />,
      );
    });
    wrapper.update();
    wrapper.update();
    wrapper.update();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders', () => {
    expect(wrapper.html()).not.toBe(null);
  });

  it('shows submit form', () => {
    expect(wrapper.text().includes(phrases.t('identity-block.reset-password-headline'))).toBe(true);
    expect(wrapper.text().includes(phrases.t('identity-block.reset-password-instruction'))).toBe(true);
    expect(wrapper.text().includes(phrases.t('identity-block.reset-password-submit'))).toBe(true);
  });

  it('updates the page on submit and redirects the user to login when done', async () => {
    await act(async () => {
      wrapper.find('form').simulate('submit');
      await resetPasswordMock;
      expect(resetPasswordMock).toHaveBeenCalled();
    });
    wrapper.update();
    expect(wrapper.text().includes(phrases.t('identity-block.reset-password-headline-submitted'))).toBe(true);
    expect(wrapper.text().includes(phrases.t('identity-block.reset-password-instruction-submitted'))).toBe(true);
    expect(wrapper.text().includes(phrases.t('identity-block.reset-password-submit-submitted'))).toBe(true);
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    expect(assignMock).toHaveBeenCalled();
  });
});

describe('Identity Password Reset Feature - Failing reset request', () => {
  let wrapper;

  beforeAll(async () => {
    resetPasswordMock.mockImplementation(resetPasswordMockFail);
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      Identity,
    }));

    await act(async () => {
      wrapper = await mount(
        <ResetPasswordPresentation phrases={phrases} successActionUrl={successActionURL} />,
      );
    });
    wrapper.update();
    wrapper.update();
    wrapper.update();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders', () => {
    expect(wrapper.html()).not.toBe(null);
  });

  it('shows submit form', () => {
    expect(wrapper.text().includes(phrases.t('identity-block.reset-password-headline'))).toBe(true);
    expect(wrapper.text().includes(phrases.t('identity-block.reset-password-instruction'))).toBe(true);
    expect(wrapper.text().includes(phrases.t('identity-block.reset-password-submit'))).toBe(true);
  });

  it('updates the page on submit to failing state', async () => {
    await act(async () => {
      wrapper.find('form').simulate('submit');
      await resetPasswordMock;
      expect(resetPasswordMock).toHaveBeenCalled();
    });
    wrapper.update();
    expect(wrapper.find('section.xpmedia-form-error')).toHaveLength(1);
  });
});

window.history.back();
