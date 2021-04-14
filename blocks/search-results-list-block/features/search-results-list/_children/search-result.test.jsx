/* eslint-disable prefer-arrow-callback, camelcase, dot-notation  */

import React from 'react';
import { mount } from 'enzyme';

import { oneListItem, LineItemWithOutDescription } from '../mock-data';
import SearchResult from './search-result';

jest.mock('fusion:themes', () => jest.fn(() => ({})));
jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
  resizerURL: 'http://example.com',
}))));

jest.mock('fusion:context', () => ({
  useAppContext: jest.fn(() => ({})),
  useFusionContext: jest.fn(() => ({
    arcSite: 'the-sun',
  })),
}));

describe('The search results', () => {
  describe('renders one list item correctly', () => {
    const element = oneListItem.data[0];
    if (element?.['promo_items']?.basic) {
      element.promo_items.basic.resized_params = { '274x154': '' };
    }
    const fullElements = {
      showHeadline: true,
      showImage: true,
      showDescription: true,
      showByline: true,
      showDate: true,
    };

    const wrapper = mount(
      <SearchResult
        element={element}
        arcSite="the-sun"
        targetFallbackImage="/resource/example.jpg"
        placeholderResizedImageOptions={{}}
        promoElements={fullElements}
      />,
    );

    it('should render one list item as its child', () => {
      expect(wrapper.find('.list-item').length).toEqual(1);
    });

    it('should render one image wrapped in an anchor tag', () => {
      expect(wrapper.find('.list-item').find('.list-anchor').length).toEqual(2);
      expect(wrapper.find('.list-item').find('.list-anchor').find('Image').length).toEqual(1);
    });

    it('should render an anchor and an image with the correct url', () => {
      expect(wrapper.find('.list-item').find('.list-anchor').at(0).find('a')
        .prop('href')).toEqual('/arts/2019/12/18/article-with-a-youtube-embed-in-it/');
    });

    it('should render a parent for headline and a description', () => {
      expect(wrapper.find('.list-item').find('.results-list--description-author-container').length).toEqual(1);
    });

    it('should render a headline and a description', () => {
      expect(wrapper.find('.list-item').find('.results-list--description-author-container').length).toEqual(1);
      expect(wrapper.find('.list-item').find('.results-list--headline-container').find('.list-anchor').length).toEqual(1);
      expect(wrapper.find('.list-item').find('.results-list--headline-container').find('.list-anchor').find('h2.headline-text').length).toEqual(1);
      expect(wrapper.find('.list-item').find('.results-list--headline-container').find('.list-anchor').find('h2.headline-text')
        .text()).toEqual('Article with a YouTube embed in it');
      expect(wrapper.find('.list-item').find('.results-list--description-author-container').find('p.description-text')
        .text()).toEqual('Test article for YouTube responsiveness');
    });

    it('should render an author and a publish date section', () => {
      expect(wrapper.find('.list-item').find('.results-list--author-date').length).toEqual(1);
    });

    it('should render a byline', () => {
      expect(wrapper.find('.list-item').find('.results-list--author-date').find('ArticleByline').length).toEqual(1);
    });

    it('should render a separator', () => {
      expect(wrapper.find('.list-item').find('.dot-separator').length).toEqual(1);
    });

    it('should render a publish date', () => {
      expect(wrapper.find('.list-item').find('.results-list--author-date').find('ArticleDate').length).toEqual(1);
    });
  });

  describe('renders one list item correctly when description is missing', () => {
    const element = LineItemWithOutDescription.data[0];
    if (element?.['promo_items']?.basic) {
      element.promo_items.basic.resized_params = { '274x154': '' };
    }
    const fullElements = {
      showHeadline: true,
      showImage: true,
      showDescription: true,
      showByline: true,
      showDate: true,
    };

    const wrapper = mount(
      <SearchResult
        element={element}
        arcSite="the-sun"
        targetFallbackImage="/resource/example.jpg"
        placeholderResizedImageOptions={{}}
        promoElements={fullElements}
      />,
    );

    it('should render a parent for headline and a description', () => {
      expect(wrapper.find('.list-item').find('.results-list--description-author-container').length).toEqual(1);
    });

    it('should render a headline', () => {
      expect(wrapper.find('.list-item').find('.results-list--description-author-container').length).toEqual(1);
      expect(wrapper.find('.list-item').find('.results-list--headline-container').find('.list-anchor').length).toEqual(1);
      expect(wrapper.find('.list-item').find('.results-list--headline-container').find('.list-anchor').find('h2.headline-text').length).toEqual(1);
      expect(wrapper.find('.list-item').find('.results-list--headline-container').find('.list-anchor').find('h2.headline-text')
        .text()).toEqual('Article with a YouTube embed in it');
    });

    it('should not render a description', () => {
      expect(wrapper.find('.list-item').find('.results-list--headline-container').find('.list-anchor').find('p.description-text').length).toEqual(0);
    });
  });

  describe('renders results items on demand', () => {
    const element = oneListItem.data[0];
    if (element?.['promo_items']?.basic) {
      element.promo_items.basic.resized_params = { '274x154': '' };
    }

    it('should not render promo elements', () => {
      const promoElements = {
        showHeadline: false,
        showImage: false,
        showDescription: false,
        showByline: false,
        showDate: false,
      };

      const wrapper = mount(
        <SearchResult
          element={element}
          arcSite="the-sun"
          targetFallbackImage="/resource/example.jpg"
          placeholderResizedImageOptions={{}}
          promoElements={promoElements}
        />,
      );

      expect(wrapper.find('.list-item').length).toEqual(1);
      expect(wrapper.find('.list-item').children().length).toEqual(0);
    });

    it('should render only headline', () => {
      const promoElements = {
        showHeadline: true,
        showImage: false,
        showDescription: false,
        showByline: false,
        showDate: false,
      };

      const wrapper = mount(
        <SearchResult
          element={element}
          arcSite="the-sun"
          targetFallbackImage="/resource/example.jpg"
          placeholderResizedImageOptions={{}}
          promoElements={promoElements}
        />,
      );

      const headline = wrapper.find('.list-item').find('.results-list--headline-container');
      expect(headline.length).toEqual(1);
      expect(headline.find('.list-anchor').length).toEqual(1);
      expect(headline.find('h2.headline-text').length).toEqual(1);
      expect(headline.text()).toEqual('Article with a YouTube embed in it');
    });

    it('should render only image', () => {
      const promoElements = {
        showHeadline: false,
        showImage: true,
        showDescription: false,
        showByline: false,
        showDate: false,
      };

      const wrapper = mount(
        <SearchResult
          element={element}
          arcSite="the-sun"
          targetFallbackImage="/resource/example.jpg"
          placeholderResizedImageOptions={{}}
          promoElements={promoElements}
        />,
      );

      const image = wrapper.find('.list-item').find('.results-list--image-container');
      expect(image.length).toEqual(1);
      expect(image.find('.list-anchor').length).toEqual(1);
      expect(image.find('Image').length).toEqual(1);
      expect(image.find('Image').prop('alt')).toEqual('Article with a YouTube embed in it');
    });

    it('should render only description', () => {
      const promoElements = {
        showHeadline: false,
        showImage: false,
        showDescription: true,
        showByline: false,
        showDate: false,
      };

      const wrapper = mount(
        <SearchResult
          element={element}
          arcSite="the-sun"
          targetFallbackImage="/resource/example.jpg"
          placeholderResizedImageOptions={{}}
          promoElements={promoElements}
        />,
      );

      const desc = wrapper.find('.list-item').find('.results-list--description-author-container');
      expect(desc.length).toEqual(1);
      expect(desc.find('p.description-text').length).toEqual(1);
      expect(desc.find('p.description-text').text()).toEqual('Test article for YouTube responsiveness');
      // check missing internal items
    });

    it('should render only byline', () => {
      const promoElements = {
        showHeadline: false,
        showImage: false,
        showDescription: false,
        showByline: true,
        showDate: false,
      };

      const wrapper = mount(
        <SearchResult
          element={element}
          arcSite="the-sun"
          targetFallbackImage="/resource/example.jpg"
          placeholderResizedImageOptions={{}}
          promoElements={promoElements}
        />,
      );

      const desc = wrapper.find('.list-item').find('.results-list--description-author-container');
      expect(desc.length).toEqual(1);
      expect(desc.find('ArticleByline').length).toEqual(1);
      // check internal items
    });

    it('should render only date', () => {
      const promoElements = {
        showHeadline: false,
        showImage: false,
        showDescription: false,
        showByline: false,
        showDate: true,
      };

      const wrapper = mount(
        <SearchResult
          element={element}
          arcSite="the-sun"
          targetFallbackImage="/resource/example.jpg"
          placeholderResizedImageOptions={{}}
          promoElements={promoElements}
        />,
      );

      const desc = wrapper.find('.list-item').find('.results-list--description-author-container');
      expect(desc.length).toEqual(1);
      expect(desc.find('ArticleDate').length).toEqual(1);
      // check internal items
    });
  });

  describe('handles missing webbsites object', () => {
    const element = {};
    const fullElements = {
      showHeadline: true,
      showImage: true,
      showDescription: true,
      showByline: true,
      showDate: true,
    };

    const wrapper = mount(
      <SearchResult
        element={element}
        arcSite="the-sun"
        targetFallbackImage="/resource/example.jpg"
        placeholderResizedImageOptions={{}}
        promoElements={fullElements}
      />,
    );

    it('should render one list item as its child', () => {
      expect(wrapper.find('.list-item').length).toEqual(0);
    });
  });
});
