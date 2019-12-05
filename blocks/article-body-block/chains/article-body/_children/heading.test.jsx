const React = require('react');
const { mount } = require('enzyme');

describe('tests for Heading.jsx', () => {
  it('should render the correct heading', () => {
    const headingData = {
      _id: 'CF5ARXXK6BHJ5LO45DZCCBHL7U',
      type: 'header',
      level: 3,
      additional_properties: {
        comments: [],
        inline_comments: [],
        _id: 1563473120776,
      },
      content: 'Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href="https://www.washingtonpost.com/" target=_blank>hyperlink</a>',
    };
    const { default: Heading } = require('./heading');
    const wrapper = mount(<Heading element={headingData} />);
    expect(wrapper.find('h3').length).toBe(1);
  });

  it('should default to h2 if no heading level is given', () => {
    const headingData = {
      _id: 'CF5ARXXK6BHJ5LO45DZCCBHL7U',
      type: 'header',
      additional_properties: {
        comments: [],
        inline_comments: [],
        _id: 1563473120776,
      },
      content: 'Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href="https://www.washingtonpost.com/" target=_blank>hyperlink</a>',
    };
    const { default: Heading } = require('./heading');
    const wrapper = mount(<Heading element={headingData} />);
    expect(wrapper.find('h2').length).toBe(1);
  });
});
