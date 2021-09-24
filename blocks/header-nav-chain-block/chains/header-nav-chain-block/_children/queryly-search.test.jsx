import React from 'react';
import { mount } from 'enzyme';
import QuerylySearch from './queryly-search';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
  navBarBackground: '',
  navColor: 'dark',
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

describe('<QuerylySearch/>', () => {
  it('renders', () => {
    const wrapper = mount(<QuerylySearch />);

    expect(wrapper.find('Button').length).toBe(1);
  });
});
