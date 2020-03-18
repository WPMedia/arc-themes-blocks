import React from 'react';
import { mount } from 'enzyme';
import getThemeStyle from 'fusion:themes';
import Masthead from './default';

describe('the masthead block', () => {
  getThemeStyle.mockImplementation(() => ({ 'primary-font-family': 'Papyrus' }));

  it('hides image if none passed in', () => {
    const wrapper = mount(<Masthead customFields={{ logoURL: '' }} />);

    expect(wrapper.find('img').length).toEqual(0);
  });
  it('shows image if passed in', () => {
    const wrapper = mount(<Masthead customFields={{ logoURL: 'something.jpg' }} />);

    expect(wrapper.find('img').length).toEqual(1);
  });

  it('hides promo if no promo link text with link', () => {
    const wrapper = mount(<Masthead customFields={{ promoLinkText: '', promoLinkURL: 'google.com' }} />);

    expect(wrapper.find('a').length).toEqual(0);
  });

  it('hides promo if no promo url text with text', () => {
    const wrapper = mount(<Masthead customFields={{ promoLinkText: 'the facebook', promoLinkURL: '' }} />);

    expect(wrapper.find('a').length).toEqual(0);
  });

  it('shows promo if  promo url text with text', () => {
    const wrapper = mount(<Masthead customFields={{ promoLinkText: 'the facebook', promoLinkURL: 'facebook.com' }} />);

    expect(wrapper.find('a').length).toEqual(1);
  });
  it('shows text if showdate is true', () => {
    const wrapper = mount(<Masthead customFields={{ showDate: true }} />);

    expect(wrapper.find('div > p').text().length > 0).toEqual(true);
  });
  it('does not show text if showdate is false', () => {
    const wrapper = mount(<Masthead customFields={{ showDate: false }} />);

    expect(wrapper.text()).toEqual('');
  });

  it('shows tagline', () => {
    const wrapper = mount(<Masthead customFields={{ tagLine: 'If it bleeds, it leads' }} />);
    expect(wrapper.text()).toEqual('If it bleeds, it leads');
  });
});
