import React from 'react';
import { shallow } from 'enzyme';
import QuerylySearch from './queryly-search';

const testQuerylySearch = ({
  root, theme, iconSize = 16, label = 'Search',
}) => {
  const container = root.find('.nav-search');
  expect(container).toHaveLength(1);
  expect(container).toHaveClassName(theme);
  expect(container).toHaveClassName('queryly');
  const navBtn = container.find('button.nav-btn');
  expect(navBtn).toHaveLength(1);
  expect(navBtn).toHaveClassName(`nav-btn-${theme}`);
  expect(navBtn).toHaveClassName('border');
  expect(navBtn).toHaveClassName('transparent');
  const querylyLabel = navBtn.find('label');
  expect(querylyLabel).toHaveLength(1);
  expect(querylyLabel.prop('htmlFor')).toEqual('queryly_toggle');
  const searchIcon = querylyLabel.find('SearchIcon');
  expect(searchIcon).toHaveLength(1);
  expect(searchIcon.prop('height')).toEqual(iconSize);
  expect(searchIcon.prop('width')).toEqual(iconSize);

  const button = container.find('button');
  expect(button.prop('aria-label')).toBe(label);
};

describe('<QuerylySearch/>', () => {
  it('renders with default props', () => {
    const wrapper = shallow(<QuerylySearch />);
    testQuerylySearch({ root: wrapper, theme: 'dark' });
  });

  it('renders with dark theme and default icon size', () => {
    const wrapper = shallow(<QuerylySearch theme="dark" />);
    testQuerylySearch({ root: wrapper, theme: 'dark' });
  });

  it('renders with light theme and default icon size', () => {
    const wrapper = shallow(<QuerylySearch theme="light" />);
    testQuerylySearch({ root: wrapper, theme: 'light' });
  });

  it('renders with custom icon size', () => {
    const wrapper = shallow(<QuerylySearch theme="dark" iconSize={24} />);
    testQuerylySearch({ root: wrapper, theme: 'dark', iconSize: 24 });
  });

  it('custom label', () => {
    const wrapper = shallow(<QuerylySearch theme="dark" iconSize={24} label="Suche" />);
    testQuerylySearch({
      root: wrapper, theme: 'dark', iconSize: 24, label: 'Suche',
    });
  });
});
