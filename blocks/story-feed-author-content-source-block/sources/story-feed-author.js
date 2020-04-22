import source from '@arc-core-components/content-source_story-feed_author-v4';
import getResizedImageData from '@wpmedia/resizer-image-block';

export default {
  resolve: source.resolve,
  schemaName: source.schemaName,
  params: source.params,
  transform: (data) => getResizedImageData(data),
};
