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
  let updatedSize = size;
  // Max collection size is 20
  // See: https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/content-api.json
  // Want to ensure size is capped at 20 to prevent an error.
  if (updatedSize && updatedSize > 9) updatedSize = size < 20 ? size : 20;
  return `content/v4/collections?${_id ? `_id=${_id}` : `content_alias=${contentAlias}`}${site ? `&website=${site}` : ''}${from ? `&from=${from}` : ''}${size ? `&size=${updatedSize}` : ''}&published=true`;
};

export default {
  params,
  resolve,
  schemaName: 'ans-feed',
  // other options null use default functionality, such as filter quality
  transform: (data, query) => (
    getResizedImageData(
      data,
      null,
      null,
      null,
      query['arc-site'],
    )
  ),
};
