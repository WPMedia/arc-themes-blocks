const React = require('react');
const { mount } = require('enzyme');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

describe('Given the list of author(s) from the article', () => {
  it("should show one author's bio", () => {
    const { default: AuthorBio } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {
          credits: {
            by: [{
              type: 'author',
              name: 'Sara Carothers',
              description: 'description',
              image: {
                url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers',
                  byline: 'Sara Lynn Carothers',
                  bio_page: '/author/sara-carothers/',
                  bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
                },
              },
              social_links: [
                { site: 'twitter', url: 'https://twitter.com/sLcarothers' },
                { site: 'instagram', url: 'https://www.instagram.com/scarothers/' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);
    expect(wrapper.find('AuthorBio').children().children()).toHaveLength(1);
    expect(wrapper.find('section.socialButtons').children()).toHaveLength(2);
  });

  it("should show two authors' bio", () => {
    const { default: AuthorBio } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {
          credits: {
            by: [{
              type: 'author',
              name: 'Sara Carothers',
              description: 'description',
              image: {
                url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers',
                  byline: 'Sara Lynn Carothers',
                  bio_page: '/author/sara-carothers/',
                  bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
                },
              },
              social_links: [
                { site: 'twitter', url: 'https://twitter.com/sLcarothers' },
                { site: 'instagram', url: 'https://www.instagram.com/scarothers/' },
              ],
            },
            {
              type: 'author',
              name: 'Sara Carothers2',
              description: 'description',
              image: {
                url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers2',
                  byline: 'Sara Lynn Carothers',
                  bio_page: '/author/sara-carothers/',
                  bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
                },
              },
              social_links: [
                { site: 'twitter', url: 'https://twitter.com/sLcarothers' },
                { site: 'instagram', url: 'https://www.instagram.com/scarothers/' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);
    expect(wrapper.find('section.authors')).toHaveLength(2);
  });

  it("should show no author if there's no description", () => {
    const { default: AuthorBio } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {
          credits: {
            by: [{
              type: 'author',
              name: 'Sara Carothers',
              image: {
                url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers',
                  byline: 'Sara Lynn Carothers',
                  bio_page: '/author/sara-carothers/',
                  bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
                },
              },
              social_links: [
                { site: 'twitter', url: 'https://twitter.com/sLcarothers' },
                { site: 'instagram', url: 'https://www.instagram.com/scarothers/' },
              ],
            },
            {
              type: 'author',
              name: 'Sara Carothers2',
              image: {
                url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers2',
                  byline: 'Sara Lynn Carothers',
                  bio_page: '/author/sara-carothers/',
                  bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
                },
              },
              social_links: [
                { site: 'twitter', url: 'https://twitter.com/sLcarothers' },
                { site: 'instagram', url: 'https://www.instagram.com/scarothers/' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);
    expect(wrapper.find('section.authors')).toHaveLength(0);
  });

  it('should show no social buttons if there are no urls provided', () => {
    const { default: AuthorBio } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {
          credits: {
            by: [{
              type: 'author',
              name: 'Sara Carothers',
              description: 'description',
              image: {
                url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers',
                  byline: 'Sara Lynn Carothers',
                  bio_page: '/author/sara-carothers/',
                  bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
                },
              },
              social_links: [
                { site: 'twitter' },
                { site: 'instagram' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);
    expect(wrapper.find('section.socialButtons').children()).toHaveLength(0);
  });

  it('should include the author image when the author image url is present', () => {
    const { default: AuthorBio } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {
          credits: {
            by: [{
              type: 'author',
              name: 'Sara Carothers',
              description: 'description',
              image: {
                url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers',
                  byline: 'Sara Lynn Carothers',
                  bio_page: '/author/sara-carothers/',
                  bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
                },
              },
              social_links: [
                { site: 'twitter' },
                { site: 'instagram' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').prop('src')).toEqual('https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg');
  });

  it('should not have an author image element if there is no author image url', () => {
    const { default: AuthorBio } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {
          credits: {
            by: [{
              type: 'author',
              name: 'Sara Carothers',
              description: 'description',
              image: {
                url: '',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers',
                  byline: 'Sara Lynn Carothers',
                  bio_page: '/author/sara-carothers/',
                  bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
                },
              },
              social_links: [
                { site: 'twitter' },
                { site: 'instagram' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);
    expect(wrapper.find('img')).toHaveLength(0);
  });
});
