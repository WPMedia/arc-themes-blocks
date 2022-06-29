/* eslint-disable camelcase */
import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import {
	Attribution,
	Date,
	formatAuthors,
	formatUrl,
	getImageFromANS,
	HeadingSection,
	Heading,
	Image,
	isServerSide,
	Link,
	Overline,
	Stack,
	Separator,
} from "@wpmedia/arc-themes-components";
import { LazyLoad, localizeDate } from "@wpmedia/engine-theme-sdk";

const BLOCK_CLASS_NAME = "b-card-list";

const getFallbackImageURL = ({ deployment, contextPath, fallbackImage }) => {
	let targetFallbackImage = fallbackImage;

	if (!targetFallbackImage.includes("http")) {
		targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
	}

	return targetFallbackImage;
};

const CardListItems = (props) => {
	const {
		arcSite,
		customFields: {
			listContentConfig: { contentService = "", contentConfigValues = {} } = {},
			title = "",
			offsetOverride = 0,
			displayAmount,
		} = {},
		targetFallbackImage,
		largeImageProps,
		smallImageProps,
		dateLocalization: { language, timeZone, dateFormat } = {
			language: "en",
			timeZone: "GMT",
			dateFormat: "LLLL d, yyyy",
		},
	} = props;

	// need to inject the arc site here into use content
	const { content_elements: contentElements = [] } =
		useContent({
			source: contentService,
			query: { ...contentConfigValues, feature: "card-list" },
			filter: `{
      content_elements {
        _id,
        display_date
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
        headlines {
          basic
        }
        owner {
          sponsored
        }
        promo_items {
          basic {
            type
            url
            resized_params {
              377x283
              105x70
            }
          }
          lead_art {
            promo_items {
              basic {
                type
                url
                resized_params {
                  377x283
                  105x70
                }
              }
            }
            type
          }
        }
        websites {
          ${arcSite} {
            website_url
            website_section {
              name
            }
          }
        }
      }
    }`,
		}) || {};

	let contentItems = contentElements.reduce((acc, element, index) => {
		if (element.websites?.[arcSite] && index >= offsetOverride) {
			return acc.concat(element);
		}
		return acc;
	}, []);

	if (displayAmount) {
		contentItems = contentItems.slice(0, displayAmount);
	}

	const Wrapper = title ? HeadingSection : React.Fragment;

	/* -------------Start Main Story Properties -------------------- */
	const sourceContent = contentElements[0];
	const phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");

	const displayDate = localizeDate(sourceContent.display_date, dateFormat, language, timeZone);
	const highlightedImageUrl = getImageFromANS(sourceContent);

	/* Author Formatting */
	const bylineNodes = formatAuthors(sourceContent?.credits?.by, phrases.t("byline-block.and-text"));
	const hasAuthor = !!bylineNodes.length;

	/* Overline */
	const {
		display: labelDisplay,
		url: labelUrl,
		text: labelText,
	} = (sourceContent.label && sourceContent.label.basic) || {};
	const shouldUseLabel = !!labelDisplay;

	const { _id: sectionUrl, name: sectionText } =
		(sourceContent.websites &&
			sourceContent.websites[arcSite] &&
			sourceContent.websites[arcSite].website_section) ||
		{};

	// Default to websites object data
	let [text, url] = [sectionText, sectionUrl];

	if (sourceContent?.owner?.sponsored) {
		text = sourceContent?.label?.basic?.text || phrases.t("overline.sponsored-content");
		url = null;
	} else if (shouldUseLabel) {
		[text, url] = [labelText, labelUrl];
	}

	/* ------------- End Main Story Properties --------------------- */

	return contentItems.length > 0 ? (
		<HeadingSection>
			<Stack className={BLOCK_CLASS_NAME}>
				{title ? (
					<Heading className={`${BLOCK_CLASS_NAME}__title`} /* className="card-list-title" */>
						{title}
					</Heading>
				) : null}
				<Wrapper>
					<Stack divider>
						<Stack
							as="article"
							// className="list-item-simple"
							className={`${BLOCK_CLASS_NAME}__main-item`}
							key={`card-list-${sourceContent.websites[arcSite].website_url}`}
						>
							<Link
								href={sourceContent.websites[arcSite].website_url}
								// className="list-anchor card-list--link-container vertical-align-image"
								aria-hidden="true"
								tabIndex="-1"
							>
								<Image
									{...largeImageProps}
									src={highlightedImageUrl || targetFallbackImage}
									alt={
										sourceContent.headlines.basic
											? sourceContent.headlines.basic
											: largeImageProps.primaryLogoAlt || ""
									}
								/>
							</Link>
							{url || text ? (
								<Overline href={url ? formatUrl(url) : null} /* className="card-list-overline" */>
									{text}
								</Overline>
							) : null}
							<Heading /* className="card-list-headline" */>
								<Link
									href={sourceContent.websites[arcSite].website_url}
									// className="list-anchor vertical-align-image"
									// id="card-list--headline-link"
								>
									{sourceContent.headlines.basic}
								</Link>
							</Heading>
							<Attribution /* className="author-date" */>
								{hasAuthor ? (
									<>
										<span /* className={`${BLOCK_CLASS_NAME}__by`} */>
											{phrases.t("byline-block.by-text")}
										</span>{" "}
										<span /* className={`${BLOCK_CLASS_NAME}__names`} */>{bylineNodes}</span>
										<Separator />
									</>
								) : null}
								<Date
									/* className="story-date" */ dateTime={sourceContent.display_date}
									dateString={displayDate}
								/>
							</Attribution>
						</Stack>
						{contentItems.slice(1).map((element) => {
							const { headlines: { basic: headlineText } = {} } = element;
							const imageURL = getImageFromANS(element);
							const websiteUrl = element.websites[arcSite]?.website_url;
							if (!websiteUrl) {
								return null;
							}
							return (
								<Stack
									key={`card-list-${websiteUrl}`}
									as="article"
									className={`${BLOCK_CLASS_NAME}__items`}
									direction="horizontal"
								>
									<Link
										href={websiteUrl} /* className="headline-list-anchor vertical-align-image" */
									>
										<Heading /* className="headline-text" */>{headlineText}</Heading>
									</Link>
									<Link
										href={websiteUrl}
										// className="list-anchor-image vertical-align-image"
										aria-hidden="true"
										tabIndex="-1"
									>
										<Image
											{...smallImageProps}
											src={imageURL || targetFallbackImage}
											alt={imageURL ? headlineText : smallImageProps.primaryLogoAlt || ""}
										/>
									</Link>
								</Stack>
							);
						})}
					</Stack>
				</Wrapper>
			</Stack>
		</HeadingSection>
	) : null;
};

