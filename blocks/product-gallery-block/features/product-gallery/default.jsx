import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext, useComponentContext } from "fusion:context";
import { RESIZER_APP_VERSION } from "fusion:environment";
// import getProperties from "fusion:properties";
// import getTranslatedPhrases from "fusion:intl";

import { Carousel, Image } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-gallery";

export function ProductGalleryDisplay(props) {
	const { data, id, label, isFeaturedImageEnabled, resizerAppVersion } = props;
	const carouselItems = data?.schema?.productGallery?.value?.assets
		.filter((asset) => asset.type === "image")
		.slice(0, isFeaturedImageEnabled ? 9 : 8);

	return (
		<Carousel
			className={`${BLOCK_CLASS_NAME}${
				isFeaturedImageEnabled ? ` ${BLOCK_CLASS_NAME}--featured-image-enabled` : ""
			}`}
			key={id}
			id={id}
			label={label}
		>
			{carouselItems?.map((item) => {
				const { url, auth, alt_text: altText, _id: itemId } = item;

				// take in app version that's the public key for the auth object in resizer v2
				const targetAuth = auth[resizerAppVersion];
				return (
					<Carousel.Item
						key={itemId}
						// todo: add a label to the item
						// need to update the item to take in classes
						// className={`${index === 0 ? `${BLOCK_CLASS_NAME}__first-item` : ""}`}
					>
						<Image alt={altText} src={url} resizedOptions={{ auth: targetAuth }} />
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}
function ProductGallery({ customFields }) {
	const { isFeaturedImageEnabled } = customFields;
	const { id } = useComponentContext();

	const { /* arcSite , */ globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length) {
		return null;
	}

	// will get label from phrases
	// const { locale } = getProperties(arcSite);
	// const phrases = getTranslatedPhrases(locale);
	const label = "label";

	return (
		<ProductGalleryDisplay
			data={globalContent}
			id={id}
			isFeaturedImageEnabled={isFeaturedImageEnabled}
			label={label}
			resizerAppVersion={RESIZER_APP_VERSION}
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
