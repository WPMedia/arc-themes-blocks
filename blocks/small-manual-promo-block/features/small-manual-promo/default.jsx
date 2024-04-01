import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import { useContent, useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import {
	getFocalFromANS,
	formatURL,
	Heading,
	HeadingSection,
	Image,
	isServerSide,
	LazyLoad,
	Link,
	MediaItem,
	Grid,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-small-manual-promo";

const PromoImage = ({
	showImage,
	searchableField,
	imageParams,
	linkURL,
	newTab,
	registerSuccessEvent,
	showHeadline
}) => {
	const ImageDisplay = showImage ? (
		<MediaItem
			{...searchableField({
				imageURL: "url",
				imageId: "_id",
				imageAuth: "auth",
				imageFocalPoint: "focal_point"
			})}
			suppressContentEditableWarning
		>
			<Image {...imageParams} />
		</MediaItem>
	) : null;
	return showImage && linkURL ? (
		<Link
			className={`${BLOCK_CLASS_NAME}__img`}
			href={formatURL(linkURL)}
			openInNewTab={newTab}
			onClick={registerSuccessEvent}
			assistiveHidden={showHeadline}
		>
			{ImageDisplay}
		</Link>
	) : (
		ImageDisplay
	);
};

const PromoHeading = ({
	showHeadline,
	headline,
	linkURL,
	newTab,
	registerSuccessEvent
}) =>
	showHeadline && headline ? (
		<Heading>
			{linkURL ? (
				<Link href={formatURL(linkURL)} openInNewTab={newTab} onClick={registerSuccessEvent}>
					{headline}
				</Link>
			) : (
				headline
			)}
		</Heading>
	) : null;

const SmallManualPromo = ({ customFields }) => {
	const {
		headline,
		imagePosition,
		imageAuth,
		imageURL,
		imageId,
		imageFocalPoint,
		imageRatio,
		lazyLoad,
		linkURL,
		newTab,
		showHeadline,
		showImage,
	} = customFields;
	const { registerSuccessEvent } = useComponentContext();
	const { arcSite, isAdmin } = useFusionContext();
	const { searchableField } = useEditableContent();
	const { fallbackImage } = getProperties(arcSite);
	const shouldLazyLoad = lazyLoad && !isAdmin;

	const resizedImage = imageId && imageAuth && imageAuth !== "{}" && imageURL?.includes(imageId);

	let resizedAuth = useContent(
		resizedImage || !imageURL
			? {}
			: {
				source: "signing-service",
				query: { id: imageURL },
			}
	);
	if (imageAuth && !resizedAuth) {
		resizedAuth = JSON.parse(imageAuth);
	}
	if (resizedAuth?.hash && !resizedAuth[RESIZER_TOKEN_VERSION]) {
		resizedAuth[RESIZER_TOKEN_VERSION] = resizedAuth.hash;
	}

	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const ansImage = {
		_id: resizedImage ? imageId : "",
		url: imageURL,
		auth: resizedAuth,
		focal_point: imageFocalPoint ? JSON.parse(imageFocalPoint) : undefined
	}

	const alt = headline || null;
	const imageParams =
		imageURL && resizedAuth
			? {
				ansImage,
				alt,
				aspectRatio: imageRatio,
				resizedOptions: {
					...getFocalFromANS(ansImage)
				},
				responsiveImages: [200, 400, 600, 800, 1200],
				width: 600,
			}
			: {
				src: fallbackImage,
				alt,
			};

	const containerClassNames = [
		BLOCK_CLASS_NAME,
		!showImage || !showHeadline ? null : `${BLOCK_CLASS_NAME}--${imagePosition}`,
	]
		.filter((classString) => classString)
		.join(" ");

	return (
		<LazyLoad enabled={shouldLazyLoad}>
			<HeadingSection>
				<Grid as="article" className={containerClassNames}>
					{["below", "right"].includes(imagePosition) ? (
						<>
							<PromoHeading
								showHeadline={showHeadline}
								headline={headline}
								linkURL={linkURL}
								newTab={newTab}
								registerSuccessEvent={registerSuccessEvent}
							/>
							<PromoImage
								showImage={showImage}
								searchableField={searchableField}
								imageParams={imageParams}
								linkURL={linkURL}
								newTab={newTab}
								registerSuccessEvent={registerSuccessEvent}
								showHeadline={showHeadline}
							/>
						</>
					) : (
						<>
							<PromoImage
								showImage={showImage}
								searchableField={searchableField}
								imageParams={imageParams}
								linkURL={linkURL}
								newTab={newTab}
								registerSuccessEvent={registerSuccessEvent}
								showHeadline={showHeadline}
							/>
							<PromoHeading
								showHeadline={showHeadline}
								headline={headline}
								linkURL={linkURL}
								newTab={newTab}
								registerSuccessEvent={registerSuccessEvent}
							/>
						</>
					)}
				</Grid>
			</HeadingSection>
		</LazyLoad>
	);
};

SmallManualPromo.propTypes = {
	customFields: PropTypes.shape({
		headline: PropTypes.string.tag({
			label: "Headline",
			group: "Configure Content",
		}),
		imageURL: PropTypes.string.tag({
			label: "Image URL",
			group: "Configure Content",
			searchable: "image",
		}),
		imageAuth: PropTypes.string.tag({
			hidden: true,
		}),
		imageId: PropTypes.string.tag({
			hidden: true,
		}),
		imageFocalPoint: PropTypes.string.tag({
			hidden: true,
		}),
		linkURL: PropTypes.string.tag({
			label: "Link URL",
			group: "Configure Content",
		}),
		newTab: PropTypes.bool.tag({
			label: "Open in new tab",
			defaultValue: false,
			group: "Configure Content",
		}),
		showHeadline: PropTypes.bool.tag({
			label: "Show headline",
			defaultValue: true,
			group: "Show promo elements",
		}),
		showImage: PropTypes.bool.tag({
			label: "Show image",
			defaultValue: true,
			group: "Show promo elements",
		}),
		imagePosition: PropTypes.oneOf(["right", "left", "above", "below"]).tag({
			defaultValue: "right",
			label: "Image Position",
			group: "Image",
			labels: {
				right: "Image Right",
				left: "Image Left",
				above: "Image Above",
				below: "Image Below",
			},
		}),
		imageRatio: PropTypes.oneOf(["16:9", "3:2", "4:3"]).tag({
			defaultValue: "3:2",
			label: "Image ratio",
			group: "Art",
		}),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

SmallManualPromo.label = "Small Manual Promo – Arc Block";

SmallManualPromo.icon = "paragraph-bullets";

export default SmallManualPromo;
