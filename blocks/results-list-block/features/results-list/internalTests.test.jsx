import React from 'react';
import { shallow, mount } from 'enzyme';
import ResultsList from './default';
import mockData, { oneListItem } from './mock-data';
import { fetchStoriesTransform } from './helpers';

const mockReturnData = mockData;

jest.mock('fusion:themes', () => jest.fn(() => ({})));

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'http://test/resources/fallback.jpg',
  resizerURL: 'https://resizer.me',
}))));

describe('getFallbackImageURL', () => {
  const listContentConfig = {
    contentConfigValues: {
      offset: '0',
      query: 'type: story',
      size: '1',
    },
    contentService: 'story-feed-query',
  };
  const customFields = { listContentConfig };

  it('should NOT call deployment with context path if http is contained in fallback image url', () => {
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });

    const mockDeployment = jest.fn();
    const wrapper = shallow(<ResultsList arcSite="the-sun" deployment={mockDeployment} contextPath="/pf" customFields={customFields} />);

    mockDeployment.mockClear();
    const result = wrapper.instance().getFallbackImageURL();
    expect(result).toEqual('http://test/resources/fallback.jpg');
    expect(mockDeployment).toHaveBeenCalledTimes(0);
  });
});

describe('fetchPlaceholder', () => {
  const listContentConfig = {
    contentConfigValues: {
      offset: '0',
      query: 'type: story',
      size: '1',
    },
    contentService: 'story-feed-query',
  };
  const customFields = { listContentConfig };

  it('should call fetchContent if fallback image contains resources', () => {
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    const fetchContentMock = jest.fn().mockReturnValue({ fetched: fetched({}) });
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});
    ResultsList.prototype.getContent = fetchContentMock;
    const mockDeployment = jest.fn();
    const wrapper = shallow(<ResultsList arcSite="the-sun" deployment={mockDeployment} contextPath="/pf" customFields={customFields} />);
    mockDeployment.mockClear();
    expect(mockDeployment).toHaveBeenCalledTimes(0);
    wrapper.instance().fetchPlaceholder();

    expect(fetchContentMock).toHaveBeenCalledTimes(1);
    expect(fetchContentMock).toHaveBeenCalledWith('story-feed-query', { offset: '0', query: 'type: story', size: '1' });
  });
});

