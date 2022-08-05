import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import { Carousel } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-gallery";

function ProductGallery({ customFields }) {
	const { isFeaturedImageEnabled } = customFields;

	const { globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length) {
		return null;
	}

	return (
		<Carousel
			className={`${BLOCK_CLASS_NAME}${
				isFeaturedImageEnabled ? ` ${BLOCK_CLASS_NAME}--featured-image-enabled` : ""
			}`}
		/>
	);
}

ProductGallery.label = "Product Gallery – Arc Block";

ProductGallery.icon = "picture-polaroid-four";

ProductGallery.propTypes = {
	customFields: PropTypes.shape({
		isFeaturedImageEnabled: PropTypes.boolean.tag({
			name: "Display the product's featured image",
			defaultValue: false,
		}),
	}),
};

export default ProductGallery;
