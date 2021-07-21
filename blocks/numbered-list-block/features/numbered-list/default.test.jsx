import React from 'react';
import { mount } from 'enzyme';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
}))));

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: () => <img alt="test" />,
  LazyLoad: ({ children }) => <>{ children }</>,
  isServerSide: () => true,
}));
const { default: mockData } = require('./mock-data');

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => mockData),
}));

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'the-sun',
    deployment: jest.fn(() => {}),
  })),
}));

jest.mock('fusion:themes', () => (
  () => ({
    'primary-font-family': 'fontPrimary',
    'secondary-font-family': 'fontSecondary',
  })
));

jest.mock('@wpmedia/shared-styles', () => ({
  SecondaryFont: ({ children }) => <div id="secondary-font-mock">{ children }</div>,
  Heading: ({ children }) => children,
  HeadingSection: ({ children }) => children,
  VSpace: ({ children }) => children,
}));

describe('The numbered-list-block', () => {
  describe('render a list of numbered-list-items', () => {
    it('should render null if isServerSide and lazyLoad enabled', () => {
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = {
        listContentConfig,
        showHeadline: true,
        showImage: true,
        lazyLoad: true,
      };

      const { default: NumberedList } = require('./default');
      const wrapper = mount(<NumberedList customFields={customFields} />);
      expect(wrapper.html()).toBe(null);
    });

    it('should render list item with headline, image and a number', () => {
      const { default: NumberedList } = require('./default');
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = {
        listContentConfig,
        showHeadline: true,
        showImage: true,
      };

      const wrapper = mount(<NumberedList customFields={customFields} />);

      const firstResult = wrapper.find('.numbered-list-container').childAt(0);

      expect(wrapper.find('.numbered-list-container').length).toEqual(1);
      expect(firstResult.find('.list-item-number').at(0)
        .text()).toEqual('1');
      expect(firstResult.find('.list-anchor-image').at(0).find('Image'))
        .toHaveProp('url', 'https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/K6FTNMOXBBDS5HHTYTAV7LNEF4.jpg');
      expect(firstResult.find('.headline-text').at(0)
        .text()).toEqual('Article with only promo_items.basic');
    });

    it('should render a place holder image', () => {
      const { default: NumberedList } = require('./default');
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = {
        listContentConfig,
        showHeadline: true,
        showImage: true,
      };

      const wrapper = mount(<NumberedList customFields={customFields} />);

      expect(wrapper.find('.numbered-list-container').length).toEqual(1);
      const placeholderImage = wrapper.find('.list-anchor-image').at(4);
      // the placeholder component is mocked globally in jest mocks with this alt tag
      expect(placeholderImage.find('img').html()).toEqual('<img alt="test">');
    });

    it('should render elements only for arcSite', () => {
      const { default: NumberedList } = require('./default');
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = {
        listContentConfig,
        showHeadline: true,
        showImage: true,
      };

      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          arcSite: 'dagen',
          deployment: jest.fn(() => {}),
        })),
      }));

      const wrapper = mount(<NumberedList customFields={customFields} />);

      expect(wrapper.find('.numbered-list-container').length).toEqual(1);
      expect(wrapper.find('.numbered-list-item').length).toEqual(1);
    });

    it('should render no images', () => {
      const { default: NumberedList } = require('./default');
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = {
        listContentConfig,
        showHeadline: true,
        showImage: false,
      };
      const wrapper = mount(<NumberedList customFields={customFields} />);

      expect(wrapper.find('.numbered-list-container').length).toEqual(1);
      expect(wrapper.find('.numbered-list-item').length).toEqual(1);
      expect(wrapper.find('img').length).toEqual(0);
    });

    it('should render no headline', () => {
      const { default: NumberedList } = require('./default');
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = {
        listContentConfig,
        showHeadline: false,
      };
      const wrapper = mount(<NumberedList customFields={customFields} />);

      expect(wrapper.find('.numbered-list-container').length).toEqual(1);
      expect(wrapper.find('.numbered-list-item').length).toEqual(1);
      expect(wrapper.find('.headline-list-anchor').length).toEqual(0);
    });
  });
});
