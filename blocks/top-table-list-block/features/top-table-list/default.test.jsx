import React from 'react';
import { mount } from 'enzyme';

const config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  showImageSM: true,
};

jest.mock('fusion:properties', () => jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
})));

describe('top table list', () => {
  beforeAll(() => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
    }))));
    jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('renders null if no content', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(),
    }));
    const wrapper = mount(
      <TopTableList customFields={config} arcSite="" deployment={jest.fn((path) => path)} />,
    );
    expect(wrapper.text()).toBe('');
    expect(wrapper.find('.top-table-list-container').children().length).toBe(0);
  });

  it('renders one content item with incomplete data', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
          websites: {
            'the-sun': {
              website_url: 'url',
            },
          },
        }],
      })),
    }));

    const wrapper = mount(
      <TopTableList customFields={config} arcSite="the-sun" deployment={jest.fn((path) => path)} />,
    );
    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });

  it('renders one content item with complete data', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
          promo_items: {
            basic: {
              type: 'image',
              url: 'url',
            },
          },
          headlines: {
            basic: 'Basic Headline',
          },
          description: {
            basic: 'Basic description',
          },
          credits: {
            by: ['Bob Woodward'],
          },
          websites: {
            'the-sun': {
              website_url: 'url',
            },
          },
        }],
      })),
    }));

    const wrapper = mount(
      <TopTableList customFields={config} arcSite="" deployment={jest.fn((path) => path)} />,
    );

    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });

  it('renders content only for the arcSite', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
          promo_items: {
            basic: {
              type: 'image',
              url: 'url',
            },
          },
          headlines: {
            basic: 'Basic Headline',
          },
          description: {
            basic: 'Basic description',
          },
          credits: {
            by: ['Bob Woodward'],
          },
          websites: {
            'the-prophet': {
              website_url: 'url',
            },
            'the-sun': {
              website_url: 'url',
            },
          },
        }],
      })),
    }));

    const wrapper = mount(
      <TopTableList customFields={config} arcSite="" deployment={jest.fn((path) => path)} />,
    );

    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });

  it('renders no content if arcSite not found', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'daily-telegraph',
      })),
    }));

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
          promo_items: {
            basic: {
              type: 'image',
              url: 'url',
            },
          },
          headlines: {
            basic: 'Basic Headline',
          },
          description: {
            basic: 'Basic description',
          },
          credits: {
            by: ['Bob Woodward'],
          },
          websites: {
            'the-prophet': {
              website_url: 'url',
            },
            'the-sun': {
              website_url: 'url',
            },
          },
        }],
      })),
    }));

    const wrapper = mount(
      <TopTableList customFields={config} arcSite="" deployment={jest.fn((path) => path)} />,
    );

    expect(wrapper.find('.top-table-list-container').children().length).toBe(0);
  });
});

describe('top table list overline rules', () => {
  beforeAll(() => {
    jest.mock('fusion:properties', () => jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
    })));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
      })),
    }));
    jest.mock('fusion:themes', () => jest.fn(() => ({})));
    jest.mock('fusion:properties', () => jest.fn(() => ({
      resizerUrl: 'https://resizer.com',
    })));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('must render overline from label', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const localConfig = Object.assign(config, {
      extraLarge: 1,
      large: 0,
      medium: 0,
      small: 0,
    });

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [
          {
            _id: 'kjdfh',
            headlines: {
              basic: 'Basic Headline',
            },
            description: {
              basic: 'Basic description',
            },
            credits: {
              by: ['Bob Woodward'],
            },
            websites: {
              'the-sun': {
                website_url: 'url',
              },
            },
            label: {
              basic: {
                display: true,
                text: 'The Label',
                url: 'https://example.com',
              },
            },
          },
        ],
      })),
      useEditableContent: jest.fn(() => ({
        editableContent: jest.fn(() => ({})),
      })),
    }));

    const wrapper = mount(<TopTableList customFields={localConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    const ele = wrapper.find('.top-table-list-container').find('a.overline');
    expect(ele.length).toBe(1);
    expect(ele.text()).toEqual('The Label');
  });

  it('must render overline from section', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const localConfig = Object.assign(config, {
      extraLarge: 1, large: 0, medium: 0, small: 0,
    });

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
          headlines: {
            basic: 'Basic Headline',
          },
          description: {
            basic: 'Basic description',
          },
          credits: {
            by: ['Bob Woodward'],
          },
          websites: {
            'the-sun': {
              website_url: 'url',
              website_section: {
                _id: '/the_url',
                name: 'The Section',
              },
            },
          },
        }],
      })),
      useEditableContent: jest.fn(() => ({
        editableContent: jest.fn(() => ({})),
      })),
    }));

    const wrapper = mount(
      <TopTableList customFields={localConfig} arcSite="" deployment={jest.fn((path) => path)} />,
    );

    const ele = wrapper.find('.top-table-list-container').find('a.overline');
    expect(ele.text()).toEqual('The Section');
    expect(ele.length).toBe(1);
  });

  it('must prioritize overline from label if has section too', () => {
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const localConfig = Object.assign(config, {
      extraLarge: 1, large: 0, medium: 0, small: 0,
    });

    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
          headlines: {
            basic: 'Basic Headline',
          },
          description: {
            basic: 'Basic description',
          },
          credits: {
            by: ['Bob Woodward'],
          },
          label: {
            basic: {
              display: true,
              text: 'The Label',
              url: 'https://example.com',
            },
          },
          websites: {
            'the-sun': {
              website_url: 'url',
              website_section: {
                _id: '/the_url',
                name: 'The Section',
              },
            },
          },
        }],
      })),
      useEditableContent: jest.fn(() => ({
        editableContent: jest.fn(() => ({})),
      })),
    }));

    const wrapper = mount(
      <TopTableList customFields={localConfig} arcSite="" deployment={jest.fn((path) => path)} />,
    );

    const ele = wrapper.find('.top-table-list-container').find('a.overline');
    expect(ele.text()).toEqual('The Label');
    expect(ele.length).toBe(1);
  });
});