describe('fetchStories', () => {
  const listContentConfig = {
    contentConfigValues: {
      offset: '0',
      query: 'type: story',
      size: '1',
    },
    contentService: 'story-feed-query',
  };
  const customFields = { listContentConfig };

  it('should make appropriate calculations if has additionalStoryAmount and story-feed-query', () => {
    const fetchContentMock = jest.fn().mockReturnValue({});
    ResultsList.prototype.fetchContent = fetchContentMock;
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });

    const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath="/pf" customFields={customFields} />);
    fetchContentMock.mockClear();
    wrapper.setState({ storedList: { next: 2 } });
    wrapper.update();
    wrapper.instance().fetchStories(true);

    expect(wrapper.state('resultList')).toEqual({});
    expect(fetchContentMock).toHaveBeenCalledTimes(1);
    const partialObj = {
      resultList: {
        query: {
          offset: '2',
          query: 'type: story',
          size: '1',
        },
        source: 'story-feed-query',
        transform: expect.any(Function),
      },
    };
    expect(fetchContentMock.mock.calls[0][0]).toEqual(expect.objectContaining(partialObj));
  });

  it('should make appropriate calculations if has additionalStoryAmount and story-feed-query and no storedList.next', () => {
    const fetchContentMock = jest.fn().mockReturnValue({});
    ResultsList.prototype.fetchContent = fetchContentMock;
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });

    const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath="/pf" customFields={customFields} />);
    fetchContentMock.mockClear();
    wrapper.setState({ storedList: {} });
    wrapper.update();
    wrapper.instance().fetchStories(true);

    expect(wrapper.state('resultList')).toEqual({});
    expect(fetchContentMock).toHaveBeenCalledTimes(0);
  });

  it('should make appropriate calculations if has additionalStoryAmount and story-feed-query and no storedList.next', () => {
    const fetchContentMock = jest.fn().mockReturnValue({});
    ResultsList.prototype.fetchContent = fetchContentMock;
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });

    const listContentConfigStory = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '1',
      },
      contentService: 'story-feed-author',
    };
    const customFieldsNoSize = { listContentConfig: listContentConfigStory };

    const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath="/pf" customFields={customFieldsNoSize} />);
    fetchContentMock.mockClear();
    wrapper.setState({ storedList: { next: 2 } });
    wrapper.update();
    wrapper.instance().fetchStories(true);

    expect(wrapper.state('resultList')).toEqual({});
    expect(fetchContentMock).toHaveBeenCalledTimes(1);
    const partialObj = {
      resultList: {
        query: {
          feedOffset: '2',
          offset: '0',
          query: 'type: story',
          size: '1',
        },
        source: 'story-feed-author',
        transform: expect.any(Function),
      },
    };
    expect(fetchContentMock.mock.calls[0][0]).toEqual(expect.objectContaining(partialObj));
  });

  it('should make appropriate calculations if has additionalStoryAmount and non-specified and no storedList.next', () => {
    const fetchContentMock = jest.fn().mockReturnValue({});
    ResultsList.prototype.fetchContent = fetchContentMock;
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });

    const listContentConfigOther = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '1',
      },
      contentService: 'other',
    };
    const customFieldsOther = { listContentConfig: listContentConfigOther };

    const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath="/pf" customFields={customFieldsOther} />);
    fetchContentMock.mockClear();
    wrapper.setState({ storedList: { next: 2 } });
    wrapper.update();
    wrapper.instance().fetchStories(true);

    expect(wrapper.state('resultList')).toEqual({});
    expect(fetchContentMock).toHaveBeenCalledTimes(1);
    const partialObj = {
      resultList: {
        query: {
          offset: '0',
          query: 'type: story',
          size: '1',
        },
        source: 'other',
        transform: expect.any(Function),
      },
    };
    expect(fetchContentMock.mock.calls[0][0]).toEqual(expect.objectContaining(partialObj));
  });

  it('should update seeMore if value is greater than storied list count', () => {
    const fetchContentMock = jest.fn().mockReturnValue({ content_elements: ['elem1', 'elem2'] });
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({ content_elements: ['elem1', 'elem2'] }) });

    const listContentConfigStoryFeed = {
      contentConfigValues: {
        offset: '0',
        query: 'type: story',
        size: '1',
      },
      contentService: 'story-feed-query',
    };
    const customFieldsStoryFeed = { listContentConfig: listContentConfigStoryFeed };

    const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath="/pf" customFields={customFieldsStoryFeed} />);
    fetchContentMock.mockClear();
    wrapper.setState({ storedList: { next: 2, count: 0 } });
    wrapper.update();
    wrapper.instance().fetchStories(true);

    expect(wrapper.state('seeMore')).toBeFalsy();
  });
});

describe('fetchStoriesTransform', () => {
  it('if has no data, return storedList', () => {
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn().mockReturnValue({ fetched: fetched({}) });

    const result = fetchStoriesTransform(null, 'storedList');
    expect(result).toEqual('storedList');
  });

  it('if has  data, return concatenated data with storedList', () => {
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});

    const result = fetchStoriesTransform({ content_elements: ['A', 'B'], next: 10 }, { content_elements: ['C', 'D'] });
    expect(result).toEqual({ content_elements: ['C', 'D', 'A', 'B'], next: 10 });
  });
});

describe('styled components', () => {
  const listContentConfig = {
    contentConfigValues: {
      offset: '0',
      query: 'type: story',
      size: '1',
    },
    contentService: 'story-feed-query',
  };
  const customFields = { listContentConfig };

  it('renders styled headline, read more button and description', () => {
    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue(mockReturnData);
    const fetched = (content) => new Promise((resolve) => {
      resolve(content);
    });
    ResultsList.prototype.getContent = jest.fn()
      .mockReturnValue({ fetched: fetched({ mockReturnData }) });
    ResultsList.prototype.getThemeStyle = jest.fn().mockReturnValue({ 'primary-font-family': 'font1' });

    const mockDeployment = jest.fn();
    const wrapper = mount(<ResultsList arcSite="the-sun" deployment={mockDeployment} contextPath="/pf" customFields={customFields} />);
    wrapper.setState({ resultList: oneListItem });
    wrapper.update();

    expect(wrapper.find('.list-item').find('.headline-text').length).toEqual(3);
    expect(wrapper.find('.list-item').find('.description-text').length).toEqual(3);
  });
});
