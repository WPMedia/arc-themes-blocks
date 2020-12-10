import source from '@arc-core-components/content-source_story-feed_sections-v4';
import getResizedImageData from '@wpmedia/resizer-image-block';

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
