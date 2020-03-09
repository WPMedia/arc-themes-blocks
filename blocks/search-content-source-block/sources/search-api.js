import getProperties from 'fusion:properties';

export default {
  resolve(contentOptions) {
    const { query, page, 'arc-site': arcSite } = contentOptions;
    if (query.length > 0) {
      return `https://search.arcpublishing.com/search?&q=${query}&page=${page || 1}&key=${getProperties(arcSite).searchKey}`;
    }
    return '';
  },
  params: {
    query: 'text',
    page: 'text',
  },
};
