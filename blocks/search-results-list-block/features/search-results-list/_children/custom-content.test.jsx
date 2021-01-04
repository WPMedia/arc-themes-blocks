/* eslint-disable prefer-arrow-callback, react/jsx-props-no-spreading  */
import React from 'react';
import { shallow } from 'enzyme';
import getThemeStyle from 'fusion:themes';
import mockData from '../mock-data';

const mockReturnData = mockData;

jest.mock('fusion:themes', () => jest.fn(() => ({})));
jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
}))));

jest.mock('@wpmedia/intl-block', () => ({
  __esModule: true,
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../../intl.json')[phrase][locale]) })),
}));

jest.mock('@wpmedia/byline-block', () => ({
  __esModule: true,
  default: function Byline(props, children) { return <div {...props}>{children}</div>; },
}));

jest.mock('@wpmedia/date-block', () => ({
  __esModule: true,
  default: function ArticleDate(props, children) { return <div {...props}>{children}</div>; },
}));

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  __esModule: true,
  Image: () => <div />,
}));

const fullPromoElements = {
  showHeadline: true,
  showImage: true,
  showDescription: true,
  showByline: true,
  showDate: true,
};

describe('The search results list', () => {
  describe('renders a search bar', () => {
    const { default: SearchResultsList } = require('./custom-content');
    getThemeStyle.mockImplementation(() => ({ 'primary-font-family': 'Open Sans', 'primary-color': '#10c8cd' }));
    SearchResultsList.prototype.fetchStories = jest.fn();
    SearchResultsList.prototype.onChange = jest.fn();
    SearchResultsList.prototype.fetchContent = jest.fn();
    const wrapper = shallow(<SearchResultsList
      arcSite="the-sun"
      targetFallbackImage=""
      deployment={jest.fn((path) => path)}
    />);
    wrapper.setState({ resultList: mockData, searchTerm: 'test' }, () => {
      wrapper.update();
      it('should render a text input', () => {
        expect(wrapper.find('.search-bar').length).toEqual(1);
        expect(wrapper.find('.search-bar').prop('placeholder')).toEqual('Enter your search terms here');
      });

      it('should show the total number of hits', () => {
        expect(wrapper.find('.search-results-text').text()).toEqual('%{smart_count} result for "%{searchTerm}" |||| %{smart_count} results for "%{searchTerm}"');
      });

      it('should set a search term', () => {
        expect(wrapper.state('searchTerm')).toEqual('test');
      });

      it("onChange param is the same value as the input element's value property", () => {
        wrapper.find('input').simulate('change', { target: { value: 'term' } });
        expect(wrapper.state('value')).toEqual('term');
      });

      describe('renders a search button', () => {
        it('should render a search button to search for results', () => {
          expect(wrapper.find('.btn').at(0).length).toEqual(1);
          expect(wrapper.find('.btn').at(0).text()).toEqual('Search');
        });

        it('should call fetchContent when clicked', () => {
          expect(SearchResultsList.prototype.fetchStories.mock.calls.length).toEqual(0);
          wrapper.find('.btn').at(0).simulate('click');
          expect(SearchResultsList.prototype.fetchStories.mock.calls.length).toEqual(1);
        });

        it('should have the primary text as font family', () => {
          expect((wrapper.find('.btn').at(0))).toHaveProp('primaryFont', 'Open Sans');
        });

        it('should have the primary text as font family', () => {
          expect((wrapper.find('.btn').at(0))).toHaveProp('primaryColor', '#10c8cd');
        });
      });
    });
  });

  it('should render a list of stories', () => {
    const { default: SearchResultsList } = require('./custom-content');
    SearchResultsList.prototype.fetchContent = jest.fn().mockReturnValue(mockReturnData);
    const wrapper = shallow(<SearchResultsList arcSite="the-sun" promoElements={fullPromoElements} deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: mockData }, () => {
      wrapper.update();
      expect(wrapper.find('.results-list-container').length).toEqual(1);
      expect(wrapper.find('SearchResult').length).toEqual(28);
    });
  });

  describe('renders a button to display more stories', () => {
    const { default: SearchResultsList } = require('./custom-content');
    SearchResultsList.prototype.fetchStories = jest.fn().mockReturnValue(mockReturnData);
    SearchResultsList.prototype.fetchContent = jest.fn();

    const wrapper = shallow(<SearchResultsList arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: mockData }, () => {
      wrapper.update();
      it('should render a button to display more stories', () => {
        expect((wrapper.find('.see-more')).childAt(0).length).toEqual(1);
      });

      it('should have invisible text for accessibility purposes', () => {
        expect((wrapper.find('.see-more')).childAt(0).text()).toEqual('See More stories about this topic');
      });

      it('should call fetchContent when clicked', () => {
        expect(SearchResultsList.prototype.fetchStories.mock.calls.length).toEqual(1);
        (wrapper.find('.see-more')).childAt(0).simulate('click');
        expect(SearchResultsList.prototype.fetchStories.mock.calls.length).toEqual(2);
      });

      it('should have the primary text as font family', () => {
        expect((wrapper.find('.see-more')).childAt(0)).toHaveProp('primaryFont', 'Open Sans');
      });

      it('should have the primary text as font family', () => {
        expect((wrapper.find('.see-more')).childAt(0)).toHaveProp('primaryColor', '#10c8cd');
      });
    });
  });
});
