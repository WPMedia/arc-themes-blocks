import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import useIdentity from '../../../components/Identity';
import PasswordEditableFieldContainer from './PasswordEditableFieldContainer';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
}))));

jest.mock('../../../components/Identity');

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../../intl.json')[phrase][locale]) })),
}));

const responseData = {
  pwLowercase: '1',
  pwMinLength: '1',
  pwPwNumbers: '1',
  pwSpecialCharacters: '1',
  pwUppercase: '1',
};

const getConfigMock = jest.fn(() => Promise.resolve(responseData));

describe('PasswordEditableFieldContainer', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it.only('should render component with Add Password label', async () => {
    useIdentity.mockImplementation(() => ({
      Identity: {
        getConfig: getConfigMock,
      },
    }));

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <PasswordEditableFieldContainer />,
      );
    });
    await getConfigMock;
    wrapper.update();
    expect(wrapper.find('.editable-form-input--value-text').text()).toBe('Add Password');
  });

  it.only('should render component with password placeholder label', async () => {
    useIdentity.mockImplementation(() => ({
      Identity: {
        getConfig: getConfigMock,
      },
    }));

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <PasswordEditableFieldContainer hasPassword />,
      );
    });
    await getConfigMock;
    wrapper.update();
    expect(wrapper.find('.editable-form-input--value-text').text()).toBe('**********');
  });
});
