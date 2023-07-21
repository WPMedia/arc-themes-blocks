import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import getProperties from "fusion:properties";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import { useContent, useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";

import {
	Conditional,
	Grid,
	HeadingSection,
	Icon,
	Image,
	Join,
	LazyLoad,
	Link,
	localizeDateTime,
	MediaItem,
	Stack,
	formatURL,
	getImageFromANS,
	getVideoFromANS,
	isServerSide,
	Overline,
	Heading,
	Paragraph,
	Date as DateDisplay,
	formatAuthors,
	Attribution,
	Separator,
	usePhrases,
	Video,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-large-promo";

const getType = (type, content) => (content?.type === type ? content : undefined);

export const LargePromoPresentation = ({
	aspectRatio,
	contentAuthors,
	contentDate,
	contentDescription,
	contentHeading,
	contentOverline,
	contentOverlineURL,
	contentUrl,
	displayDate,
	editableDescription,
	embedMarkup,
	labelIconName,
	labelIconText,
	promoImageParams,
	registerSuccessEvent,
	searchableField,
	translationByText,
	viewportPercentage,
}) =>
	embedMarkup ||
	contentOverline ||
	contentHeading ||
	contentDescription ||
	contentAuthors ||
	contentDate ||
	promoImageParams ? (
		<HeadingSection>
			<Grid as="article" className={BLOCK_CLASS_NAME}>
				{embedMarkup || promoImageParams ? (
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
							{embedMarkup ? (
								<Video
									aspectRatio={aspectRatio}
									embedMarkup={embedMarkup}
									viewportPercentage={viewportPercentage}
								/>
							) : (
								<>
									<Image {...promoImageParams} />
									{labelIconName ? (
										<div className={`${BLOCK_CLASS_NAME}__icon_label`}>
											<Icon name={labelIconName} />
											<span className={`${BLOCK_CLASS_NAME}__label`}>{labelIconText}</span>
										</div>
									) : null}
								</>
							)}
						</Conditional>
					</MediaItem>
				) : null}
				{contentOverline ||
				contentHeading ||
				contentDescription ||
				contentAuthors ||
				contentDate ? (
					<Stack className={`${BLOCK_CLASS_NAME}__text`}>
						{contentOverline ? (
							<Overline href={contentOverlineURL}>{contentOverline}</Overline>
						) : null}
						{contentHeading || contentDescription || contentAuthors || contentDate ? (
							<Stack>
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
								{contentDescription ? (
									<Paragraph suppressContentEditableWarning {...editableDescription}>
										{contentDescription}
									</Paragraph>
								) : null}
								{contentAuthors || contentDate ? (
									<Attribution>
										<Join separator={Separator}>
											{contentAuthors ? (
												<Join separator={() => " "}>
													{translationByText}
													{contentAuthors}
												</Join>
											) : null}
											{contentDate ? (
												<DateDisplay dateTime={contentDate} dateString={displayDate} />
											) : null}
										</Join>
									</Attribution>
								) : null}
							</Stack>
						) : null}
					</Stack>
				) : null}
			</Grid>
		</HeadingSection>
	) : null;

const LargePromoItem = ({ customFields, arcSite }) => {
	const {
		imageOverrideURL,
		imageOverrideId,
		imageRatio,
		playVideoInPlace,
		showByline,
		showDate,
		showDescription,
		showHeadline,
		showImage,
		showOverline,
		viewportPercentage,
		imageOverrideAuth,
	} = customFields;

	const content =
		useContent({
			source: customFields?.itemContentConfig?.contentService ?? null,
			query: customFields?.itemContentConfig?.contentConfigValues
				? {
						"arc-site": arcSite,
						feature: "large-promo",
						...customFields?.itemContentConfig?.contentConfigValues,
				  }
				: null,
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
				label {
					basic {
						display
						url
						text
					}
				}
				owner {
					sponsored
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
				embed_html
				website_url
				websites {
					${arcSite} {
						website_url
						website_section {
							_id
							name
						}
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

	const { editableContent, searchableField } = useEditableContent();
	const { registerSuccessEvent } = useComponentContext();
	const {
		dateLocalization: { language, timeZone, dateTimeFormat } = {
			language: "en",
			timeZone: "GMT",
			dateTimeFormat: "%B %d, %Y at %l:%M%p %Z",
		},
		fallbackImage,
	} = getProperties(arcSite);

	const displayDate = localizeDateTime(
		new Date(content?.display_date),
		dateTimeFormat,
		language,
		timeZone
	);
	const phrases = usePhrases();

	const editableDescription = content?.description
		? editableContent(content, "description.basic")
		: {};

	const videoOrGalleryContent =
		getType("video", content) ||
		getType("gallery", content) ||
		getType("video", content?.promo_items?.lead_art) ||
		getType("gallery", content?.promo_items?.lead_art);

	const labelIconName = {
		gallery: "Camera",
		video: "Play",
	}[videoOrGalleryContent?.type];

	const labelIconText = {
		gallery: phrases.t("global.gallery-text"),
		video: phrases.t("global.video-text"),
	}[videoOrGalleryContent?.type];

	const {
		display: labelDisplay,
		url: labelUrl,
		text: labelText,
	} = (content?.label && content?.label?.basic) || {};

	const { _id: sectionUrl, name: sectionText } =
		content?.websites?.[arcSite]?.website_section || {};

	let [overlineText, overlineURL] = [sectionText, sectionUrl];
	if (content?.owner?.sponsored) {
		overlineText = content?.label?.basic?.text || phrases.t("global.sponsored-content");
		overlineURL = null;
	} else if (labelDisplay) {
		[overlineText, overlineURL] = [labelText, labelUrl];
	}

	const contentAuthors =
		showByline && content?.credits?.by?.length > 0
			? formatAuthors(content.credits.by, phrases.t("global.and-text"))
			: null;
	const contentDate = showDate ? content?.display_date : null;
	const contentDescription = showDescription ? content?.description?.basic : null;
	const contentHeading = showHeadline ? content?.headlines?.basic : null;
	const contentHeadline = content?.headlines?.basic || null;
	const contentOverline = showOverline ? overlineText : null;
	const contentUrl = content?.websites?.[arcSite]?.website_url;
	const embedMarkup = playVideoInPlace && getVideoFromANS(content);
	const promoImageParams =
		showImage &&
		(imageOverrideURL || (content && getImageFromANS(content))
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
					responsiveImages: [400, 600, 800, 1200],
					width: 377,
			  }
			: {
					src: fallbackImage,
			  });
	return (
		<LargePromoPresentation
			aspectRatio={imageRatio}
			contentAuthors={contentAuthors}
			contentDate={contentDate}
			contentDescription={contentDescription}
			contentHeading={contentHeading}
			contentHeadline={contentHeadline}
			contentOverline={contentOverline}
			contentOverlineURL={overlineURL}
			contentUrl={contentUrl}
			displayDate={displayDate}
			editableDescription={editableDescription}
			embedMarkup={embedMarkup}
			labelIconName={labelIconName}
			labelIconText={labelIconText}
			promoImageParams={promoImageParams}
			registerSuccessEvent={registerSuccessEvent}
			searchableField={searchableField}
			translationByText={phrases.t("global.by-text")}
			viewportPercentage={viewportPercentage}
			playVideoInPlace={playVideoInPlace}
		/>
	);
};

const LargePromo = ({ customFields }) => {
	const { isAdmin, arcSite } = useFusionContext();
	const shouldLazyLoad = customFields?.lazyLoad && !isAdmin;
	if (shouldLazyLoad && isServerSide()) {
		return null;
	}
	return (
		<LazyLoad enabled={shouldLazyLoad}>
			<LargePromoItem customFields={customFields} arcSite={arcSite} />
		</LazyLoad>
	);
};

LargePromo.propTypes = {
	customFields: PropTypes.shape({
		itemContentConfig: PropTypes.contentConfig("ans-item").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		showOverline: PropTypes.bool.tag({
			label: "Show overline",
			defaultValue: true,
			group: "Show promo elements",
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
		showDescription: PropTypes.bool.tag({
			label: "Show description",
			defaultValue: true,
			group: "Show promo elements",
		}),
		showByline: PropTypes.bool.tag({
			label: "Show byline",
			defaultValue: true,
			group: "Show promo elements",
		}),
		showDate: PropTypes.bool.tag({
			label: "Show date",
			defaultValue: true,
			group: "Show promo elements",
		}),
		imageOverrideURL: PropTypes.string.tag({
			label: "Image URL",
			group: "Image",
			searchable: "image",
		}),
		imageRatio: PropTypes.oneOf(["16:9", "3:2", "4:3"]).tag({
			defaultValue: "4:3",
			label: "Image ratio",
			group: "Art",
		}),
		playVideoInPlace: PropTypes.bool.tag({
			label: "Play video in place",
			group: "Art",
			defaultValue: false,
		}),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
		viewportPercentage: PropTypes.number.tag({
			name: "Percentage of viewport height",
			description:
				"With Shrink Video enabled, this determines how much vertical viewport real estate the video will occupy.",
			min: 0,
			max: 150,
			defaultValue: 65,
			hidden: true,
			group: "Art",
		}),
	}),
};

LargePromo.label = "Large Promo – Arc Block";

LargePromo.icon = "paragraph-bullets";

export default LargePromo;
