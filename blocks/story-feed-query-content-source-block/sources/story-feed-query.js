import getResizedImageData from './utils/getResizedImageData';

export default {
  resolve: (params) => `/content/v4/search/published?q=${params.query || '*'}&website=${params['arc-site']}&size=${params.size || 8}&from=${params.offset || 0}&sort=display_date:desc`,
  schemaName: 'ans-feed',
  params: {
    query: 'text',
    size: 'number',
    offset: 'number',
  },
  transform: (data) => {
    if (typeof window === 'undefined') {
      return getResizedImageData(data);
    }
    return data;
  },
};
