/* eslint-disable camelcase */
import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams, extractImageFromStory } from '@wpmedia/resizer-image-block';
import { Heading, HeadingSection } from '@wpmedia/shared-styles';
import getProperties from 'fusion:properties';
import StoryItem from './_children/story-item';
import './simple-list.scss';

const unserializeStory = (arcSite) => (acc, storyObject) => {
  if (storyObject.websites?.[arcSite]) {
    return acc.concat({
      id: storyObject._id,
      itemTitle: storyObject.headlines.basic,
      imageURL: extractImageFromStory(storyObject) || '',
      websiteURL: storyObject.websites[arcSite].website_url || '',
      resizedImageOptions: extractResizedParams(storyObject),
    });
  }
  return acc;
};

const getFallbackImageURL = ({ deployment, contextPath, fallbackImage }) => {
  let targetFallbackImage = fallbackImage;

  if (!targetFallbackImage.includes('http')) {
    targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
  }

  return targetFallbackImage;
};

const SimpleListWrapper = ({ customFields }) => {
  const {
    id, arcSite, contextPath, deployment, isAdmin,
  } = useFusionContext();
  const {
    websiteDomain, fallbackImage, primaryLogoAlt, breakpoints, resizerURL,
  } = getProperties(arcSite);

  const targetFallbackImage = getFallbackImageURL({ deployment, contextPath, fallbackImage });
  const imageProps = {
    smallWidth: 274,
    smallHeight: 183,
    mediumWidth: 274,
    mediumHeight: 183,
    largeWidth: 274,
    largeHeight: 183,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };

  const placeholderResizedImageOptions = useContent({
    source: 'resize-image-api',
    query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
  });

  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
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
        imageProps={imageProps}
        arcSite={arcSite}
      />
    </LazyLoad>
  );
};

const SimpleList = (props) => {
  const {
    arcSite,
    websiteDomain,
    customFields: {
      listContentConfig: {
        contentService = '',
        contentConfigValues = {},
      } = {},
      title = '',
      showHeadline = true,
      showImage = true,
    } = {},
    id = '',
    placeholderResizedImageOptions,
    targetFallbackImage,
    imageProps,
  } = props;

  // need to inject the arc site here into use content
  const { content_elements: contentElements = [] } = useContent({
    source: contentService,
    query: { ...contentConfigValues, feature: 'simple-list' },
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
      <div key={id} className="list-container layout-section">
        { title
          ? (
            <Heading className="list-title">
              {title}
            </Heading>
          ) : null}
        <Wrapper>
          {
        contentElements.reduce(unserializeStory(arcSite), []).map(({
          id: listItemId, itemTitle, imageURL, websiteURL, resizedImageOptions,
        }) => (
          <React.Fragment key={listItemId}>
            <StoryItem
              key={listItemId}
              id={listItemId}
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
              imageProps={imageProps}
            />
            <hr />
          </React.Fragment>
        ))
      }
        </Wrapper>
      </div>
    </HeadingSection>
  );
};

SimpleListWrapper.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed').tag(
      {
        group: 'Configure Content',
        label: 'Display Content Info',
      },
    ),
    title: PropTypes.string.tag({ label: 'Title' }),
    showHeadline: PropTypes.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    showImage: PropTypes.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

SimpleListWrapper.label = 'Simple List – Arc Block';

export default SimpleListWrapper;
