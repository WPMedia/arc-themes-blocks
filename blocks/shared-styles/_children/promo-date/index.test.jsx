import React from 'react';
import { mount } from 'enzyme';

import PromoDate from './index';

jest.mock('fusion:properties', () => jest.fn(() => (
  {
    dateLocalization: {
      language: 'en',
      timeZone: 'America/New_York',
      dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
      dateFormat: 'LLLL d, yyyy',
    },
  }
)));

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  localizeDateTime: jest.fn((x) => new Date(x).toDateString()),
}));

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    globalContent: {},
    arcSite: 'the-sun',
  })),
}));

describe('PromoDate', () => {
  it('renders nothing if no linkText', () => {
    const wrapper = mount(<PromoDate />);

    expect(wrapper.html()).toBe(null);
  });

  // it('renders custom text', () => {
  //   const props = {
  //     date: '2019-08-11T16:45:33.209Z',
  //   };

  //   const wrapper = mount(<PromoDate {...props} />);

  //   expect(wrapper.find('time').text()).toBe('Sun Aug 11 2019');
  //   expect(wrapper.find('time').prop('dateTime')).toBe('2019-08-11T16:45:33.209Z');
  // });

  // it('renders description from ANS Story object', () => {
  //   const props = {
  //     content: {
  //       display_date: '2019-08-11T16:45:33.209Z',
  //     },
  //   };

  //   const wrapper = mount(<PromoDate {...props} />);

  //   expect(wrapper.find('time').text()).toBe('Sun Aug 11 2019');
  //   expect(wrapper.find('time').prop('dateTime')).toBe('2019-08-11T16:45:33.209Z');
  // });
});
