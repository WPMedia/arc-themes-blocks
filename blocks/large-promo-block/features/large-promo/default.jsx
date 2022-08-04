import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";
import { useContent, useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";

import { LazyLoad, localizeDateTime } from "@wpmedia/engine-theme-sdk";
import {
	Conditional,
	Grid,
	HeadingSection,
	Icon,
	Image,
	Join,
	Link,
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
	Video,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-large-promo";

export const LargePromoPresentation = (props) => {
	const {
		arcSite,
		aspectRatio,
		content,
		displayDate,
		editableDescription,
		imageOverrideURL,
		playVideoInPlace,
		promoImage,
		registerSuccessEvent,
		searchableField,
		showByline,
		showDate,
		showDescription,
		showHeadline,
		showImage,
		showOverline,
		text,
		url,
		viewportPercentage,
	} = props;

	// using phrases here to emphasize that gallery and video label come from phrases
	const phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");

	// start content flag refactoring
	// derivative data

	const contentAuthors =
		showByline && content?.credits?.by.length > 0
			? formatAuthors(content?.credits?.by, phrases.t("global.and-text"))
			: null;
	const contentDate = showDate ? content?.display_date : null;
	const contentDescription = showDescription ? content?.description?.basic : null;
	const contentHeading = showHeadline ? content?.headlines?.basic : null;
	const contentUrl = content?.websites?.[arcSite]?.website_url;
	const contentOverline = showOverline ? text : null;
	const imageSearchField = imageOverrideURL ? "imageOverrideURL" : "imageURL";
	// end content flag refactoring

	const byText = phrases.t("global.by-text");

	const { type } = content;

	// get the type
	// if image, then show a label. Make that label text to be the translated text from
	// https://github.com/WPMedia/arc-themes-blocks/blob/arc-themes-release-version-1.22/blocks/shared-styles/_children/promo-label/index.jsx#L36
	// show the camera icon

	// if video, then show the video label. Get from the internationalization service
	// show the video icon

	// if neither video nor image, don't show a label nor a icon
	let showImageOrVideoLabel = false;
	let showVideoLabel = false;
	let imageOrVideoLabelText = "";

	if (type === "gallery") {
		showImageOrVideoLabel = true;
		showVideoLabel = false; // redundant
		imageOrVideoLabelText = phrases.t("promo-label.gallery-text");
	}

	if (type === "video") {
		showImageOrVideoLabel = true;
		showVideoLabel = true;
		imageOrVideoLabelText = phrases.t("promo-label.video-text");
	}

	// todo: lead art edgecase
	// look in the promo label and shared styles file https://github.com/WPMedia/arc-themes-blocks/blob/arc-themes-release-version-1.22/blocks/shared-styles/_children/promo-image/discover.js#L17

	// play in place logic
	// if play in place true,
	// then extract embed markup

	const embedMarkup = playVideoInPlace && getVideoFromANS(content);

	return showImage ||
		contentOverline ||
		contentHeading ||
		contentDescription ||
		contentAuthors ||
		contentDate ? (
		<HeadingSection>
			<Grid as="article" className={BLOCK_CLASS_NAME}>
				{showImage ? (
					<MediaItem {...searchableField(imageSearchField)} suppressContentEditableWarning>
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
								<Image
									alt={content?.headlines?.basic || null}
									src={promoImage}
									width={377}
									height={283}
									searchableField
								/>
							)}
							{showImageOrVideoLabel ? (
								<div className={`${BLOCK_CLASS_NAME}__icon_label`}>
									<Icon name={showVideoLabel ? "Play" : "Camera"} />
									<span className={`${BLOCK_CLASS_NAME}__label`}>{imageOrVideoLabelText}</span>
								</div>
							) : null}
						</Conditional>
					</MediaItem>
				) : null}
				{contentOverline ||
				contentHeading ||
				contentDescription ||
				contentAuthors ||
				contentDate ? (
					<Stack className={`${BLOCK_CLASS_NAME}__text`}>
						{contentOverline ? <Overline href={url}>{contentOverline}</Overline> : null}
						{contentHeading || contentDescription || contentAuthors || contentDate ? (
							<Stack>
								{contentHeading ? (
									<Heading>
										<Conditional
											component={Link}
											condition={content?.websites?.[arcSite]?.website_url}
											href={formatURL(content?.websites?.[arcSite]?.website_url)}
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
													{byText}
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
};

const LargePromoItem = ({ customFields, arcSite }) => {
	const {
		aspectRatio,
		imageOrVideoLabelText,
		imageOverrideURL,
		playVideoInPlace,
		showByline,
		showDate,
		showDescription,
		showHeadline,
		showImage,
		showOverline,
		viewportPercentage,
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
								type
								url
								resized_params {
									377x283
									377x251
									377x212
									274x206
									274x183
									274x154
								}
							}
						}
					}
					basic {
						type
						url
						resized_params {
							377x283
							377x251
							377x212
							274x206
							274x183
							274x154
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

	const { editableContent, searchableField } = useEditableContent();
	const { registerSuccessEvent } = useComponentContext();
	const {
		dateLocalization: { language, timeZone, dateTimeFormat } = {
			language: "en",
			timeZone: "GMT",
			dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
		},
		fallbackImage,
	} = getProperties(arcSite);
	const phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");

	// show the override url over the content image if it's present
	// get the image from content if no override
	const promoImage = imageOverrideURL || getImageFromANS(content) || fallbackImage;

	// Start Overline data
	const {
		display: labelDisplay,
		url: labelUrl,
		text: labelText,
	} = (content?.label && content?.label?.basic) || {};
	const shouldUseLabel = !!labelDisplay;

	const { _id: sectionUrl, name: sectionText } =
		content?.websites?.[arcSite]?.website_section || {};

	// Default to websites object data
	let [text, url] = [sectionText, sectionUrl];

	if (content?.owner?.sponsored) {
		text = content?.label?.basic?.text || phrases.t("global.sponsored-content");
		url = null;
	} else if (shouldUseLabel) {
		[text, url] = [labelText, labelUrl];
	}
	// End Overline data

	const displayDate = localizeDateTime(
		new Date(content?.display_date),
		dateTimeFormat,
		language,
		timeZone
	);

	const editableDescription = content?.description
		? editableContent(content, "description.basic")
		: {};

	return (
		<LargePromoPresentation
			arcSite={arcSite}
			aspectRatio={aspectRatio}
			content={content}
			displayDate={displayDate}
			editableDescription={editableDescription}
			imageOrVideoLabelText={imageOrVideoLabelText}
			phrases={phrases}
			playVideoInPlace={playVideoInPlace}
			promoImage={promoImage}
			registerSuccessEvent={registerSuccessEvent}
			searchableField={searchableField}
			showByline={showByline}
			showDate={showDate}
			showDescription={showDescription}
			showHeadline={showHeadline}
			showImage={showImage}
			showOverline={showOverline}
			text={text}
			url={url}
			viewportPercentage={viewportPercentage}
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
			group: "Video Settings",
		}),
	}),
};

LargePromo.label = "Large Promo – Arc Block";

LargePromo.icon = "paragraph-bullets";

export default LargePromo;
