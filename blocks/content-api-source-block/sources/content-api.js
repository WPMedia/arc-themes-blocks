import getResizedImageData from '@wpmedia/resizer-image-block';

const params = {
  _id: 'text',
  website_url: 'text',
};

const resolve = (key = {}) => {
  const site = key['arc-site'];
  const { website_url: websiteUrl, _id: id } = key;
  return `/content/v4/?${id ? `_id=${id}` : `website_url=${websiteUrl}`}${site ? `&website=${site}` : ''}`;
};

const transform = (data) => getResizedImageData(data);

export default {
  schemaName: 'ans-item',
  params,
  resolve,
  transform,
};
