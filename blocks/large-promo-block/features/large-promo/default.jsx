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
		showImageOrVideoLabel,
		showOverline,
		showVideoLabel,
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

	const embedMarkup = playVideoInPlace && getVideoFromANS(content);
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
	const bylineNodes = formatAuthors(content?.credits?.by, phrases.t("global.and-text"));

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

	const contentHeading = showHeadline ? content?.headlines?.basic : null;
	const hasAuthors = showByline && content?.credits?.by.length > 0;
	const imageSearchField = imageOverrideURL ? "imageOverrideURL" : "imageURL";

	return showOverline ||
		contentHeading ||
		showImage ||
		showDescription ||
		hasAuthors ||
		showDate ? (
		<HeadingSection>
			<Grid as="article" className={BLOCK_CLASS_NAME}>
				{showImage || editableDescription || contentHeading || hasAuthors || showDate ? (
					<MediaItem {...searchableField(imageSearchField)} suppressContentEditableWarning>
						<Conditional
							component={Link}
							condition={content?.websites?.[arcSite]?.website_url}
							href={formatURL(content?.websites?.[arcSite]?.website_url)}
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
				<Stack className={`${BLOCK_CLASS_NAME}__text`}>
					{showOverline ? <Overline href={url}>{text}</Overline> : null}
					<Stack>
						{showHeadline && content?.headlines?.basic ? (
							<Heading>
								<Conditional
									component={Link}
									condition={content?.websites?.[arcSite]?.website_url}
									href={formatURL(content?.websites?.[arcSite]?.website_url)}
									onClick={registerSuccessEvent}
								>
									{content?.headlines?.basic}
								</Conditional>
							</Heading>
						) : null}
						{showDescription ? (
							<Paragraph suppressContentEditableWarning {...editableDescription}>
								{content?.description?.basic}
							</Paragraph>
						) : null}
						{hasAuthors || showDate ? (
							<Attribution>
								<Join separator={Separator}>
									{hasAuthors ? (
										<Join separator={() => " "}>
											{phrases.t("global.by-text")}
											{bylineNodes}
										</Join>
									) : null}
									{showDate && content?.display_date ? (
										<DateDisplay dateTime={content.display_date} dateString={displayDate} />
									) : null}
								</Join>
							</Attribution>
						) : null}
					</Stack>
				</Stack>
			</Grid>
		</HeadingSection>
	) : null;
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
