import getResizedImageData from '@wpmedia/resizer-image-block';

const params = {
  _id: 'text',
  content_alias: 'text',
  from: 'text',
  size: 'text',
};

const resolve = (key = {}) => {
  const {
    'arc-site': site,
    _id,
    content_alias: contentAlias,
    from,
    size,
  } = key;
  return `content/v4/collections?${_id ? `_id=${_id}` : `content_alias=${contentAlias}`}${site ? `&website=${site}` : ''}${from ? `&from=${from}` : ''}${size ? `&size=${size}` : ''}&published=true`;
};

export default {
  params,
  resolve,
  schemaName: 'ans-feed',
  // other options null use default functionality, such as filter quality
  transform: (data, query) => {
    const { isCompressedImageParams = false } = query;

    return getResizedImageData(
      data,
      null,
      null,
      null,
      query['arc-site'],
      undefined,
      isCompressedImageParams,
    );
  },
};
