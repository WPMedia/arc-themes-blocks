const React = require('react');
const { mount } = require('enzyme');

describe('the article body Pullquote component', () => {
  it('should not render a pullquote when it is not provided with the necessary data', () => {
    const pullquote = {
      _id: '44CZ46VGIBBOZAZH4OXB4ND4U4',
      type: 'quote',
      subtype_label: 'pullquote',
      subtype: 'pullquote',
      additional_properties: {
        _id: 'WT44KGY6HJDL7DN65HUDEHP4ZY',
        comments: [],
      },
    };

    const { default: Pullquote } = require('./pullquote');
    const wrapper = mount(<Pullquote element={pullquote} />);
    expect(wrapper.find('blockquote').find('p').length).toBe(0);
  });

  it('should render a pullquote when it is provided with the necessary data', () => {
    const pullquote = {
      _id: '44CZ46VGIBBOZAZH4OXB4ND4U4',
      type: 'quote',
      subtype_label: 'pullquote',
      content_elements: [{
        type: 'text',
        content: 'A pull quote is for pulling out an individual quote from your story, to highlight it to the reader.',
        additional_properties: {
          comments: [],
          inline_comments: [],
        },
        _id: 'HKJ3ZUOCFZBEJJZWGVQZXE6PRQ',
      }, {
        type: 'text',
        content: 'Pull quotes can have multiple paragraphs.',
        additional_properties: {
          comments: [],
          inline_comments: [],
        },
        _id: 'LQH5LHMNX5BHJJNDTGGAXUTO3Y',
      }, {
        type: 'not text',
        content: 'Here’s a third paragraph.',
        additional_properties: {
          comments: [],
          inline_comments: [],
        },
        _id: '3E3BCEBT2NAR7EEGXWI42RZSYQ',
      }],
      subtype: 'pullquote',
      citation: {
        type: 'text',
        content: 'A person in your story',
      },
      additional_properties: {
        _id: 'WT44KGY6HJDL7DN65HUDEHP4ZY',
        comments: [],
      },
    };

    const { default: Pullquote } = require('./pullquote');
    const wrapper = mount(<Pullquote element={pullquote} />);
    expect(wrapper.find('blockquote').find('p').length).toBe(2);
    expect(wrapper.find('blockquote').childAt(0).html()).toMatch('<p>A pull quote is for pulling out an individual quote from your story, to highlight it to the reader.</p>');
    expect(wrapper.find('blockquote').childAt(1).html()).toMatch('<p>Pull quotes can have multiple paragraphs.</p>');
    expect(wrapper.find('blockquote').find('span').length).toBe(1);
  });

  it('should not render a pullquote with an incomplete citation when it is not provided with citation content', () => {
    const pullquote = {
      _id: '44CZ46VGIBBOZAZH4OXB4ND4U4',
      type: 'quote',
      subtype_label: 'pullquote',
      content_elements: [{
        type: 'text',
        content: 'A pull quote is for pulling out an individual quote from your story, to highlight it to the reader.',
        additional_properties: {
          comments: [],
          inline_comments: [],
        },
        _id: 'HKJ3ZUOCFZBEJJZWGVQZXE6PRQ',
      }, {
        type: 'text',
        content: 'Pull quotes can have multiple paragraphs.',
        additional_properties: {
          comments: [],
          inline_comments: [],
        },
        _id: 'LQH5LHMNX5BHJJNDTGGAXUTO3Y',
      }, {
        type: 'not text',
        content: 'Here’s a third paragraph.',
        additional_properties: {
          comments: [],
          inline_comments: [],
        },
        _id: '3E3BCEBT2NAR7EEGXWI42RZSYQ',
      }],
      subtype: 'pullquote',
      citation: {
        type: 'text',
        content: '',
      },
      additional_properties: {
        _id: 'WT44KGY6HJDL7DN65HUDEHP4ZY',
        comments: [],
      },
    };

    const { default: Pullquote } = require('./pullquote');
    const wrapper = mount(<Pullquote element={pullquote} />);
    expect(wrapper.find('blockquote').find('p').length).toBe(2);
    expect(wrapper.find('blockquote').childAt(0).html()).toMatch('<p>A pull quote is for pulling out an individual quote from your story, to highlight it to the reader.</p>');
    expect(wrapper.find('blockquote').find('span').length).toBe(0);
  });
});
