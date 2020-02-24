import React from 'react';
import { shallow, mount } from 'enzyme';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('@arc-test-org/engine-theme-sdk', () => ({
  Image: () => <div />,
  EnvelopeIcon: () => <svg>EnvelopeIcon</svg>,
  LinkedInIcon: () => <svg>LinkedInIcon</svg>,
  InstagramIcon: () => <svg>InstagramIcon</svg>,
  TwitterIcon: () => <svg>TwitterIcon</svg>,
  FacebookIcon: () => <svg>FacebookIcon</svg>,
  RedditIcon: () => <svg>RedditIcon</svg>,
  YoutubeIcon: () => <svg>YoutubeIcon</svg>,
  MediumIcon: () => <svg>MediumIcon</svg>,
  TumblrIcon: () => <svg>TumblrIcon</svg>,
  PinterestIcon: () => <svg>PinterestIcon</svg>,
  SnapchatIcon: () => <svg>SnapchatIcon</svg>,
  WhatsAppIcon: () => <svg>WhatsAppIcon</svg>,
}));

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
    const wrapper = shallow(<AuthorBio />);
    expect(wrapper.find('Image')).toHaveLength(1);
    expect(wrapper.find('Image').prop('url')).toEqual('https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg');
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

  it('should show social icons for youtube, tumblr, Medium, Reddit, Pinterest, snap, whatsapp, facebook, rss not the mail fallback', () => {
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
                { site: 'twitter', url: 'https://twitter.com/sLcarothers' },
                { site: 'instagram', url: 'https://www.instagram.com/scarothers/' },
                { site: 'facebook', url: 'https://www.thefacebook.com' },
                { site: 'reddit', url: 'httsp://reddit.com' },
                { site: 'youtube', url: 'httsp://youtube.com' },
                { site: 'medium', url: 'httsp://medium.com' },
                { site: 'tumblr', url: 'httsp://tumblr.com' },
                { site: 'pinterest', url: 'httsp://pinterest.com' },
                { site: 'snapchat', url: 'httsp://snapchat.com' },
                { site: 'whatsapp', url: 'httsp://whatsapp.com' },
                { site: 'linkedin', url: 'httsp://whatsapp.com' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);

    const socialButtonsContainer = wrapper.find('section.socialButtons');
    expect(socialButtonsContainer.children()).toHaveLength(11);
  });
  it('should show null if no social link objects, with url and title, are provided', () => {
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
              ],
            }],
          },
        },
      })),
    }));

    const wrapper = mount(<AuthorBio />);

    const socialButtonsContainer = wrapper.find('section.socialButtons');
    expect(socialButtonsContainer.children()).toHaveLength(0);
  });

  it('a snapchat social object does not render the default envelope icon but its correct snap one', () => {
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
                { site: 'snapchat', url: 'httsp://snapchat.com' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);

    const socialButtonsContainer = wrapper.find('section.socialButtons');
    expect(socialButtonsContainer.children()).toHaveLength(1);

    expect(socialButtonsContainer.text()).toBe('SnapchatIcon');
  });

  it('an unrecognized social media title renders an envelope icon', () => {
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
                { site: 'Something Gamechanging', url: 'httsp://tiktiktoktoktok.com' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);

    const socialButtonsContainer = wrapper.find('section.socialButtons');
    expect(socialButtonsContainer.children()).toHaveLength(1);

    expect(socialButtonsContainer.text()).toBe('EnvelopeIcon');
  });
});
