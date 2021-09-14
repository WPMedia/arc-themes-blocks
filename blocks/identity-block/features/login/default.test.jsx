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

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
describe('Subscriptions Login Feature', () => {
  let wrapper;
  beforeEach(async () => {
    useIdentity.mockImplementation(() => ({
      isInitialized: true,
      isLoggedIn: () => true,
      Identity: {
        isLoggedIn: jest.fn(async () => false),
        getConfig: jest.fn(async () => ({})),
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
  });
});
