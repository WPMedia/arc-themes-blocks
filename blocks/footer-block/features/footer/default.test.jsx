import React from 'react';
import { shallow, mount } from 'enzyme';
import getProperties from 'fusion:properties';
import Footer from './default';

// A payload with 4 columns and 11 column items
const mockPayload = {
  children: [
    {
      _id: 'terms-of-use',
      name: 'Terms of Use',
      children: [
        {
          display_name: 'Terms of Service',
          url: 'www.some-website',
          _id: 'column-item-1',
        },
        {
          display_name: 'RSS Terms of Service',
          url: 'www.some-website2',
          _id: 'column-item-2',
        },
        {
          display_name: 'Some other Terms of Service',
          url: 'www.some-website3',
          _id: 'column-item-3',
        },
      ],
    },
    {
      _id: 'contact-us',
      name: 'Contact Us',
      children: [
        {
          display_name: 'Phone',
          url: 'www.phone.com',
          _id: 'column-item-4',
        },
        {
          display_name: 'Email',
          url: 'www.email.com',
          _id: 'column-item-5',
        },
        {
          display_name: 'Fax',
          url: 'www.who-uses-fax.com',
          _id: 'column-item-6',
        },
      ],
    },
    {
      _id: 'about-us',
      name: 'About Us',
      children: [
        {
          display_name: 'Events',
          url: 'www.events.com',
          _id: 'column-item-7',
        },
        {
          display_name: 'Careers',
          url: 'www.plz-hire-me.com',
          _id: 'column-item-8',
        },
        {
          display_name: 'The Team',
          url: 'www.the-world.com',
          _id: 'column-item-9',
        },
      ],
    },
    {
      _id: 'get-us',
      name: 'Get Us',
      children: [
        {
          display_name: 'Why Our Product',
          url: 'www.plz-buy-our-products.com',
          _id: 'column-item-10',
        },
        {
          display_name: 'Pricing',
          url: 'www.the-dollars.com',
          _id: 'column-item-11',
        },
      ],
    },
  ],
};

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({})),
}));

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => (mockPayload)),
}));

describe('the footer feature for the default output type', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        id: 'testId',
      })),
    }));
  });


  it('should have 4 column headers', () => {
    const wrapper = mount(<Footer />);

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => (mockPayload)),
    }));

    expect(wrapper.find('ul > section')).toHaveLength(4);
  });

  it('should have 11 column items', () => {
    const wrapper = mount(<Footer />);

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => (mockPayload)),
    }));

    expect(wrapper.find('ul > li')).toHaveLength(11);
  });

  it('should have empty column when empty payload is given', () => {
    const wrapper = shallow(<Footer />);

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({})),
    }));

    expect(wrapper.find('footer > ul')).toHaveLength(0);
  });

  it('should have empty column without error when undefined payload is given', () => {
    const wrapper = shallow(<Footer />);

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => (undefined)),
    }));

    expect(wrapper.find('footer > ul')).toHaveLength(0);
  });

  describe('the footer image/logo', () => {
    describe('when the theme manifest provides a logo url', () => {
      it('should make the src of the logo the provided image', () => {
        getProperties.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg' }));
        const wrapper = mount(<Footer />);

        expect(wrapper.find('div > img')).toHaveProp('src', 'my-nav-logo.svg');
      });
    });

    describe('when the theme does not provide a logo url', () => {
      it('should make the src of the logo the placeholder image', () => {
        getProperties.mockImplementation(() => ({}));
        const wrapper = mount(<Footer />);

        expect(wrapper.find('div > img')).toHaveProp('src', 'arc-placeholder-logo.svg');
      });
    });
  });

  describe('when the theme manifest provides alt text', () => {
    it('should make the alt text of the logo the provided text', () => {
      getProperties.mockImplementation(() => ({ primaryLogoAlt: 'my alt text' }));
      const wrapper = mount(<Footer />);

      expect(wrapper.find('div > img')).toHaveProp('alt', 'my alt text');
    });
  });

  describe('when the theme manifest does not provide alt text', () => {
    it('should make the alt text of the logo the default text', () => {
      getProperties.mockImplementation(() => ({}));
      const wrapper = mount(<Footer />);

      expect(wrapper.find('div > img')).toHaveProp('alt', 'Footer logo');
    });
  });

  describe('the copyright text', () => {
    describe('when copyright text is provided', () => {
      it('should show copyright text', () => {
        getProperties.mockImplementation(() => ({ copyrightText: 'my copyright text' }));
        const wrapper = shallow(<Footer />);

        expect((wrapper.find('#copyright-top')).text()).toStrictEqual('my copyright text');
      });
    });

    describe('when copyright text is not provided', () => {
      it('should not show copyright text', () => {
        getProperties.mockImplementation(() => ({ }));
        const wrapper = shallow(<Footer />);

        expect((wrapper.find('#copyright-top')).text()).toStrictEqual('');
      });
    });
  });

  describe('the social media buttons', () => {
    describe('when a facebook page is provided', () => {
      it('should show a facebook button', () => {
        getProperties.mockImplementation(() => ({ facebookPage: 'thesun' }));
        const wrapper = mount(<Footer />);

        expect(wrapper.find({ title: 'Facebook page' })).toHaveLength(1);
      });

      it('should have a href prop with the proper url', () => {
        window.open = jest.fn();
        const wrapper = mount(<Footer />);

        expect((wrapper.find({ title: 'Facebook page' }).prop('href'))).toEqual('thesun');
      });
    });

    describe('when a facebook page is not provided', () => {
      it('should not show a facebook button', () => {
        getProperties.mockImplementation(() => ({ facebookPage: '' }));
        const wrapper = mount(<Footer />);

        expect(wrapper.find({ title: 'Facebook page' })).toHaveLength(0);
      });
    });

    describe('when a twitter username is provided', () => {
      it('should show a twitter button', () => {
        getProperties.mockImplementation(() => ({ twitterUsername: 'thesun' }));
        const wrapper = mount(<Footer />);

        expect(wrapper.find({ title: 'Twitter feed' })).toHaveLength(1);
      });

      it('should have a href prop with the proper url', () => {
        window.open = jest.fn();
        const wrapper = mount(<Footer />);

        expect((wrapper.find({ title: 'Twitter feed' }).prop('href'))).toEqual('thesun');
      });
    });

    describe('when a twitter username is not provided', () => {
      it('should not show a twitter button', () => {
        getProperties.mockImplementation(() => ({ twitterUsername: '' }));
        const wrapper = mount(<Footer />);

        expect(wrapper.find({ title: 'Twitter feed' })).toHaveLength(0);
      });
    });

    describe('when a rss link is provided', () => {
      it('should show a rss button', () => {
        getProperties.mockImplementation(() => ({ rssUrl: 'thesun' }));
        const wrapper = mount(<Footer />);

        expect(wrapper.find({ title: 'RSS feed' })).toHaveLength(1);
      });

      it('should have a href prop with the proper url', () => {
        window.open = jest.fn();
        const wrapper = mount(<Footer />);

        expect((wrapper.find({ title: 'RSS feed' }).prop('href'))).toEqual('thesun');
      });
    });

    describe('when a rss link is not provided', () => {
      it('should not show a rss button', () => {
        getProperties.mockImplementation(() => ({ rssUrl: '' }));
        const wrapper = mount(<Footer />);

        expect(wrapper.find({ title: 'RSS feed' })).toHaveLength(0);
      });
    });
  });
});
