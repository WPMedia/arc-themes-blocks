// import mockstyled from 'styled-components';

const React = require('react');
const { shallow } = require('enzyme');

const { default: mockData } = require('./mock-data');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

jest.mock('styled-components', () => ({
  section: jest.fn(),
  time: jest.fn(),
  div: jest.fn(),
  h2: jest.fn(),
  p: jest.fn(),
}));

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

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
      instanceOf: jest.fn(),
      oneOfType: jest.fn(),
      isRequired: jest.fn(),
    }));


    const wrapper = shallow(<ResultsList customFields={customFields} />);
    wrapper.setState({ resultList: mockData }, () => {
      wrapper.update();
      expect(wrapper.find('.results-list-container').length).toEqual(1);
      expect(wrapper.find('.list-item').length).toEqual(28);
    });
  });
});
