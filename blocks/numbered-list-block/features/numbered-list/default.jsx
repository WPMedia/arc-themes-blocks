/* eslint-disable camelcase */
import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import { Image, LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import './numbered-list.scss';
import { extractResizedParams, extractImageFromStory } from '@wpmedia/resizer-image-block';
import {
  Heading, HeadingSection, SecondaryFont,
} from '@wpmedia/shared-styles';

const getFallbackImageURL = ({ deployment, contextPath, fallbackImage }) => {
  let targetFallbackImage = fallbackImage;

  if (!targetFallbackImage.includes('http')) {
    targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
  }

  return targetFallbackImage;
};

const NumberedList = (props) => {
  const {
    arcSite,
    customFields: {
      listContentConfig: {
        contentService = '',
        contentConfigValues = {},
      } = {},
      title = '',
      showHeadline = true,
      showImage = true,
    },
    placeholderResizedImageOptions,
    targetFallbackImage,
    imageProps,
  } = props;

  const { content_elements: contentElements = [] } = useContent({
    source: contentService,
    query: { ...contentConfigValues, feature: 'numbered-list' },
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
      <div className="numbered-list-container layout-section">
        {(title !== '' && contentElements.length) ? (
          <Heading className="list-title">
            {title}
          </Heading>
        ) : null }
        <Wrapper>
          {(contentElements.length) ? contentElements.map((element, i) => {
            const {
              headlines: { basic: headlineText = '' } = {},
              websites,
            } = element;
            const imageURL = extractImageFromStory(element);

            if (!websites[arcSite]) {
              return null;
            }
            const url = websites[arcSite].website_url;

            return (
              <React.Fragment key={`numbered-list-${element._id}`}>
                <div className="numbered-list-item numbered-item-margins">
                  {showHeadline ? (
                    <a href={url} className="headline-list-anchor">
                      <SecondaryFont as="p" className="list-item-number">{i + 1}</SecondaryFont>
                      <Heading className="headline-text">{headlineText}</Heading>
                    </a>
                  ) : null}
                  {showImage ? (
                    <a
                      href={url}
                      className="list-anchor-image vertical-align-image"
                      aria-hidden="true"
                      tabIndex="-1"
                    >
                      <Image
                        {...imageProps}
                        url={imageURL || targetFallbackImage}
                        resizedImageOptions={imageURL
                          ? extractResizedParams(element) : placeholderResizedImageOptions}
                      />
                    </a>
                  ) : null}
                </div>
                <hr />
              </React.Fragment>
            );
          }) : null}
        </Wrapper>
      </div>
    </HeadingSection>
  );
};

const NumberedListWrapper = ({ customFields }) => {
  const {
    id, arcSite, contextPath, deployment, isAdmin,
  } = useFusionContext();
  const {
    websiteDomain, fallbackImage, primaryLogoAlt, breakpoints, resizerURL,
  } = getProperties(arcSite);

  const targetFallbackImage = getFallbackImageURL({ deployment, contextPath, fallbackImage });
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
    source: 'resize-image-api',
    query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
  });

  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
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

NumberedListWrapper.label = 'Numbered List – Arc Block';

NumberedListWrapper.icon = 'arc-list';

export default NumberedListWrapper;
