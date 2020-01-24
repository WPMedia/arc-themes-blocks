import React from 'react';
import { mount } from 'enzyme';
import { useFusionContext } from 'fusion:context';
import FullAuthorBio from './default';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    globalContent: {
      authors: [
        {
          _id: 'saracarothers',
          firstName: 'Sara',
          lastName: 'Carothers',
          secondLastName: '',
          byline: 'Sara Lynn Carothers',
          role: 'Senior Product Manager',
          image: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
          email: '',
          affiliations: '',
          education: [],
          awards: [],
          books: [],
          podcasts: [],
          twitter: 'https://twitter.com/sLcarothers',
          bio_page: '/author/sara-carothers/',
          bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
          longBio: 'Sara Carothers is a senior product manager for Arc Publishing. She works on Arc Themes and PageBuilder Fusion. This is a long bio. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n',
          slug: 'sara-carothers',
          instagram: 'https://www.instagram.com/scarothers/',
          native_app_rendering: false,
          fuzzy_match: false,
          contributor: false,
          status: true,
          last_updated_date: '2019-11-22T23:15:45.348Z',
          type: 'author',
        },
      ],
      last: 'c2FyYWNhcm90aGVycw==',
      more: false,
      _id: 'aea0c7ea37263d5d663cbb6844a506d39dfb7e02a76ab932d6e740c4e2807906',
    },
  })),
}));

describe('the full author bio block', () => {
  describe('when fields from globalContent are present', () => {
    it('should render a h1', () => {
      const wrapper = mount(<FullAuthorBio />);

      expect(wrapper.find('h1')).toHaveClassName('author-name');
    });

    // it('should render a h4', () => {
    //   const wrapper = mount(<FullAuthorBio />);

    //   expect(wrapper.find('h4')).toHaveClassName('author-title');
    // });

    // it('should render a p', () => {
    //   const wrapper = mount(<FullAuthorBio />);

    //   expect(wrapper.find('p')).toHaveClassName('author-bio');
    // });

    // it('should render a photo', () => {
    //   const wrapper = mount(<FullAuthorBio />);

    //   expect(wrapper.find('img')).toHaveClassName('author-image');
    // });
  });

  // describe('when the fields from globalContent are NOT present', () => {
  //   beforeEach(() => {
  //     useFusionContext.mockImplementation(() => ({
  //       arcSite: 'no-site',
  //       globalContent: {},
  //     }));
  //   });
  //   it('should NOT render anything', () => {
  //     const wrapper = mount(<FullAuthorBio />);

  //     expect(wrapper).toBeEmptyRender();
  //   });
  // });

  // describe('the social media icons', () => {
  //   describe('when the twitter link is present', () => {
  //     it('should render a twitter icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'Twitter' })).toHaveLength(1);
  //     });

  //     it('should have a twitter url', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect((wrapper.find({ title: 'Twitter' }).prop('href'))).toEqual('thesun');
  //     });
  //   });

  //   describe('when the instagram link is present', () => {
  //     it('should render an instagram icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'Instagram' })).toHaveLength(1);
  //     });

  //     it('should have an instagram url', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect((wrapper.find({ title: 'Instagram' }).prop('href'))).toEqual('thesun');
  //     });
  //   });

  //   describe('when the facebook link is present', () => {
  //     it('should render a facebook icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'Facebook' })).toHaveLength(1);
  //     });

  //     it('should have a facebook url', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect((wrapper.find({ title: 'Facebook' }).prop('href'))).toEqual('thesun');
  //     });
  //   });

  //   describe('when the email link is present', () => {
  //     it('should render an email icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'Email' })).toHaveLength(1);
  //     });

  //     it('should have a mailto link', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect((wrapper.find({ title: 'Facebook' }).prop('href'))).toEqual('mailto:');
  //     });
  //   });

  //   describe('when the RSS link is present', () => {
  //     it('should render a RSS icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'RSS' })).toHaveLength(1);
  //     });

  //     it('should have a RSS url', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect((wrapper.find({ title: 'RSS' }).prop('href'))).toEqual('thesun');
  //     });
  //   });

  //   describe('when the twitter link is not present', () => {
  //     it('should not render a twitter icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'Twitter' })).toHaveLength(0);
  //     });
  //   });

  //   describe('when the instagram link is not present', () => {
  //     it('should not render an instagram icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'Instagram' })).toHaveLength(0);
  //     });
  //   });

  //   describe('when the facebook link is not present', () => {
  //     it('should not render a facebook icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'Facebook' })).toHaveLength(0);
  //     });
  //   });

  //   describe('when the email link is not present', () => {
  //     it('should not render an email icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'Email' })).toHaveLength(0);
  //     });
  //   });

  //   describe('when the RSS link is not present', () => {
  //     it('should not render a RSS icon', () => {
  //       const wrapper = mount(<FullAuthorBio />);

  //       expect(wrapper.find({ title: 'RSS' })).toHaveLength(0);
  //     });
  //   });
  // });
});
