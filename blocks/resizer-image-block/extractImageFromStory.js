const extractImageFromPromo = (promoItem) =>
	promoItem?.basic?.type === "image" && promoItem?.basic?.url ? promoItem.basic.url : null;

/**
 * Helper to resolve an image from an story.
 *
 * @param storyObject ANS story
 *
 * @return an string with the image URL or null if not found
 */
const extractImageFromStory = (storyObject) => {
	const { promo_items: promoItems } = storyObject || {};
	if (!promoItems) {
		return null;
	}

	const promoImage = extractImageFromPromo(promoItems);
	if (promoImage) {
		return promoImage;
	}

	if (promoItems.lead_art) {
		const leadArtPromoImage = extractImageFromPromo(promoItems.lead_art.promo_items);
		if (leadArtPromoImage) {
			return leadArtPromoImage;
		}
	}

	return null;
};

export default extractImageFromStory;
