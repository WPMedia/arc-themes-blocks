import React from 'react';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import ContactInfo from '.';

describe('ContactInfo', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    getProperties.mockImplementation(() => (
      { locale: [] }));

    getTranslatedPhrases.mockImplementation(() => (
      { t: jest.fn().mockReturnValue('Some mock text') }));
  });

  it('renders form and associated inputs', () => {
    const wrapper = mount(
      <ContactInfo
        callback={() => { console.log('Contact info returned back to parent.'); }}
        user={false}
        logoutCallback={() => { console.log('Request sign out from parent.'); }}
      />,
    );

    expect(wrapper.find('.xpmedia-subscriptions-contact-info').exists()).toBe(true);
    expect(wrapper.find('input').length).toEqual(3);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
