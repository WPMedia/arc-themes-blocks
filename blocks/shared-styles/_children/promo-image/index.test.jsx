import React from 'react';
import { mount } from 'enzyme';

import PromoImage from './index';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  resizerURL: 'https://resizer.me',
}))));

jest.mock('fusion:content', () => ({
  useEditableContent: jest.fn(() => ({
    editableContent: () => ({ contentEditable: 'true' }),
  })),
  useContent: jest.fn(() => ({
    '800x600': 'VWgB9mYQ5--6WT0lD6nIw11D_yA=filters:cm=t/',
    '600x450': 'nMHJLqy4jBawvstr8mcTCfgBzoE=filters:cm=t/',
    '400x300': 'D9yXcc8gxtvlCODv62qbg2i52N8=filters:cm=t/',
  })),
}));

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'the-sun',
  })),
}));

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

describe('PromoImage', () => {
  it('renders PlaceholderImage if nothing passed in', () => {
    const wrapper = mount(<PromoImage />);

    expect(wrapper.find('PlaceholderImage').exists()).toBe(true);
  });

  it('renders custom image without a link', () => {
    const props = {
      customImageURL: 'https://d22ff27hdsy159.cloudfront.net/12-17-2019/t_b47df64ea45e4b178442347c0dc3724b_name_file_1280x720_2000_v3_1_.jpg',
    };

    const wrapper = mount(<PromoImage {...props} />);

    expect(wrapper.find('a').exists()).toBe(false);
    expect(wrapper.find('Image').prop('url')).toBe(props.customImageURL);
  });

  it('renders custom image with a link', () => {
    const props = {
      customImageURL: 'https://d22ff27hdsy159.cloudfront.net/12-17-2019/t_b47df64ea45e4b178442347c0dc3724b_name_file_1280x720_2000_v3_1_.jpg',
      linkURL: 'https://arcxp.com',
    };

    const wrapper = mount(<PromoImage {...props} />);

    expect(wrapper.find('a').prop('href')).toBe(props.linkURL);
    expect(wrapper.find('Image').prop('url')).toBe(props.customImageURL);
  });

  it('renders image with a link from ANS Story content object', () => {
    const props = {
      showPromoLabel: true,
      content: {
        promo_items: {
          basic: {
            type: 'image',
            url: 'https://d22ff27hdsy159.cloudfront.net/12-17-2019/t_b47df64ea45e4b178442347c0dc3724b_name_file_1280x720_2000_v3_1_.jpg',
            resized_params: {
              '800x600': 'VWgB9mYQ5--6WT0lD6nIw11D_yA=filters:cm=t/',
              '600x450': 'nMHJLqy4jBawvstr8mcTCfgBzoE=filters:cm=t/',
              '400x300': 'D9yXcc8gxtvlCODv62qbg2i52N8=filters:cm=t/',
            },
          },
        },
        websites: {
          'the-sun': {
            website_url: 'https://arcxp.com',
          },
        },
      },
    };

    const wrapper = mount(<PromoImage {...props} />);

    expect(wrapper.find('a').prop('href')).toBe('https://arcxp.com');
    expect(wrapper.find('Image').prop('url')).toBe('https://d22ff27hdsy159.cloudfront.net/12-17-2019/t_b47df64ea45e4b178442347c0dc3724b_name_file_1280x720_2000_v3_1_.jpg');
    expect(wrapper.find('PromoLabel').exists()).toBe(false);
  });

  it('renders image with a link and promo label from ANS Story content object', () => {
    const props = {
      content: {
        type: 'video',
        promo_items: {
          basic: {
            type: 'image',
            url: 'https://d22ff27hdsy159.cloudfront.net/12-17-2019/t_b47df64ea45e4b178442347c0dc3724b_name_file_1280x720_2000_v3_1_.jpg',
            resized_params: {
              '800x600': 'VWgB9mYQ5--6WT0lD6nIw11D_yA=filters:cm=t/',
              '600x450': 'nMHJLqy4jBawvstr8mcTCfgBzoE=filters:cm=t/',
              '400x300': 'D9yXcc8gxtvlCODv62qbg2i52N8=filters:cm=t/',
            },
          },
        },
        websites: {
          'the-sun': {
            website_url: 'https://arcxp.com',
          },
        },
      },
    };

    const wrapper = mount(<PromoImage {...props} />);

    expect(wrapper.find('a').prop('href')).toBe('https://arcxp.com');
    expect(wrapper.find('Image').prop('url')).toBe('https://d22ff27hdsy159.cloudfront.net/12-17-2019/t_b47df64ea45e4b178442347c0dc3724b_name_file_1280x720_2000_v3_1_.jpg');
    expect(wrapper.find('PromoLabel').exists()).toBe(true);
  });
});
