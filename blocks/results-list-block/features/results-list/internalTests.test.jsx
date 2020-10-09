
import ResultsList from './default.jsx';
import React from 'react';
import { shallow } from 'enzyme';

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