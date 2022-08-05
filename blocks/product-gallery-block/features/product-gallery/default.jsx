import React from "react";
import PropTypes from "@arc-fusion/prop-types";

const BLOCK_CLASS_NAME = "b-product-gallery";

function ProductGallery({ customFields }) {
	const { isFeaturedImageEnabled } = customFields;

	return (
		<div
			className={`${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}--featured-image-${
				isFeaturedImageEnabled ? `enabled` : `disabled`
			}`}
		/>
	);
}

ProductGallery.label = "Product Gallery – Arc Block";

// todo: update icon based on Matt Nash discussion
ProductGallery.icon = "shopping-bag-smile";

ProductGallery.propTypes = {
	customFields: PropTypes.shape({
		isFeaturedImageEnabled: PropTypes.boolean.tag({
			name: "Display the product's featured image",
			defaultValue: false,
		}),
	}),
};

export default ProductGallery;
