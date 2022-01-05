import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ResetPassword from './default';

import FormPasswordConfirm from '../../components/FormPasswordConfirm';
import useIdentity from '../../components/Identity';

const resetMock = jest.fn(() => Promise.resolve());
const resetFailMock = jest.fn(() => Promise.reject());
const defaultCustomFields = { successActionURL: '/account/login/' };

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'arc-demo-5',
  })),
}));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    t: jest.fn((phrase) => ({
      'identity-block.email': 'Email',
      'identity-block.email-requirements': 'Email Required',
      'identity-block.reset-password-error': 'Uh oh!',
      'identity-block.reset-password-headline': 'Headline',
      'identity-block.reset-password-headline-submitted': 'Congratulations!',
      'identity-block.reset-password-instruction': 'Do the email thing',
      'identity-block.reset-password-instruction-submitted': 'You did the thing!',
      'identity-block.reset-password-submit': 'Submit',
      'identity-block.reset-password-submit-submitted': 'Submit Again',
      undefined: '',
    }[phrase])),
  })),
}));
jest.mock('../../components/FormPasswordConfirm');
jest.mock('../../components/Identity');

describe('Identity Password Reset Feature - unInitialized', () => {
  beforeAll(() => {
    window.history.pushState({}, '', '/test?nonce=abcd');
    useIdentity.mockImplementation(() => ({
      isInitialized: false,
      Identity: {
        getConfig: () => Promise.resolve({}),
        resetPassword: () => Promise.resolve({}),
      },
    }));
  });
  afterAll(() => {
    window.history.back();
    jest.restoreAllMocks();
  });

  it('renders nothing if identity not initialized', async (done) => {
    await act(async () => {
      const wrapper = await mount(
        <ResetPassword customFields={defaultCustomFields} />,
      );
      expect(wrapper.html()).toBe(null);
      done();
    });
  });
});

describe('Identity Password Reset Feature', () => {
  const mockResponse = jest.fn();
  let wrapper;

  beforeEach(async () => {
    window.history.pushState({}, '', '/?nonce=abcd');
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      Identity: {
        getConfig: () => Promise.resolve({}),
        resetPassword: resetMock,
      },
    }));
    FormPasswordConfirm.mockImplementation(() => (<input name="newPassword" defaultValue="notTestingThisComponent" />));
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        assign: mockResponse,
      },
      writable: true,
    });

    await act(async () => {
      wrapper = await mount(<ResetPassword customFields={defaultCustomFields} />);
    });
    wrapper.update();
    wrapper.update();
  });

  afterEach(() => {
    window.history.back();
    jest.restoreAllMocks();
  });

  it('renders', () => {
    expect(wrapper.html()).not.toBe(null);
  });

  it('shows submit form', () => {
    expect(wrapper.text().includes('Headline')).toBe(true);
    expect(wrapper.text().includes('Do the email thing')).toBe(true);
    expect(wrapper.text().includes('Submit')).toBe(true);
  });

  it('uses updates the page on submit and redirects the user to login when done', async () => {
    await act(async () => {
      wrapper.find('input[name="newPassword"]').instance().value = '01PASSword!@';
      wrapper.find('form').simulate('submit');
      await resetMock;
      expect(resetMock).toHaveBeenCalled();
    });
    expect(wrapper.text().includes('Congratulations!')).toBe(true);
    expect(wrapper.text().includes('You did the thing!')).toBe(true);
    expect(wrapper.text().includes('Submit Again')).toBe(true);
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    expect(mockResponse).toHaveBeenCalledWith(defaultCustomFields.successActionURL);
  });
});

describe('Identity Password Reset Feature - Failing', () => {
  let wrapper;

  beforeEach(async () => {
    window.history.pushState({}, '', '/?nonce=abcd');
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      Identity: {
        getConfig: () => Promise.resolve({}),
        resetPassword: resetFailMock,
      },
    }));
    FormPasswordConfirm.mockImplementation(() => (<input name="newPassword" defaultValue="notTestingThisComponent" />));

    await act(async () => {
      wrapper = await mount(<ResetPassword customFields={defaultCustomFields} />);
    });
    wrapper.update();
    wrapper.update();
  });

  afterEach(() => {
    window.history.back();
    jest.restoreAllMocks();
  });

  it('renders', () => {
    expect(wrapper.html()).not.toBe(null);
  });

  it('shows submit form', () => {
    expect(wrapper.text().includes('Headline')).toBe(true);
    expect(wrapper.text().includes('Do the email thing')).toBe(true);
    expect(wrapper.text().includes('Submit')).toBe(true);
  });

  it('uses updates the page on submit', async () => {
    await act(async () => {
      wrapper.find('input[name="newPassword"]').instance().value = '01PASSword!@';
      wrapper.find('form').simulate('submit');
      await resetFailMock;
      expect(resetFailMock).toHaveBeenCalled();
    });
    wrapper.update();
    expect(wrapper.find('section.xpmedia-form-error')).toHaveLength(1);
  });
});
