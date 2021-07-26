import storyFeedTag from './story-feed-tag';

describe('content source object', () => {
  describe('source.resolve function', () => {
    const key = {
      'arc-site': 'test-site',
      tagSlug: 'my-slug',
      feedOffset: 0,
      feedSize: 5,
    };

    it('Checks that source.resolve returns the right pattern from the key', () => {
      const website = key['arc-site'];
      const { tagSlug, feedOffset, feedSize } = key;

      const endpoint = `/content/v4/search/published?q=taxonomy.tags.slug:${tagSlug}&size=${feedSize}&from=${feedOffset}&sort=display_date:desc&website=${website}`;
      expect(storyFeedTag.resolve(key)).toBe(endpoint);
    });

    it('Returns error if no params', () => {
      expect(() => storyFeedTag.resolve()).toThrow('tagSlug parameter is required');
    });
  });
});
