import React from 'react';
import { mount } from 'enzyme';

import PromoHeadline from './index';

jest.mock('fusion:content', () => ({
  useEditableContent: jest.fn(() => ({
    editableContent: () => ({ contentEditable: 'true' }),
  })),
}));

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'the-sun',
  })),
}));

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

describe('PromoHeadline', () => {
  it('renders nothing if no linkText', () => {
    const wrapper = mount(<PromoHeadline />);

    expect(wrapper.html()).toBe(null);
  });

  it('renders custom link with link text', () => {
    const props = {
      text: 'Link text',
      link: 'https://arcxp.com',
    };

    const wrapper = mount(<PromoHeadline {...props} />);

    expect(wrapper.find('a').text()).toBe(props.text);
    expect(wrapper.find('a').prop('href')).toBe(props.link);
  });

  it('renders link with link text from ANS Story object', () => {
    const props = {
      content: {
        headlines: {
          basic: 'An ANS Story headline',
        },
        websites: {
          'the-sun': {
            website_url: 'https://arcxp.com',
          },
        },
      },
    };

    const wrapper = mount(<PromoHeadline {...props} />);

    expect(wrapper.find('a').text()).toBe('An ANS Story headline');
    expect(wrapper.find('a').prop('href')).toBe('https://arcxp.com');
  });
});
