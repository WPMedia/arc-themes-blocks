/* eslint-disable prefer-arrow-callback  */
import React from 'react';
import { mount } from 'enzyme';
import mockData, { oneListItem, LineItemWithOutDescription, withoutByline } from './mock-data';
import mockCollections, { collectionFirst10Items } from './mock-collections-data';

const mockReturnData = mockData;

jest.mock('fusion:themes', () => jest.fn(() => ({})));

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
  resizerURL: 'https://resizer.me',
}))));

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../intl.json')[phrase][locale]) })),
}));

jest.mock('@wpmedia/date-block', () => ({
  __esModule: true,
  default: function ArticleDate() { return <div />; },
}));

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  __esModule: true,
  Image: () => <div />,
  LazyLoad: ({ children }) => <>{ children }</>,
  isServerSide: () => true,
}));

jest.mock('@wpmedia/shared-styles', () => ({
  __esModule: true,
  Byline: () => <div />,
  SecondaryFont: ({ children }) => <div id="secondary-font-mock">{children}</div>,
  Heading: ({ children }) => <>{children}</>,
  HeadingSection: ({ children }) => children,
}));

describe('The results list', () => {
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
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn()
      .mockReturnValue({ fetched: fetched(mockReturnData) });

    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
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
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched(oneListItem) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: oneListItem }, () => {
      it('should have one parent wrapper', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
      });

      it('should render one list item as its child', () => {
        expect(wrapper.find('.results-list-container').childAt(0).hasClass('list-item')).toEqual(true);
        expect(wrapper.find('.list-item').length).toEqual(1);
      });

      it('should render one image wrapped in an anchor tag', () => {
        expect(wrapper.find('.list-item').find('a').find('Image').length).toEqual(1);
      });

      it('should render an anchor and an image with the correct url', () => {
        expect(wrapper.find('.list-item').find('a').first()
          .prop('href')).toEqual('/arts/2019/12/18/article-with-a-youtube-embed-in-it/');
      });

      it('should render a parent for headline and a description', () => {
        expect(wrapper.find('.list-item').find('.headline-text').length).toEqual(1);
      });

      it('should render a headline and a description', () => {
        expect(wrapper.find('.list-item').find('.headline-text').length).toEqual(1);
        expect(wrapper.find('.list-item').find('.headline-text').text()).toEqual('Article with a YouTube embed in it');
        expect(wrapper.find('.list-item').find('.description-text')
          .text()).toEqual('Test article for YouTube responsiveness');
      });

      it('should render an author and a publish date section', () => {
        expect(wrapper.find('.list-item').find('.results-list--author-date').length).toEqual(1);
      });

      it('should render a byline with separator', () => {
        expect(wrapper.find('.list-item').find('Byline').prop('separator')).toEqual(true);
      });

      it('should render a publish date', () => {
        expect(wrapper.find('.list-item').find('.results-list--author-date').find('ArticleDate').length).toEqual(1);
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
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn()
      .mockReturnValue({ fetched: fetched(LineItemWithOutDescription) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: LineItemWithOutDescription }, () => {
      wrapper.update();
      it('should render one parent wrapper', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
      });

      it('should render a parent for headline and a description', () => {
        expect(wrapper.find('.list-item').find('.headline-text').length).toEqual(1);
      });

      it('should render a headline', () => {
        expect(wrapper.find('.list-item').find('.headline-text').length).toEqual(1);
        expect(wrapper.find('.list-item').find('.headline-text')
          .text()).toEqual('Article with a YouTube embed in it');
      });

      it('should not render a description', () => {
        expect(wrapper.find('.list-item').find('.description-text').length).toEqual(0);
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
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn()
      .mockReturnValue({ fetched: fetched(withoutByline) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: withoutByline }, () => {
      wrapper.update();
      it('should render one parent wrapper', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
      });
    });
  });

  describe('should render content only for the arcSite', () => {
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
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn()
      .mockReturnValue({ fetched: fetched(mockReturnData) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="dagen" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: mockData }, () => {
      wrapper.update();
      expect(wrapper.find('.results-list-container').length).toEqual(1);
      expect(wrapper.find('.list-item').length).toEqual(1);
      expect(wrapper.find('.results-list-container').childAt(0).hasClass('list-item')).toEqual(true);
    });
  });

  describe('when all promo items disabled', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '30',
      },
      contentService: 'story-feed-query',
      showByline: false,
      showDate: false,
      showDescription: false,
      showHeadline: false,
      showImage: false,
    };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});
    ResultsList.prototype.fetchStories = jest.fn().mockReturnValue({});

    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });

    const wrapper = mount(<ResultsList customFields={listContentConfig} arcSite="the-sun" deployment={jest.fn((path) => path)} />);

    wrapper.setState({ resultList: oneListItem }, () => {
      wrapper.update();

      it('should not render promor elements', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
        expect(wrapper.find('.results-list-container').find('.list-item').children().length).toEqual(0);
      });
    });
  });

  describe('when only headline enabled', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '30',
      },
      contentService: 'story-feed-query',
      showHeadline: true,
      showImage: false,
      showDescription: false,
      showByline: false,
      showDate: false,
    };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});
    ResultsList.prototype.fetchStories = jest.fn().mockReturnValue({});

    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });
    const wrapper = mount(<ResultsList customFields={listContentConfig} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: oneListItem }, () => {
      wrapper.update();

      it('should render only headline', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
        const item = wrapper.find('.results-list-container').find('.list-item');
        expect(item.length).toEqual(1);
        expect(item.children().length).toEqual(1);
        expect(item.find('.results-list--headline-container').length).toEqual(1);
      });
    });
  });

  describe('when only image enabled', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '30',
      },
      contentService: 'story-feed-query',
      showHeadline: false,
      showImage: true,
      showDescription: false,
      showByline: false,
      showDate: false,
    };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});

    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });
    const wrapper = mount(<ResultsList customFields={listContentConfig} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: oneListItem }, () => {
      wrapper.update();

      it('should render only image', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
        const item = wrapper.find('.results-list-container').find('.list-item');
        expect(item.length).toEqual(1);
        expect(item.children().length).toEqual(1);
        expect(item.find('.results-list--image-container').length).toEqual(1);
      });
    });
  });

  describe('when only description enabled', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '30',
      },
      contentService: 'story-feed-query',
      showHeadline: false,
      showImage: false,
      showDescription: true,
      showByline: false,
      showDate: false,
    };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});

    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });
    const wrapper = mount(<ResultsList customFields={listContentConfig} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: oneListItem }, () => {
      wrapper.update();

      it('should render only description', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
        const item = wrapper.find('.results-list-container').find('.list-item');
        expect(item.length).toEqual(1);
        expect(item.children().length).toEqual(1);
        expect(item.find('.results-list--description-author-container').length).toEqual(1);
      });
    });
  });

  describe('when only byline enabled', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '30',
      },
      contentService: 'story-feed-query',
      showHeadline: false,
      showImage: false,
      showDescription: false,
      showByline: true,
      showDate: false,
    };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});

    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });
    const wrapper = mount(<ResultsList customFields={listContentConfig} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: oneListItem }, () => {
      wrapper.update();

      it('should render only byline', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
        const item = wrapper.find('.results-list-container').find('.list-item');
        expect(item.length).toEqual(1);
        expect(item.children().length).toEqual(1);
        expect(item.find('.results-list--description-author-container').length).toEqual(1);
        expect(item.find('.results-list--description-author-container').children().length).toEqual(1);
        expect(item.find('.results-list--author-date').length).toEqual(1);
        expect(item.find('.results-list--author-date').find('Byline').length).toEqual(1);
      });
    });
  });

  describe('when only byline date', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '30',
      },
      contentService: 'story-feed-query',
      showHeadline: false,
      showImage: false,
      showDescription: false,
      showByline: false,
      showDate: true,
    };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});

    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });
    const wrapper = mount(<ResultsList customFields={listContentConfig} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: oneListItem }, () => {
      wrapper.update();

      it('should render only date', () => {
        expect(wrapper.find('.results-list-container').length).toEqual(1);
        const item = wrapper.find('.results-list-container').find('.list-item');
        expect(item.length).toEqual(1);
        expect(item.children().length).toEqual(1);
        expect(item.find('.results-list--description-author-container').length).toEqual(1);
        expect(item.find('.results-list--description-author-container').children().length).toEqual(1);
        expect(item.find('.results-list--author-date').length).toEqual(1);
        expect(item.find('.results-list--author-date').find('ArticleDate').length).toEqual(1);
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
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});

    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: mockData, seeMore: true }, () => {
      wrapper.update();
      it('should render a button to display more stories', () => {
        expect(wrapper.find('button.btn').length).toEqual(1);
      });

      it('should have invisible text for accessibility purposes', () => {
        expect(wrapper.find('button.btn').prop('aria-label').length).not.toBe(0);
      });

      it('should call fetchContent when clicked', () => {
        expect(ResultsList.prototype.fetchStories.mock.calls.length).toEqual(2);
        wrapper.find('button.btn').simulate('click');
        expect(ResultsList.prototype.fetchStories.mock.calls.length).toEqual(3);
      });
    });
  });

  it('renders list item without show more button', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '28',
      },
      contentService: 'story-feed-query',
    };
    const customFields = { listContentConfig };

    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue(mockData);
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn()
      .mockReturnValue({ fetched: fetched({ mockData }) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: mockData, seeMore: false }, () => {
      wrapper.update();
      wrapper.instance().fetchStories(false);
      expect(wrapper.find('.results-list-container').length).toEqual(1);
      expect(wrapper.find('.list-item').length).toEqual(28);
      expect(wrapper.state('seeMore')).toEqual(false);
      expect(wrapper.find('.btn')).not.toExist();
    });
  });
});

