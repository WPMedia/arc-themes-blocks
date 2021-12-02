import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import useIdentity from '../../components/Identity';
import AccountManagement, { AccountManagementPresentational } from './default';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
}))));

jest.mock('../../components/Identity');

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../intl.json')[phrase][locale]) })),
}));

const loginMock = jest.fn(() => Promise.resolve({}));

describe('Account management', () => {
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
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders header text', () => {
    const wrapper = mount(<AccountManagementPresentational header="header" />);
    expect(wrapper.find('h2').text()).toEqual('header');
  });

  it('should render account management if logged in and initialized', async () => {
    await act(async () => {
      const wrapper = await mount(
        <AccountManagement customFields={{}} />,
      );
      expect(wrapper.find('h2').text()).toEqual('Account Information');
    });
  });

  it('should not render if not logged in and not initialized', async () => {
    useIdentity.mockImplementation(() => ({
      isInitialized: false,
      isLoggedIn: () => false,
      Identity: {
        isLoggedIn: jest.fn(async () => false),
        getConfig: jest.fn(async () => ({})),
      },
    }));

    await act(async () => {
      const wrapper = await mount(
        <AccountManagement customFields={{}} />,
      );
      expect(wrapper.html()).toBe(null);
    });
  });
  it('shows email input editable field if showing email', () => {
    const wrapper = mount(<AccountManagement customFields={{ showEmail: true }} />);
    expect(wrapper.find('section').length).toBe(1);
  });
  it('hides email input editable field if showing email', () => {
    const wrapper = mount(<AccountManagement customFields={{ showEmail: false }} />);
    expect(wrapper.find('section').length).toBe(0);
  });
});
