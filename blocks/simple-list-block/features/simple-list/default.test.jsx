import getThemeStyle from 'fusion:themes';
import SimpleList from './default';

const React = require('react');
const { mount } = require('enzyme');

const mockOutput = {
  content_elements: [
    {
      promo_items: {
        basic: {
          type: 'image',
          url: 'something.jpg',
        },
      },
      headlines: {
        basic: 'Video Test',
        mobile: '',
        native: '',
        print: '',
        tablet: '',
      },
      _id: 'UK662DYK6VF5XCY7KNZ25XB3QQ',
    },
    {
      headlines: {
        basic: 'Title',
      },
      _id: 'kdfjkdjfkldjf',
    },
  ],
};

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => mockOutput),
}));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    globalContent: {
      _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
      type: 'story',
      version: '0.10.2',
      content_elements: [
        {
          _id: 'L57RVT4465HMBKL5T26NBBFBNI',
          type: 'text',
          additional_properties: {
            comments: [],
            inline_comments: [],
            _id: 1563473120767,
          },
          content:
            'This is a test article that has all kinds of different element types in it. You should see each element type appear below the bolded text.',
        },
      ],
    },
    arcSite: 'the-sun',
    customFields: {
      elementPlacement: { 1: 2, 2: 1 },
    },
  })),
}));
getThemeStyle.mockImplementation(() => ({ 'primary-font-family': 'Papyrus' }));

describe('Simple list', () => {
  describe('when no content service provided', () => {
    it('should show title if there is a title provided', () => {
      const testText = 'List Over Here';

      const customFields = {
        title: testText,
      };

      const wrapper = mount(<SimpleList customFields={customFields} />);

      expect(wrapper.find('h2.list-title').text()).toBe(testText);
    });
    it('should show no title if there is no title provided', () => {
      const wrapper = mount(<SimpleList />);

      expect(wrapper.find('h2.list-title').text()).toBe('');
    });
  });
  describe('when content service is provided', () => {
    it('should fetch an array of data', () => {
      const customFields = {
        listContentConfig: {
          contentService: 'something',
          contentConfigValues: {
            query: '',
          },
        },
      };

      const wrapper = mount(<SimpleList customFields={customFields} />);

      expect(wrapper.find('.list-item-simple').length).toBe(2);
    });
  });
});
