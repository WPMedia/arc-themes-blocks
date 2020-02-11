import getThemeStyle from 'fusion:themes';
import SimpleList, {
  StoryItem, StoryItemContainer, StoryItemList, ListTitle,
} from './default';

const React = require('react');
const { mount } = require('enzyme');


describe('Story item', () => {
  it('renders title if title provided', () => {
    const testText = 'Man Bites Dog';
    const wrapper = mount(
      <StoryItem itemTitle={testText} />,
    );

    expect(wrapper.text()).toBe(testText);
  });
  it('renders placeholder if no props provided', () => {
    const wrapper = mount(
      <StoryItem />,
    );

    expect(wrapper.find('.simple-list-placeholder').length).toBe(1);
  });
  it('renders no title if no title provided', () => {
    const wrapper = mount(
      <StoryItem />,
    );

    expect(wrapper.text()).toBe('');
  });
  it('renders an image when you pass one in', () => {
    const imageURL = 'https://en.wikipedia.org/wiki/The_Washington_Post#/media/File:Washington_Post_building.jpg';

    const wrapper = mount(
      <StoryItem imageURL={imageURL} />,
    );
    expect(wrapper.find('.simple-list-placeholder').length).toBe(0);
    expect(wrapper.find('.simple-list-img').length).toBe(1);
  });
});

describe('Story item container', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('gets font family from properties with arc site', () => {
    const font = 'Arial';

    getThemeStyle.mockImplementation(() => ({
      'primary-font-family': font,
    }));

    const wrapper = mount(
      <StoryItemContainer />,
    );

    expect(wrapper.children().props().primaryFont).toBe(font);
  });
  it('passes props through component', () => {
    const props = {
      arcSite: 'arc',
      itemTitle: 'title',
      imageURL: 'url',
      id: 'kdjflk',
    };
    getThemeStyle.mockImplementation(() => ({}));


    const wrapper = mount(
      <StoryItemContainer {...props} />,
    );

    const newProps = {
      itemTitle: props.itemTitle,
      id: props.id,
      primaryFont: '',
      imageURL: props.imageURL,

    };

    expect(wrapper.children().props()).toStrictEqual(newProps);
  });
});

describe('StoryItemList', () => {
  it('creates as many items as given', () => {
    const listItems = [
      {
        id: 'kdfj',
      },
      {
        id: 'ff',
      },
    ];

    const wrapper = mount(
      <StoryItemList listItems={listItems} />,
    );

    expect(wrapper.find('.list-item-simple').length).toBe(listItems.length);
  });
  it('renders null if no items given', () => {
    const wrapper = mount(<StoryItemList />);
    expect(wrapper.text()).toBe('');
    expect(wrapper.html()).toBe(null);
  });
});

describe('List title', () => {
  it('Passes down primary font', () => {
    const font = 'Arial';

    getThemeStyle.mockImplementation(() => ({
      'primary-font-family': font,
    }));

    const wrapper = mount(
      <ListTitle />,
    );

    expect(wrapper.children().props().primaryFont).toBe(font);
  });
  it('Passes down primary font default', () => {
    getThemeStyle.mockImplementation(() => ({}));

    const wrapper = mount(
      <ListTitle />,
    );

    expect(wrapper.children().props().primaryFont).toBe('');
  });
});

const mockOutput = {
  content_elements: [
    {
      promo_items: {
        basic: {
          type: {
            image: {
              url: 'something.jpg',
            },
          },
        },
      },
      headlines: {
        basic: 'Video Test', mobile: '', native: '', print: '', tablet: '',
      },
      _id: 'UK662DYK6VF5XCY7KNZ25XB3QQ',
    },
  ],
};

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => mockOutput),
}));
describe('Simple list', () => {
  describe('when no content service provided', () => {
    it('should show title if there is a title provided', () => {
      const testText = 'List Over Here';

      const customFields = {
        title: testText,
      };

      const wrapper = mount(
        <SimpleList customFields={customFields} />,
      );

      expect(wrapper.text()).toBe(testText);
    });
    it('should show no title if there is no title provided', () => {
      const wrapper = mount(
        <SimpleList />,
      );

      expect(wrapper.text()).toBe('');
    });
  });
  describe('when content service is provided', () => {
    it('should try to fetch an array of data', () => {
      const customFields = {
        listContentConfig: {
          contentService: 'something',
          contentConfigValues: {
            query: '',
          },
        },
      };

      const wrapper = mount(
        <SimpleList customFields={customFields} />,
      );

      expect(wrapper.find('.list-item-simple').length).toBe(1);
    });
  });
});
