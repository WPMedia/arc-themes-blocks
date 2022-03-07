const normalizeFocalValues = (focalPoint) => ({
	x: parseInt(focalPoint.x, 10),
	y: parseInt(focalPoint.y, 10),
});

/*
 * Helper function to extract focal point from a promo item
 *
 * the response is normalized to:
 *
 *   {
 *     x: 11,
 *     y: 22,
 *   }
 */
export const focalPointFromPromo = (promoItem) => {
	if (!promoItem) {
		return undefined;
	}

	switch (promoItem.type) {
		case "image": {
			// focal point can be ovewritten on Composer under the Feature Media tab
			// here focal point is returned as:  { min: [11,22], max: [11,22] }
			// and some times can be a float value, need to normalize it
			// eslint-disable-next-line camelcase
			let focal = promoItem.additional_properties?.focal_point;
			if (focal) {
				return normalizeFocalValues({ x: focal.min[0], y: focal.min[1] });
			}

			// here focal point is returned as: { x: 11, y: 22 }
			// eslint-disable-next-line camelcase
			focal = promoItem.focal_point;
			if (focal) {
				return normalizeFocalValues(focal);
			}
			return undefined;
		}
		case "gallery": {
			// eslint-disable-next-line camelcase
			return focalPointFromPromo(promoItem?.promo_items?.basic);
		}
		default:
			return undefined;
	}
};

/*
 * Helper function to extract the focal point from a content
 * the response is normalized to:
 *
 *   {
 *     x: 11,
 *     y: 22,
 *   }
 *
 * Reference
 *  ALC: https://redirector.arcpublishing.com/alc/arc-products/photocenter/user-docs/photo-center-everything-about-focal-point-image-gallery-and-composer/
 */
export const focalPointFromContent = (content) => {
	const { promo_items: promoItems } = content || {};
	if (!promoItems) {
		return undefined;
	}

	if (promoItems.lead_art) {
		return focalPointFromPromo(promoItems.lead_art);
	}

	if (promoItems.basic) {
		return focalPointFromPromo(promoItems.basic);
	}

	return undefined;
};
