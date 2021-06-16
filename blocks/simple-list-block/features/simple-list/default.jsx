/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams, extractImageFromStory } from '@wpmedia/resizer-image-block';
import { PrimaryFont } from '@wpmedia/shared-styles';
import getProperties from 'fusion:properties';
import Consumer from 'fusion:consumer';
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

@Consumer
class SimpleListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderResizedImageOptions: {},
    };
    const { lazyLoad = false } = props.customFields || {};
    const {
      websiteDomain, fallbackImage, primaryLogoAlt, breakpoints, resizerURL,
    } = getProperties(props.arcSite) || {};

    this.lazyLoad = lazyLoad;
    this.isAdmin = props.isAdmin;
    this.websiteDomain = websiteDomain;
    this.fallbackImage = fallbackImage;
    this.imageProps = {
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

    this.fetchPlaceholder();
  }

  getFallbackImageURL() {
    const { deployment, contextPath } = this.props;
    let targetFallbackImage = this.fallbackImage;

    if (!targetFallbackImage.includes('http')) {
      targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
    }

    return targetFallbackImage;
  }

  fetchPlaceholder() {
    const targetFallbackImage = this.getFallbackImageURL();

    // using the fetchContent seems both more reliable
    // and allows for conditional calls whereas useContent hook does not
    if (!targetFallbackImage.includes('/resources/')) {
      this.fetchContent({
        placeholderResizedImageOptions: {
          source: 'resize-image-api',
          query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
        },
      });
    }
  }

  render() {
    if (this.lazyLoad && isServerSide() && !this.isAdmin) { // On Server
      return null;
    }

    const { placeholderResizedImageOptions } = this.state;
    const targetFallbackImage = this.getFallbackImageURL();

    return (
      <LazyLoad enabled={this.lazyLoad && !this.isAdmin}>
        <SimpleList
          {...this.props}
          placeholderResizedImageOptions={placeholderResizedImageOptions}
          targetFallbackImage={targetFallbackImage}
          websiteDomain={this.websiteDomain}
          imageProps={this.imageProps}
        />
      </LazyLoad>
    );
  }
}

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

  return (
    <div key={id} className="list-container layout-section">
      { title
        ? (
          <PrimaryFont as="div" className="list-title">
            {title}
          </PrimaryFont>
        ) : null}
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
    </div>
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
