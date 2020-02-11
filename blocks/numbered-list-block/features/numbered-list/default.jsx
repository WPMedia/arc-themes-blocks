import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import './numbered-list.scss';

function extractImage(promo) {
  return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
}

const HeadlineText = styled.h2`
  font-family: ${props => props.primaryFont};
`;

const Number = styled.p`
  font-family: ${props => props.secondaryFont};
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
      <div className="numbered-list-container">
        {contentElements && contentElements.length && contentElements.map((element, i) => {
          const {
            headlines: { basic: headlineText } = {},
            website_url: websiteUrl,
          } = element;
          return (
            <div className="numbered-list-item" key={`result-card-${element.canonical_url}`} type="1">
              <a
                href={this.constructHref(websiteUrl)}
                title={headlineText}
                className="headline-list-anchor"
              >
                <Number secondaryFont={getThemeStyle(this.arcSite)['secondary-font-family']} className="list-item-number">{i + 1}</Number>
                <HeadlineText primaryFont={getThemeStyle(this.arcSite)['primary-font-family']} className="headline-text">{headlineText}</HeadlineText>
              </a>
              <a
                href={this.constructHref(websiteUrl)}
                title={headlineText}
                className="list-anchor-image"
              >
                {extractImage(element.promo_items) ? (
                  <img
                    src={extractImage(element.promo_items)}
                    alt={headlineText}
                  />
                ) : <div className="numbered-list-placeholder" />}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}

NumberedList.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed'),
  }),
};

export default NumberedList;
