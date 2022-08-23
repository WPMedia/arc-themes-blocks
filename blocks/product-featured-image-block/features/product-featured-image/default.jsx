import React from "react";

import { useFusionContext } from "fusion:context";
import { Image } from "@wpmedia/arc-themes-components";
import { RESIZER_APP_VERSION } from "fusion:environment";

const BLOCK_CLASS_NAME = "b-product-featured-image";

export const ProductFeaturedImageDisplay = ({ data, resizerAppVersion }) => {
	const featuredImageAsset = data.schema?.featuredImage?.value?.assets.find(
		(asset) => asset.type === "image"
	);

	if (!featuredImageAsset) {
		return null;
	}

	const { url, auth, alt_text: altText } = featuredImageAsset;

	// take in app version that's the public key for the auth object in resizer v2
	const targetAuth = auth[resizerAppVersion];

	return (
		<Image
			src={url}
			className={BLOCK_CLASS_NAME}
			resizedOptions={{ auth: targetAuth }}
			alt={altText}
		/>
	);
};

function ProductFeaturedImage() {
	const { globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length) {
		return null;
	}

	return (
		<ProductFeaturedImageDisplay resizerAppVersion={RESIZER_APP_VERSION} data={globalContent} />
	);
}

ProductFeaturedImage.label = "Product Featured Image – Arc Block";

ProductFeaturedImage.icon = "picture-landscape";

export default ProductFeaturedImage;
