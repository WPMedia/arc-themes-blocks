import React from 'react';
import { mount } from 'enzyme';

describe('top table list', () => {
  afterEach(() => {
    jest.resetModules();
  });
  it('renders null if no content', () => {
    const { default: TopTableList } = require('./default');

    jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(),
    }));
    const wrapper = mount(
      <TopTableList />,
    );
    expect(wrapper.text()).toBe('');
    expect(wrapper.find('.top-table-list-container').children().length).toBe(0);
  });
  it('renders one content item with incomplete data', () => {
    const { default: TopTableList } = require('./default');
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
        }],
      })),
    }));


    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

    const wrapper = mount(
      <TopTableList />,
    );
    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });
  it('renders one content item with complete data', () => {
    const { default: TopTableList } = require('./default');
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
          promo_items: {
            basic: {
              type: 'image',
              url: 'url',
            },
          },
          headlines: {
            basic: 'Basic Headline',
          },
          description: {
            basic: 'Basic description',
          },
          credits: {
            by: ['Bob Woodward'],
          },
        }],
      })),
    }));

    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

    const wrapper = mount(
      <TopTableList />,
    );

    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });
});
