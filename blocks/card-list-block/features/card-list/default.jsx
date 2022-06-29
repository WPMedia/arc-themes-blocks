/* eslint-disable camelcase */
import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import { LazyLoad, isServerSide } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { Heading, HeadingSection, Image, Link, Stack } from "@wpmedia/arc-themes-components";

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
		placeholderResizedImageOptions,
		targetFallbackImage,
		largeImageProps,
		smallImageProps,
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

	// const Wrapper = title ? HeadingSection : React.Fragment;

	// const showSeparator = !!(
	// 	contentItems[0] &&
	// 	contentItems[0].credits &&
	// 	contentItems[0].credits.by &&
	// 	contentItems[0].credits.by.length !== 0
	// );

	return contentItems.length > 0 ? (
		<HeadingSection>
			<Stack className={BLOCK_CLASS_NAME}>
				{title ? <Heading>{title}</Heading> : null}
				<Stack divider>
					<Stack
						as="article"
						className={`${BLOCK_CLASS_NAME}__main-item`}
						key={`card-list-${contentItems[0].websites[arcSite].website_url}`}
					>
						<Link
							assistiveHidden
							className={`${BLOCK_CLASS_NAME}__main-item-link`}
							href={contentItems[0].websites[arcSite].website_url}
						>
							{extractImageFromStory(contentItems[0]) ? (
								<Image
									{...largeImageProps}
									src={extractImageFromStory(contentItems[0])}
									alt={contentItems[0].headlines.basic}
									resizedImageOptions={extractResizedParams(contentItems[0])}
								/>
							) : (
								<Image
									{...largeImageProps}
									src={targetFallbackImage}
									alt={largeImageProps.primaryLogoAlt || ""}
									resizedImageOptions={placeholderResizedImageOptions}
								/>
							)}
						</Link>
						{/* <Overline story={contentItems[0]} /> */}
						<Heading>
							<Link href={contentItems[0].websites[arcSite].website_url}>
								{contentItems[0].headlines.basic}
							</Link>
						</Heading>
						{/* <div>
						<Byline content={contentItems[0]} list separator={showSeparator} font="Primary" />
						<PromoDate date={contentItems[0].display_date} />
					</div> */}
					</Stack>
					{contentItems.slice(1).map((element) => {
						const { headlines: { basic: headlineText } = {} } = element;
						const imageURL = extractImageFromStory(element);
						const url = element.websites[arcSite]?.website_url;
						if (!url) {
							return null;
						}
						return (
							<Stack
								as="article"
								className={`${BLOCK_CLASS_NAME}__secondary-item`}
								key={`card-list-${url}`}
								direction="horizontal"
							>
								<Link href={url} className={`${BLOCK_CLASS_NAME}__secondary-item-heading-link`}>
									<Heading>{headlineText}</Heading>
								</Link>
								<Link
									assistiveHidden
									href={url}
									className={`${BLOCK_CLASS_NAME}__secondary-item-image-link`}
								>
									<Image
										{...smallImageProps}
										src={imageURL || targetFallbackImage}
										alt={imageURL ? headlineText : smallImageProps.primaryLogoAlt || ""}
										resizedImageOptions={
											imageURL ? extractResizedParams(element) : placeholderResizedImageOptions
										}
									/>
								</Link>
							</Stack>
						);
					})}
				</Stack>
			</Stack>
		</HeadingSection>
	) : null;
};

const CardList = ({ customFields }) => {
	const { id, arcSite, contextPath, deployment, isAdmin } = useFusionContext();
	const { websiteDomain, fallbackImage, primaryLogoAlt, breakpoints, resizerURL } =
		getProperties(arcSite);

	const targetFallbackImage = getFallbackImageURL({
		deployment,
		contextPath,
		fallbackImage,
	});

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
