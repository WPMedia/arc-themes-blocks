/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';

import { Image } from '@wpmedia/engine-theme-sdk';
import './numbered-list.scss';
import { extractResizedParams } from '@wpmedia/resizer-image-block';

function extractImage(promo) {
  return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
}

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const Number = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const Title = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

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
    this.primaryFont = getThemeStyle(this.arcSite)['primary-font-family'];
  }


  getFallbackImageURL() {
    const { deployment, contextPath, arcSite } = this.props;
    let targetFallbackImage = getProperties(arcSite).fallbackImage;

    // if true then it's a local image
    // else it's a url image that can be served
    if (targetFallbackImage && !(targetFallbackImage.includes('http'))) {
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

    this.fetchContent({
      placeholderResizedImageOptions: {
        source: 'resize-image-api',
        query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
      },
    });
  }

  render() {
    const {
      customFields: {
        showHeadline = true,
        showImage = true,
        title = '',
      },
      arcSite,
    } = this.props;
    const {
      resultList: { content_elements: contentElements = [] } = {},
      placeholderResizedImageOptions,
    } = this.state;

    const targetFallbackImage = this.getFallbackImageURL();

    return (
      <div className="numbered-list-container">
        {(title !== '' && contentElements && contentElements.length) ? (
          <Title className="list-title" primaryFont={this.primaryFont}>
            {title}
          </Title>
        ) : null }
        {(contentElements && contentElements.length) ? contentElements.map((element, i) => {
          const {
            headlines: { basic: headlineText } = {},
            promo_items: promoItems,
            websites,
          } = element;
          const url = websites[arcSite].website_url;
          return (
            <div className="numbered-list-item" key={`result-card-${url}`} type="1">
              {showHeadline
              && (
              <a
                href={url}
                title={headlineText}
                className="headline-list-anchor"
              >
                <Number secondaryFont={getThemeStyle(this.arcSite)['secondary-font-family']} className="list-item-number">{i + 1}</Number>
                <HeadlineText primaryFont={getThemeStyle(this.arcSite)['primary-font-family']} className="headline-text">{headlineText}</HeadlineText>
              </a>
              )}
              {showImage
              && (
              <a
                href={url}
                title={headlineText}
                className="list-anchor-image"
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
                    alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
                    url={targetFallbackImage}
                    breakpoints={getProperties(arcSite)?.breakpoints}
                    resizedImageOptions={placeholderResizedImageOptions}
                    resizerURL={getProperties(arcSite)?.resizerURL}
                  />
                )}
              </a>
              )}
            </div>
          );
        }) : null}
      </div>
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
  }),
};

NumberedList.label = 'Numbered List – Arc Block';

export default NumberedList;
