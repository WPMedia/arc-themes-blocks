import React from 'react';
import { mount } from 'enzyme';
import { useFusionContext } from 'fusion:context';

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

      expect(wrapper.find('.numbered-list-container').length).toEqual(1);
      expect(wrapper.find('.numbered-list-container').childAt(0).type()).toEqual('div');
      expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-item-number').length).toEqual(1);
      expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-item-number').children()
        .text()).toEqual('1');
      expect(wrapper.find('.numbered-list-container').childAt(0).find('.headline-list-anchor').length).toEqual(1);
      expect(wrapper.find('.numbered-list-container').childAt(0).find('.headline-list-anchor').find('.headline-text')).toHaveLength(1);
      expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-anchor-image').length).toEqual(1);
      expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-anchor-image').find('Image').length)
        .toEqual(1);
      expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-anchor-image').find('Image'))
        .toHaveProp('url', 'https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/K6FTNMOXBBDS5HHTYTAV7LNEF4.jpg');
      expect(wrapper.find('.numbered-list-container').childAt(0).find('.headline-list-anchor').find('.headline-text')
        .children()
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
      expect(wrapper.find('.numbered-list-container').childAt(4).type()).toEqual('div');
      expect(wrapper.find('.numbered-list-container').childAt(4).find('.list-anchor-image').length).toEqual(1);
      const placeholderImage = wrapper.find('.numbered-list-container').childAt(4).find('.list-anchor-image').children();
      // the placeholder component is mocked globally in jest mocks with this alt tag
      expect(placeholderImage.html()).toEqual('<img alt="test">');
      expect(wrapper.find('.numbered-list-container').childAt(6).find('.headline-list-anchor').find('.headline-text')
        .children()
        .text()).toEqual('Story with video as the Lead Art');
    });

    it.only('should render elements only for arcSite', () => {
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
  });
});
