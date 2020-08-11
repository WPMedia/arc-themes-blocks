import React from 'react';
import { mount, shallow } from 'enzyme';
import SectionNav from './section-nav';

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

describe('the SectionNav component', () => {
  it('should render children', () => {
    const wrapper = shallow(<SectionNav><div className="child">Child Item</div></SectionNav>);

    expect(wrapper.find('.child')).toHaveLength(1);
    expect(wrapper.find('ul.section-menu')).toHaveLength(1);
  });

  it('should render a .section-menu list', () => {
    const wrapper = shallow(<SectionNav />);

    expect(wrapper.find('ul.section-menu')).toHaveLength(1);
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

  it('should render the href for a section node correctly', () => {
    const wrapper = mount(<SectionNav sections={items} />);

    expect(wrapper.find('li.section-item').at(0).find('Link > a').at(0)).toHaveProp('href', '/sports/');
  });

  it('should render the text for a link node correctly', () => {
    const wrapper = mount(<SectionNav sections={items} />);

    expect(wrapper.find('li.section-item').at(1).find('Link > a')).toIncludeText('Entertainment');
  });

  it('should render the href for a link node correctly', () => {
    const wrapper = mount(<SectionNav sections={items} />);

    expect(wrapper.find('li.section-item').at(1).find('Link > a')).toHaveProp('href', '/entertainment/');
  });

  it('should render the href for a link without a final slash if has a query parameter', () => {
    const wrapper = mount(<SectionNav sections={items} />);
    const section = wrapper.find('li.section-item');

    expect(section.at(3).find('Link > a')).toHaveProp('href', 'http://washingtonpost.com/entertainment/?test=2&foo=bar');
    expect(section.at(4).find('Link > a')).toHaveProp('href', '/entertainment/?test=1');
    expect(section.at(5).find('Link > a')).toHaveProp('href', 'https://example.com/category/page.html');
    expect(section.at(6).find('Link > a')).toHaveProp('href', '/entertainment/page#myhash');
    expect(section.at(7).find('Link > a')).toHaveProp('href', 'mailto:readers@washpost.com');
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

    it('should render the href for a subsection link node correctly', () => {
      const wrapper = mount(<SectionNav sections={items} />);

      expect(wrapper.find('.subsection-container').at(0).find('li.subsection-item > Link > a').at(0)).toHaveProp('href', '/basketball/');
    });

    it('should render target and rel attribute for external links', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const section = wrapper.find('li.section-item').at(3);

      expect(section.find('Link > a')).toHaveProp('target', '_blank');
      expect(section.find('Link > a')).toHaveProp('rel', 'noopener noreferrer');
    });
  });

  describe('when a link is not missing a trailing slash', () => {
    const itemsNoSlash = [
      {
        _id: '/sports',
        node_type: 'section',
        name: 'Sports',
        children: [
          {
            _id: 'foo',
            node_type: 'link',
            display_name: 'Basketball',
            url: '/basketball/',
          },
        ],
      },
    ];
    it('should not add a slash at the end of the link', () => {
      const wrapper = mount(<SectionNav sections={itemsNoSlash} />);

      expect(wrapper.find('.subsection-container').at(0).find('li.subsection-item > Link').at(0)).toHaveProp('href', '/basketball/');
    });
  });
});
