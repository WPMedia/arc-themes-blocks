import getResizedImageData from '@wpmedia/resizer-image-block';

const params = {
  tagSlug: 'text',
  feedSize: 'number',
  feedOffset: 'number',
};

const resolve = (key = {}) => {
  const website = key['arc-site'];
  const {
    tagSlug,
    feedOffset,
    feedSize,
  } = key;

  return `/content/v4/search/published?q=taxonomy.tags.slug:${tagSlug}&size=${feedSize}&from=${feedOffset}&sort=display_date:desc&website=${website}`;
};

export default {
  params,
  resolve,
  schemaName: 'ans-feed',
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
