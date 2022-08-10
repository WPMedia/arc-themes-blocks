import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext, useComponentContext } from "fusion:context";
import { RESIZER_APP_VERSION, RESIZER_URL } from "fusion:environment";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import { Carousel, Icon, Image } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-gallery";

export function ProductGalleryDisplay({ arcSite, data, id, isFeaturedImageEnabled, resizerAppVersion, resizerURL }) {

	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);
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
			label={phrases.t("product-gallery.aria-label")}
			nextButton={
				<Carousel.Button id={id} label={phrases.t("product-gallery.right-arrow-label")}>
					<Icon name="ChevronRight" />
				</Carousel.Button>
			}
			previousButton={
				<Carousel.Button id={id} label={phrases.t("product-gallery.left-arrow-label")}>
					<Icon name="ChevronLeft" />
				</Carousel.Button>
			}
		>
			{carouselItems?.map((item, carouselIndex) => {
				const { url, auth, alt_text: altText, _id: itemId } = item;

				// is this a featured image?
				const isFeaturedImage = isFeaturedImageEnabled && carouselIndex === 0;

				// take in app version that's the public key for the auth object in resizer v2
				const targetAuth = auth[resizerAppVersion];
				return (
					<Carousel.Item
						key={itemId}
						label={`${phrases.t("product-gallery.slide-indicator", {
							current: carouselIndex + 1,
							maximum: carouselItems.length,
						})}`}
					>
						<Image
							alt={altText}
							src={url}
							resizedOptions={{ auth: targetAuth }}
							width={372}
							height={279}
							responsiveImages={[150, 372, 500, 1500, 2000]}
							resizerURL={resizerURL}
							sizes={[
								{
									isDefault: true,
									sourceSizeValue: "100vw",
								},
								{
									sourceSizeValue: isFeaturedImage ? "50vw" : "25vw",
									mediaCondition: "(min-width: 48rem)",
								},
							]}
						/>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}
function ProductGallery({ customFields }) {
	const { isFeaturedImageEnabled } = customFields;
	const { id } = useComponentContext();

	const { arcSite, globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length) {
		return null;
	}

	return (
		<ProductGalleryDisplay
			arcSite={arcSite}
			data={globalContent}
			id={id}
			isFeaturedImageEnabled={isFeaturedImageEnabled}
			resizerAppVersion={RESIZER_APP_VERSION}
			resizerURL={RESIZER_URL}
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
