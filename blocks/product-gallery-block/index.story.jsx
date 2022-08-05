import React from "react";
import ProductGallery from "./features/product-gallery/default";

export default {
	title: "Blocks/Product Gallery",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

const CUSTOM_FIELDS_DEFAULTS = {
	isFeaturedImageEnabled: false,
};

// featured image is disabled via custom field
// default behavior
export const featuredImageDisabled = () => <ProductGallery customFields={CUSTOM_FIELDS_DEFAULTS} />;

// featured image enabled
export const featuredImageEnabled = () => (
	<ProductGallery customFields={{ ...CUSTOM_FIELDS_DEFAULTS, isFeaturedImageEnabled: true }} />
);
