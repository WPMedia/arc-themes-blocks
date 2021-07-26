import getResizedImageData from '@wpmedia/resizer-image-block';

// via https://github.com/wapopartners/core-components/blob/dev/packages/content-source_story-feed_tag-v4/src/index.js#L19
// Default values for the Core Component
const schemaName = 'ans-feed';

const params = {
  tagSlug: 'text',
  feedSize: 'number',
  feedOffset: 'number',
};

/**
* @func pattern
* @param {Object} key
* @return {String} slugified content api search url
*/
const pattern = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site is not defined';
  const { tagSlug, feedOffset, feedSize } = key;

  return `/content/v4/search/published?q=taxonomy.tags.slug:${tagSlug}&size=${feedSize}&from=${feedOffset}&sort=display_date:desc&website=${website}`;
};

/**
* @func resolve
* @param {Object} key - the object key to return a slugified pattern for
* @return {String} slugified content api search url
*/
const resolve = (key) => pattern(key);

const source = {
  resolve,
  schemaName,
  params,
};

export default {
  resolve: source.resolve,
  schemaName: source.schemaName,
  params: source.params,
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
