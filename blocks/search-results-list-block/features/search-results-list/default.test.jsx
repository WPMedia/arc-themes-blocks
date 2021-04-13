// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('./_children/global-content', () => class GlobalContentSearchResultsList {});
jest.mock('./_children/custom-content', () => class CustomContentSearchResultsList {});
jest.mock('prop-types', () => ({
  bool: true,
  shape: () => {},
  contentConfig: () => {},
}));
jest.mock('fusion:context', () => ({
  useAppContext: jest.fn(() => ({})),
}));

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
}))));

const defaultPromos = {
  showByline: true,
  showDate: true,
  showDescription: true,
  showHeadline: true,
  showImage: true,
};

describe('the search results list feature block', () => {
  describe('when it is configured to inherit global content', () => {
    it('should render the global content search results list', () => {
      const { default: SearchResultsListContainer } = require('./default');
      const wrapper = shallow(
        <SearchResultsListContainer
          customFields={{ inheritGlobalContent: true }}
          deployment={jest.fn((path) => path)}
        />,
      );
      expect(wrapper.is('GlobalContentSearchResultsList')).toBeTruthy();
    });
  });

  describe('when it is configured to NOT inherit global content', () => {
    const { default: SearchResultsListContainer } = require('./default');

    const wrapper = shallow(
      <SearchResultsListContainer
        customFields={{ inheritGlobalContent: false, sectionContentConfig: {} }}
        deployment={jest.fn((path) => path)}
      />,
    );

    it('should render the global content search results list', () => {
      expect(wrapper.is('CustomContentSearchResultsList')).toBeTruthy();
    });

    it('should render all promo items', () => {
      expect(wrapper.find('CustomContentSearchResultsList').prop('promoElements')).toEqual(defaultPromos);
    });
  });

  describe('when customFields is empty', () => {
    const { default: SearchResultsListContainer } = require('./default');
    const wrapper = shallow(<SearchResultsListContainer
      customFields={{}}
      deployment={jest.fn((path) => path)}
    />);

    it('should render the global content search results list', () => {
      expect(wrapper.is('GlobalContentSearchResultsList')).toBeTruthy();
    });

    it('should render all promo items', () => {
      expect(wrapper.find('GlobalContentSearchResultsList').prop('promoElements')).toEqual(defaultPromos);
    });
  });

  describe('when customFields is missing', () => {
    const { default: SearchResultsListContainer } = require('./default');
    const wrapper = shallow(<SearchResultsListContainer
      customFields={undefined}
      deployment={jest.fn((path) => path)}
    />);

    it('should render the global content search results list', () => {
      expect(wrapper.is('GlobalContentSearchResultsList')).toBeTruthy();
    });

    it('should render all promo items', () => {
      expect(wrapper.find('GlobalContentSearchResultsList').prop('promoElements')).toEqual(defaultPromos);
    });
  });
});
