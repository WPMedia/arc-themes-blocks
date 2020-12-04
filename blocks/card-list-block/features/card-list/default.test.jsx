/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import getThemeStyle from 'fusion:themes';
import mockData,
{
  oneListItem,
  withoutByline,
  oneListItemWithoutSectionName,
} from './mock-data';

const mockReturnData = mockData;

jest.mock('fusion:themes', () => jest.fn(() => ({})));
jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
}))));
jest.mock('@wpmedia/byline-block', () => ({
  __esModule: true,
  default: function Byline(props, children) { return <div {...props}>{children}</div>; },
}));

jest.mock('@wpmedia/date-block', () => ({
  __esModule: true,
  default: function ArticleDate(props, children) { return <div {...props}>{children}</div>; },
}));

describe('Card list', () => {
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
    const wrapper = shallow(<CardList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ cardList: mockData }, () => {
      wrapper.update();
      expect(wrapper.find('.card-list-container').length).toEqual(1);
      expect(wrapper.find('.card-list-item').length).toEqual(27);
      expect(wrapper.find('.simple-results-list-container').childAt(0).hasClass('list-item-simple')).toEqual(true);
    });
  });

  it('should render a list of stories only for the arcSite', () => {
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
    const wrapper = shallow(<CardList customFields={customFields} arcSite="dagen" deployment={jest.fn((path) => path)} />);
    wrapper.setState({ cardList: mockData }, () => {
      wrapper.update();
      expect(wrapper.find('.card-list-container').length).toEqual(1);
      expect(wrapper.find('.card-list-item').length).toEqual(0);
      expect(wrapper.find('.list-item-simple').length).toEqual(1);
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
    const wrapper = shallow(<CardList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);

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

      it('should render two anchor tags - one around image one for the title', () => {
        expect(wrapper.find('.list-item-simple').find('.list-anchor').length).toEqual(2);
        expect(wrapper.find('#card-list--link-container').find('Image').length).toEqual(1);
        expect(wrapper.find('h2.card-list-headline #card-list--headline-link').length).toEqual(1);
      });

      it('should render one image wrapped in an anchor tag', () => {
        expect(wrapper.find('.list-item-simple').find('.list-anchor').find('Image').length).toEqual(1);
      });

      it('should render an anchor ', () => {
        expect(wrapper.find('.list-item-simple').find('.list-anchor').at(0).find('a').length).toEqual(1);
      });

      it('should render an anchor and an image with the correct url', () => {
        const anchors = wrapper.find('.list-item-simple').find('.list-anchor');
        expect(anchors.at(0).prop('href')).toEqual('/this/is/the/correct/url');
        expect(anchors.at(1).prop('href')).toEqual('/this/is/the/correct/url');
      });

      it('should render an anchor and an image with alt text', () => {
        expect(wrapper.find('.list-item-simple').find('.list-anchor').find('Image').prop('alt')).toEqual('Article with a YouTube embed in it');
      });

      it('should render an overline', () => {
        expect(wrapper.find('.card-list-overline').length).toEqual(1);
      });

      it('should render a main headline', () => {
        expect(wrapper.find('h2.card-list-headline').length).toEqual(1);
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
        expect(wrapper.find('h2.card-list-headline')).toHaveProp('primaryFont', 'Papyrus');
      });

      it('should set the primary font for the title', () => {
        expect(wrapper.find('h2.card-list-headline')).toHaveProp('primaryFont', 'Papyrus');
      });

      it('should not add the line divider', () => {
        expect(wrapper.find('.list-item-simple--divider').length).toEqual(0);
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

    CardList.prototype.fetchContent = jest.fn().mockReturnValue(mockReturnData);
    const wrapper = shallow(<CardList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);

    wrapper.setState({ cardList: mockData }, () => {
      wrapper.update();
      it('should render one parent wrapper', () => {
        expect(wrapper.find('.card-list-container').length).toEqual(1);
      });

      it('should render a parent for headline and a description', () => {
        expect(wrapper.find('.card-list-item').length).toEqual(27);
      });

      it('should render a headline', () => {
        expect(wrapper.find('.card-list-item').find('.headline-list-anchor').length).toEqual(27);
        expect(wrapper.find('.card-list-item').find('.headline-list-anchor').find('.headline-text').length).toEqual(27);
        expect(wrapper.find('.card-list-item').find('.headline-list-anchor').find('.headline-text').first()
          .text()).toEqual('Jon’s Prod Story');
        expect(
          wrapper.find('.card-list-item').find('.headline-list-anchor').at(0).prop('href'),
        ).toEqual('/this/is/the/correct/url');
      });

      it('should add the line divider when have multiple items', () => {
        expect(wrapper.find('hr').length).toEqual(27);
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
    const wrapper = shallow(<CardList customFields={customFields} arcSite="the-sun" deployment={jest.fn((path) => path)} />);

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

  describe('should not render overline if websites.artSite.website_section is missing', () => {
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

    CardList.prototype.fetchContent = jest.fn().mockReturnValue(oneListItemWithoutSectionName);
    const wrapper = shallow(<CardList customFields={customFields} arcSite="dagen" deployment={jest.fn((path) => path)} />);

    wrapper.setState({ cardList: oneListItemWithoutSectionName }, () => {
      wrapper.update();
      it('should not render overline', () => {
        expect(wrapper.find('.overline').length).toBe(0);
      });
      it('should render headline', () => {
        expect(wrapper.find('h2.card-list-headline').length).toBe(1);
      });
      it('should render author-date', () => {
        expect(wrapper.find('.author-date').length).toBe(1);
      });
      it('should render image', () => {
        expect(wrapper.find('.list-item-simple Image').length).toBe(1);
      });
    });
  });
});
