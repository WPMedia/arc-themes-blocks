const React = require('react');
const { mount } = require('enzyme');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

describe('Given that the global content has a property called taxonomy which contains tags array, it should produce n number of tags where n is equal to tags.length ', () => {
  const mockReturnData = {
    arcSite: 'the-sun',
    globalContent: {
      taxonomy: {
          tags: [{
            description: "dogs",
            slug: "dogs slug",
            text: "dogs text"
        }, {
          description: "cats",
          slug: "cats slug",
          text: "cats text"
        }]
      },
    }
  }
  const mockFunction = jest.fn().mockReturnValue(mockReturnData)
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: mockFunction,
    }));
  });

  it('should return one parent container for tags', () => {
    const { default: ArticleTags } = require('./default.jsx');
    mount(<ArticleTags />);
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveReturnedWith(mockReturnData)
  });

  it('should return one parent container for tags', () => {
    const { default: ArticleTags } = require('./default.jsx');
    const wrapper = mount(<ArticleTags />);
    expect(wrapper.children().find('.tags-holder').length).toEqual(1);
  });

  it('should return two tags(anchor tags)', () => {
    const { default: ArticleTags } = require('./default.jsx');
    const wrapper = mount(<ArticleTags />);
    expect(wrapper.children().find('a').length).toEqual(2);
  });

  it('should return tags with correct href', () => {
    const { default: ArticleTags } = require('./default.jsx');
    const wrapper = mount(<ArticleTags />);
    expect(wrapper.children().find('a').at(0).props().href).toBe('dogs slug');
    expect(wrapper.children().find('a').at(1).props().href).toBe('cats slug');
  });
});

describe('Given that the global content has a property called taxonomy which contains tags array with out slugs, it should render anchor tags with href pointing to # ', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {
          taxonomy: {
              tags: [{
                description: "dogs",
                text: "dogs text"
            }, {
              description: "cats",
              text: "cats text"
            }]
          },
        }
      })),
    }));
  });

  it('should return tags with correct href', () => {
    const { default: ArticleTags } = require('./default.jsx');
    const wrapper = mount(<ArticleTags />);
    expect(wrapper.children().find('a').at(0).props().href).toBe('#');
    expect(wrapper.children().find('a').at(1).props().href).toBe('#');
  });
});

describe('Given that the global content does not have a property called taxonomy, it does not render anything', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {
          taxonomy: {
              tags: []
          },
        }
      })),
    }));
  });

  it('should return tags with correct href', () => {
    const { default: ArticleTags } = require('./default.jsx');
    const wrapper = mount(<ArticleTags />);
    expect(wrapper.children().find('.tags-holder').length).toEqual(0);
  });
});

describe('Given that the global content has a property called taxonomy which contains an empty tags array, it should not render anything', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: { }
      })),
    }));
  });

  it('should return tags with correct href', () => {
    const { default: ArticleTags } = require('./default.jsx');
    const wrapper = mount(<ArticleTags />);
    expect(wrapper.children().find('.tags-holder').length).toEqual(0);
  });
});


