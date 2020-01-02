// import mockstyled from 'styled-components';

const React = require('react');
const { shallow } = require('enzyme');

const { default: mockData } = require('./mock-data');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

jest.mock('styled-components', () => ({
  div: jest.fn(),
  h2: jest.fn(),
}));

const mockReturnData = mockData;

describe('The @arc-test-org simple-results-list-block', () => {
  describe('unit tests for simple results list', () => {
    it('renders correctly', () => {
      const { default: SimpleList } = require('./default');
      const resultListSchema = { contentConfigValues: { offset: '0', query: 'type:story', size: '30' }, contentService: 'story-feed-query' };
      const customFields = { resultListSchema };

      SimpleList.prototype.fetchContent = jest.fn().mockReturnValue(mockReturnData);

      jest.mock('prop-types', () => ({
        shape: jest.fn(),
        contentConfig: jest.fn(),
        customFields: jest.fn(),
      }));


      const wrapper = shallow(<SimpleList customFields={customFields} />);
      wrapper.setState({ resultList: mockData }, () => {
        wrapper.update();
        expect(wrapper.find('.simple-results-list-container').length).toEqual(1);
        expect(wrapper.find('.list-item-simple').length).toEqual(28);
        expect(wrapper.find('.simple-results-list-container').childAt(0).type()).toEqual('div');
        expect(wrapper.find('.simple-results-list-container').childAt(0).find('.simple-list-anchor').length).toEqual(1);
        expect(wrapper.find('.simple-results-list-container').childAt(0).find('.headline-description').length).toEqual(1);
      });
    });
  });
});
