const React = require('react');
const { mount } = require('enzyme');

const { default: mockData } = require('./mock-data');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

const mockReturnData = mockData;

describe('Given the story-feed-list data, it should render a list of stories', () => {
  it('exists', () => {
    const { default: ResultsList } = require('./default');
    const resultListSchema = { contentConfigValues: { offset: '0', query: 'type:story', size: '30' }, contentService: 'story-feed-query' };
    const customFields = { resultListSchema };

    ResultsList.prototype.fetchContent = jest.fn().mockReturnValue(mockReturnData);

    jest.mock('prop-types', () => ({
      shape: jest.fn(),
      contentConfig: jest.fn(),
      customFields: jest.fn(),
    }));


    const wrapper = mount(<ResultsList customFields={customFields} />);
    wrapper.setState({ resultList: mockData }, () => {
      wrapper.update();
      expect(wrapper.find('.results-list-container').length).toEqual(1);
      expect(wrapper.find('.list-item').length).toEqual(28);
    });
  });
});
