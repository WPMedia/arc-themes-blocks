import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import {
  Heading,
  Stack,
  Grid,
  Image,
  Link,
  LazyLoad,
  isServerSide,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-numbered-stories";

const getFallbackImageURL = ({ deployment, contextPath, fallbackImage }) => {
  let targetFallbackImage = fallbackImage;

  if (!targetFallbackImage.includes("http")) {
    targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
  }

  return targetFallbackImage;
};

const NumberedStoriesWrapper = ({ customFields }) => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext();
  const { fallbackImage } = getProperties(arcSite);

  const targetFallbackImage = getFallbackImageURL({
    deployment,
    contextPath,
    fallbackImage,
  });

  if (customFields.lazyLoad && isServerSide() && !isAdmin) {
    return null;
  }

  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <NumberedStories
        customFields={customFields}
        targetFallbackImage={targetFallbackImage}
        arcSite={arcSite}
      />
    </LazyLoad>
  );
};

const NumberedStories = ({ customFields, targetFallbackImage, arcSite }) => {
  const {
    listContentConfig: { contentService = "", contentConfigValues = {} } = {},
    title = "",
    showImage = true,
    showHeadline = true,
    showSubheadline = true,
    showAuthor = true,
  } = customFields;

  const { content_elements: contentElements = [] } = useContent({
    source: contentService,
    query: { ...contentConfigValues, feature: "numbered-stories" },
    filter: `{
      content_elements {
        _id
        headlines {
          basic
        }
        subheadlines {
          basic
        }
        credits {
          by {
            name
          }
        }
        promo_items {
          basic {
            _id
            auth {
              ${RESIZER_TOKEN_VERSION}
            }
            focal_point {
              x
              y
            }
            type
            url
            alt_text
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

  if (!contentElements || contentElements.length === 0) {
    return null;
  }

  const romanNumerals = ["I", "II", "III"];
  const stories = contentElements.slice(0, 3);

  return (
    <Stack direction="vertical" className={BLOCK_CLASS_NAME}>
      {title ? <Heading className={`${BLOCK_CLASS_NAME}__title`}>{title}</Heading> : null}
      <Grid className={`${BLOCK_CLASS_NAME}__stories-grid`}>
        {stories.map((story, index) => {
          const imageUrl = story.promo_items?.basic?.url;
          const imageAlt = story.promo_items?.basic?.alt_text || story.headlines.basic;
          
          return (
            <Stack direction="vertical" key={story._id} className={`${BLOCK_CLASS_NAME}__story-item`}>
              <div className={`${BLOCK_CLASS_NAME}__number`}>{romanNumerals[index]}</div>
              {showImage && (
                <Image
                  src={imageUrl || targetFallbackImage}
                  alt={imageAlt}
                  className={`${BLOCK_CLASS_NAME}__image`}
                  auth={story.promo_items?.basic?.auth}
                  focalPoint={story.promo_items?.basic?.focal_point}
                />
              )}
              {showHeadline && (
                <Link 
                  href={story.websites[arcSite].website_url} 
                  className={`${BLOCK_CLASS_NAME}__headline`}
                >
                  <Heading>{story.headlines.basic}</Heading>
                </Link>
              )}
              {showSubheadline && story.subheadlines?.basic && (
                <div className={`${BLOCK_CLASS_NAME}__subheadline`}>{story.subheadlines.basic}</div>
              )}
              {showAuthor && story.credits?.by?.[0]?.name && (
                <div className={`${BLOCK_CLASS_NAME}__author`}>By {story.credits.by[0].name}</div>
              )}
            </Stack>
          );
        })}
      </Grid>
    </Stack>
  );
};

NumberedStoriesWrapper.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig("ans-feed").tag({
      group: "Configure Content",
      label: "Display Content Info",
    }),
    title: PropTypes.string.tag({
      label: "Title",
    }),
    showImage: PropTypes.bool.tag({
      label: "Show image",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showHeadline: PropTypes.bool.tag({
      label: "Show headline",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showSubheadline: PropTypes.bool.tag({
      label: "Show subheadline",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showAuthor: PropTypes.bool.tag({
      label: "Show author",
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

NumberedStoriesWrapper.label = "Numbered Stories";

NumberedStoriesWrapper.icon = "arc-numbered-stories";

export default NumberedStoriesWrapper; 