import source from '@arc-core-components/content-source_story-feed_author-v4';

export default {
  resolve: source.resolve,
  schemaName: source.schemaName,
  params: source.params,
  transform: (data) => data,
};
