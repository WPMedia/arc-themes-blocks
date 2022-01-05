import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import getResizedImageData from '@wpmedia/resizer-image-block';

const params = {
  _id: 'text',
  content_alias: 'text',
  from: 'text',
  size: 'text',
  getNext: 'text',
};

const fetch = (key = {}) => {
  const {
    'arc-site': site,
    _id,
    content_alias: contentAlias,
    from,
    size,
    getNext = 'false',
  } = key;
  let updatedSize = size;
  // Max collection size is 20
  // See: https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/content-api.json
  // Want to ensure size is capped at 20 to prevent an error.
  if (updatedSize && updatedSize > 9) updatedSize = size < 20 ? size : 20;

  return request({
    uri: `${CONTENT_BASE}content/v4/collections?${_id ? `_id=${_id}` : `content_alias=${contentAlias}`}${site ? `&website=${site}` : ''}${from ? `&from=${from}` : ''}${size ? `&size=${updatedSize}` : ''}&published=true`,
    auth: {
      bearer: ARC_ACCESS_TOKEN,
    },
    json: true,
  }).then((content) => {
    if (getNext === 'false') {
      return content;
    }

    const existingData = content;

    return request({
      uri: `${CONTENT_BASE}content/v4/collections?${_id ? `_id=${_id}` : `content_alias=${contentAlias}`}${site ? `&website=${site}` : ''}&from=${updatedSize}${size ? `&size=${updatedSize}` : ''}&published=true`,
      auth: {
        bearer: ARC_ACCESS_TOKEN,
      },
      json: true,
    }).then((nextContent) => {
      existingData.content_elements = [
        ...existingData.content_elements,
        ...nextContent?.content_elements,
      ];
      return existingData;
    });
  });
};

export default {
  params,
  fetch,
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
