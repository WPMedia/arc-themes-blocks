import React from 'react';
import { shallow, mount } from 'enzyme';
import getProperties from 'fusion:properties';

// A payload with 4 columns and 11 column items
const mockPayload = {
  children: [
    {
      _id: 'terms-of-use',
      name: 'Terms of Use',
      children: [
        {
          display_name: 'Terms of Service',
          url: 'www.some-website',
          _id: 'column-item-1',
        },
        {
          display_name: 'RSS Terms of Service',
          url: 'www.some-website2',
          _id: 'column-item-2',
        },
        {
          display_name: 'Some other Terms of Service',
          url: 'www.some-website3',
          _id: 'column-item-3',
        },
      ],
    },
    {
      _id: 'contact-us',
      name: 'Contact Us',
      children: [
        {
          display_name: 'Phone',
          url: 'www.phone.com',
          _id: 'column-item-4',
        },
        {
          display_name: 'Email',
          url: 'www.email.com',
          _id: 'column-item-5',
        },
        {
          display_name: 'Fax',
          url: 'www.who-uses-fax.com',
          _id: 'column-item-6',
        },
      ],
    },
    {
      _id: 'about-us',
      name: 'About Us',
      children: [
        {
          display_name: 'Events',
          url: 'www.events.com',
          _id: 'column-item-7',
        },
        {
          display_name: 'Careers',
          url: 'www.plz-hire-me.com',
          _id: 'column-item-8',
        },
        {
          display_name: 'The Team',
          url: 'www.the-world.com',
          _id: 'column-item-9',
        },
      ],
    },
    {
      _id: 'get-us',
      name: 'Get Us',
      children: [
        {
          display_name: 'Why Our Product',
          url: 'www.plz-buy-our-products.com',
          _id: 'column-item-10',
        },
        {
          display_name: 'Pricing',
          url: 'www.the-dollars.com',
          _id: 'column-item-11',
        },
      ],
    },
  ],
};

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

describe('the footer feature for the default output type', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        id: 'testId',
      })),
    }));
  });

  it('should be a footer element', () => {
    const { default: Footer } = require('./default');
    const wrapper = shallow(<Footer />);

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => (mockPayload)),
    }));
    expect(wrapper.at(0).type()).toBe('footer');
  });

  it('should have 4 column headers', () => {
    const { default: Footer } = require('./default');
    const wrapper = mount(<Footer />);

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => (mockPayload)),
    }));

    expect(wrapper.find('ul > section')).toHaveLength(4);
  });

  it('should have 11 column items', () => {
    const { default: Footer } = require('./default');
    const wrapper = mount(<Footer />);

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => (mockPayload)),
    }));

    expect(wrapper.find('ul > li')).toHaveLength(11);
  });

  it('should have empty column when empty payload is given', () => {
    const { default: Footer } = require('./default');
    const wrapper = shallow(<Footer />);
    getProperties.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg' }));

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({})),
    }));

    expect(wrapper.find('footer > ul')).toHaveLength(0);
  });

  it('should have empty column without error when undefined payload is given', () => {
    const { default: Footer } = require('./default');
    const wrapper = shallow(<Footer />);
    getProperties.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg' }));

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => (undefined)),
    }));

    expect(wrapper.find('footer > ul')).toHaveLength(0);
  });
});
