const React = require('react');
const { shallow } = require('enzyme');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

describe('Given the display time from ANS, it should convert to the proper timezone format we want', () => {
  it('should return one author', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [{
        type: 'author',
        name: 'SangHee Kim',
        url: '/author/sanghee-kim',
      }],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: '<p> By <a href="/author/sanghee-kim">SangHee Kim</a> </p>' });
  });

  it('should return two authors', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          type: 'author',
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: '<p> By <a href="/author/sanghee-kim">SangHee Kim</a> and <a href="/author/sara-carothers">Sara Carothers</a></p>' });
  });

  it('should return three authors, oxford comma', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          type: 'author',
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
        }, {
          type: 'author',
          name: 'Brent Miller',
          url: '/author/brent-miller',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: '<p> By <a href="/author/sanghee-kim">SangHee Kim</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch</a> and <a href="/author/brent-miller">Brent Miller</a></p>' });
  });

  it('should return four authors, oxford comma', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          type: 'author',
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
        }, {
          type: 'author',
          name: 'Brent Miller',
          url: '/author/brent-miller',
        }, {
          type: 'author',
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: '<p> By <a href="/author/sanghee-kim">SangHee Kim</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch</a>, <a href="/author/brent-miller">Brent Miller</a> and <a href="/author/sara-carothers">Sara Carothers</a></p>' });
  });

  it('should return no author (no byline provided for any of the authors)', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          type: 'author',
          url: '/author/sanghee-kim',
          additional_properties: {
            original: {
            },
          },
        }, {
          type: 'author',
          url: '/author/joe-grosspietsch',
          additional_properties: {
            original: {
            },
          },
        }, {
          type: 'author',
          url: '/author/brent-miller',
          additional_properties: {
            original: {
            },
          },
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: '' });
  });

  it('should return 4 authors complete with url and bylines', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
          additional_properties: {
            original: {
              byline: 'SangHee Kim Byline',
            },
          },
        }, {
          type: 'author',
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
          additional_properties: {
            original: {
              byline: 'Joe Grosspietsch Byline',
            },
          },
        }, {
          type: 'author',
          name: 'Brent Miller',
          url: '/author/brent-miller',
          additional_properties: {
            original: {
              byline: 'Brent Miller Byline',
            },
          },
        }, {
          type: 'author',
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
          additional_properties: {
            original: {
              byline: 'Sara Lynn Carothers',
            },
          },
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = shallow(<ArticleByline globalContent={globalContent} />);

    expect(wrapper.prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: '<p> By <a href="/author/sanghee-kim">SangHee Kim Byline</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch Byline</a>, <a href="/author/brent-miller">Brent Miller Byline</a> and <a href="/author/sara-carothers">Sara Lynn Carothers</a></p>' });
  });
});
