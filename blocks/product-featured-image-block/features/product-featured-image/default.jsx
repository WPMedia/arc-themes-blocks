import React from "react";
import { useFusionContext } from "fusion:context";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import getProperties from "fusion:properties";
import { getFocalFromANS, Image } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-featured-image";

export const ProductFeaturedImageDisplay = ({ featuredImage, resizerURL }) => {
	const { alt_text: altText } = featuredImage;
	return (
		<Image
			alt={altText}
			ansImage={featuredImage}
			className={BLOCK_CLASS_NAME}
			height={768}
			resizedOptions={{ ...getFocalFromANS(featuredImage) }}
			resizerURL={resizerURL}
			responsiveImages={[320, 768]}
			width={768}
		/>
	);
};

function ProductFeaturedImage() {
	const { arcSite, globalContent = {} } = useFusionContext();
	const { resizerURL } = getProperties(arcSite);
	const featuredImage = globalContent?.schema?.featuredImage?.value.find(
		({ type }) => type === "image"
	);
	return featuredImage ? (
		<ProductFeaturedImageDisplay
			featuredImage={featuredImage}
			resizerAppVersion={RESIZER_TOKEN_VERSION}
			resizerURL={resizerURL}
		/>
	) : null;
}

ProductFeaturedImage.label = "Product Featured Image – Arc Block";

ProductFeaturedImage.icon = "picture-landscape";

export default ProductFeaturedImage;
