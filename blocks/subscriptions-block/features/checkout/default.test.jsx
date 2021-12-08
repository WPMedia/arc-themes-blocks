import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import useIdentity from '@wpmedia/identity-block/components/Identity';
import useSales from '../../components/useSales';

import Checkout from './default';

jest.mock('@wpmedia/identity-block/components/Identity');

jest.mock('../../components/useSales');

jest.mock('fusion:properties', () => (jest.fn(() => ({ api: { retail: { origin: '' } } }))));

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

describe('Checkout Feature', () => {
  it('renders link, cart and contact info', () => {
    useIdentity.mockImplementation(() => ({
      Identity: {
        isLoggedIn: jest.fn(async () => false),
      },
    }));

    useSales.mockReturnValue({
      Sales: {},
    });

    const wrapper = shallow(
      <Checkout
        customFields={{
          offerURL: '/offer-url/',
        }}
      />,
    );

    expect(wrapper.find('a').prop('href')).toBe('/offer-url/');
    expect(wrapper.find('Cart').exists()).toBe(true);
    expect(wrapper.find('ContactInfo').exists()).toBe(true);
  });

  it('Renders PaymentInfo after creating an order', async () => {
    let wrapper;

    const userProfile = Promise.resolve({ email: 'email@email.com', firstName: 'first name', lastName: 'last name' });
    const updateUserProfileMock = jest.fn();

    useIdentity.mockImplementation(() => ({
      Identity: {
        isLoggedIn: jest.fn(async () => true),
        getUserProfile: jest.fn(() => userProfile),
        updateUserProfile: updateUserProfileMock,
      },
    }));

    const createNewOrderMock = Promise.resolve({ orderNumber: 1 });
    const getPaymentOptionsMock = Promise.resolve([{ paymentMethodID: 11 }]);
    const initializePaymentMock = Promise.resolve({});

    useSales.mockReturnValue({
      Sales: {
        getCart: jest.fn(async () => Promise.resolve({})),
        createNewOrder: jest.fn(() => createNewOrderMock),
        getPaymentOptions: jest.fn(() => getPaymentOptionsMock),
        initializePayment: jest.fn(() => initializePaymentMock),
      },
    });

    await act(async () => {
      wrapper = await mount(
        <Checkout
          customFields={{
            offerURL: '/offer-url/',
          }}
        />,
      );
    });
    await userProfile;
    wrapper.update();

    expect(wrapper.find('ContactInfo').exists()).toBe(true);

    wrapper.find('option').at(1).instance().selected = true;

    await act(async () => {
      wrapper.find('form').simulate('submit');
      await initializePaymentMock;
    });

    wrapper.update();

    expect(updateUserProfileMock).toHaveBeenCalled();


    expect(wrapper.find('ContactInfo').exists()).toBe(false);
    expect(wrapper.find('PaymentInfo').exists()).toBe(true);
  });
});