const CardList = ({ customFields }) => {
	const { id, arcSite, contextPath, deployment, isAdmin } = useFusionContext();
	const {
		websiteDomain,
		fallbackImage,
		primaryLogoAlt,
		breakpoints,
		resizerURL,
		dateLocalization,
	} = getProperties(arcSite);

	const targetFallbackImage = getFallbackImageURL({
		deployment,
		contextPath,
		fallbackImage,
	});

	// retain for V2
	const largeImageProps = {
		smallWidth: 377,
		smallHeight: 283,
		mediumWidth: 377,
		mediumHeight: 283,
		largeWidth: 377,
		largeHeight: 283,
		primaryLogoAlt,
		breakpoints,
		resizerURL,
	};

	// retain for V2
	const smallImageProps = {
		smallWidth: 105,
		smallHeight: 70,
		mediumWidth: 105,
		mediumHeight: 70,
		largeWidth: 105,
		largeHeight: 70,
		primaryLogoAlt,
		breakpoints,
		resizerURL,
	};

	const placeholderResizedImageOptions = useContent({
		source: "resize-image-api",
		query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
	});

	if (customFields.lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}

	return (
		<LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
			<CardListItems
				id={id}
				customFields={customFields}
				dateLocalization={dateLocalization}
				placeholderResizedImageOptions={placeholderResizedImageOptions}
				targetFallbackImage={targetFallbackImage}
				websiteDomain={websiteDomain}
				largeImageProps={largeImageProps}
				smallImageProps={smallImageProps}
				arcSite={arcSite}
			/>
		</LazyLoad>
	);
};

CardList.label = "Card List – Arc Block";

CardList.icon = "arc-list";

CardList.propTypes = {
	customFields: PropTypes.shape({
		title: PropTypes.string,
		listContentConfig: PropTypes.contentConfig("ans-feed").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		offsetOverride: PropTypes.number.tag({
			group: "Configure Content",
			label: "Offset Override",
			defaultValue: 0,
		}),
		displayAmount: PropTypes.number.tag({
			group: "Configure Content",
			label: "Amount of items to display",
		}),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

export default CardList;
