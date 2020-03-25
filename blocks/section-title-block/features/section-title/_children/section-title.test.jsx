/* eslint-disable no-irregular-whitespace */
import React from 'react';
import { mount } from 'enzyme';
import SectionTitle from './section-title';

const mockTwoSection = {
  arcSite: 'site',
  globalContent: {
    _id: '/',
    name: 'Section Title',
    children: [
      {
        _id: '/news',
        _website: 'The Washington Post',
        privilege: 'News',
        name: 'News',
        order: {
          default: 1002,
        },
        ancestors: {
          default: ['/'],
        },
        inactive: false,
        children: [],
      },
      {
        _id: '/sports',
        _website: 'The Washington Post',
        privilege: 'Sports',
        name: 'Sports',
        order: {
          default: 1002,
        },
        ancestors: {
          default: ['/'],
        },
        inactive: false,
        children: [],
      },
    ],
  },
};

const mockOneSection = {
  arcSite: 'site',
  globalContent: {
    _id: '/',
    name: 'Section Title',
    children: [
      {
        _id: '/news',
        _website: 'The Washington Post',
        privilege: 'News',
        name: 'News',
        order: {
          default: 1002,
        },
        ancestors: {
          default: ['/'],
        },
        inactive: false,
        children: [],
      },
    ],
  },
};

// const mockNestedChildren = {
//   arcSite: 'site',
//   globalContent: {
//     _id: '/',
//     name: 'Section Title',
//     children: [
//       {
//         _id: '/news',
//         _website: 'The Washington Post',
//         privilege: 'News',
//         name: 'News',
//         order: {
//           default: 1002,
//         },
//         ancestors: {
//           default: ['/'],
//         },
//         inactive: false,
//         children: [
//           {
//             _id: '/sports-news',
//             _website: 'The Washington Post',
//             privilege: 'News',
//             name: 'Sports',
//             order: {
//               default: 1002,
//             },
//             ancestors: {
//               default: ['/'],
//             },
//             inactive: false,
//           },
//           {
//             _id: '/political-news',
//             _website: 'The Washington Post',
//             privilege: 'News',
//             name: 'Politics',
//             order: {
//               default: 1002,
//             },
//             ancestors: {
//               default: ['/'],
//             },
//             inactive: false,
//           },
//           {
//             _id: '/global-news',
//             _website: 'The Washington Post',
//             privilege: 'News',
//             name: 'Global',
//             order: {
//               default: 1002,
//             },
//             ancestors: {
//               default: ['/'],
//             },
//             inactive: false,
//           },
//         ],
//       },
//     ],
//   },
// };

const mockNoChildren = {
  arcSite: 'site',
  globalContent: {
    _id: '/',
    name: 'Section Title',
    children: [],
  },
};

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => mockTwoSection),
  useAppContext: jest.fn(() => mockTwoSection),
}));

describe('the section title block', () => {
  describe('when content from globalContent is present', () => {
    it('should render a title', () => {
      const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

      expect(wrapper.find('h1')).toHaveClassName('section-title');
    });

    it('should set a styled component class on the rendered h1', () => {
      const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

      expect(wrapper.find('h1').hasClass(/sc-/)).toBe(true);
    });

    it('should render sub-section links', () => {
      const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

      expect(wrapper.find('.section-container').length).toEqual(1);
      expect(wrapper.find('a').length).toEqual(2);
    });

    describe('the sub-section links', () => {
      it('should render the correct section name', () => {
        const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

        expect(wrapper.find('.section-container').childAt(0).text()).toEqual('News    •    ');
      });

      it('should have the correct href', () => {
        const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

        expect(wrapper.find('.section-container').childAt(0).prop('href')).toEqual('/news');
      });

      it('should have a last element without a separator', () => {
        const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

        expect(wrapper.find('.section-container').childAt(1).text()).toEqual('Sports');
      });

      it('should set a styled component class on the rendered a', () => {
        const wrapper = mount(<SectionTitle content={mockTwoSection.globalContent} />);

        expect(wrapper.find('a').at(1).hasClass(/sc-/)).toBe(true);
      });

      describe('when there is only one sub-section', () => {
        it('should not have a separator', () => {
          const wrapper = mount(<SectionTitle content={mockOneSection.globalContent} />);

          expect(wrapper.find('.section-container').childAt(0).text()).toEqual('News');
        });
      });

      describe('when there are no children in content', () => {
        it('should not render any children', () => {
          const wrapper = mount(<SectionTitle content={mockNoChildren.globalContent} />);

          expect(wrapper.find('a').length).toEqual(0);
        });
      });
    });
  });

  describe('when content from globalContent is NOT present', () => {
    it('should not render anything', () => {
      const wrapper = mount(<SectionTitle />);

      expect(wrapper).toBeEmptyRender();
    });
  });
});
