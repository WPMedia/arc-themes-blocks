import React from "react";

import { useFusionContext } from "fusion:context";
import { Image } from "@wpmedia/arc-themes-components";
import { RESIZER_APP_VERSION } from "fusion:environment";

const BLOCK_CLASS_NAME = "b-product-featured-image";

function ProductFeaturedImage() {
	const { globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length) {
		return null;
	}

	const featuredImageAsset = globalContent.schema.featuredImage.value.assets.find(
		(asset) => asset.type === "image"
	);

	const { url, auth } = featuredImageAsset;

	// take in app version that's the public key for the auth object in resizer v2
	const targetAuth = auth[RESIZER_APP_VERSION];

	return <Image src={url} className={BLOCK_CLASS_NAME} resizedOptions={{ auth: targetAuth }} />;
}

ProductFeaturedImage.label = "Product Featured Image – Arc Block";

ProductFeaturedImage.icon = "picture-landscape";

export default ProductFeaturedImage;
