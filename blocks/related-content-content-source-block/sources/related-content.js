import getResizedImageData from '@wpmedia/resizer-image-block';

export default {
  resolve: ({ _id, 'arc-site': arcSite } = {}) => {
    const baseUrl = '/content/v4/related-content';

    let params = [];
    params = params.concat(_id ? `_id=${_id}` : undefined);
    params = params.concat(arcSite ? `website=${arcSite}` : undefined);
    params = params.reduce((acc, ele) => (ele ? acc.concat(ele) : acc), []);

    if (params.length < 2) {
      return '';
    }

    return `${baseUrl}?${params.join('&')}`;
  },
  schemaName: 'ans-feed',
  params: {
    _id: 'text',
  },
  transform: (data, query) => {
    if (data && data.basic) {
      return {
        content_elements: data.basic.map((ele) => (
          getResizedImageData(
            ele,
            null,
            null,
            null,
            query['arc-site'],
          )
        )),
      };
    }
    return data;
  },
};
