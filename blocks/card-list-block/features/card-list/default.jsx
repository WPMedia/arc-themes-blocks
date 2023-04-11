/* eslint-disable camelcase */
import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import { RESIZER_APP_VERSION } from "fusion:environment";
import { localizeDate } from "@wpmedia/engine-theme-sdk";
import {
	Attribution,
	Date,
	formatAuthors,
	formatURL,
	getImageFromANS,
	Heading,
	HeadingSection,
	Image,
	isServerSide,
	LazyLoad,
	Link,
	Overline,
	Separator,
	Stack,
	usePhrases,
} from "@wpmedia/arc-themes-components";

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
		},
		targetFallbackImage,
		dateLocalization: { language, timeZone, dateFormat } = {
			language: "en",
			timeZone: "GMT",
			dateFormat: "%B %d, %Y",
		},
	} = props;
	const phrases = usePhrases();

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
				_id
				type
				url
				auth {
					${RESIZER_APP_VERSION}
				}
			 }
			 lead_art {
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

	if (contentElements.length === 0) {
		return null;
	}

	const Wrapper = title ? HeadingSection : React.Fragment;

	let contentItems = contentElements.reduce((acc, element, index) => {
		if (element.websites?.[arcSite] && index >= offsetOverride) {
			return acc.concat(element);
		}
		return acc;
	}, []);

	if (displayAmount) {
		contentItems = contentItems.slice(0, displayAmount);
	}

	const sourceContent = contentElements[0];

	const displayDate = localizeDate(sourceContent.display_date, dateFormat, language, timeZone);

	/* Author Formatting */
	const bylineNodes = formatAuthors(sourceContent?.credits?.by, phrases.t("global.and-text"));
	const hasAuthor = !!bylineNodes.length;

	// Start Overline data
	const {
		display: labelDisplay,
		url: labelUrl,
		text: labelText,
	} = (sourceContent.label && sourceContent.label.basic) || {};
	const shouldUseLabel = !!labelDisplay;

	const { _id: sectionUrl, name: sectionText } =
		sourceContent?.websites?.[arcSite]?.website_section || {};

	// Default to websites object data
	let [text, url] = [sectionText, sectionUrl];

	if (sourceContent?.owner?.sponsored) {
		text = sourceContent?.label?.basic?.text || phrases.t("global.sponsored-content");
		url = null;
	} else if (shouldUseLabel) {
		[text, url] = [labelText, labelUrl];
	}
	// End Overline data

	const ansImage = getImageFromANS(sourceContent);

	const featuredImageParams = ansImage
		? {
				ansImage,
				aspectRatio: "4:3",
				resizedOptions: {
					smart: true,
				},
				responsiveImages: [377, 754, 1508],
				width: 377,
		  }
		: {
				src: targetFallbackImage,
		  };

	return contentItems.length > 0 ? (
		<HeadingSection>
			<Stack className={BLOCK_CLASS_NAME}>
				{title ? <Heading className={`${BLOCK_CLASS_NAME}__title`}>{title}</Heading> : null}
				<Wrapper>
					<Link
						assistiveHidden
						className={`${BLOCK_CLASS_NAME}__main-item-image-link`}
						href={sourceContent.websites[arcSite].website_url}
					>
						<Image {...featuredImageParams} />
					</Link>
					<Stack className={`${BLOCK_CLASS_NAME}__list`} divider>
						<Stack
							as="article"
							className={`${BLOCK_CLASS_NAME}__main-item`}
							key={`card-list-${sourceContent.websites[arcSite].website_url}`}
						>
							<Stack className={`${BLOCK_CLASS_NAME}__main-item-text-container`}>
								{url || text ? (
									<Overline href={url ? formatURL(url) : null}>{text}</Overline>
								) : null}
								<Heading>
									<Link href={contentItems[0].websites[arcSite].website_url}>
										{contentItems[0].headlines.basic}
									</Link>
								</Heading>
								<Attribution>
									{hasAuthor ? (
										<>
											<span>{phrases.t("global.by-text")}</span> <span>{bylineNodes}</span>
											<Separator />
										</>
									) : null}
									<Date dateTime={sourceContent.display_date} dateString={displayDate} />
								</Attribution>
							</Stack>
						</Stack>
						{contentItems.slice(1).map((element) => {
							const { headlines: { basic: headlineText } = {} } = element;
							const itemUrl = element.websites[arcSite]?.website_url;
							if (!itemUrl) {
								return null;
							}
							const itemAnsImage = getImageFromANS(element);

							const itemImageParams = itemAnsImage
								? {
										ansImage: itemAnsImage,
										aspectRatio: "3:2",
										resizedOptions: {
											smart: true,
										},
										responsiveImages: [105, 210, 420],
										width: 105,
								  }
								: {
										src: targetFallbackImage,
								  };
							return (
								<Stack
									as="article"
									className={`${BLOCK_CLASS_NAME}__secondary-item`}
									key={`card-list-${itemUrl}`}
									direction="horizontal"
								>
									<Link
										href={itemUrl}
										className={`${BLOCK_CLASS_NAME}__secondary-item-heading-link`}
									>
										<Heading>{headlineText}</Heading>
									</Link>
									<Link
										assistiveHidden
										href={itemUrl}
										className={`${BLOCK_CLASS_NAME}__secondary-item-image-link`}
									>
										<Image {...itemImageParams} />
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
	const { websiteDomain, fallbackImage, primaryLogoAlt } = getProperties(arcSite);

	const targetFallbackImage = getFallbackImageURL({
		deployment,
		contextPath,
		fallbackImage,
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
				targetFallbackImage={targetFallbackImage}
				websiteDomain={websiteDomain}
				primaryLogoAlt={primaryLogoAlt}
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
