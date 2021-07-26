import getResizedImageData from '@wpmedia/resizer-image-block';

const itemToArray = (itemString = '') => itemString
  .split(',')
  .map((item) => item.replace(/'/g, ''));

const params = {
  includeSections: 'text',
  excludeSections: 'text',
  feedSize: 'number',
  feedOffset: 'number',
};

const resolve = (key = {}) => {
  const website = key['arc-site'];

  const {
    includeSections,
    excludeSections,
    feedOffset,
    feedSize,
  } = key;

  const encodedBody = encodeURI(JSON.stringify({
    query: {
      bool: {
        must: [
          { term: { 'revision.published': 'true' } },
          {
            nested: {
              path: 'taxonomy.sections',
              query: {
                bool: {
                  must: [
                    { terms: { 'taxonomy.sections._id': itemToArray(includeSections) } },
                    { term: { 'taxonomy.sections._website': website } },
                  ],
                },
              },
            },
          },
        ],
        must_not: [
          {
            nested: {
              path: 'taxonomy.sections',
              query: {
                bool: {
                  must: [
                    { terms: { 'taxonomy.sections._id': itemToArray(excludeSections) } },
                    { term: { 'taxonomy.sections._website': website } },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  }));
  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${feedSize}&from=${feedOffset}&sort=display_date:desc`;
};

const transform = (data, query) => (
  getResizedImageData(
    data,
    null,
    null,
    null,
    query['arc-site'],
  )
);

export default {
  params,
  resolve,
  schemaName: 'ans-feed',
  transform,
};
