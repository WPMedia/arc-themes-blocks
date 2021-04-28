import React from 'react';
import { mount } from 'enzyme';
// presentational component not container
import { ShareBar } from './default';

/*
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        customFields: {
          email: true,
          facebook: true,
          pinterest: true,
          twitter: true,
          linkedIn: true,
        },
        globalContent: {
          headlines: {
            basic: 'sample headline',
          },
          website_url: '/2019/07/15/global-kitchen-sink-article/',
        },
      })),
    }));
*/

describe('When the share bar is shown', () => {
  const websiteDomain = 'https://www.thesun.com/';
  const websiteName = 'The Sun';
  const websiteUrl = '/2019/07/15/global-kitchen-sink-article/';
  const headlineString = 'sample headline';
  it('should show all five buttons if they are chosen', () => {
    const customFields = {
      email: true,
      facebook: true,
      pinterest: true,
      twitter: true,
      linkedIn: true,
    };

    const wrapper = mount(<ShareBar
      customFields={customFields}
      websiteName={websiteName}
      websiteDomain={websiteDomain}
      websiteUrl={websiteUrl}
      headlineString={headlineString}
    />);
    expect(wrapper.find('.ts-share-bar__button')).toHaveLength(5);
  });

  it('should not show social buttons that are marked as false', () => {
    const customFields = {
      email: true,
      facebook: false,
      pinterest: false,
      twitter: true,
      linkedIn: true,
    };

    const wrapper = mount(<ShareBar
      customFields={customFields}
      websiteName={websiteName}
      websiteDomain={websiteDomain}
      websiteUrl={websiteUrl}
      headlineString={headlineString}
    />);

    expect(wrapper.find('.ts-share-bar__button')).toHaveLength(3);
    expect(wrapper.find('#article-share-email')).toHaveLength(1);
    expect(wrapper.find('#article-share-twitter')).toHaveLength(1);
    expect(wrapper.find('#article-share-linkedIn')).toHaveLength(1);
    expect(wrapper.find('#article-share-facebook')).toHaveLength(0);
    expect(wrapper.find('#article-share-pinterest')).toHaveLength(0);
  });

  it('should not show any social buttons when all are marked false', () => {
    const customFields = {
      email: false,
      facebook: false,
      pinterest: false,
      twitter: false,
      linkedIn: false,
    };

    const wrapper = mount(<ShareBar
      customFields={customFields}
      websiteName={websiteName}
      websiteDomain={websiteDomain}
      websiteUrl={websiteUrl}
      headlineString={headlineString}
    />);
    expect(wrapper.find('.ts-share-bar').children()).toHaveLength(0);
  });

  describe('when the social buttons are clicked', () => {
    const customFields = {
      email: true,
      facebook: true,
      pinterest: true,
      twitter: true,
      linkedIn: true,
    };

    window.open = jest.fn();

    it('should open a new window when facebook button is clicked', () => {
      const wrapper = mount(<ShareBar
        customFields={customFields}
        websiteName={websiteName}
        websiteDomain={websiteDomain}
        websiteUrl={websiteUrl}
        headlineString={headlineString}
      />);
      wrapper.find('#article-share-facebook').simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });

    it('should open a new window when linkedIn button is clicked', () => {
      const wrapper = mount(<ShareBar
        customFields={customFields}
        websiteName={websiteName}
        websiteDomain={websiteDomain}
        websiteUrl={websiteUrl}
        headlineString={headlineString}
      />);
      wrapper.find('#article-share-linkedIn').simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });

    it('should open a new window when email button is clicked', () => {
      const wrapper = mount(<ShareBar
        customFields={customFields}
        websiteName={websiteName}
        websiteDomain={websiteDomain}
        websiteUrl={websiteUrl}
        headlineString={headlineString}
      />);
      wrapper.find('#article-share-email').simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });

    it('should open a new window when pinterest button is clicked', () => {
      const wrapper = mount(<ShareBar
        customFields={customFields}
        websiteName={websiteName}
        websiteDomain={websiteDomain}
        websiteUrl={websiteUrl}
        headlineString={headlineString}
      />);
      wrapper.find('#article-share-pinterest').simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });

    it('should open a new window when twitter button is clicked', () => {
      const wrapper = mount(<ShareBar
        customFields={customFields}
        websiteName={websiteName}
        websiteDomain={websiteDomain}
        websiteUrl={websiteUrl}
        headlineString={headlineString}
      />);
      wrapper.find('#article-share-twitter').simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });
  });
});
