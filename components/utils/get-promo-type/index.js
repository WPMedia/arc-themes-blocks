function getPromoType(content) {
	if (!content) {
		return undefined;
	}

	let promoType = "";

	switch (content.type) {
		case "video":
			promoType = "video";
			break;
		case "gallery":
			promoType = "gallery";
			break;
		case "image":
			promoType = "image";
			break;
		default:
			if (content.promo_items?.lead_art?.type) {
				promoType = getPromoType(content.promo_items.lead_art);
			} else {
				promoType = "other";
			}
	}

	return promoType;
}

export default getPromoType;
