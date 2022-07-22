import React from "react";
import PropTypes from "@arc-fusion/prop-types";

import { useFusionContext } from "fusion:context";
import { Image } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-featured-image";

function ProductFeaturedImage() {
	const { globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length) {
		return null;
	}

	return <Image src="" className={BLOCK_CLASS_NAME} />;
}

ProductFeaturedImage.label = "Product Featured Image – Arc Block";

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
ProductFeaturedImage.icon = "shopping-bag-smile";

ProductFeaturedImage.propTypes = {
	customFields: PropTypes.shape({
		showHeading: PropTypes.boolean.tag({
			name: "Show Heading?",
			defaultValue: false,
		}),
	}),
};

export default ProductFeaturedImage;
