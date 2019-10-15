import React from 'react';
import { shallow } from 'enzyme';
import DefaultOutputType from '../default';

test('should render', () => {
  const instance = shallow(<DefaultOutputType deployment={jest.fn()} />);

  expect(instance).toBeDefined();
});
