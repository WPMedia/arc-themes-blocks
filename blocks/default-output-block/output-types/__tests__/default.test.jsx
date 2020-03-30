/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */
import React from 'react';
import { shallow } from 'enzyme';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import DefaultOutputType from '../default';

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    globalContent: {},
    arcSite: 'the-sun',
  })),
}));

jest.mock('react-dom/server', () => ({
  renderToString: jest.fn().mockReturnValue('<meta />'),
}));

getProperties.mockImplementation(() => ({
  websiteName: 'The Sun',
  twitterSite: 'https://www.twitter.com/the-sun',
  dangerouslyInjectJS: [],
}));

describe('the default output type', () => {
  it('should render', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn()} />);
    expect(wrapper).toBeDefined();
  });
  describe('renders a page', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
    it('should have a title', () => {
      expect(wrapper.find('title').length).toBe(1);
    });

    it('should have a head', () => {
      expect(wrapper.find('head').length).toBe(1);
    });

    it('should have a body', () => {
      expect(wrapper.find('body').length).toBe(1);
    });

    it('should have meta tags', () => {
      expect(wrapper.find('meta').length).toBe(10);
    });

    it('should have script tags', () => {
      expect(wrapper.find('script').length).toBe(7);
    });

    it('should have link tags', () => {
      expect(wrapper.find('link').length).toBe(2);
    });
  });

  describe('when an article page type is provided', () => {
    describe('when global content is provided', () => {
      const metaValue = (prop) => {
        if (prop === 'page-type') {
          return 'article';
        }
        return null;
      };

      afterEach(() => {
        jest.resetModules();
      });

      beforeEach(() => {
        useFusionContext.mockImplementation(() => ({
          globalContent: {
            description: {
              basic: 'this is a description',
            },
            headlines: {
              basic: 'this is a headline',
            },
            taxonomy: {
              seo_keywords: [
                'keyword1',
                'keyword2',
              ],
            },
            promo_items: {
              basic: {
                url: 'awesome-url',
                alt_text: 'alt text',
              },
            },
          },
          arcSite: 'the-sun',
        }));
      });

      it('should have a title tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a headline – The Sun');
      });

      it('should have an article description meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a description');
      });

      it('should have an article keywords meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[name='keywords']").props().content).toBe('keyword1,keyword2');
      });

      it('should have an article og:title meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a headline');
      });

      it('should have an article og:image meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[property='og:image']").props().content).toBe('undefined/unsafe/1200x630/awesome-url');
      });

      it('should have an article og:image:alt meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('alt text');
      });

      it('should have an robots meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[name='robots']").props().content).toBe('noarchive');
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = (prop) => {
        if (prop === 'page-type') {
          return 'article';
        }
        return null;
      };
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('The Sun');
      });

      it('should not have an article description meta tag', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });

      it('should not have an article keywords meta tag', () => {
        expect(wrapper.find("meta[name='keywords']").length).toBe(0);
      });

      it('should have an article og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('The Sun');
      });

      it('should not have an article og:image meta tag', () => {
        expect(wrapper.find("meta[property='og:image']").length).toBe(0);
      });

      it('should not have an article og:image:alt meta tag', () => {
        expect(wrapper.find("meta[property='og:image:alt']").length).toBe(0);
      });

      it('should have an robots meta tag', () => {
        expect(wrapper.find("meta[name='robots']").props().content).toBe('noarchive');
      });
    });
  });

  describe('when a video page type is provided', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('video')} />);
    it('should have a title tag', () => {
      expect(wrapper.find('title').childAt(0).text()).toEqual('video – The Sun');
    });

    it('should have a video description meta tag', () => {
      expect(wrapper.find("meta[name='description']").props().content).toBe('video');
    });

    it('should have a video keywords meta tag', () => {
      expect(wrapper.find("meta[name='keywords']").props().content).toBe('video');
    });

    it('should have a video og:title meta tag', () => {
      expect(wrapper.find("meta[property='og:title']").props().content).toBe('video');
    });

    it('should have a video og:image meta tag', () => {
      expect(wrapper.find("meta[property='og:image']").props().content).toBe('undefined/unsafe/1200x630/video');
    });

    it('should have a video og:image:alt meta tag', () => {
      expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('video');
    });

    it('should not have an robots meta tag', () => {
      expect(wrapper.find("meta[name='robots']").length).toBe(0);
    });
  });

  describe('when a gallery page type is provided', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('gallery')} />);
    it('should have a title tag', () => {
      expect(wrapper.find('title').childAt(0).text()).toEqual('gallery – The Sun');
    });

    it('should have a video description meta tag', () => {
      expect(wrapper.find("meta[name='description']").props().content).toBe('gallery');
    });

    it('should have a video keywords meta tag', () => {
      expect(wrapper.find("meta[name='keywords']").props().content).toBe('gallery');
    });

    it('should have a video og:title meta tag', () => {
      expect(wrapper.find("meta[property='og:title']").props().content).toBe('gallery');
    });

    it('should have a video og:image meta tag', () => {
      expect(wrapper.find("meta[property='og:image']").props().content).toBe('undefined/unsafe/1200x630/gallery');
    });

    it('should have a video og:image:alt meta tag', () => {
      expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('gallery');
    });

    it('should not have an robots meta tag', () => {
      expect(wrapper.find("meta[name='robots']").length).toBe(0);
    });
  });

  describe('when an author page type is provided', () => {
    describe('when global content is provided', () => {
      const metaValue = (prop) => {
        if (prop === 'page-type') {
          return 'author';
        }
        return null;
      };

      afterEach(() => {
        jest.resetModules();
      });

      beforeEach(() => {
        useFusionContext.mockImplementation(() => ({
          globalContent: {
            authors: [
              {
                byline: 'John Doe',
                bio: 'John Doe is an author',
              },
            ],
          },
          arcSite: 'the-sun',
        }));
      });

      it('should have a title tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find('title').childAt(0).text()).toEqual('John Doe - The Sun');
      });

      it('should have an author description meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[name='description']").props().content).toBe('John Doe is an author');
      });

      it('should have an author og:title meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('John Doe - The Sun');
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = (prop) => {
        if (prop === 'page-type') {
          return 'author';
        }
        return null;
      };
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('The Sun');
      });

      it('should have an author og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('The Sun');
      });
    });

    describe('when custom tags are provided', () => {
      const metaValue = (prop) => {
        if (prop === 'page-type') {
          return 'author';
        }
        if (prop === 'description') {
          return 'this is a custom description';
        }
        if (prop === 'og:title') {
          return 'this is a custom og:title';
        }
        return null;
      };

      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a custom og:title - The Sun');
      });

      it('should have an author description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a custom description');
      });

      it('should have an author og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a custom og:title - The Sun');
      });
    });
  });

  describe('when a tag page type is provided', () => {
    describe('when global content is provided', () => {
      const metaValue = (prop) => {
        if (prop === 'page-type') {
          return 'tag';
        }
        return null;
      };

      afterEach(() => {
        jest.resetModules();
      });

      beforeEach(() => {
        useFusionContext.mockImplementation(() => ({
          globalContent: {
            Payload: [
              {
                description: 'this is a tag description',
                name: 'tag name',
              },
            ],
          },
          arcSite: 'the-sun',
        }));
      });

      it('should have a title tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find('title').childAt(0).text()).toEqual('tag name - The Sun');
      });

      it('should have a tag description meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a tag description');
      });

      it('should have a tag og:title meta tag', () => {
        const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('tag name - The Sun');
      });
    });

    describe('when global content is not provided', () => {
      const metaValue = (prop) => {
        if (prop === 'page-type') {
          return 'tag';
        }
        return null;
      };
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('The Sun');
      });

      it('should not have a tag description meta tag', () => {
        expect(wrapper.find("meta[name='description']").length).toBe(0);
      });

      it('should have a tag og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('The Sun');
      });
    });

    describe('when custom tags are provided', () => {
      const metaValue = (prop) => {
        if (prop === 'page-type') {
          return 'tag';
        }
        if (prop === 'description') {
          return 'this is a custom description';
        }
        if (prop === 'og:title') {
          return 'this is a custom og:title';
        }
        return null;
      };
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={metaValue} />);

      it('should have a title tag', () => {
        expect(wrapper.find('title').childAt(0).text()).toEqual('this is a custom og:title - The Sun');
      });

      it('should have a tag description meta tag', () => {
        expect(wrapper.find("meta[name='description']").props().content).toBe('this is a custom description');
      });

      it('should have a tag og:title meta tag', () => {
        expect(wrapper.find("meta[property='og:title']").props().content).toBe('this is a custom og:title - The Sun');
      });
    });
  });

  describe('renders twitter tags', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('tag')} />);
    it('should have a twitter:card meta tag', () => {
      expect(wrapper.find("meta[property='og:site_name']").props().content).toBe('The Sun');
    });

    it('should have a twitter:site meta tag', () => {
      expect(wrapper.find("meta[property='twitter:site']").props().content).toBe('@https://www.twitter.com/the-sun');
    });

    it('should have a twitter:card meta tag', () => {
      expect(wrapper.find("meta[property='twitter:card']").props().content).toBe('summary_large_image');
    });
  });
});
