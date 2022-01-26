import React from 'react';
import { mount } from 'enzyme';
import NavLogo from './nav-logo';

describe('<NavLogo/>', () => {
  it('renders left-aligned logo', () => {
    const wrapper = mount(<NavLogo
      alignment="left"
      imageSource="resources/images/logo.png"
      imageAltText="NavBar logo"
    />);
    const navLogo = wrapper.find('.nav-logo');
    expect(navLogo).toHaveLength(1);
    expect(navLogo.hasClass('nav-logo-left')).toBe(true);
  });

  it('renders right-aligned logo', () => {
    const wrapper = mount(<NavLogo
      alignment="right"
      imageSource="resources/images/logo.png"
      imageAltText="NavBar logo"
    />);
    const navLogo = wrapper.find('.nav-logo');
    expect(navLogo).toHaveLength(1);
    expect(navLogo.hasClass('nav-logo-right')).toBe(true);
    expect(navLogo.hasClass('svg-logo')).toBe(false);
  });

  it('renders SVG logo', () => {
    const wrapper = mount(<NavLogo
      alignment="left"
      isVisible
      imageSource="resources/images/logo.svg"
      imageAltText="NavBar SVG logo"
    />);
    const navLogo = wrapper.find('.nav-logo');
    expect(navLogo).toHaveLength(1);
    expect(navLogo.hasClass('nav-logo-left')).toBe(true);
    expect(navLogo.hasClass('svg-logo')).toBe(true);

    const navLogoLink = navLogo.find('a');
    expect(navLogoLink.prop('href')).toEqual('/');
    expect(navLogoLink.prop('title')).toEqual('NavBar SVG logo');

    const navLogoImg = navLogoLink.find('img');
    expect(navLogoImg).toHaveLength(1);
    expect(navLogoImg.prop('src')).toEqual('resources/images/logo.svg');
    expect(navLogoImg.prop('alt')).toEqual('NavBar SVG logo');
  });

  it('renders non-visible logo class if is visible is false', () => {
    const wrapper = mount(<NavLogo
      alignment="left"
      isVisible={false}
      imageSource="resources/images/logo.svg"
      imageAltText="NavBar SVG logo"
    />);
    const navLogo = wrapper.find('.nav-logo');
    expect(navLogo).toHaveLength(1);
    expect(navLogo.hasClass('nav-logo-show')).toBe(false);
    expect(navLogo.hasClass('nav-logo-hidden')).toBe(true);
  });
});
