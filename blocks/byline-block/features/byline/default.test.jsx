const React = require('react');
const { mount } = require('enzyme');

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../intl.json')[phrase][locale]) })),
}));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'the-sun',
    globalContent: {
      credits: {
        by: [
          {
            type: 'other',
            name: 'John Doe',
            url: '/author/john-doe',
            additional_properties: {
              original: {
                byline: 'John Doe',
              },
            },
          },
        ],
      },
    },
  })),
}));

describe('Given byline stylesFor', () => {
  it('should return a Byline element with list set to true when stylesFor is "list"', () => {
    const { default: ArticleByline } = require('./default');
    const wrapper = mount(<ArticleByline stylesFor="list" />);
    expect(wrapper.find('Byline').prop('list')).toEqual(true);
  });
  it('should return a Byline element with list set to false when stylesFor is not "list"', () => {
    const { default: ArticleByline } = require('./default');
    const wrapper = mount(<ArticleByline stylesFor="not list" />);
    expect(wrapper.find('Byline').prop('list')).toEqual(false);
  });
});

describe('Given byline story', () => {
  it('should return a Byline element with content set to the story value', () => {
    const { default: ArticleByline } = require('./default');
    const story = { test: 'value' };
    const wrapper = mount(<ArticleByline story={story} />);
    expect(wrapper.find('Byline').prop('content')).toEqual(story);
  });
  it('should return a Byline element without a content property', () => {
    const { default: ArticleByline } = require('./default');
    const wrapper = mount(<ArticleByline />);
    expect(wrapper.find('Byline').prop('content')).toBeUndefined();
  });
});

describe('Given byline separator', () => {
  it('should return a Byline element with separator set to true', () => {
    const { default: ArticleByline } = require('./default');
    const wrapper = mount(<ArticleByline separator />);
    expect(wrapper.find('Byline').prop('separator')).toEqual(true);
  });
  it('should return a Byline element when a separator property is not included', () => {
    const { default: ArticleByline } = require('./default');
    const wrapper = mount(<ArticleByline />);
    expect(wrapper.find('Byline').prop('separator')).toBeUndefined();
  });
});
