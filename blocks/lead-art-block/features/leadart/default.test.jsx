import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import getTranslatedPhrases from 'fusion:intl';
import { useAppContext } from 'fusion:context';
import LeadArt from './default';

const React = require('react');
const { mount, shallow } = require('enzyme');

describe('LeadArt', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    getThemeStyle.mockImplementation(() => (
      {
        'primary-font-family': 'Arial',
      }));

    getProperties.mockImplementation(() => (
      { locale: [] }));

    getTranslatedPhrases.mockImplementation(() => (
      { t: jest.fn().mockReturnValue('gallery-expand') }));
  });

  it('renders html lead art type', () => {
    const globalContent = {
      promo_items: {
        lead_art: {
          type: 'raw_html',
        },
      },
    };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    expect(wrapper.find('.lead-art-wrapper').length).toEqual(1);
  });

  it('renders html lead art type lightbox if button pos is not hidden', () => {
    const globalContent = {
      promo_items: {
        basic: {
          type: 'raw_html',
        },
      },
    };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    wrapper.setState({ buttonPosition: 'true', isOpen: true });
    wrapper.update();
    expect(wrapper.find('ReactImageLightbox').length).toEqual(1);
  });

  // it('renders video lead art type without playthrough', () => {
  //   const globalContent = {
  //     promo_items: {
  //       lead_art: {
  //         type: 'video',
  //       },
  //     },
  //   };

  //   const wrapper = shallow(
  //     <LeadArt
  //       arcSite="the-sun"
  //       globalContent={globalContent}
  //       customFields={{ playthrough: false }}
  //     />,
  //   );
  //   const vidPlayer = wrapper.find('VideoPlayer');
  //   expect(vidPlayer.length).toEqual(1);
  //   expect(vidPlayer.props().customFields.playthrough).toBeFalsy();
  // });

  // not sure if these tests are reliable
  // it('renders video lead art type with playthrough', () => {
  //   const globalContent = {
  //     promo_items: {
  //       lead_art: {
  //         type: 'video',
  //         embedHTML: 'here',
  //       },
  //     },
  //   };

  //   const wrapper = shallow(
  //     <LeadArt
  //       arcSite="the-sun"
  //       globalContent={globalContent}
  //       customFields={{ playthrough: true }}
  //     />,
  //   );
  //   const vidPlayer = wrapper.find('VideoPlayer');
  //   expect(vidPlayer.length).toEqual(1);
  //   expect(vidPlayer.props().customFields.playthrough).toBeDefined();
  //   expect(vidPlayer.props().customFields.playthrough).toEqual(true);
  // });

  // it('renders video lead art type without auto-play', () => {
  //   const globalContent = {
  //     promo_items: {
  //       lead_art: {
  //         type: 'video',
  //       },
  //     },
  //   };

  //   const wrapper = shallow(
  //     <LeadArt
  //       arcSite="the-sun"
  //       globalContent={globalContent}
  //       customFields={{ enableAutoplay: false }}
  //     />,
  //   );
  //   const vidPlayer = wrapper.find('VideoPlayer');
  //   expect(vidPlayer.length).toEqual(1);
  //   expect(vidPlayer.prop('enableAutoplay')).toBeFalsy();
  // });

  // it('renders video lead art type with auto-play', () => {
  //   const globalContent = {
  //     promo_items: {
  //       lead_art: {
  //         type: 'video',
  //       },
  //     },
  //   };

  //   const wrapper = shallow(
  //     <LeadArt
  //       arcSite="the-sun"
  //       globalContent={globalContent}
  //       customFields={{ enableAutoplay: true }}
  //     />,
  //   );
  //   const vidPlayer = wrapper.find('VideoPlayer');
  //   expect(vidPlayer.length).toEqual(1);
  //   expect(vidPlayer.prop('enableAutoplay')).toBeDefined();
  //   expect(vidPlayer.prop('enableAutoplay')).toEqual(true);
  // });

  it('renders image type', () => {
    const globalContent = {
      promo_items: {
        lead_art: {
          type: 'image',
        },
      },
    };

    LeadArt.prototype.imgRef = { current: { querySelector: jest.fn() } };
    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    expect(wrapper.find('ImageMetadata').length).toEqual(1);
  });

  it('renders gallery lead image type', () => {
    const globalContent = {
      promo_items: {
        lead_art: {
          type: 'gallery',
          headlines: { basic: 'test headline' },
        },
      },
    };

    LeadArt.prototype.imgRef = { current: { querySelector: jest.fn() } };
    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    expect(wrapper.find('Gallery').length).toEqual(1);
  });

  it('returns null if invalid lead art type', () => {
    const globalContent = {
      promo_items: {
        lead_art: {
          type: 'film',
          headlines: { basic: 'test headline' },
        },
      },
    };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    expect(wrapper).toEqual({});
  });

  it('returns null if no content promo items', () => {
    const globalContent = { promo_items: null };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    expect(wrapper).toEqual({});
  });

  it('if raw html type has buttonPosition as hidden return null lightbox', () => {
    const globalContent = {
      promo_items: {
        basic: {
          type: 'raw_html',
        },
      },
    };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    wrapper.setState({ buttonPosition: 'hidden', isOpen: true });
    wrapper.update();
    expect(wrapper.find('ReactImageLightbox').length).toEqual(0);
  });

  it('if image type has buttonPosition as hidden return null lightbox', () => {
    const globalContent = {
      promo_items: {
        basic: {
          type: 'image',
        },
      },
    };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    wrapper.setState({ buttonPosition: 'hidden', isOpen: true });
    wrapper.update();
    expect(wrapper.find('ReactImageLightbox').length).toEqual(0);
  });

  it('uses english phrases if no locale available', () => {
    getProperties.mockImplementation(() => (
      { locale: undefined }));

    const globalContent = {
      promo_items: {
        basic: {
          type: 'raw_html',
        },
      },
    };

    // eslint-disable-next-line no-unused-vars
    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    expect(getTranslatedPhrases).toHaveBeenLastCalledWith('en');
    getTranslatedPhrases.mockReset();
  });

  it('uses translated gallery phrase if no custom field value provided', () => {
    getTranslatedPhrases.mockImplementation(() => (
      { t: jest.fn().mockReturnValue('gallery-expand') }));

    const globalContent = {
      promo_items: {
        basic: {
          type: 'raw_html',
        },
      },
    };

    const customFieldNullButton = { buttonLabel: null };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} customFields={customFieldNullButton} />);
    expect(wrapper.state('buttonLabel')).toEqual('gallery-expand');
    getTranslatedPhrases.mockReset();
  });

  it('creates lightbox', () => {
    const globalContent = {
      promo_items: {
        basic: {
          type: 'raw_html',
        },
      },
    };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);

    wrapper.instance().imgRef = { current: { querySelector: jest.fn().mockReturnValue({ dataset: { lightbox: 'testLightbox' } }) } };
    const result = wrapper.instance().lightboxImgHandler();
    expect(result).toEqual('testLightbox');
  });

  it(' lightbox returns empty string if no imgElm ', () => {
    const globalContent = {
      promo_items: {
        basic: {
          type: 'raw_html',
        },
      },
    };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);

    wrapper.instance().imgRef = { current: { querySelector: jest.fn().mockReturnValue(null) } };
    const result = wrapper.instance().lightboxImgHandler();
    expect(result).toEqual('');
  });

  it('raw html type returns styled component  LeadArtWrapperDiv', () => {
    const globalContent = {
      promo_items: {
        basic: {
          type: 'raw_html',
        },
      },
    };

    const wrapper = mount(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    expect(wrapper.find('StyledComponent').at(0).prop('className')).toEqual('lead-art-wrapper');
    wrapper.unmount();
  });

  it('image type returns styled component  LeadArtWrapperFigure', () => {
    const globalContent = {
      promo_items: {
        lead_art: {
          type: 'image',
        },
      },
    };

    useAppContext.mockImplementation(() => (
      {
        arcSite: {},
      }));

    LeadArt.prototype.imgRef = { current: { querySelector: jest.fn() } };
    const wrapper = mount(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    expect(wrapper.find('ImageMetadata').length).toEqual(1);
    wrapper.unmount();
  });

  it('setIsOpenToFalse sets isOpen to false', () => {
    const globalContent = {
      promo_items: {
        basic: {
          type: 'raw_html',
        },
      },
    };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    wrapper.instance().setIsOpenToFalse();
    wrapper.update();
    expect(wrapper.state('isOpen')).toBeFalsy();
  });

  it('setIsOpenToTrue sets isOpen to true', () => {
    const globalContent = {
      promo_items: {
        basic: {
          type: 'raw_html',
        },
      },
    };

    const wrapper = shallow(<LeadArt arcSite="the-sun" globalContent={globalContent} />);
    wrapper.instance().setIsOpenToTrue();
    wrapper.update();
    expect(wrapper.state('isOpen')).toBeTruthy();
  });
});
