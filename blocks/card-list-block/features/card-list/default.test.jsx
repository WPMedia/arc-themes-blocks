/* eslint-disable prefer-arrow-callback */
import React from 'react';
import { shallow } from 'enzyme';
import getThemeStyle from 'fusion:themes';
import mockData, { oneListItem, LineItemWithOutDescription, withoutByline } from './mock-data';

const mockReturnData = mockData;

jest.mock('fusion:themes', () => jest.fn(() => ({})));
jest.mock('fusion:properties', () => jest.fn(() => ({})));

jest.mock('@arc-test-org/byline-block', () => ({
  __esModule: true,
  default: function Byline(props, children) { return <div {...props}>{children}</div>; },
}));

jest.mock('@arc-test-org/date-block', () => ({
  __esModule: true,
  default: function ArticleDate(props, children) { return <div {...props}>{children}</div>; },
}));

describe('The story-feed-list', () => {
  it('should render a list of stories', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type:story',
        size: '30',
      },
      contentService: 'story-feed-query',
    };
    const customFields = { listContentConfig };

    const { default: CardList } = require('./default');
    CardList.prototype.fetchContent = jest.fn().mockReturnValue(mockReturnData);
    const wrapper = shallow(<CardList customFields={customFields} arcSite="the-sun" />);
    wrapper.setState({ cardList: mockData }, () => {
      wrapper.update();
      expect(wrapper.find('.card-list-container').length).toEqual(1);
      expect(wrapper.find('.card-list-item').length).toEqual(28);
      expect(wrapper.find('.simple-results-list-container').childAt(0).hasClass('list-item-simple')).toEqual(true);
    });
  });

  describe('renders the main list item correctly', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type:story',
        size: '1',
      },
      contentService: 'story-feed-query',

    };
    const title = 'Test Title';
    const customFields = { listContentConfig, title };

    const { default: CardList } = require('./default');
    getThemeStyle.mockImplementation(() => ({ 'primary-font-family': 'Papyrus' }));
    CardList.prototype.fetchContent = jest.fn().mockReturnValue(oneListItem);
    const wrapper = shallow(<CardList customFields={customFields} arcSite="the-sun" />);
    wrapper.setState({ cardList: oneListItem }, () => {
      it('should have one parent wrapper', () => {
        expect(wrapper.find('.card-list-container').length).toEqual(1);
      });

      it('should render a title', () => {
        expect(wrapper.find('.card-list-title').length).toEqual(1);
      });

      it('should render a title with the right text', () => {
        expect(wrapper.find('.card-list-title').text()).toEqual('Test Title');
      });

      it('should render one image wrapped in an anchor tag', () => {
        expect(wrapper.find('.list-item-simple').find('.list-anchor').length).toEqual(1);
        expect(wrapper.find('.list-item-simple').find('.list-anchor').find('img').length).toEqual(1);
      });

      it('should render an anchor ', () => {
        expect(wrapper.find('.list-item-simple').find('.list-anchor').at(0).find('a').length).toEqual(1);
      });

      it('should render an anchor and an image with the correct url', () => {
        expect(wrapper.find('.list-item-simple').find('.list-anchor').at(0).find('a')
          .prop('href')).toEqual('https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/arts/2019/12/18/article-with-a-youtube-embed-in-it/');
      });

      it('should render an overline', () => {
        expect(wrapper.find('.card-list-overline').length).toEqual(1);
      });

      it('should render a main headline', () => {
        expect(wrapper.find('.card-list-headline').length).toEqual(1);
      });

      it('should render an author and a publish date section', () => {
        expect(wrapper.find('.list-item-simple').find('.author-date').length).toEqual(1);
      });

      it('should render a byline', () => {
        expect(wrapper.find('.author-date').find('Byline').length).toEqual(1);
      });

      it('should render a separator', () => {
        expect(wrapper.find('.dot-separator').length).toEqual(1);
      });

      it('should render a publish date', () => {
        expect(wrapper.find('.author-date').find('ArticleDate').length).toEqual(1);
      });

      it('should set the primary font for the headline', () => {
        expect(wrapper.find('.card-list-headline')).toHaveProp('primaryFont', 'Papyrus');
      });

      it('should set the primary font for the title', () => {
        expect(wrapper.find('.card-list-headline')).toHaveProp('primaryFont', 'Papyrus');
      });
    });
  });

  describe('render one list item correctly', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type:story',
        size: '1',
      },
      contentService: 'story-feed-query',
    };
    const title = 'Test Title';
    const customFields = { listContentConfig, title };

    const { default: CardList } = require('./default');
    CardList.prototype.fetchContent = jest.fn().mockReturnValue(LineItemWithOutDescription);
    const wrapper = shallow(<CardList customFields={customFields} arcSite="the-sun" />);
    wrapper.setState({ cardList: LineItemWithOutDescription }, () => {
      wrapper.update();
      it('should render one parent wrapper', () => {
        expect(wrapper.find('.card-list-container').length).toEqual(1);
      });

      it('should render a parent for headline and a description', () => {
        expect(wrapper.find('.card-list-item').length).toEqual(1);
      });

      it('should render a headline', () => {
        expect(wrapper.find('.card-list-item').find('.headline-list-anchor').length).toEqual(1);
        expect(wrapper.find('.card-list-item').find('.headline-list-anchor').find('.headline-text').length).toEqual(1);
        expect(wrapper.find('.card-list-item').find('.headline-list-anchor').find('.headline-text')
          .text()).toEqual('Article with a YouTube embed in it');
      });
    });
  });

  describe('render one list item correctly when list of authors is missing', () => {
    const listContentConfig = {
      contentConfigValues: {
        offset: '0',
        query: 'type:story',
        size: '1',
      },
      contentService: 'story-feed-query',
    };
    const customFields = { listContentConfig };

    const { default: CardList } = require('./default');
    CardList.prototype.fetchContent = jest.fn().mockReturnValue(withoutByline);
    const wrapper = shallow(<CardList customFields={customFields} arcSite="the-sun" />);
    wrapper.setState({ cardList: withoutByline }, () => {
      wrapper.update();
      it('should render one parent wrapper', () => {
        expect(wrapper.find('.card-list-container').length).toEqual(1);
      });

      it('should render a separator', () => {
        expect(wrapper.find('.list-item-simple').find('.dot-separator').length).toEqual(0);
      });
    });
  });
});
