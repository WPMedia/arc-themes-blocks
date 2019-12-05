const React = require('react');
const { mount } = require('enzyme');

describe('list', () => {
  it('should render unordered list correctly', () => {
    const listContent = {
      type: 'list',
      list_type: 'unordered',
      items: [
        {
          type: 'text',
          content: 'Indented under 2',
          _id: 'IOY3SN76GVFI3MUDN3PX4V32AA',
          additional_properties: {
            comments: [

            ],
            inline_comments: [

            ],
          },
          block_properties: {

          },
        },
        {
          type: 'text',
          content: 'Another thing indented under 2',
          _id: 'MX643WWQPZCYZHTZYMHCIML6SU',
          additional_properties: {
            comments: [

            ],
            inline_comments: [

            ],
          },
          block_properties: {

          },
        },
      ],
      _id: 'PSQTOBXAGZGKNOSBMOAUJ6EYSA',
    };
    const { default: List } = require('./list');
    const wrapper = mount(<List listType={listContent.list_type} listItems={listContent.items} />);
    expect(wrapper.find('ul').length).toBe(1);
  });

  it('should render ordered list correctly', () => {
    const listContent = {
      type: 'list',
      list_type: 'ordered',
      items: [
        {
          type: 'text',
          content: 'Indented under 2',
          _id: 'OWQEXQT6N5BTPF2CDZYVND6IAQ',
          additional_properties: {
            comments: [

            ],
            inline_comments: [

            ],
          },
          block_properties: {

          },
        },
        {
          type: 'text',
          content: 'Another thing indented under 2',
          _id: 'UG52XTXHHRDN5KUPKCGTKE4NMM',
          additional_properties: {
            comments: [

            ],
            inline_comments: [

            ],
          },
          block_properties: {

          },
        },
      ],
      _id: 'FLXZDZLOFRGNLMALFGLJGLDPAM',
    };
    const { default: List } = require('./list');
    const wrapper = mount(<List listType={listContent.list_type} listItems={listContent.items} />);
    expect(wrapper.find('ol').length).toBe(1);
  });

  it('should render nested list correctly', () => {
    const listContent = {
      type: 'list',
      list_type: 'ordered',
      items: [
        {
          type: 'list',
          list_type: 'unordered',
          items: [
            {
              type: 'text',
              content: 'Indented under 2',
              _id: 'IOY3SN76GVFI3MUDN3PX4V32AA',
              additional_properties: {
                comments: [

                ],
                inline_comments: [

                ],
              },
              block_properties: {

              },
            },
            {
              type: 'text',
              content: 'Another thing indented under 2',
              _id: 'MX643WWQPZCYZHTZYMHCIML6SU',
              additional_properties: {
                comments: [

                ],
                inline_comments: [

                ],
              },
              block_properties: {

              },
            },
          ],
          _id: 'PSQTOBXAGZGKNOSBMOAUJ6EYSA',
        },
        {
          type: 'text',
          content: 'Another thing indented under 2',
          _id: 'UG52XTXHHRDN5KUPKCGTKE4NMM',
          additional_properties: {
            comments: [

            ],
            inline_comments: [

            ],
          },
          block_properties: {

          },
        },
      ],
      _id: 'FLXZDZLOFRGNLMALFGLJGLDPAM',
    };
    const { default: List } = require('./list');
    const wrapper = mount(<List listType={listContent.list_type} listItems={listContent.items} />);
    expect(wrapper.find('ol').length).toBe(1);
    expect(wrapper.children().find('ul').length).toBe(1);
    expect(wrapper.children().find('li').length).toBe(3);
  });
});
