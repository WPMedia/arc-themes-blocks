const params = {
  website_url: 'text',
};

const resolve = (key = {}) => {
  const site = key['arc-site'];
  const { website_url: websiteUrl } = key;
  return `/content/v4/?website_url=${websiteUrl}${site ? `&website=${site}` : ''}`;
};

export default {
  schemaName: 'ans-item',
  params,
  resolve,
};
