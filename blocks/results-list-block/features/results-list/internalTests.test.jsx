
import ResultsList from './default.jsx';
import React from 'react';
import { shallow, mount} from 'enzyme';
import mockData, { oneListItem, LineItemWithOutDescription, withoutByline } from './mock-data';

const mockReturnData = mockData;

jest.mock('fusion:themes', () => jest.fn(() => ({})));

jest.mock('fusion:properties', () => (jest.fn(() => ({
    fallbackImage: 'http://test/resources/fallback.jpg',
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

        const mockDeployment = jest.fn();
        const wrapper = shallow(<ResultsList arcSite="the-sun" deployment={mockDeployment} contextPath='/pf' customFields={customFields} />);

        mockDeployment.mockClear();
        const result = wrapper.instance().getFallbackImageURL();
        expect(result).toEqual("http://test/resources/fallback.jpg");
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
        const fetchContentMock = jest.fn().mockReturnValue({});
        ResultsList.prototype.fetchContent = fetchContentMock;
        const mockDeployment = jest.fn();
        const wrapper = shallow(<ResultsList arcSite="the-sun" deployment={mockDeployment} contextPath='/pf' customFields={customFields} />);
        mockDeployment.mockClear();
        expect(mockDeployment).toHaveBeenCalledTimes(0);
        wrapper.instance().fetchPlaceholder();


        expect(fetchContentMock).toHaveBeenCalledTimes(1);
        expect(fetchContentMock).toHaveBeenCalledWith({"resultList": {"query": {"offset": "0", "query": "type: story", "size": "1"}, "source": "story-feed-query"}});
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

        const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath='/pf' customFields={customFields} />);
        fetchContentMock.mockClear();
        wrapper.setState({ storedList: {next: 2} });
        wrapper.update();
        wrapper.instance().fetchStories(true);

        expect(wrapper.state('resultList')).toEqual({});
        expect(fetchContentMock).toHaveBeenCalledTimes(1);
        const partialObj = {
               "resultList":  {
                 "query":  {
                   "offset": "2",
                   "query": "type: story",
                   "size": "1",
                 },
                 "source": "story-feed-query",
                 "transform": expect.any(Function),
               }
            };
        expect(fetchContentMock.mock.calls[0][0]).toEqual(expect.objectContaining(partialObj));
    });

    it('should make appropriate calculations if has additionalStoryAmount and story-feed-query and no storedList.next', () => {
        const fetchContentMock = jest.fn().mockReturnValue({});
        ResultsList.prototype.fetchContent = fetchContentMock;

        const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath='/pf' customFields={customFields} />);
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

        const listContentConfig = {
            contentConfigValues: {
              offset: '0',
              query: 'type: story',
              size: '1',
            },
            contentService: 'story-feed-author',
        };
        const customFields = { listContentConfig };

        const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath='/pf' customFields={customFields} />);
        fetchContentMock.mockClear();
        wrapper.setState({ storedList: {next: 2} });
        wrapper.update();
        wrapper.instance().fetchStories(true);

        expect(wrapper.state('resultList')).toEqual({});
        expect(fetchContentMock).toHaveBeenCalledTimes(1);
        const partialObj = {
            "resultList":  {
                "query":  {
                    "feedOffset": "2",
                    "offset": "0",
                    "query": "type: story",
                    "size": "1",
                },
                 "source": 'story-feed-author',
                 "transform": expect.any(Function),
               }
            };
        expect(fetchContentMock.mock.calls[0][0]).toEqual(expect.objectContaining(partialObj));
    });

    it('should make appropriate calculations if has additionalStoryAmount and non-specified and no storedList.next', () => {
        const fetchContentMock = jest.fn().mockReturnValue({});
        ResultsList.prototype.fetchContent = fetchContentMock;

        const listContentConfig = {
            contentConfigValues: {
              offset: '0',
              query: 'type: story',
              size: '1',
            },
            contentService: 'other',
        };
        const customFields = { listContentConfig };

        const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath='/pf' customFields={customFields} />);
        fetchContentMock.mockClear();
        wrapper.setState({ storedList: {next: 2} });
        wrapper.update();
        wrapper.instance().fetchStories(true);

        expect(wrapper.state('resultList')).toEqual({});
        expect(fetchContentMock).toHaveBeenCalledTimes(1);
        const partialObj = {
            "resultList":  {
                "query":  {
                    "offset": "0",
                    "query": "type: story",
                    "size": "1",
                },
                 "source": 'other',
                 "transform": expect.any(Function),
               }
            };
        expect(fetchContentMock.mock.calls[0][0]).toEqual(expect.objectContaining(partialObj));
    });

    it('should update seeMore if value is greater than storied list count', () => {
        const fetchContentMock = jest.fn().mockReturnValue({content_elements:['elem1', 'elem2']});
        ResultsList.prototype.getContent = fetchContentMock;

        const listContentConfig = {
            contentConfigValues: {
              offset: '0',
              query: 'type: story',
              size: '1',
            },
            contentService: 'story-feed-query',
        };
        const customFields = { listContentConfig };

        const wrapper = shallow(<ResultsList arcSite="the-sun" contextPath='/pf' customFields={customFields} />);
        fetchContentMock.mockClear();
        wrapper.setState({ storedList: {next: 2, count: 0} });
        wrapper.update();
        wrapper.instance().fetchStories(true);

        expect(wrapper.state('seeMore')).toBeFalsy()
        
    });
  });

  describe('fetchStoriesTransform', () => {

    const listContentConfig = {
        contentConfigValues: {
          offset: '0',
          query: 'type: story',
          size: '1',
        },
        contentService: 'story-feed-query',
      };
      const customFields = { listContentConfig };

    it('if has no data, return storedList', () => {
        ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});

        const mockDeployment = jest.fn();
        const wrapper = shallow(<ResultsList arcSite="the-sun" deployment={mockDeployment} contextPath='/pf' customFields={customFields} />);

        const result = wrapper.instance().fetchStoriesTransform(null, 'storedList');
        expect(result).toEqual('storedList');
    });

    it('if has  data, return concatenated data with storedList', () => {
        ResultsList.prototype.fetchContent = jest.fn().mockReturnValue({});

        const mockDeployment = jest.fn();
        const wrapper = mount(<ResultsList arcSite="the-sun" deployment={mockDeployment} contextPath='/pf' customFields={customFields} />);

        const result = wrapper.instance().fetchStoriesTransform({content_elements:['A', 'B'], next:10}, {content_elements:['C', 'D']});
        expect(result).toEqual( {"content_elements": ["C", "D", "A", "B"], "next": 10});
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
        ResultsList.prototype.getThemeStyle = jest.fn().mockReturnValue({'primary-font-family':'font1'});
        
        const mockDeployment = jest.fn();
        const wrapper = mount(<ResultsList arcSite="the-sun" deployment={mockDeployment} contextPath='/pf' customFields={customFields} />);
        wrapper.setState({ resultList: oneListItem });
        wrapper.update();


        expect(wrapper.find('.list-item').find('.headline-text').length).toEqual(3);
        expect(wrapper.find('.list-item').find('.description-text').length).toEqual(3);

    });
  });