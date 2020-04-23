import React from 'react';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';
import StoryItemContainer from './story-item-container';

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
    const arcSite = 'the-sun';

    getProperties.mockImplementation(() => ({
      websiteDomain: 'https://www.thesun.com/',
      websiteName: 'The Sun',
    }));

    const wrapper = mount(<StoryItemContainer
      arcSite={arcSite}
      overlineDisplay
      overlineUrl="url"
      overlineText="overline text"
      customFields={config}
    />);

    expect(wrapper.children().props().overlineText).toBe('overline text');
    expect(wrapper.children().props().overlineUrl).toBe('url');
  });
  it('fails to take in global content does not exist', () => {
    const wrapper = mount(<StoryItemContainer customFields={config} />);

    expect(wrapper.children().props().overlineText).toBe(undefined);
    expect(wrapper.children().props().overlineURL).toBe(undefined);
  });
});