describe('default ratios', () => {
  beforeAll(() => {
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
          promo_items: {
            basic: {
              type: 'image',
              url: 'url',
              resized_params: {
                '377x283': '',
                '377x251': '',
                '377x212': '',
                '400x225': '',
                '400x267': '',
                '400x300': '',
                '800x600': '',
                '800x533': '',
                '800x450': '',
              },
            },
          },
          headlines: {
            basic: 'Basic Headline',
          },
          description: {
            basic: 'Basic description',
          },
          credits: {
            by: ['Bob Woodward'],
          },
          websites: {
            'the-sun': {
              website_url: 'url',
            },
          },
        }],
      })),
    }));

    jest.mock('fusion:properties', () => (jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
      resizerURL: 'resizer',
    }))));
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('must have a default 4:3 ratio for XL', () => {
    const xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(600);
  });

  it('must have a default 4:3 ratio for LG', () => {
    const xlConfig = {
      large: 1,
      showImageLG: true,
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(283);
  });

  it('must have a default 16:9 ratio for MD', () => {
    const xlConfig = {
      medium: 1,
      showImageMD: true,
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(225);
  });

  it('must have a default 3:2 ratio for SM', () => {
    const xlConfig = {
      small: 1,
      showImageSM: true,
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(267);
  });

  it('XL can be changed to 16:9', () => {
    const xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '16:9',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(450);
  });

  it('XL can be changed to 4:3', () => {
    const xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '4:3',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(600);
  });

  it('XL can be changed to 3:2', () => {
    const xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '3:2',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(533);
  });

  it('LG can be changed to 16:9', () => {
    const xlConfig = {
      large: 1,
      showImageLG: true,
      imageRatioLG: '16:9',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(212);
  });

  it('LG can be changed to 4:3', () => {
    const xlConfig = {
      large: 1,
      showImageLG: true,
      imageRatioLG: '4:3',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(283);
  });

  it('LG can be changed to 3:2', () => {
    const xlConfig = {
      large: 1,
      showImageLG: true,
      imageRatioLG: '3:2',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(251);
  });

  it('MD can be changed to 16:9', () => {
    const xlConfig = {
      medium: 1,
      showImageMD: true,
      imageRatioMD: '16:9',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(225);
  });

  it('MD can be changed to 4:3', () => {
    const xlConfig = {
      medium: 1,
      showImageMD: true,
      imageRatioMD: '4:3',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(300);
  });

  it('MD can be changed to 3:2', () => {
    const xlConfig = {
      medium: 1,
      showImageMD: true,
      imageRatioMD: '3:2',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(267);
  });

  it('SM can be changed to 16:9', () => {
    const xlConfig = {
      small: 1,
      showImageSM: true,
      imageRatioSM: '16:9',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(225);
  });

  it('SM can be changed to 4:3', () => {
    const xlConfig = {
      small: 1,
      showImageSM: true,
      imageRatioSM: '4:3',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(300);
  });

  it('SM can be changed to 3:2', () => {
    const xlConfig = {
      small: 1,
      showImageSM: true,
      imageRatioSM: '3:2',
    };
    const { default: TopTableList } = require('./default');
    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    const ttl = mount(<TopTableList customFields={xlConfig} arcSite="" deployment={jest.fn((path) => path)} />);

    expect(ttl.find('Image').prop('largeHeight')).toBe(267);
  });
});
