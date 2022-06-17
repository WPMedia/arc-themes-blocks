/* eslint-disable camelcase */
import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

import { LazyLoad } from "@wpmedia/engine-theme-sdk";
import {
	getImageFromANS,
	isServerSide,
	Heading,
	HeadingSection,
	Image,
	Link,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-numbered-list";

const getFallbackImageURL = ({ deployment, contextPath, fallbackImage }) => {
	let targetFallbackImage = fallbackImage;

	if (!targetFallbackImage.includes("http")) {
		targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
	}

	return targetFallbackImage;
};

const NumberedList = (props) => {
	const {
		arcSite,
		customFields: {
			listContentConfig: { contentService = "", contentConfigValues = {} } = {},
			title = "",
			showHeadline = true,
			showImage = true,
		},
		targetFallbackImage,
		imageProps,
	} = props;

	const { content_elements: contentElements = [] } =
		useContent({
			source: contentService,
			query: { ...contentConfigValues, feature: "numbered-list" },
			filter: `{
      content_elements {
        _id,
        headlines {
          basic
        }
        promo_items {
          basic {
            type
            url
            resized_params {
              274x183
              105x70
            }
          }
          lead_art {
            promo_items {
              basic {
                type
                url
                resized_params {
                  274x183
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
          }
        }
      }
    }`,
		}) || {};

	const Wrapper = title ? HeadingSection : React.Fragment;

	return (
		<HeadingSection>
			<Stack className={BLOCK_CLASS_NAME}>
				{title !== "" && contentElements.length ? <Heading>{title}</Heading> : null}
				<Wrapper>
					<Stack className={`${BLOCK_CLASS_NAME}__items`} divider>
						{contentElements.length
							? contentElements.map((element, i) => {
									const { headlines: { basic: headlineText = "" } = {}, websites } = element;
									const imageURL = getImageFromANS(element);

									if (!websites[arcSite]) {
										return null;
									}
									const url = websites[arcSite].website_url;

									return (
										<React.Fragment key={`numbered-list-${element._id}`}>
											<Stack className={`${BLOCK_CLASS_NAME}__item`} direction="horizontal">
												<Paragraph>{i + 1}</Paragraph>
												{showHeadline ? (
													<Link href={url}>
														<Heading>{headlineText}</Heading>
													</Link>
												) : null}
												{showImage ? (
													<Link
														className={`${BLOCK_CLASS_NAME}__item-image`}
														href={url}
														assistiveHidden={showHeadline}
													>
														<Image {...imageProps} src={imageURL || targetFallbackImage} />
													</Link>
												) : null}
											</Stack>
										</React.Fragment>
									);
							  })
							: null}
					</Stack>
				</Wrapper>
			</Stack>
		</HeadingSection>
	);
};

const NumberedListWrapper = ({ customFields }) => {
	const { id, arcSite, contextPath, deployment, isAdmin } = useFusionContext();
	const { websiteDomain, fallbackImage, primaryLogoAlt, breakpoints, resizerURL } =
		getProperties(arcSite);

	const targetFallbackImage = getFallbackImageURL({
		deployment,
		contextPath,
		fallbackImage,
	});

	// Resizer V1 values - will need updated when implementing v2 resizer
	const imageProps = {
		smallWidth: 105,
		smallHeight: 70,
		mediumWidth: 105,
		mediumHeight: 70,
		largeWidth: 274,
		largeHeight: 183,
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
			<NumberedList
				id={id}
				customFields={customFields}
				placeholderResizedImageOptions={placeholderResizedImageOptions}
				targetFallbackImage={targetFallbackImage}
				websiteDomain={websiteDomain}
				imageProps={imageProps}
				arcSite={arcSite}
			/>
		</LazyLoad>
	);
};

NumberedListWrapper.propTypes = {
	customFields: PropTypes.shape({
		listContentConfig: PropTypes.contentConfig("ans-feed").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		title: PropTypes.string.tag({ label: "Title" }),
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
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

NumberedListWrapper.label = "Numbered List – Arc Block";

NumberedListWrapper.icon = "arc-list";

export default NumberedListWrapper;
