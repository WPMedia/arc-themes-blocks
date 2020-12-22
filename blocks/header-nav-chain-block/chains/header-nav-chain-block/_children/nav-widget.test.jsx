import React from 'react';
import { mount } from 'enzyme';
import NavWidget from './nav-widget';
import SearchBox from './search-box';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  navColor: 'dark', locale: 'somelocale',
}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'dagen',
  })),
}));

describe('<NavWidget/>', () => {
  it('renders null when type "none"', () => {
    const wrapper = mount(<NavWidget type="none" />);
    expect(wrapper).toBeDefined();
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders nav widget - search', () => {
    const customSearchAction = jest.fn(() => {});
    const wrapper = mount(
      <NavWidget
        type="search"
        customSearchAction={customSearchAction}
      />,
    );
    expect(wrapper).toHaveLength(1);
    const searchWidget = wrapper.find(SearchBox);
    expect(searchWidget).toHaveLength(1);
    expect(searchWidget.prop('customSearchAction')).toEqual(customSearchAction);
    const searchEl = searchWidget.find('.nav-search');
    expect(searchEl).toHaveLength(1);
    expect(searchEl.hasClass('dark')).toBe(true);
  });

  it('renders nav widget - menu', () => {
    const menuButtonClick = jest.fn(() => {});
    const wrapper = mount(
      <NavWidget
        type="menu"
        menuButtonClickAction={menuButtonClick}
      />,
    );
    expect(wrapper).toHaveLength(1);
    const menuWidget = wrapper.find('button.nav-sections-btn');
    expect(menuWidget.hasClass('nav-btn-dark')).toBe(true);
    expect(menuWidget).toHaveLength(1);
    expect(menuWidget.prop('onClick')).toEqual(menuButtonClick);
  });

  it('renders nav widget - custom with child component', () => {
    const ChildComponent = () => <div>something</div>;
    const wrapper = mount(
      <NavWidget
        type="custom"
        position={1}
        // eslint-disable-next-line react/no-children-prop
        children={[<ChildComponent />]}
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper.contains(<ChildComponent />)).toBe(true);
  });

  it('renders nav widget - custom without child component', () => {
    const wrapper = mount(
      <NavWidget
        type="custom"
        position={1}
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper.children()).toHaveLength(0);
  });
});
