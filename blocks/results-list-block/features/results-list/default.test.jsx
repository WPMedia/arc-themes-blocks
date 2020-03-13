/* eslint-disable prefer-arrow-callback, react/jsx-props-no-spreading  */
import React from 'react';
import { shallow } from 'enzyme';
import mockData, { oneListItem, LineItemWithOutDescription, withoutByline } from './mock-data';

const mockReturnData = mockData;

jest.mock('fusion:themes', () => jest.fn(() => ({})));
jest.mock('fusion:properties', () => jest.fn(() => ({})));

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

describe('The story-feed-list', () => {
  it('should render a list of stories', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '30',
      },
      contentService: 'story-feed-query',
    };
    const customFields = { listContentConfig };

    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue(mockReturnData);
    const wrapper = shallow(<ResultsList customFields={customFields} />);
    wrapper.setState({ resultList: mockData }, () => {
      wrapper.update();
      expect(wrapper.find('.results-list-container').length).toEqual(1);
      expect(wrapper.find('.list-item').length).toEqual(28);
      expect(wrapper.find('.results-list-container').childAt(0).hasClass('list-item')).toEqual(true);
    });
  });

  describe('renders one list item correctly', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '1',
      },
      contentService: 'story-feed-query',
    };
    const customFields = { listContentConfig };

    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue(oneListItem);
    const wrapper = shallow(<ResultsList customFields={customFields} />);
    wrapper.setState({ resultList: oneListItem }, () => {
      it('should have one parent wrapper', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
      });

      it('should render one list item as its child', () => {
        expect(wrapper.find('.results-list-container').childAt(0).hasClass('list-item')).toEqual(true);
        expect(wrapper.find('.list-item').length).toEqual(1);
      });

      it('should render one image wrapped in an anchor tag', () => {
        expect(wrapper.find('.list-item').find('.list-anchor').length).toEqual(2);
        expect(wrapper.find('.list-item').find('.list-anchor').find('Image').length).toEqual(1);
      });

      it('should render an anchor and an image with the correct url', () => {
        expect(wrapper.find('.list-item').find('.list-anchor').at(0).find('a')
          .prop('href')).toEqual('https://corecomponents-the-gazette-prod.cdn.arcpublishing.com//arts/2019/12/18/article-with-a-youtube-embed-in-it/');
      });

      it('should render a parent for headline and a description', () => {
        expect(wrapper.find('.list-item').find('.headline-description').length).toEqual(1);
      });

      it('should render a headline and a description', () => {
        expect(wrapper.find('.list-item').find('.headline-description').length).toEqual(1);
        expect(wrapper.find('.list-item').find('.headline-description').find('.list-anchor').length).toEqual(1);
        expect(wrapper.find('.list-item').find('.headline-description').find('.list-anchor').find('.headline-text').length).toEqual(1);
        expect(wrapper.find('.list-item').find('.headline-description').find('.list-anchor').find('.headline-text')
          .text()).toEqual('Article with a YouTube embed in it');
        expect(wrapper.find('.list-item').find('.headline-description').find('.description-text')
          .text()).toEqual('Test article for YouTube responsiveness');
      });

      it('should render an author and a publish date section', () => {
        expect(wrapper.find('.list-item').find('.author-date').length).toEqual(1);
      });

      it('should render a byline', () => {
        expect(wrapper.find('.list-item').find('.author-date').find('Byline').length).toEqual(1);
      });

      it('should render a separator', () => {
        expect(wrapper.find('.list-item').find('.dot-separator').length).toEqual(1);
      });

      it('should render a publish date', () => {
        expect(wrapper.find('.list-item').find('.author-date').find('ArticleDate').length).toEqual(1);
      });
    });
  });

  describe('renders one list item correctly when description is missing', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '1',
      },
      contentService: 'story-feed-query',
    };
    const customFields = { listContentConfig };

    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue(LineItemWithOutDescription);
    const wrapper = shallow(<ResultsList customFields={customFields} />);
    wrapper.setState({ resultList: LineItemWithOutDescription }, () => {
      wrapper.update();
      it('should render one parent wrapper', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
      });

      it('should render a parent for headline and a description', () => {
        expect(wrapper.find('.list-item').find('.headline-description').length).toEqual(1);
      });

      it('should render a headline', () => {
        expect(wrapper.find('.list-item').find('.headline-description').length).toEqual(1);
        expect(wrapper.find('.list-item').find('.headline-description').find('.list-anchor').length).toEqual(1);
        expect(wrapper.find('.list-item').find('.headline-description').find('.list-anchor').find('.headline-text').length).toEqual(1);
        expect(wrapper.find('.list-item').find('.headline-description').find('.list-anchor').find('.headline-text')
          .text()).toEqual('Article with a YouTube embed in it');
      });

      it('should not render a description', () => {
        expect(wrapper.find('.list-item').find('.headline-description').find('.list-anchor').find('.description-text').length).toEqual(0);
      });
    });
  });

  describe('renders one list item correctly when list of authors is missing', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '5',
      },
      contentService: 'story-feed-query',
    };
    const customFields = { listContentConfig };

    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue(withoutByline);
    const wrapper = shallow(<ResultsList customFields={customFields} />);
    wrapper.setState({ resultList: withoutByline }, () => {
      wrapper.update();
      it('should render one parent wrapper', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
      });

      it('should render a separator', () => {
        expect(wrapper.find('.list-item').find('.dot-separator').length).toEqual(0);
      });
    });
  });

  describe('renders a button to display more stories', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '30',
      },
      contentService: 'story-feed-query',
    };
    const customFields = { listContentConfig };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchStories = jest.fn().mockReturnValue(mockReturnData);
    const wrapper = shallow(<ResultsList customFields={customFields} />);
    wrapper.setState({ resultList: mockData }, () => {
      wrapper.update();
      it('should render a button to display more stories', () => {
        expect(wrapper.find('button').length).toEqual(1);
      });

      it('should have invisible text for accessibility purposes', () => {
        expect(wrapper.find('button').text()).toEqual('See More stories about this topic');
      });

      it('should call fetchContent when clicked', () => {
        expect(ResultsList.prototype.fetchStories.mock.calls.length).toEqual(1);
        wrapper.find('button').simulate('click');
        expect(ResultsList.prototype.fetchStories.mock.calls.length).toEqual(2);
      });
    });
  });
});
