function discoverPromoType(content) {
	if (!content) {
		return undefined;
	}

	let promoType = "";

	switch (content.type) {
		case "video":
			promoType = "Video";
			break;
		case "gallery":
			promoType = "Gallery";
			break;
		default:
			// eslint-disable-next-line camelcase
			if (content.promo_items?.lead_art?.type) {
				promoType = discoverPromoType(content.promo_items.lead_art);
			} else {
				promoType = "other";
			}
	}

	return promoType;
}

export default discoverPromoType;
