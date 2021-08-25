import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { mount } from 'enzyme';
import NavLogo from './nav-logo';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  primaryLogo: 'resources/images/logo.png',
  primaryLogoAlt: 'NavBar logo',
}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    contextPath: 'pf',
    deployment: jest.fn(() => ({})).mockReturnValue('resources/images/logo.png'),
  })),
}));

describe('<NavLogo/>', () => {
  it('renders left-aligned logo', () => {
    const wrapper = mount(<NavLogo alignment="left" />);
    const navLogo = wrapper.find('.nav-logo');
    expect(navLogo).toHaveLength(1);
    expect(navLogo.hasClass('nav-logo-left')).toBe(true);
    expect(navLogo.hasClass('svg-logo')).toBe(false);

    const navLogoLink = navLogo.find('a');
    expect(navLogoLink.prop('href')).toEqual('/');
    expect(navLogoLink.prop('title')).toEqual('NavBar logo');

    const navLogoImg = navLogoLink.find('img');
    expect(navLogoImg).toHaveLength(1);
    expect(navLogoImg.prop('src')).toEqual('resources/images/logo.png');
    expect(navLogoImg.prop('alt')).toEqual('NavBar logo');
  });

  it('renders right-aligned logo', () => {
    const wrapper = mount(<NavLogo alignment="right" />);
    const navLogo = wrapper.find('.nav-logo');
    expect(navLogo).toHaveLength(1);
    expect(navLogo.hasClass('nav-logo-right')).toBe(true);
    expect(navLogo.hasClass('svg-logo')).toBe(false);

    const navLogoLink = navLogo.find('a');
    expect(navLogoLink.prop('href')).toEqual('/');
    expect(navLogoLink.prop('title')).toEqual('NavBar logo');

    const navLogoImg = navLogoLink.find('img');
    expect(navLogoImg).toHaveLength(1);
    expect(navLogoImg.prop('src')).toEqual('resources/images/logo.png');
    expect(navLogoImg.prop('alt')).toEqual('NavBar logo');
  });

  it('renders SVG logo', () => {
    getProperties.mockReturnValueOnce({
      primaryLogo: 'resources/images/logo.svg',
      primaryLogoAlt: 'NavBar SVG logo',
    });
    useFusionContext.mockReturnValueOnce({
      contextPath: 'pf',
      deployment: jest.fn(() => ({})).mockReturnValue('resources/images/logo.svg'),
    });
    const wrapper = mount(<NavLogo alignment="left" isVisible />);
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

  it('renders non-visible logo by default', () => {
    const wrapper = mount(<NavLogo alignment="left" isVisible={false} />);
    const navLogo = wrapper.find('.nav-logo');
    expect(navLogo).toHaveLength(1);
    expect(navLogo.hasClass('nav-logo-show')).toBe(false);
    expect(navLogo.hasClass('nav-logo-hidden')).toBe(true);
  });

  it('renders logo with external link URL', () => {
    getProperties.mockReturnValueOnce({
      primaryLogo: 'http://www.example.com/logo.png',
    });
    useFusionContext.mockReturnValueOnce({
      contextPath: 'pf',
      deployment: jest.fn(() => ({})).mockReturnValue('resources/images/logo.png'),
    });
    const wrapper = mount(<NavLogo alignment="left" isVisible />);
    const navLogoImg = wrapper.find('.nav-logo img');
    expect(navLogoImg).toHaveLength(1);
    expect(navLogoImg.prop('src')).toEqual('http://www.example.com/logo.png');
  });
});
