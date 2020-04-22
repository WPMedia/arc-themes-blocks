import React from 'react';
import { mount } from 'enzyme';

const config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  showImageSM: true,
};
describe('story item container', () => {
  it('takes in global content and properties', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
  });
  it('fails to take in global content does not exist', () => {
    const { default: StoryItemContainer } = require('./story-item-container');

    const wrapper = mount(<StoryItemContainer customFields={config} />);

    expect(wrapper.children().props().itemTitle).toBe(undefined);
    expect(wrapper.children().props().description).toBe(undefined);
  });
});
