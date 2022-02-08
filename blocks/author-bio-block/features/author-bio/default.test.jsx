import React from 'react';
import { mount } from 'enzyme';

jest.mock('@wpmedia/news-theme-css', () => ({
  lightenDarkenColor: () => 'blue',
}));

jest.mock('fusion:themes', () => (jest.fn(() => ({
  'primary-color': 'blue',
}))));

jest.mock('@wpmedia/engine-theme-sdk', () => ({
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
  SoundCloudIcon: () => <svg>SoundCloudIcon</svg>,
  RssIcon: () => <svg>RssIcon</svg>,
  LazyLoad: ({ children }) => <>{ children }</>,
  isServerSide: () => true,
  constructSocialURL: (type, field) => field,
}));

jest.mock('fusion:context', () => ({
  useFusionContext: () => ({ isAdmin: false }),
}));

jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
}))));

describe('Given the list of author(s) from the article', () => {
  it('should return null if lazyLoad on the server and not in the admin', () => {
    const { default: AuthorBio } = require('./default');
    const config = {
      lazyLoad: true,
    };
    const wrapper = mount(<AuthorBio customFields={config} />);
    expect(wrapper.html()).toBe(null);
  });

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

  it('should not show an image if there is no image object', () => {
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
              additional_properties: {
                original: {
                  _id: 'saracarothers',
                  byline: 'Sara Lynn Carothers',
                  bio_page: '/author/sara-carothers/',
                  bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
                },
              },
              social_links: [],
            }],
          },
        },
      })),
    }));

    const wrapper = mount(<AuthorBio />);
    expect(wrapper.find('img')).toHaveLength(0);
  });

  it('should show social icons for youtube, tumblr, Medium, Reddit, Pinterest, snap, whatsapp, facebook, rss, soundcloud not the mail fallback', () => {
    const { default: AuthorBio } = require('./default');

    const mockUseFusionContext = {
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
              { site: 'reddit', url: 'https://reddit.com' },
              { site: 'youtube', url: 'https://youtube.com' },
              { site: 'medium', url: 'https://medium.com' },
              { site: 'tumblr', url: 'https://tumblr.com' },
              { site: 'pinterest', url: 'https://pinterest.com' },
              { site: 'snapchat', url: 'https://snapchat.com' },
              { site: 'whatsapp', url: 'https://whatsapp.com' },
              { site: 'linkedin', url: 'https://whatsapp.com' },
              { site: 'rss', url: 'rss feed' },
              { site: 'soundcloud', url: 'https://soundcloud.com' },
            ],
          }],
        },
      },
    };
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => mockUseFusionContext),
    }));

    const wrapper = mount(<AuthorBio />);
    const socialButtonsContainer = wrapper.find('section.socialButtons');
    expect(socialButtonsContainer.children()).toHaveLength(13);
    const socialLinks = socialButtonsContainer.find('a');
    expect(socialLinks).toHaveLength(13);
    socialLinks.forEach((link) => {
      expect(typeof link.prop('aria-label')).toEqual('string');
    });

    // envelope icon is the default we want to avoid
    expect(socialButtonsContainer.text().includes('EnvelopeIcon')).toBe(false);
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
                { site: 'snapchat', url: 'https://snapchat.com' },
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
                { site: 'Something Gamechanging', url: 'https://tiktiktoktoktok.com' },
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

  it('should fallback gracefully if author name does not exist and not render authorName link', () => {
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
                  byline: '',
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
    expect(wrapper.find('.authorName').length).toBe(0);
  });
  it('finds an author name if url exists', () => {
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
              url: 'https://google.com',
              image: {
                url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers',
                  byline: '',
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

    const targetAuthorLink = wrapper.find('.descriptions > a');
    expect(targetAuthorLink.length).toBe(1);
    expect(targetAuthorLink.html()).toBe('<a href="https://google.com"></a>');
  });

  it('handles no author name or description', () => {
    const { default: AuthorBio } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {
          credits: {
            by: [{
              type: 'author',
              name: '',
              description: 'desc',
              url: 'https://google.com',
              image: {
                url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
              },
              additional_properties: {
                original: {
                  _id: 'saracarothers',
                  byline: '',
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

    expect(wrapper.find('.authors').length).toBe(1);
  });

  it('it should show email link with malito email', () => {
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
                { site: 'email', url: 'bernstein@washpost.com' },
              ],
            }],
          },
        },
      })),
    }));
    const wrapper = mount(<AuthorBio />);

    const socialButtonsContainer = wrapper.find('section.socialButtons');
    expect(socialButtonsContainer.children()).toHaveLength(1);
  });
  it('should not throw by undefined error if empty global content object', () => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({ globalContent: {} })),
    }));
    const { default: AuthorBio } = require('./default');

    expect(() => {
      mount(<AuthorBio />);
    }).not.toThrow((TypeError("Cannot read property 'by' of undefined")));
  });

  it('should return null if empty global content object', () => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({ globalContent: {} })),
    }));
    const { default: AuthorBio } = require('./default');

    const wrapper = mount(<AuthorBio />);
    expect(wrapper).toBeEmptyRender();
  });
});
