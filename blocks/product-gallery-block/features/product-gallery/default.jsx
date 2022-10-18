import React, { useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext, useComponentContext } from "fusion:context";
import { RESIZER_APP_VERSION, RESIZER_URL } from "fusion:environment";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import { Carousel, Image, imageANSToImageSrc } from "@wpmedia/arc-themes-components";

import ProductFocusView from "./_children/ProductFocusView";

const BLOCK_CLASS_NAME = "b-product-gallery";
const DESKTOP_MINIMUM = 768;

export function ProductGalleryDisplay({
	arcSite,
	carouselItems,
	id,
	isFeaturedImageEnabled,
	resizerAppVersion,
	resizerURL,
	indicatorType,
}) {
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const [focusViewItemId, setFocusViewItemId] = useState("");

	const shortenedCarouselItems = carouselItems.slice(0, isFeaturedImageEnabled ? 9 : 8);

	const thumbnailsArray = shortenedCarouselItems.map((item) => {
		const { auth, _id: itemId } = item;
		const targetAuth = auth[resizerAppVersion];
		return (
			<Image
				// used as part of a page design so empty string alt text
				alt=""
				className={`${BLOCK_CLASS_NAME}__thumbnail`}
				height={40}
				key={itemId}
				resizedOptions={{ auth: targetAuth }}
				resizerURL={resizerURL}
				responsiveImages={[40, 80, 120]}
				src={imageANSToImageSrc(item)}
				width={40}
			/>
		);
	});

	return (
		<>
			<Carousel
				className={BLOCK_CLASS_NAME}
				goToSlidePhrase={
					/* istanbul ignore next */ (slideNumber) =>
						phrases.t("product-gallery.go-to-slide", { slideNumber })
				}
				id={id}
				indicators={indicatorType}
				key={id}
				label={phrases.t("product-gallery.aria-label")}
				thumbnails={thumbnailsArray}
			>
				{shortenedCarouselItems?.map((item, carouselIndex) => {
					const { _id: itemId, auth, alt_text: altText } = item;

					// is this a featured image?
					const isFeaturedImage = isFeaturedImageEnabled && carouselIndex === 0;

					// take in app version that's the public key for the auth object in resizer v2
					const targetAuth = auth[resizerAppVersion];
					return (
						<Carousel.Item
							key={item.testId || itemId}
							className={isFeaturedImage ? `${BLOCK_CLASS_NAME}__featured-slide` : ""}
							label={`${phrases.t("product-gallery.slide-indicator", {
								current: carouselIndex + 1,
								maximum: carouselItems.length,
							})}`}
						>
							<Image
								alt={altText}
								onClick={() => setFocusViewItemId(item.testId || itemId)}
								src={imageANSToImageSrc(item)}
								resizedOptions={{ auth: targetAuth }}
								width={375}
								height={375}
								responsiveImages={[150, 375, 500, 1500, 2000]}
								resizerURL={resizerURL}
								sizes={[
									{
										// featured image should take up full width of the screen on mobile and desktop
										isDefault: true,
										sourceSizeValue: "100vw",
									},
									...(isFeaturedImage
										? []
										: [
												{
													sourceSizeValue: "50vw",
													mediaCondition: "(min-width: 48rem)",
												},
										  ]),
								]}
							/>
						</Carousel.Item>
					);
				})}
			</Carousel>
			{focusViewItemId !== "" && window?.innerWidth >= DESKTOP_MINIMUM ? (
				<ProductFocusView
					onClose={() => setFocusViewItemId("")}
					productImages={shortenedCarouselItems}
					resizerAppVersion={resizerAppVersion}
					resizerURL={resizerURL}
					initialItemId={focusViewItemId}
				/>
			) : null}
		</>
	);
}
function ProductGallery({ customFields }) {
	const { isFeaturedImageEnabled, indicatorType } = customFields;
	const { id } = useComponentContext();

	const { arcSite, globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length) {
		return null;
	}

	const carouselItems = globalContent?.schema?.productGallery?.value
		? globalContent?.schema?.productGallery?.value.filter((asset) => asset.type === "image")
		: [];

	if (isFeaturedImageEnabled && carouselItems.length) {
		carouselItems.unshift(...globalContent?.schema?.featuredImage?.value);
	}

	if (carouselItems.length === 0) {
		return null;
	}

	return (
		<ProductGalleryDisplay
			arcSite={arcSite}
			carouselItems={carouselItems}
			id={id}
			isFeaturedImageEnabled={isFeaturedImageEnabled}
			resizerAppVersion={RESIZER_APP_VERSION}
			resizerURL={RESIZER_URL}
			indicatorType={indicatorType}
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
		indicatorType: PropTypes.oneOf(["dots", "thumbnails", "none"]).tag({
			label: "Indicator Type",
			defaultValue: "thumbnails",
			group: "Mobile Layout Options",
			description:
				"The type of indicator to use only on mobile screens to show which slide is featured in the carousel. The indicators can also be used for navigating between slides.",
			labels: {
				dots: "Carousel Indicators",
				thumbnails: "Thumbnails",
				none: "None",
			},
		}),
	}),
};

export default ProductGallery;
