/* eslint-disable prefer-arrow-callback, react/jsx-props-no-spreading, max-len */
import React from 'react';
import { shallow } from 'enzyme';
// import getThemeStyle from 'fusion:themes';
// import getTranslatedPhrases from 'fusion:intl';
// import getProperties from 'fusion:properties';
import mockData, { oneListItem, LineItemWithOutDescription, withoutByline } from '../mock-data';

jest.mock('fusion:themes', () => ({
  __esModule: true,
  default: jest.fn(() => ({ 'primary-font-family': 'Open Sans', 'primary-color': '#10c8cd' })),
}));
jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
}))));
jest.mock('fusion:intl', () => ({
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

describe('The search results list', () => {
  describe('renders a search bar', () => {
    const { default: SearchResultsList } = require('./global-content');
    SearchResultsList.prototype.fetchContent = jest.fn();
    const wrapper = shallow(<SearchResultsList globalContent={oneListItem} arcSite="the-sun" deployment={jest.fn((path) => path)} />);

    it('should render a text input', () => {
      expect(wrapper.find('.search-bar').length).toEqual(1);
      expect(wrapper.find('.search-bar').prop('placeholder')).toEqual('Enter your search terms');
    });

    it('should show the total number of hits', () => {
      expect(wrapper.find('.search-results-text').text()).toEqual('%{smart_count} result for "%{searchTerm}" |||| %{smart_count} results for "%{searchTerm}"');
    });

    describe('renders a search button', () => {
      it('should render a search button to search for results', () => {
        expect(wrapper.find('.btn').at(0).length).toEqual(1);
        expect(wrapper.find('.btn').at(0).text()).toEqual('Search');
      });

      it('should have the primary color as background color', () => {
        expect((wrapper.find('.see-more')).childAt(0).text()).toEqual('See More stories about this topic');
      });

      it('should have the primary text as font family', () => {
        expect((wrapper.find('.btn').at(0))).toHaveProp('primaryFont', 'Open Sans');
      });

      it('should have the primary text as font family', () => {
        expect((wrapper.find('.btn').at(0))).toHaveProp('primaryColor', '#10c8cd');
      });
    });

    describe('when a new search is made', () => {
      global.window = Object.create(window);
      Object.defineProperty(window, 'location', {
        value: {
          href: '',
        },
      });
      it('should go to a new page if a search value is provided', () => {
        wrapper.setState({ value: 'article' }, () => {
          wrapper.update();
          expect(wrapper.state('value')).toEqual('article');
          wrapper.find('.btn').at(0).simulate('click');
          expect(window.location.href).toEqual('/search/article');
        });
      });
      it('should not go to a new page if no search value is provided', () => {
        window.location.href = '';
        wrapper.setState({ value: '' }, () => {
          wrapper.update();
          expect(wrapper.state('value')).toEqual('');
          wrapper.find('.btn').at(0).simulate('click');
          expect(window.location.href).toEqual('');
        });
      });
    });
  });

  it('should render a list of stories', () => {
    const { default: SearchResultsList } = require('./global-content');
    SearchResultsList.prototype.fetchContent = jest.fn();
    const wrapper = shallow(<SearchResultsList globalContent={mockData} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    expect(wrapper.find('.results-list-container').length).toEqual(1);
    expect(wrapper.find('SearchResult').length).toEqual(28);
    // expect(wrapper.find('.results-list-container').childAt(0).hasClass('list-item')).toEqual(true);
  });

  // describe('renders one list item correctly when list of authors is missing', () => {
  //   const { default: SearchResultsList } = require('./global-content');
  //   SearchResultsList.prototype.fetchContent = jest.fn();
  //   const wrapper = shallow(<SearchResultsList globalContent={withoutByline} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
  //   it('should render one parent wrapper', () => {
  //     expect(wrapper.find('.results-list-container').length).toEqual(1);
  //   });
  //
  //   it('should render a separator', () => {
  //     expect(wrapper.find('.list-item').find('.dot-separator').length).toEqual(0);
  //   });
  // });

  describe('renders a button to display more stories', () => {
    it('should render a button to display more stories', () => {
      const { default: SearchResultsList } = require('./global-content');
      SearchResultsList.prototype.fetchContent = jest.fn();
      const wrapper = shallow(<SearchResultsList globalContent={oneListItem} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
      expect(wrapper.find('.see-more').childAt(0).length).toEqual(1);
    });

    it('should have the primary text as font family', () => {
      const { default: SearchResultsList } = require('./global-content');
      SearchResultsList.prototype.fetchContent = jest.fn();
      const wrapper = shallow(<SearchResultsList globalContent={oneListItem} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
      expect((wrapper.find('.see-more')).childAt(0)).toHaveProp('primaryFont', 'Open Sans');
    });

    it('should have the primary text as font family', () => {
      const { default: SearchResultsList } = require('./global-content');
      SearchResultsList.prototype.fetchContent = jest.fn();
      const wrapper = shallow(<SearchResultsList globalContent={oneListItem} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
      expect((wrapper.find('.see-more')).childAt(0)).toHaveProp('primaryColor', '#10c8cd');
    });

    describe('when the locale is unset', () => {
      // TODO
      // it('should have invisible text for accessibility when using the default English', () => {
      //   getTranslatedPhrases.mockImplementation((locale) => ({
      //     t: jest.fn(() => ({ en: 'See More', sv: 'Visa fler' })[locale]),
      //   }));
      //   const { default: SearchResultsList } = require('./global-content');
      //   const wrapper = shallow(<SearchResultsList globalContent={oneListItem} />);
      //   expect(wrapper.find('.see-more').childAt(0).text()).toEqual('See More stories about this topic');
      // });
    });

    describe('when the locale is set', () => {
      // TODO
      // it('should not have invisible text for accessibility', () => {
      //   getTranslatedPhrases.mockImplementation((locale) => ({
      //     t: jest.fn(() => ({ en: 'See More', sv: 'Visa fler' })[locale]),
      //   }));
      //   getProperties.mockImplementation(() => ({
      //     locale: 'sv',
      //   }));
      //   const { default: SearchResultsList } = require('./global-content');
      //   const wrapper = shallow(<SearchResultsList globalContent={oneListItem} />);
      //   expect(wrapper.find('.see-more').childAt(0).text()).toEqual('Visa fler');
      // });
    });
  });
});
