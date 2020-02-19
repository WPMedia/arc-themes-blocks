import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import Byline from '@arc-test-org/byline-block';
import ArticleDate from '@arc-test-org/date-block';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { Image } from '@arc-test-org/engine-theme-sdk';
import './results-list.scss';

function extractImage(promo) {
  return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
}

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

@Consumer
class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = { resultList: {} };
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

  constructHref(websiteUrl) {
    const { arcSite } = this.props;
    const {
      websiteDomain,
    } = getProperties(arcSite);
    return (typeof window !== 'undefined' && window.location.hostname === 'localhost')
      ? `https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/${websiteUrl}` : `${websiteDomain}/${websiteUrl}`;
  }

  render() {
    const { resultList: { content_elements: contentElements = [] } = {} } = this.state;
    return (
      <div className="results-list-container">
        {contentElements && contentElements.length > 0 && contentElements.map((element) => {
          const {
            description: { basic: descriptionText } = {},
            headlines: { basic: headlineText } = {},
            display_date: displayDate,
            credits: { by } = {},
            website_url: websiteUrl,
          } = element;
          const showSeparator = by && by.length !== 0;
          return (
            <div className="list-item" key={`result-card-${element.canonical_url}`}>
              <a
                href={this.constructHref(websiteUrl)}
                title={headlineText}
                className="list-anchor"
              >
                {extractImage(element.promo_items) ? (
                  <Image
                    url={extractImage(element.promo_items)}
                    alt={headlineText}
                    smallWidth={274}
                    smallHeight={148}
                    mediumWidth={274}
                    mediumHeight={148}
                    largeWidth={274}
                    largeHeight={148}
                  />
                ) : <div className="image-placeholder" />}
              </a>
              <div className={descriptionText ? 'headline-description' : 'headline-description headline-description-spacing'}>
                <div>
                  <a
                    href={this.constructHref(websiteUrl)}
                    title={headlineText}
                    className="list-anchor"
                  >
                    <HeadlineText primaryFont={getThemeStyle(this.arcSite)['primary-font-family']} className="headline-text">{headlineText}</HeadlineText>
                  </a>
                  <DescriptionText secondaryFont={getThemeStyle(this.arcSite)['secondary-font-family']} className="description-text">{descriptionText}</DescriptionText>
                </div>
                <div className="author-date">
                  <Byline story={element} stylesFor="list" />
                  {/* The Separator will only be shown if there is atleast one author name */}
                  { showSeparator && <p className="dot-separator">&#9679;</p> }
                  <ArticleDate classNames="story-date" date={displayDate} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

ResultsList.label = 'Results List – Arc Block';

ResultsList.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed'),
  }),
};

export default ResultsList;