describe('The results list from collection', () => {
  it('should render a list of items using content-api-collections', () => {
    const listContentConfig = {
      contentConfigValues: {
        from: '0',
        content_alias: 'homepage',
        size: '10',
      },
      contentService: 'content-api-collections',
    };
    const customFields = { listContentConfig };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({ collectionFirst10Items });
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn()
      .mockReturnValue({ fetched: fetched({ collectionFirst10Items }) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-gazette" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: collectionFirst10Items }, () => {
      wrapper.update();
      expect(wrapper.find('.results-list-container').length).toEqual(1);
      expect(wrapper.find('.list-item').length).toEqual(10);
      expect(wrapper.find('.btn')).toExist();
    });
  });

  it('should render a list of items using content-api-collections without show more button', () => {
    const listContentConfig = {
      contentConfigValues: {
        from: '0',
        content_alias: 'homepage',
        size: '10',
      },
      contentService: 'content-api-collections',
    };
    const customFields = { listContentConfig };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({ mockCollections });
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn()
      .mockReturnValue({ fetched: fetched({ mockCollections }) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-gazette" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: collectionFirst10Items, seeMore: false }, () => {
      wrapper.update();
      expect(wrapper.find('.results-list-container').length).toEqual(1);
      expect(wrapper.find('.list-item').length).toEqual(10);
      expect(wrapper.find('.btn')).not.toExist();
    });
  });

  it('Result list using content-api-collections should call fetchStories when clicked', () => {
    const listContentConfig = {
      contentConfigValues: {
        from: '0',
        content_alias: 'homepage',
        size: '10',
      },
      contentService: 'content-api-collections',
    };
    const customFields = { listContentConfig };
    const { default: ResultsList } = require('./default');
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({ mockCollections });
    ResultsList.prototype.fetchStories = jest.fn().mockReturnValue(collectionFirst10Items);
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn()
      .mockReturnValue({ fetched: fetched({ mockCollections }) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-gazette" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ resultList: collectionFirst10Items, seeMore: true }, () => {
      wrapper.update();
      expect(ResultsList.prototype.fetchStories.mock.calls.length).toEqual(2);
      wrapper.find('button.btn').simulate('click');
      expect(ResultsList.prototype.fetchStories.mock.calls.length).toEqual(3);
    });
  });

  it('Result list using content-api-collections with default value', () => {
    const listContentConfig = {
      contentConfigValues: {
        from: '',
        content_alias: 'homepage',
        size: '10',
      },
      contentService: 'content-api-collections',
    };
    const customFields = { listContentConfig };

    const { default: ResultsList } = require('./default');
    const fetchMock = jest.fn().mockReturnValue({});
    ResultsList.prototype.fetchContent = fetchMock;
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });
    const wrapper = mount(<ResultsList customFields={customFields} arcSite="the-gazette" deployment={jest.fn((path) => path)} />);
    fetchMock.mockClear();
    wrapper.setState({ storedList: collectionFirst10Items });
    wrapper.update();
    wrapper.instance().fetchStories(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(wrapper.state('seeMore')).toEqual(true);
  });
});
