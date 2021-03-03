// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { mount } from 'enzyme';

jest.mock('./_children/global-content', () => (
  function GlobalContentSearch(props) {
    return <div {...props} />;
  }
));
jest.mock('./_children/custom-content', () => (
  function CustomSearchResultsList(props) {
    return <div {...props} />;
  }
));
jest.mock('prop-types', () => ({
  bool: true,
  shape: () => {},
  contentConfig: () => {},
}));

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  LazyLoad: ({ children }) => <>{ children }</>,
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
      const wrapper = mount(
        <SearchResultsListContainer
          customFields={{ inheritGlobalContent: true }}
          deployment={jest.fn((path) => path)}
        />,
      );
      expect(wrapper.find('GlobalContentSearch')).toHaveLength(1);
    });
  });

  describe('when it is configured to NOT inherit global content', () => {
    const { default: SearchResultsListContainer } = require('./default');

    const wrapper = mount(
      <SearchResultsListContainer
        customFields={{ inheritGlobalContent: false, sectionContentConfig: {} }}
        deployment={jest.fn((path) => path)}
      />,
    );

    it('should render the global content search results list', () => {
      expect(wrapper.find('CustomSearchResultsList')).toHaveLength(1);
    });

    it('should render all promo items', () => {
      expect(wrapper.find('CustomSearchResultsList').prop('promoElements')).toEqual(defaultPromos);
    });
  });

  describe('when customFields is empty', () => {
    const { default: SearchResultsListContainer } = require('./default');
    const wrapper = mount(<SearchResultsListContainer
      customFields={{}}
      deployment={jest.fn((path) => path)}
    />);

    it('should render the global content search results list', () => {
      expect(wrapper.find('GlobalContentSearch')).toHaveLength(1);
    });

    it('should render all promo items', () => {
      expect(wrapper.find('GlobalContentSearch').prop('promoElements')).toEqual(defaultPromos);
    });
  });

  describe('when customFields is missing', () => {
    const { default: SearchResultsListContainer } = require('./default');
    const wrapper = mount(<SearchResultsListContainer
      customFields={undefined}
      deployment={jest.fn((path) => path)}
    />);

    it('should render the global content search results list', () => {
      expect(wrapper.find('GlobalContentSearch')).toHaveLength(1);
    });

    it('should render all promo items', () => {
      expect(wrapper.find('GlobalContentSearch').prop('promoElements')).toEqual(defaultPromos);
    });
  });
});
