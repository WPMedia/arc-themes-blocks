const React = require('react');
const { shallow } = require('enzyme');

describe('Given the display time from ANS, it should convert to the proper timezone format we want', () => {
  it('should return one author', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [{
        name: 'SangHee Kim',
        url: '/author/sanghee-kim',
      }],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.text()).toEqual('By SangHee Kim');
  });

  it('should return two authors', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.text()).toEqual('By SangHee Kim and Sara Carothers');
  });

  it('should return three authors, oxford comma', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
        }, {
          name: 'Brent Miller',
          url: '/author/brent-miller',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.text()).toEqual('By SangHee Kim, Joe Grosspitsch and Brent Miller');
  });

  it('should return four authors, oxford comma', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
        }, {
          name: 'Brent Miller',
          url: '/author/brent-miller',
        }, {
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.text()).toEqual('By SangHee Kim, Joe Grosspitsch, Brent Miller and Sara Carothers');
  });

  it('should return no author (no name provided for any of the authors)', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          url: '/author/sanghee-kim',
        }, {
          url: '/author/joe-grosspietsch',
        }, {
          url: '/author/brent-miller',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.text()).toEqual('');
  });
});
