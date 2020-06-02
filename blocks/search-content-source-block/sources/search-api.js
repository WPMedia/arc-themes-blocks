import getProperties from 'fusion:properties';
import getResizedImageData from '@wpmedia/resizer-image-block';

export default {
  resolve(contentOptions) {
    const { query, page, 'arc-site': arcSite } = contentOptions;
    if (query) {
      return `https://search.arcpublishing.com/search?&q=${query}&page=${page || 1}${arcSite ? `&website_id=${arcSite}` : ''}${getProperties(arcSite).searchKey ? `&key=${getProperties(arcSite).searchKey}` : ''}`;
    }
    return '';
  },
  params: {
    query: 'text',
    page: 'text',
  },
  /*
    root: {
      data: [{ promo_items: {...}}],
      otherFields: ...
    }
    different from other content sources that have content elements
    on the top-level
  */
  transform: (data) => ({
    data: getResizedImageData(data.data),
    ...data,
  })
  ,
};
