import React from "react";

import { useContent, useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";
import PropTypes from "@arc-fusion/prop-types";
import { LazyLoad, localizeDateTime } from "@wpmedia/engine-theme-sdk";
import {
	Attribution,
	Conditional,
	Date as DateComponent,
	formatAuthors,
	formatURL,
	getImageFromANS,
	Heading,
	HeadingSection,
	Image,
	isServerSide,
	Join,
	Link,
	MediaItem,
	Paragraph,
	Separator,
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
			dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
		},
		fallbackImage,
		locale,
	} = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale || "en");

	const {
		imageRatio,
		imageOverrideURL,
		lazyLoad,
		showByline,
		showDate,
		showDescription,
		showHeadline,
		showImage,
	} = customFields;

	const shouldLazyLoad = lazyLoad && !isAdmin;

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
          type
          promo_items {
            basic {
              type
              url
              resized_params {
                400x300
                400x267
                400x225
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
            400x300
            400x267
            400x225
            274x206
            274x183
            274x154
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

	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const hasAuthors = showByline ? content?.credits?.by : null;
	const contentDescription = showDescription ? content?.description?.basic : null;
	const contentHeading = showHeadline ? content?.headlines?.basic : null;
	const contentUrl = content?.websites?.[arcSite]?.website_url;
	const imageSearchField = imageOverrideURL ? "imageOverrideURL" : "imageURL";
	const promoImageURL = imageOverrideURL || getImageFromANS(content);
	const contentDate = content?.display_date;
	const formattedDate = Date.parse(contentDate)
		? localizeDateTime(new Date(contentDate), dateTimeFormat, language, timeZone)
		: "";

	const MediaImage = () =>
		showImage ? (
			<Conditional component={Link} condition={contentUrl} href={contentUrl}>
				<Image
					alt={content?.headlines?.basic}
					src={promoImageURL || fallbackImage}
					searchableField
					data-aspect-ratio={imageRatio?.replace(":", "/")}
				/>
			</Conditional>
		) : null;

	return showHeadline || showImage || showImage || showDescription || showByline || showDate ? (
		<LazyLoad enabled={shouldLazyLoad}>
			<HeadingSection>
				<article
					className={`${BLOCK_CLASS_NAME}${
						promoImageURL ? ` ${BLOCK_CLASS_NAME}--show-image` : ""
					}`}
				>
					{promoImageURL ? (
						<MediaItem {...searchableField(imageSearchField)} suppressContentEditableWarning>
							<Conditional
								component={Link}
								condition={contentUrl}
								href={formatURL(contentUrl)}
								onClick={registerSuccessEvent}
							>
								<MediaImage />
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

					{contentDescription && showDescription ? (
						<Paragraph>{contentDescription}</Paragraph>
					) : null}
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
		imageOverrideURL: PropTypes.string.tag({
			label: "Image URL",
			group: "Image",
			searchable: "image",
		}),
		imageRatio: PropTypes.oneOf(["16:9", "3:2", "4:3"]).tag({
			defaultValue: "3:2",
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
