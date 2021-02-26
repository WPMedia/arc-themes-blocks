/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import getProperties from 'fusion:properties';
import { Image, LazyLoad } from '@wpmedia/engine-theme-sdk';
import './numbered-list.scss';
import { extractResizedParams } from '@wpmedia/resizer-image-block';
import { PrimaryFont, SecondaryFont } from '@wpmedia/shared-styles';

function extractImage(promo) {
  return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
}

@Consumer
class NumberedList extends Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = {
      placeholderResizedImageOptions: {},
    };
    this.fetchStories();
    this.fetchPlaceholder();
  }

  getFallbackImageURL() {
    const { arcSite, deployment, contextPath } = this.props;
    let targetFallbackImage = getProperties(arcSite).fallbackImage;

    if (!targetFallbackImage.includes('http')) {
      targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
    }

    return targetFallbackImage;
  }

  fetchStories() {
    const { customFields: { listContentConfig } } = this.props;
    const { contentService, contentConfigValues } = listContentConfig;
    this.fetchContent({
      resultList: {
        source: contentService,
        query: contentConfigValues,
      },
    });
  }

  fetchPlaceholder() {
    const targetFallbackImage = this.getFallbackImageURL();

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
    const {
      customFields: {
        showHeadline = true,
        showImage = true,
        title = '',
        lazyLoad,
      },
      arcSite,
    } = this.props;
    const {
      resultList: { content_elements: contentElements = [] } = {},
      placeholderResizedImageOptions,
    } = this.state;

    const targetFallbackImage = this.getFallbackImageURL();

    const NumberedListRender = () => (
      <div className="numbered-list-container layout-section">
        {(title !== '' && contentElements && contentElements.length) ? (
          <PrimaryFont as="h2" className="list-title">
            {title}
          </PrimaryFont>
        ) : null }
        {(contentElements && contentElements.length) ? contentElements.map((element, i) => {
          const {
            headlines: { basic: headlineText } = {},
            promo_items: promoItems,
            websites,
          } = element;

          if (!websites[arcSite]) {
            return null;
          }
          const url = websites[arcSite].website_url;

          return (
            <React.Fragment key={`result-card-${url}`}>
              <div className="numbered-list-item numbered-item-margins" key={`result-card-${url}`} type="1">
                {showHeadline
                && (
                <a href={url} className="headline-list-anchor">
                  <SecondaryFont as="p" className="list-item-number">{i + 1}</SecondaryFont>
                  <PrimaryFont as="h2" className="headline-text">{headlineText}</PrimaryFont>
                </a>
                )}
                {showImage
                && (
                <a
                  href={url}
                  className="list-anchor-image vertical-align-image"
                  aria-hidden="true"
                  tabIndex="-1"
                >
                  {extractImage(promoItems) ? (
                    <Image
                      resizedImageOptions={extractResizedParams(element)}
                      url={extractImage(promoItems)}
                      alt={headlineText}
                      // small, including numbered list, is 3:2 aspect ratio
                      smallWidth={105}
                      smallHeight={70}
                      mediumWidth={105}
                      mediumHeight={70}
                      largeWidth={274}
                      largeHeight={183}
                      breakpoints={getProperties(arcSite)?.breakpoints}
                      resizerURL={getProperties(arcSite)?.resizerURL}
                    />
                  ) : (
                    <Image
                      smallWidth={105}
                      smallHeight={70}
                      mediumWidth={105}
                      mediumHeight={70}
                      largeWidth={274}
                      largeHeight={183}
                      alt={getProperties(arcSite)?.primaryLogoAlt || 'Placeholder logo'}
                      url={targetFallbackImage}
                      breakpoints={getProperties(arcSite)?.breakpoints}
                      resizedImageOptions={placeholderResizedImageOptions}
                      resizerURL={getProperties(arcSite)?.resizerURL}
                    />
                  )}
                </a>
                )}
              </div>
              <hr />
            </React.Fragment>
          );
        }) : null}
      </div>
    );

    return (
      <LazyLoad enabled={lazyLoad}>
        <NumberedListRender />
      </LazyLoad>
    );
  }
}

NumberedList.propTypes = {
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
      description: 'Lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

NumberedList.label = 'Numbered List – Arc Block';

export default NumberedList;
