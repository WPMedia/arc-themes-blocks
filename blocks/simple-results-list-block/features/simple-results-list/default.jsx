import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import './simple-results-list.scss';

function extractImage(promo) {
  return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
}

const HeadlineText = styled.h2`
  font-family: ${props => props.primaryFont};
`;

const Title = styled.div`
  font-family: ${props => props.primaryFont};
`;

@Consumer
class SimpleResultsList extends Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = { resultList: {} };
    this.fetchStories();
  }

  constructHref(websiteUrl) {
    const { arcSite } = this.props;
    const {
      websiteDomain,
    } = getProperties(arcSite);
    return (window && window.location.hostname === 'localhost')
      ? `https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/${websiteUrl}` : `${websiteDomain}/${websiteUrl}`;
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
    const { customFields: { title } = {} } = this.props;
    const { resultList: { content_elements: contentElements = [] } } = this.state;
    return (
      <div className="simple-results-list-container">
        {title ? <Title primaryFont={getThemeStyle(this.arcSite)['primary-font-family']} className="simple-list-title">{title}</Title> : ''}
        {contentElements && contentElements.length && contentElements.map((element) => {
          const {
            headlines: { basic: headlineText } = {},
            website_url: websiteUrl,
          } = element;
          return (
            <div className="list-item-simple" key={`result-card-${element.canonical_url}`}>
              <a
                href={this.constructHref(websiteUrl)}
                title={headlineText}
                className="simple-list-anchor"
              >
                {extractImage(element.promo_items) ? (
                  <img
                    className="simple-list-image"
                    src={extractImage(element.promo_items)}
                    alt={headlineText}
                  />
                ) : <div className="image-placeholder-sm" />}
                <div className="headline-description">
                  <HeadlineText primaryFont={getThemeStyle(this.arcSite)['primary-font-family']} className="headline-text">{headlineText}</HeadlineText>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}

SimpleResultsList.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed'),
    title: PropTypes.string,
  }),
};

export default SimpleResultsList;
