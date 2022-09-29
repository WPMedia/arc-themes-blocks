import React from "react";

import { useFusionContext } from "fusion:context";
import { imageANSToImageSrc, Image } from "@wpmedia/arc-themes-components";
import { RESIZER_APP_VERSION, RESIZER_URL } from "fusion:environment";

const BLOCK_CLASS_NAME = "b-product-featured-image";

export const ProductFeaturedImageDisplay = ({ featuredImage, resizerAppVersion, resizerURL }) => {
	const { auth = {}, alt_text: altText } = featuredImage;
	return (
		<Image
			alt={altText}
			className={BLOCK_CLASS_NAME}
			height={768}
			resizedOptions={{ auth: auth[resizerAppVersion] }}
			resizerURL={resizerURL}
			responsiveImages={[320, 768]}
			src={imageANSToImageSrc(featuredImage)}
			width={768}
		/>
	);
};

function ProductFeaturedImage() {
	const { globalContent = {} } = useFusionContext();
	const featuredImage = globalContent?.schema?.featuredImage?.value?.assets.find(
		({ type }) => type === "image"
	);
	return featuredImage ? (
		<ProductFeaturedImageDisplay
			featuredImage={featuredImage}
			resizerAppVersion={RESIZER_APP_VERSION}
			resizerURL={RESIZER_URL}
		/>
	) : null;
}

ProductFeaturedImage.label = "Product Featured Image – Arc Block";

ProductFeaturedImage.icon = "picture-landscape";

export default ProductFeaturedImage;
