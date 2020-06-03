import React from 'react';
import { mount } from 'enzyme';

const config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  showImageSM: true,
};

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
}))));
describe('top table list', () => {
  beforeEach(() => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
    }))));
  });
  afterEach(() => {
    jest.resetModules();
  });

  it('renders null if no content', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

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
      <TopTableList customFields={config} arcSite="" deployment={jest.fn((path) => path)} />,
    );
    expect(wrapper.text()).toBe('');
    expect(wrapper.find('.top-table-list-container').children().length).toBe(0);
  });
  it('renders one content item with incomplete data', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
        }],
      })),
    }));

    const wrapper = mount(
      <TopTableList customFields={config} arcSite="" deployment={jest.fn((path) => path)} />,
    );
    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });
  it('renders one content item with complete data', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

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
          websites: {
            'the-sun': {
              website_url: 'url',
            },
          },
        }],
      })),
    }));

    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

    const wrapper = mount(
      <TopTableList customFields={config} arcSite="" deployment={jest.fn((path) => path)} />,
    );

    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });
});
