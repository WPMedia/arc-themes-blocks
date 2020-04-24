/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';

import { Image } from '@wpmedia/engine-theme-sdk';
import './numbered-list.scss';

function extractImage(promo) {
  return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
}

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const Number = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

@Consumer
class NumberedList extends Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = {};
    this.fetchStories();
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

  render() {
    const {
      customFields: {
        showHeadline = true,
        showImage = true,
      },
    } = this.props;
    const { resultList: { content_elements: contentElements = [] } = {} } = this.state;
    return (
      <div className="numbered-list-container">
        {contentElements && contentElements.length && contentElements.map((element, i) => {
          const {
            headlines: { basic: headlineText } = {},
            website_url: websiteUrl,
            promo_items: promoItems,
            canonical_url: canonicalUrl,
          } = element;
          return (
            <div className="numbered-list-item" key={`result-card-${canonicalUrl}`} type="1">
              {showHeadline
              && (
              <a
                href={websiteUrl}
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
                href={websiteUrl}
                title={headlineText}
                className="list-anchor-image"
              >
                {extractImage(promoItems) ? (
                  <Image
                    url={extractImage(promoItems)}
                    alt={headlineText}
                    // small, including numbered list, is 3:2 aspect ratio
                    smallWidth={105}
                    smallHeight={70}
                    mediumWidth={105}
                    mediumHeight={70}
                    largeWidth={274}
                    largeHeight={183}

                  />
                ) : <div className="numbered-list-placeholder" />}
              </a>
              )}
            </div>
          );
        })}
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
