import React from 'react';
import { shallow } from 'enzyme';
import QuerylySearch from './queryly-search';

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

const testQuerylySearch = ({
  root, label = 'test-translation',
}) => {
  const container = root.find('.xpmedia-button ');
  expect(container).toHaveLength(1);

  const button = container.find('button');
  expect(button.prop('aria-label')).toBe(label);
};

describe('<QuerylySearch/>', () => {
  it('renders', () => {
    const wrapper = shallow(<QuerylySearch />);
    testQuerylySearch({
      root: wrapper,
    });
  });
});
