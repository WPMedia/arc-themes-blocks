import React from 'react';
import { mount } from 'enzyme';
import LargeManualPromo from './default';

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: () => <div />,
  LazyLoad: ({ children }) => <>{ children }</>,
  isServerSide: () => true,
  formatURL: jest.fn((input) => input.toString()),
}));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({})),
  useComponentContext: jest.fn(() => ({
    registerSuccessEvent: () => ({}),
  })),
}));

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => ({})),
  useEditableContent: jest.fn(() => ({
    searchableField: () => {},
  })),
}));

const config = {
  showOverline: true,
  showHeadline: true,
  showImage: true,
  showDescription: true,
  headline: 'This is the headline',
  description: 'This is the description',
  overline: 'overline',
  overlineURL: 'www.google.com',
  imageURL: 'www.google.com/fake.png',
  linkURL: 'www.google.com',
};

describe('the large promo feature', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        id: 'testId',
      })),
    }));
  });

  it('should return null if lazyLoad on the server and not in the admin', () => {
    const updatedConfig = {
      ...config,
      lazyLoad: true,
    };
    const wrapper = mount(<LargeManualPromo customFields={updatedConfig} />);
    expect(wrapper.html()).toBe(null);
  });

  it('should have 1 container fluid class', () => {
    const wrapper = mount(<LargeManualPromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });
});
