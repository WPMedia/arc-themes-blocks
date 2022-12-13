import React from "react";

import { RESIZER_APP_VERSION } from "fusion:environment";
import { useContent, useEditableContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
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
	usePhrases,
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
			dateTimeFormat: "%B %d, %Y at %l:%M %P %Z",
		},
		fallbackImage,
	} = getProperties(arcSite);
	const phrases = usePhrases();
	const {
		imageOverrideAuth,
		imageOverrideURL,
		imageOverrideId,
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
								_id
								type
								url
								auth {
									${RESIZER_APP_VERSION}
								}
							}
						}
					}
					basic {
						_id
						type
						url
						auth {
							${RESIZER_APP_VERSION}
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
	const hasDate = showDate && formattedDate;

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

	const hasOverline = showOverline && overlineText;

	const contentDescription = showDescription ? content?.description?.basic : null;
	const contentHeading = showHeadline ? content?.headlines?.basic : null;
	const contentUrl = content?.websites?.[arcSite]?.website_url;
	const embedMarkup = playVideoInPlace && getVideoFromANS(content);
	const hasAuthors = showByline && content?.credits?.by.length > 0;
	const imageParams =
		imageOverrideURL || (content && getImageFromANS(content))
			? {
					ansImage: imageOverrideURL
						? {
								_id: imageOverrideId,
								url: imageOverrideURL,
								auth: imageOverrideAuth ? JSON.parse(imageOverrideAuth) : {},
						  }
						: getImageFromANS(content),
					alt: content?.headlines?.basic || "",
					aspectRatio: imageRatio,
					resizedOptions: {
						smart: true,
					},
					responsiveImages: [400, 600, 800, 1200],
					width: 800,
			  }
			: {
					src: fallbackImage,
			  };

	return hasOverline ||
		contentHeading ||
		showImage ||
		contentDescription ||
		hasAuthors ||
		hasDate ? (
		<LazyLoad enabled={shouldLazyLoad}>
			<article className={BLOCK_CLASS_NAME}>
				{hasOverline ? <Overline href={overlineUrl}>{overlineText}</Overline> : null}
				{contentHeading || showImage || contentDescription || hasAuthors || hasDate ? (
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
							<MediaItem
								{...searchableField({
									imageOverrideURL: "url",
									imageOverrideId: "_id",
									imageOverrideAuth: "auth",
								})}
								suppressContentEditableWarning
							>
								{embedMarkup ? (
									<Video embedMarkup={embedMarkup} />
								) : (
									<Conditional
										component={Link}
										condition={contentUrl}
										href={contentUrl}
										assistiveHidden
									>
										<Image {...imageParams} />
									</Conditional>
								)}
							</MediaItem>
						) : null}
						{contentDescription ? <Paragraph>{contentDescription}</Paragraph> : null}
						{hasAuthors || hasDate ? (
							<Attribution>
								<Join separator={Separator}>
									{hasAuthors ? (
										<Join separator={() => " "}>
											{phrases.t("global.by-text")}
											{formatAuthors(content?.credits?.by, phrases.t("global.and-text"))}
										</Join>
									) : null}
									{hasDate ? (
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
		imageOverrideAuth: PropTypes.string.tag({
			group: "Image",
			hidden: true,
		}),
		imageOverrideURL: PropTypes.string.tag({
			group: "Image",
			label: "Image URL",
			searchable: "image",
		}),
		imageOverrideId: PropTypes.string.tag({
			group: "Image",
			hidden: true,
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
