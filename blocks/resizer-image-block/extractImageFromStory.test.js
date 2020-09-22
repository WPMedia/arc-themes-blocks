import extractImageFromStory from './extractImageFromStory';

import mockLeadArtVideo from './mockLeadArtVideo';
import mockLeadArtVideoNoImage from './mockLeadArtVideoNoImage';
import mockLeadArtVideoPromoBasic from './mockLeadArtVideoPromoBasic';

describe('when extract an image from a story', () => {
  it('must extract image from lead_art.promo_items if is present', () => {
    const url = extractImageFromStory(mockLeadArtVideo);
    const imageUrl = mockLeadArtVideo.promo_items.lead_art.promo_items.basic.url;

    expect(url).toEqual(imageUrl);
  });

  it('must extract image from basic if lead_art image is empty', () => {
    const url = extractImageFromStory(mockLeadArtVideoPromoBasic);
    const imageUrl = mockLeadArtVideoPromoBasic.promo_items.basic.url;

    expect(url).toEqual(imageUrl);
  });

  it("must return null if lead_art or basic doesn't have an image", () => {
    const url = extractImageFromStory(mockLeadArtVideoNoImage);

    expect(url).toBeNull();
  });
});
