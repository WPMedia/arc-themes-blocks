import extractVideoEmbedFromStory from './extractVideoEmbedFromStory';

const contentTypeImageBasicPromo = {
  type: 'story',
  promo_items: {
    basic: {
      type: 'image',
    },
  },
};
const contentTypeImageLeadPromo = {
  type: 'story',
  promo_items: {
    lead_art: {
      type: 'image',
    },
  },
};
const contentTypeVideo = {
  type: 'video',
  embed_html: '<div class="somehtml"></div>',
};
const contentTypeVideoPromo = {
  type: 'story',
  promo_items: {
    lead_art: {
      ...contentTypeVideo,
    },
  },
};

describe('extractVideoEmbedFromStory()', () => {
  describe('when content type is "story"', () => {
    it('should return "undefined" when content has non-"video" basic art', () => {
      const vidEmbed = extractVideoEmbedFromStory(contentTypeImageBasicPromo);
      expect(vidEmbed).not.toBeDefined();
    });

    it('should return "undefined" when content has non-"video" lead art', () => {
      const vidEmbed = extractVideoEmbedFromStory(contentTypeImageLeadPromo);
      expect(vidEmbed).not.toBeDefined();
    });

    it('should return "embed_html" when content has "video" lead art', () => {
      const vidEmbed = extractVideoEmbedFromStory(contentTypeVideoPromo);
      expect(vidEmbed).toBeDefined();
      expect(vidEmbed).toEqual(contentTypeVideo.embed_html);
    });
  });

  describe('when content type is "video"', () => {
    it('should return "undefined" when embed does not exist', () => {
      const vidEmbed = extractVideoEmbedFromStory({ type: 'video' });
      expect(vidEmbed).not.toBeDefined();
    });

    it('should return "embed_html" when embed exists', () => {
      const vidEmbed = extractVideoEmbedFromStory(contentTypeVideo);
      expect(vidEmbed).toBeDefined();
      expect(vidEmbed).toEqual(contentTypeVideo.embed_html);
    });
  });
});
