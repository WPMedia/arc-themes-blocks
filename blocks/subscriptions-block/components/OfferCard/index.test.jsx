import React from 'react';
import { mount } from 'enzyme';
import OfferCard from '.';

const props = {
  headline: 'All Access Annual',
  subHeadline: 'Save $40 by subscribing annually',
  actionText: 'Subscribe for $68 for one year',
  actionEvent: () => {},
  features: [
    { featureText: 'Unlimited access to The Daily Intelligencer' },
    { featureText: 'Save $40' },
  ],
};

describe('OfferCard', () => {
  it('renders all fields', () => {
    const wrapper = mount(<OfferCard {...props} />);
    expect(wrapper.find('h2.xpmedia-subscription-offer-card--headline').text()).toEqual(props.headline);
    expect(wrapper.find('h3.xpmedia-subscription-offer-card--subheadline').text()).toEqual(props.subHeadline);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('.xpmedia-subscription-offer-card--feature-item').length).toBe(props.features.length);
    expect(wrapper.find('.xpmedia-subscription-offer-card--feature-item').at(0).text()).toBe(props.features[0].featureText);
    expect(wrapper.find('.xpmedia-subscription-offer-card--feature-item').at(1).text()).toBe(props.features[1].featureText);
  });

  it('does not render headline if not present', () => {
    const wrapper = mount(<OfferCard {...props} headline={null} />);

    expect(wrapper.find('.xpmedia-subscription-offer-card--headline').exists()).toBe(false);
  });

  it('does not render subHeadline if not present', () => {
    const wrapper = mount(<OfferCard {...props} subHeadline={null} />);

    expect(wrapper.find('.xpmedia-subscription-offer-card--subheadline').exists()).toBe(false);
  });

  it('does not render button if no actionText and no ActionEvent', () => {
    const wrapper = mount(<OfferCard {...props} actionText={null} actionEvent={null} />);

    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('does not render button if no actionText', () => {
    const wrapper = mount(<OfferCard {...props} actionText={null} />);

    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('does not render button if no actionEvent', () => {
    const wrapper = mount(<OfferCard {...props} actionEvent={null} />);

    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('does not render features', () => {
    const wrapper = mount(<OfferCard headline="Headline" />);

    expect(wrapper.find('.xpmedia-subscription-offer-card--feature-item').length).toBe(0);
  });
});
