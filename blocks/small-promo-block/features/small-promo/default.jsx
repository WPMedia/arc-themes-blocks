import React from "react";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import PropTypes from "@arc-fusion/prop-types";
import { useContent, useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import {
	formatURL,
	Heading,
	HeadingSection,
	Image,
	isServerSide,
	LazyLoad,
	Link,
	MediaItem,
	Grid,
	getImageFromANS,
	Conditional,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-small-promo";

const SmallPromo = ({ customFields }) => {
	const {
		imagePosition,
		lazyLoad,
		showHeadline,
		showImage,
		imageOverrideAuth,
		imageOverrideURL,
		imageOverrideId,
		imageRatio,
	} = customFields;
	const { registerSuccessEvent } = useComponentContext();
	const { arcSite, isAdmin } = useFusionContext();
	const { searchableField } = useEditableContent();
	const shouldLazyLoad = lazyLoad && !isAdmin;

	const content =
		useContent({
			source: customFields?.itemContentConfig?.contentService ?? null,
			query: customFields?.itemContentConfig?.contentConfigValues
				? {
						feature: "small-promo",
						...customFields.itemContentConfig.contentConfigValues,
				  }
				: null,
			// does not need embed_html because no video section
			// does not need website section nor label because no overline
			// does not need byline because no byline shown
			filter: `{
		_id
		description {
			basic
		}
		display_date
		type
		headlines {
			basic
		}
		promo_items {
			type
			url
			lead_art {
				embed_html
				type
				promo_items {
					basic {
						_id
						type
						url
						auth {
							${RESIZER_TOKEN_VERSION}
						}
					}
				}
			}
			basic {
				_id
				type
				url
				auth {
					${RESIZER_TOKEN_VERSION}
				}
			}
		}
		websites {
			${arcSite} {
				website_url
			}
		}
	}`,
		}) || null;

	const resizedImage =
		imageOverrideId &&
		imageOverrideAuth &&
		imageOverrideAuth !== "{}" &&
		imageOverrideURL?.includes(imageOverrideId);
	let resizedAuth = useContent(
		resizedImage || !imageOverrideURL
			? {}
			: { source: "signing-service", query: { id: imageOverrideURL } }
	);
	if (imageOverrideAuth && !resizedAuth) {
		resizedAuth = JSON.parse(imageOverrideAuth);
	}
	if (resizedAuth?.hash && !resizedAuth[RESIZER_TOKEN_VERSION]) {
		resizedAuth[RESIZER_TOKEN_VERSION] = resizedAuth.hash;
	}

	if (!customFields?.itemContentConfig) return null;

	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const linkURL = content?.websites?.[arcSite]?.website_url;
	const headline = content?.headlines?.basic;

	const PromoImage = () => {
		const { fallbackImage } = getProperties(arcSite);
		const imageParams =
			imageOverrideURL || (content && getImageFromANS(content))
				? {
						ansImage: imageOverrideURL
							? {
									_id: resizedImage ? imageOverrideId : "",
									url: imageOverrideURL,
									auth: resizedAuth || {},
							  }
							: getImageFromANS(content),
						alt: content?.headlines?.basic || "",
						aspectRatio: imageRatio,
						resizedOptions: {
							smart: true,
						},
						responsiveImages: [200, 400, 600, 800, 1200],
						width: 600,
				  }
				: {
						src: fallbackImage,
				  };

		return showImage ? (
			<Conditional
				component={Link}
				condition={linkURL}
				href={formatURL(linkURL)}
				onClick={registerSuccessEvent}
				assistiveHidden
			>
				<MediaItem
					{...searchableField({
						imageOverrideURL: "url",
						imageOverrideId: "_id",
						imageOverrideAuth: "auth",
					})}
					suppressContentEditableWarning
				>
					<Image {...imageParams} />
				</MediaItem>
			</Conditional>
		) : null;
	};

	const PromoHeading = () =>
		showHeadline && headline ? (
			<Heading>
				<Conditional
					component={Link}
					condition={linkURL}
					href={formatURL(linkURL)}
					onClick={registerSuccessEvent}
				>
					{headline}
				</Conditional>
			</Heading>
		) : null;

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
							<PromoHeading />
							<PromoImage />
						</>
					) : (
						<>
							<PromoImage />
							<PromoHeading />
						</>
					)}
				</Grid>
			</HeadingSection>
		</LazyLoad>
	);
};

SmallPromo.propTypes = {
	customFields: PropTypes.shape({
		itemContentConfig: PropTypes.contentConfig("ans-item").tag({
			group: "Configure Content",
			label: "Display Content Info",
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
		imageOverrideAuth: PropTypes.string.tag({
			group: "Image",
			hidden: true,
		}),
		imageOverrideURL: PropTypes.string.tag({
			label: "Image URL",
			group: "Image",
			searchable: "image",
		}),
		imageOverrideId: PropTypes.string.tag({
			group: "Image",
			hidden: true,
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
		}).isRequired,
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

SmallPromo.label = "Small Promo – Arc Block";

SmallPromo.icon = "paragraph-bullets";

export default SmallPromo;
