import React from 'react';
import { mount, shallow } from 'enzyme';
import SectionNav from './section-nav';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'dagen',
  })),
}));
jest.mock('fusion:intl', () => jest.fn(
  () => ({
    t: jest.fn(() => 'test-translation'),
  }),
));

const items = [
  {
    _id: '/sports',
    node_type: 'section',
    name: 'Sports',
    children: [
      {
        _id: 'foo',
        node_type: 'link',
        display_name: 'Basketball',
        url: '/basketball',
      },
      {
        _id: 'bar',
        node_type: 'link',
        display_name: 'Dodgeball',
        url: '/dodgeball',
      },
      {
        _id: '/some-inactive-sub-section',
        inactive: false,
        node_type: 'section',
        name: 'Some Inactive Section',
      },
    ],
  },
  {
    _id: 'bar',
    node_type: 'link',
    display_name: 'Entertainment',
    url: '/entertainment/',
  },
  {
    _id: 'external',
    node_type: 'link',
    display_name: 'External Link',
    url: 'http://washingtonpost.com/entertainment/',
  },
  {
    _id: 'query',
    node_type: 'link',
    display_name: 'External with query',
    url: 'http://washingtonpost.com/entertainment/?test=2&foo=bar',
  },
  {
    _id: 'query2',
    node_type: 'link',
    display_name: 'internal with query',
    url: '/entertainment/?test=1',
  },
  {
    _id: 'link3',
    node_type: 'link',
    display_name: 'with page name',
    url: 'https://example.com/category/page.html',
  },
  {
    _id: 'hash',
    node_type: 'link',
    display_name: 'internal with hash',
    url: '/entertainment/page#myhash',
  },
  {
    _id: 'mail',
    node_type: 'link',
    display_name: 'mail link',
    url: 'mailto:readers@washpost.com',
  },
  {
    _id: '/some-inactive-section',
    inactive: true,
    node_type: 'section',
    name: 'Some Inactive Section',
  },
];

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  formatURL: jest.fn((input) => (input.toString())),
  ChevronRightIcon: jest.fn(() => <span />),
}));

describe('the SectionNav component', () => {
  it('should render children', () => {
    const wrapper = shallow(<SectionNav><div className="child">Child Item</div></SectionNav>);

    expect(wrapper.find('.child')).toHaveLength(1);
    expect(wrapper.find('.section-menu')).toHaveLength(1);
  });

  it('should render a .section-menu list', () => {
    const wrapper = shallow(<SectionNav />);

    expect(wrapper.find('.section-menu')).toHaveLength(1);
  });

  it('should render the correct number of active .section-item elements', () => {
    const wrapper = mount(<SectionNav sections={items} />);
    const numActiveItems = items.filter((i) => !i.inactive).length;

    expect(wrapper.find('li.section-item')).toHaveLength(numActiveItems);
  });

  it('should render the text for a section node correctly', () => {
    const wrapper = mount(<SectionNav sections={items} />);

    expect(wrapper.find('li.section-item').at(0).find('Link > a').at(0)).toIncludeText('Sports');
  });

  it('should render the text for a link node correctly', () => {
    const wrapper = mount(<SectionNav sections={items} />);

    expect(wrapper.find('li.section-item').at(1).find('Link > a')).toIncludeText('Entertainment');
  });

  describe('when a section has child nodes', () => {
    it('should render a .submenu-caret element inside the anchor tag', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const section = wrapper.find('li.section-item').at(0);

      expect(section.find('.subsection-anchor .submenu-caret').at(0)).toHaveLength(1);
    });

    it('should render a .subsection-container', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const numSubsectionContainers = items.filter((i) => i.children && i.children.length).length;

      expect(wrapper.find('.subsection-container')).toHaveLength(numSubsectionContainers); // one of the 3 items is inactive
    });

    it('should render the correct number of active .subsection-item elements', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const numActiveSubItems = items[0].children.length;

      expect(wrapper.find('.subsection-container').at(0).find('li.subsection-item')).toHaveLength(numActiveSubItems);
    });

    it('should render the text for a subsection link node correctly', () => {
      const wrapper = mount(<SectionNav sections={items} />);

      expect(wrapper.find('.subsection-container').at(0).find('li.subsection-item > Link').at(0)).toIncludeText('Basketball');
    });

    it('should render target and rel attribute for external links', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const section = wrapper.find('li.section-item').at(3);

      expect(section.find('Link > a')).toHaveProp('target', '_blank');
      expect(section.find('Link > a')).toHaveProp('rel', 'noopener noreferrer');
    });

    it('submenu "caret" button sets open class correctly on parent', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const section = wrapper.find('li.section-item').at(0);
      const caret = section.find('.subsection-anchor .submenu-caret').at(0);
      const sectionMenu = section.find('.subsection-anchor').at(0);

      expect(sectionMenu.getDOMNode().classList.contains('open')).toBe(false);
      caret.simulate('click');
      wrapper.update();
      expect(sectionMenu.getDOMNode().classList.contains('open')).toBe(true);
    });

    it('submenu "caret" button sets correct aria-expanded on open and close', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const section = wrapper.find('li.section-item').at(0);
      const caret = section.find('.subsection-anchor .submenu-caret').at(0);

      expect(caret.getDOMNode().getAttribute('aria-expanded')).toBe('false');
      caret.simulate('click');
      wrapper.update();
      expect(caret.getDOMNode().getAttribute('aria-expanded')).toBe('true');
      caret.simulate('click');
      wrapper.update();
      expect(caret.getDOMNode().getAttribute('aria-expanded')).toBe('false');
    });

    it('clicking menu item link does not open sub sections', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const section = wrapper.find('li.section-item').at(0);
      const menuItem = section.find('.subsection-anchor a');
      const sectionMenu = section.find('.subsection-anchor').at(0);

      expect(sectionMenu.getDOMNode().classList.contains('open')).toBe(false);
      menuItem.simulate('click');
      wrapper.update();
      expect(sectionMenu.getDOMNode().classList.contains('open')).toBe(false);
    });
  });
});
