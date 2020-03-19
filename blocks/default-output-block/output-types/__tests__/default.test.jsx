import React from 'react';
import { shallow } from 'enzyme';
import DefaultOutputType from '../default';

xit('should render', () => {
  const instance = shallow(<DefaultOutputType deployment={jest.fn()} />);

  expect(instance).toBeDefined();
});
