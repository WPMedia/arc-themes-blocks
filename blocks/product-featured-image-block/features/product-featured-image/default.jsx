import React from "react";

import { useFusionContext } from "fusion:context";
import { Image } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-featured-image";

function ProductFeaturedImage() {
	const { globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length) {
		return null;
	}

	const rawImage = globalContent.schema.featuredImage.value.assets.find(
		(asset) => asset.type === "image"
	);

	const { url } = rawImage;

	return <Image src={url} className={BLOCK_CLASS_NAME} />;
}

ProductFeaturedImage.label = "Product Featured Image – Arc Block";

ProductFeaturedImage.icon = "picture-landscape";

export default ProductFeaturedImage;
