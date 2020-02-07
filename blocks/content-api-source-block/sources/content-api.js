export default {
  schemaName: 'ans-item',
  params: {
    website_url: 'text',
  },
  resolve: (key = {}) => {
    const site = key['arc-site'];
    const { website_url: websiteUrl } = key;
    return `/content/v4/?website_url=${websiteUrl}${site ? `&website=${site}` : ''}`;
  },
};
