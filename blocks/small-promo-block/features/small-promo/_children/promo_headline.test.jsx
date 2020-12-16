import React from 'react';
import { mount } from 'enzyme';
import PromoHeadline from './promo_headline';

const { default: mockData } = require('../mock-data');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => (mockData)),
  useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
}));

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({})),
}));

describe('promo headline', () => {
  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        id: 'testId',
      })),
    }));
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('return null while no content available in props', () => {
    const mockCustomFields = {
      imagePosition: 'left',
    };
    const wrapper = mount(<PromoHeadline content customFields={mockCustomFields} />);
    expect(wrapper).toMatchSnapshot();
  });
});
