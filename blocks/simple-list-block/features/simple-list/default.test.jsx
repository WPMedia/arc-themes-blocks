import React from 'react';
import { mount } from 'enzyme';
import { useContent } from 'fusion:content';
import SimpleList from './default';

const mockOutput = {
  content_elements: [
    {
      promo_items: {
        basic: {
          type: 'image',
          url: 'something.jpg',
          resized_params: {
            '274x183': '',
          },
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
      websites: {
        'the-sun': {
          website_section: {
            _id: '/arts',
          },
          website_url: '/arts/url',
        },
      },
    },
    {
      promo_items: {
        basic: {
          type: 'image',
          url: 'something2.jpg',
          resized_params: {
            '274x183': '',
          },
        },
      },
      headlines: {
        basic: 'Video Test #2',
        mobile: '',
        native: '',
        print: '',
        tablet: '',
      },
      _id: 'UK662DYK6VF5XCY7KNZ25XB3QQ',
      websites: {
        dagen: {
          website_section: {
            _id: '/arts',
          },
          website_url: '/arts/url',
        },
      },
    },
    {
      headlines: {
        basic: 'Title',
      },
      _id: 'kdfjkdjfkldjf',
      websites: {
        'the-sun': {
          website_section: {
            _id: '/arts',
          },
          website_url: '/arts/url',
        },
      },
    },
  ],
};

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'the-sun',
    customFields: {
      elementPlacement: { 1: 2, 2: 1 },
    },
  })),
}));

jest.mock('fusion:properties', () => (jest.fn(() => ({
  websiteDomain: '',
  fallbackImage: '/resources/placeholder.jpg',
  resizerURL: 'resizer',
}))));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('@wpmedia/engine-theme-sdk', () => ({
  LazyLoad: ({ children }) => children,
}));

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => mockOutput),
}));

jest.mock('./_children/story-item', () => (
  function StoryItem() { return <div />; }
));

describe('Simple list', () => {
  it('should show title if there is a title provided', () => {
    // useContent.mockReturnValueOnce(null);
    const testText = 'List Over Here';

    const customFields = {
      title: testText,
    };

    const wrapper = mount(<SimpleList
      customFields={customFields}
      deployment={jest.fn((path) => path)}
    />);

    expect(wrapper.find('div.list-title').text()).toBe(testText);
  });
  it('should show no title if there is no title provided', () => {
    const wrapper = mount(<SimpleList customFields={{}} deployment={jest.fn((path) => path)} />);
    expect(wrapper.find('div.list-title').length).toBe(0);
  });
  it('should fetch an array of data when content service is provided', () => {
    // useContent.mockReturnValueOnce(() => mockOutput);
    const customFields = {
      listContentConfig: {
        contentService: 'something',
        contentConfigValues: {
          query: '',
        },
      },
    };

    const wrapper = mount(<SimpleList
      customFields={customFields}
      deployment={jest.fn((path) => path)}
    />);
    expect(wrapper.find('StoryItem').length).toBe(2);
  });
  it('should not render items when no data provided', () => {
    useContent.mockReturnValueOnce(null);
    const customFields = {
      listContentConfig: {
        contentService: 'something',
        contentConfigValues: {
          query: '',
        },
      },
    };

    const wrapper = mount(<SimpleList
      customFields={customFields}
      deployment={jest.fn((path) => path)}
    />);

    expect(wrapper.find('StoryItem').length).toBe(0);
  });
});

describe('Simple list', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'dagen',
        customFields: {
          elementPlacement: { 1: 2, 2: 1 },
        },
      })),
    }));
  });
  afterAll(() => {
    jest.resetModules();
  });
  it('should render content only for the arcSite', () => {
    const wrapper = mount(<SimpleList deployment={jest.fn((path) => path)} />);
    expect(wrapper.find('StoryItem')).toHaveLength(2);
  });
});
