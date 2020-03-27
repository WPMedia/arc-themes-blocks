/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */
import React from 'react';
import { shallow } from 'enzyme';
import getProperties from 'fusion:properties';
import DefaultOutputType from '../default';

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    globalContent: {},
    arcSite: 'the-sun',
  })),
}));

jest.mock('react-dom/server', () => ({
  renderToString: jest.fn().mockReturnValue('<meta />'),
}));

getProperties.mockImplementation(() => ({
  websiteName: 'The Sun',
  twitterSite: 'https://www.twitter.com/the-sun',
  dangerouslyInjectJS: [],
}));

describe('the default output type', () => {
  const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn()} />);
  it('should render', () => {
    expect(wrapper).toBeDefined();
  });
});
