import React from "react";

import { useContent, useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import getProperties from "fusion:properties";
import PropTypes from "@arc-fusion/prop-types";
import {
	Attribution,
	Conditional,
	Date as DateComponent,
	formatAuthors,
	formatURL,
	getImageFromANS,
	getPromoType,
	Heading,
	HeadingSection,
	Icon,
	Image,
	isServerSide,
	Join,
	LazyLoad,
	Link,
	localizeDateTime,
	MediaItem,
	Paragraph,
	Separator,
	usePhrases,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-medium-promo";

const MediumPromo = ({ customFields }) => {
	const { registerSuccessEvent } = useComponentContext();
	const { arcSite, isAdmin } = useFusionContext();
	const { searchableField } = useEditableContent();
	const {
		dateLocalization: { language, timeZone, dateTimeFormat } = {
			language: "en",
			timeZone: "GMT",
			dateTimeFormat: "%B %d, %Y at %l:%M%p %Z",
		},
		fallbackImage,
	} = getProperties(arcSite);
	const phrases = usePhrases();

	const {
		imageRatio,
		imageOverrideAuth,
		imageOverrideURL,
		imageOverrideId,
		lazyLoad,
		showByline,
		showDate,
		showDescription,
		showHeadline,
		showImage,
	} = customFields;

	const content =
		useContent({
			source: customFields?.itemContentConfig?.contentService ?? null,
			query: customFields?.itemContentConfig?.contentConfigValues
				? {
						feature: "medium-promo",
						...customFields?.itemContentConfig?.contentConfigValues,
				  }
				: null,
			// does not need embed_html because no video section
			// does not need website section nor label because no overline
			filter: `{
			_id
			credits {
				by {
					_id
					name
					url
					type
					additional_properties {
						original {
							byline
						}
					}
				}
			}
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
					_id
					auth {
						${RESIZER_TOKEN_VERSION}
					}
					type
					promo_items {
						basic {
							_id
							auth {
								${RESIZER_TOKEN_VERSION}
							}
							type
							url
						}
					}
				}
				basic {
					_id
					auth {
						${RESIZER_TOKEN_VERSION}
					}
					type
					url
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

	const shouldLazyLoad = lazyLoad && !isAdmin;
	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const hasAuthors = showByline ? content?.credits?.by && content?.credits?.by.length : null;
	const contentDescription = showDescription ? content?.description?.basic : null;
	const contentHeading = showHeadline ? content?.headlines?.basic : null;
	const contentUrl = content?.websites?.[arcSite]?.website_url;

	const contentDate = content?.display_date;
	const formattedDate = Date.parse(contentDate)
		? localizeDateTime(new Date(contentDate), dateTimeFormat, language, timeZone)
		: "";

	const promoType = getPromoType(content);
	const labelIconName = {
		gallery: "Camera",
		video: "Play",
	}[promoType];

	const labelIconText = {
		gallery: phrases.t("global.gallery-text"),
		video: phrases.t("global.video-text"),
	}[promoType];

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

	return showHeadline || showImage || showDescription || showByline || showDate ? (
		<LazyLoad enabled={shouldLazyLoad}>
			<HeadingSection>
				<article
					className={`${BLOCK_CLASS_NAME}${showImage ? ` ${BLOCK_CLASS_NAME}--show-image` : ""}`}
				>
					{showImage ? (
						<MediaItem
							{...searchableField({
								imageOverrideURL: "url",
								imageOverrideId: "_id",
								imageOverrideAuth: "auth",
							})}
							suppressContentEditableWarning
						>
							<Conditional
								component={Link}
								condition={contentUrl}
								href={formatURL(contentUrl)}
								onClick={registerSuccessEvent}
								assistiveHidden
							>
								<Image alt={content?.headlines?.basic} {...imageParams} />
								{labelIconName ? (
									<div className={`${BLOCK_CLASS_NAME}__icon_label`}>
										<Icon name={labelIconName} />
										<span className={`${BLOCK_CLASS_NAME}__label`}>{labelIconText}</span>
									</div>
								) : null}
							</Conditional>
						</MediaItem>
					) : null}

					{contentHeading ? (
						<Heading>
							<Conditional
								component={Link}
								condition={contentUrl}
								href={formatURL(contentUrl)}
								onClick={registerSuccessEvent}
							>
								{contentHeading}
							</Conditional>
						</Heading>
					) : null}

					{showDescription ? <Paragraph>{contentDescription}</Paragraph> : null}
					{hasAuthors || showDate ? (
						<Attribution>
							<Join separator={Separator}>
								{hasAuthors ? (
									<Join separator={() => " "}>
										{phrases.t("global.by-text")}
										{formatAuthors(content?.credits?.by, phrases.t("global.and-text"))}
									</Join>
								) : null}
								{showDate ? (
									<DateComponent dateTime={contentDate} dateString={formattedDate} />
								) : null}
							</Join>
						</Attribution>
					) : null}
				</article>
			</HeadingSection>
		</LazyLoad>
	) : null;
};

MediumPromo.propTypes = {
	customFields: PropTypes.shape({
		itemContentConfig: PropTypes.contentConfig("ans-item").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		showHeadline: PropTypes.bool.tag({
			defaultValue: true,
			label: "Show headline",
			group: "Show promo elements",
		}),
		showImage: PropTypes.bool.tag({
			defaultValue: true,
			label: "Show image",
			group: "Show promo elements",
		}),
		showDescription: PropTypes.bool.tag({
			label: "Show description",
			defaultValue: true,
			group: "Show promo elements",
		}),
		showByline: PropTypes.bool.tag({
			defaultValue: true,
			label: "Show byline",
			group: "Show promo elements",
		}),
		showDate: PropTypes.bool.tag({
			defaultValue: true,
			label: "Show date",
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
		imageRatio: PropTypes.oneOf(["16:9", "3:2", "4:3"]).tag({
			defaultValue: "16:9",
			label: "Image ratio",
			group: "Art",
		}),
		lazyLoad: PropTypes.bool.tag({
			defaultValue: false,
			name: "Lazy Load block?",
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

MediumPromo.label = "Medium Promo – Arc Block";
MediumPromo.icon = "paragraph-bullets";

export default MediumPromo;
