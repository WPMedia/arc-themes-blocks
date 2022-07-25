/* eslint-disable camelcase */
import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { Stack, isServerSide, Heading, HeadingSection } from "@wpmedia/arc-themes-components";
import StoryItem from "./_children/story-item";

const BLOCK_CLASS_NAME = "b-simple-list";

const unserializeStory = (arcSite) => (acc, storyObject) => {
	if (storyObject.websites?.[arcSite]) {
		return acc.concat({
			id: storyObject._id,
			itemTitle: storyObject.headlines.basic,
			imageURL: extractImageFromStory(storyObject) || "",
			websiteURL: storyObject.websites[arcSite].website_url || "",
			resizedImageOptions: extractResizedParams(storyObject),
		});
	}
	return acc;
};

const getFallbackImageURL = ({ deployment, contextPath, fallbackImage }) => {
	let targetFallbackImage = fallbackImage;

	if (!targetFallbackImage.includes("http")) {
		targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
	}

	return targetFallbackImage;
};

const SimpleListWrapper = ({ customFields }) => {
	const { id, arcSite, contextPath, deployment, isAdmin } = useFusionContext();
	const { websiteDomain, fallbackImage, primaryLogoAlt } = getProperties(arcSite);

	const targetFallbackImage = getFallbackImageURL({
		deployment,
		contextPath,
		fallbackImage,
	});

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
			<SimpleList
				id={id}
				customFields={customFields}
				placeholderResizedImageOptions={placeholderResizedImageOptions}
				targetFallbackImage={targetFallbackImage}
				websiteDomain={websiteDomain}
				arcSite={arcSite}
				primaryLogoAlt={primaryLogoAlt}
			/>
		</LazyLoad>
	);
};

const SimpleList = (props) => {
	const {
		arcSite,
		websiteDomain,
		customFields: {
			listContentConfig: { contentService = "", contentConfigValues = {} } = {},
			title = "",
			showHeadline = true,
			showImage = true,
		} = {},
		id = "",
		placeholderResizedImageOptions,
		targetFallbackImage,
		primaryLogoAlt,
	} = props;

	// need to inject the arc site here into use content
	const { content_elements: contentElements = [] } =
		useContent({
			source: contentService,
			query: { ...contentConfigValues, feature: "simple-list" },
			filter: `{
      content_elements {
        _id
        headlines {
          basic
        }
        website_url
        promo_items {
          basic {
            type
            url
            resized_params {
              274x183
            }
          }
          lead_art {
            promo_items {
              basic {
                type
                url
                resized_params {
                  274x183
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
			<Stack key={id} className={BLOCK_CLASS_NAME}>
				{title ? <Heading className={`${BLOCK_CLASS_NAME}__title`}>{title}</Heading> : null}
				<Wrapper>
					{contentElements
						.reduce(unserializeStory(arcSite), [])
						.map(({ id: listItemId, itemTitle, imageURL, websiteURL, resizedImageOptions }) => (
							<React.Fragment key={listItemId}>
								<StoryItem
									key={listItemId}
									id={listItemId}
									classPrefix={BLOCK_CLASS_NAME}
									itemTitle={itemTitle}
									imageURL={imageURL}
									websiteURL={websiteURL}
									websiteDomain={websiteDomain}
									showHeadline={showHeadline}
									showImage={showImage}
									resizedImageOptions={resizedImageOptions}
									placeholderResizedImageOptions={placeholderResizedImageOptions}
									targetFallbackImage={targetFallbackImage}
									arcSite={arcSite}
									primaryLogoAlt={primaryLogoAlt}
								/>
								<hr />
							</React.Fragment>
						))}
				</Wrapper>
			</Stack>
		</HeadingSection>
	);
};

SimpleListWrapper.propTypes = {
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

SimpleListWrapper.label = "Simple List – Arc Block";

SimpleListWrapper.icon = "arc-list";

export default SimpleListWrapper;
