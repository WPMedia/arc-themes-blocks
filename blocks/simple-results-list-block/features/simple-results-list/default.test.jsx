const React = require('react');
const { shallow } = require('enzyme');

const { default: mockData } = require('./mock-data');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

jest.mock('styled-components', () => ({
  div: jest.fn(),
  h2: jest.fn(),
}));

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

const mockReturnData = mockData;

describe('The @arc-test-org simple-results-list-block', () => {
  describe('render a list of simple-list-items', () => {
    jest.mock('prop-types', () => ({
      shape: jest.fn(),
      contentConfig: jest.fn(),
      customFields: jest.fn(),
    }));

    it('should render list item with headline and image', () => {
      const { default: SimpleList } = require('./default');
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = { listContentConfig };
      SimpleList.prototype.fetchContent = jest.fn().mockReturnValue(mockReturnData);

      const wrapper = shallow(<SimpleList customFields={customFields} />);
      wrapper.setState({ resultList: mockData }, () => {
        wrapper.update();
        expect(wrapper.find('.simple-results-list-container').length).toEqual(1);
        expect(wrapper.find('.simple-results-list-container').childAt(0).type()).toEqual('div');
        expect(wrapper.find('.simple-results-list-container').childAt(0).find('.simple-list-anchor').length).toEqual(1);
        expect(wrapper.find('.simple-results-list-container').childAt(0).find('.simple-list-anchor').find('.simple-list-image').length)
          .toEqual(1);
        expect(wrapper.find('.simple-results-list-container').childAt(0).find('.simple-list-anchor').find('.simple-list-image'))
          .toHaveProp('src', 'https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/K6FTNMOXBBDS5HHTYTAV7LNEF4.jpg');
        expect(wrapper.find('.simple-results-list-container').childAt(0).find('.headline-description').length).toEqual(1);
        expect(wrapper.find('.simple-results-list-container').childAt(0).find('.headline-description').find('.headline-text')
          .text()).toEqual('Article with only promo_items.basic');
      });
    });

    it('should render headline and place holder image', () => {
      const { default: SimpleList } = require('./default');
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = { listContentConfig };
      SimpleList.prototype.fetchContent = jest.fn().mockReturnValue(mockReturnData);

      const wrapper = shallow(<SimpleList customFields={customFields} />);
      wrapper.setState({ resultList: mockData }, () => {
        wrapper.update();
        expect(wrapper.find('.simple-results-list-container').length).toEqual(1);
        expect(wrapper.find('.simple-results-list-container').childAt(3).type()).toEqual('div');
        expect(wrapper.find('.simple-results-list-container').childAt(3).find('.simple-list-anchor').length).toEqual(1);
        expect(wrapper.find('.simple-results-list-container').childAt(3).find('.simple-list-anchor').find('.image-placeholder-sm').length)
          .toEqual(1);
        expect(wrapper.find('.simple-results-list-container').childAt(3).find('.headline-description').length)
          .toEqual(1);
        expect(wrapper.find('.simple-results-list-container').childAt(3).find('.headline-description').find('.headline-text')
          .text()).toEqual('Story with video as the Lead Art');
      });
    });
  });
});
