import React from "react";

import { useContent, useEditableContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";

import PropTypes from "@arc-fusion/prop-types";
import {
	Attribution,
	Conditional,
	Date as DateComponent,
	formatAuthors,
	getImageFromANS,
	getVideoFromANS,
	Heading,
	HeadingSection,
	Image,
	Join,
	isServerSide,
	Link,
	MediaItem,
	Overline,
	Paragraph,
	Separator,
	Stack,
	Video,
} from "@wpmedia/arc-themes-components";

import { LazyLoad, localizeDateTime } from "@wpmedia/engine-theme-sdk";

const BLOCK_CLASS_NAME = "b-xl-promo";

const ExtraLargePromo = ({ customFields }) => {
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
		imageOverrideURL,
		imageRatio,
		itemContentConfig,
		lazyLoad,
		playVideoInPlace,
		showByline,
		showDate,
		showDescription,
		showHeadline,
		showImage,
		showOverline,
	} = customFields;

	const content =
		useContent({
			source: itemContentConfig?.contentService ?? null,
			query: itemContentConfig?.contentConfigValues
				? {
						feature: "extra-large-promo",
						...itemContentConfig.contentConfigValues,
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
									800x600
									800x533
									800x450
									600x450
									600x400
									600x338
									400x300
									400x267
									400x225
								}
							}
						}
					}
					basic {
						type
						url
						resized_params {
							800x600
							800x533
							800x450
							600x450
							600x400
							600x338
							400x300
							400x267
							400x225
						}
					}
				}
				website_url
				embed_html
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

	const shouldLazyLoad = lazyLoad && !isAdmin;
	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const displayDate = content?.display_date;
	const formattedDate = Date.parse(displayDate)
		? localizeDateTime(new Date(displayDate), dateTimeFormat, language, timeZone)
		: "";

	const { display: labelDisplay, url: labelUrl, text: labelText } = content?.label?.basic || {};

	const shouldUseLabel = !!labelDisplay;

	const { _id: sectionUrl, name: sectionText } =
		content?.websites?.[arcSite]?.website_section || {};

	// Default to websites object data
	let [overlineText, overlineUrl] = [sectionText, sectionUrl];

	if (content?.owner?.sponsored) {
		overlineText = content?.label?.basic?.text || phrases.t("global.sponsored-content");
		overlineUrl = null;
	} else if (shouldUseLabel) {
		[overlineText, overlineUrl] = [labelText, labelUrl];
	}

	const contentDescription = showDescription ? content?.description?.basic : null;
	const contentHeading = showHeadline ? content?.headlines?.basic : null;
	const contentUrl = content?.websites?.[arcSite]?.website_url;
	const embedMarkup = playVideoInPlace && getVideoFromANS(content);
	const hasAuthors = showByline && content?.credits?.by.length > 0;
	const promoImageURL = imageOverrideURL || getImageFromANS(content)?.url;

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

	return showOverline ||
		contentHeading ||
		showImage ||
		contentDescription ||
		hasAuthors ||
		showDate ? (
		<LazyLoad enabled={shouldLazyLoad}>
			<article className={BLOCK_CLASS_NAME}>
				{showOverline ? <Overline href={overlineUrl}>{overlineText}</Overline> : null}
				{contentHeading || showImage || contentDescription || hasAuthors || showDate ? (
					<Stack>
						{contentHeading ? (
							<HeadingSection>
								<Heading>
									<Conditional component={Link} condition={contentUrl} href={contentUrl}>
										{contentHeading}
									</Conditional>
								</Heading>
							</HeadingSection>
						) : null}
						{embedMarkup || showImage ? (
							<MediaItem {...searchableField("imageOverrideURL")} suppressContentEditableWarning>
								{embedMarkup ? <Video embedMarkup={embedMarkup} /> : <MediaImage />}
							</MediaItem>
						) : null}
						{contentDescription ? <Paragraph>{contentDescription}</Paragraph> : null}
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
										<DateComponent dateTime={displayDate} dateString={formattedDate} />
									) : null}
								</Join>
							</Attribution>
						) : null}
					</Stack>
				) : null}
			</article>
		</LazyLoad>
	) : null;
};

ExtraLargePromo.propTypes = {
	customFields: PropTypes.shape({
		itemContentConfig: PropTypes.contentConfig("ans-item").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		showOverline: PropTypes.bool.tag({
			defaultValue: true,
			group: "Show promo elements",
			label: "Show overline",
		}),
		showHeadline: PropTypes.bool.tag({
			defaultValue: true,
			group: "Show promo elements",
			label: "Show headline",
		}),
		showImage: PropTypes.bool.tag({
			defaultValue: true,
			group: "Show promo elements",
			label: "Show image",
		}),
		showDescription: PropTypes.bool.tag({
			defaultValue: true,
			group: "Show promo elements",
			label: "Show description",
		}),
		showByline: PropTypes.bool.tag({
			defaultValue: true,
			group: "Show promo elements",
			label: "Show byline",
		}),
		showDate: PropTypes.bool.tag({
			defaultValue: true,
			group: "Show promo elements",
			label: "Show date",
		}),
		imageOverrideURL: PropTypes.string.tag({
			group: "Image",
			label: "Image URL",
			searchable: "image",
		}),
		imageRatio: PropTypes.oneOf(["16:9", "3:2", "4:3"]).tag({
			defaultValue: "4:3",
			group: "Art",
			label: "Image ratio",
		}),
		playVideoInPlace: PropTypes.bool.tag({
			defaultValue: false,
			group: "Art",
			label: "Play video in place",
		}),
		lazyLoad: PropTypes.bool.tag({
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
			name: "Lazy Load block?",
		}),
	}),
};

ExtraLargePromo.label = "Extra Large Promo – Arc Block";

ExtraLargePromo.icon = "paragraph-bullets";

export default ExtraLargePromo;
