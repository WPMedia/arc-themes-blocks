import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import './simple-results-list.scss';

function extractImage(promo) {
  if (promo && promo.basic && promo.basic.type === 'image') {
    return `${promo.basic.url}`;
  }
  return null;
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

  // This is used to fetch data and set the state of the component to the fetched data
  fetchStories() {
    const { customFields: { resultListSchema } } = this.props;
    const { contentService, contentConfigValues } = resultListSchema;
    this.fetchContent({
      resultList: {
        source: contentService,
        query: contentConfigValues,
      },
    });
  }

  // Section to render headline
  renderHeadline(headline) {
    return <HeadlineText primaryFont={getThemeStyle(this.arcSite)['primary-font-family']} className="headline-text">{headline}</HeadlineText>;
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
          } = element;
          return (
            <div className="list-item-simple" key={`result-card-${element.canonical_url}`}>
              <a
                href={this.constructHref()}
                title={headlineText}
                className="simple-list-anchor"
              >
                {extractImage(element.promo_items) ? (
                  <img
                    className="simple-list-photo"
                    src={extractImage(element.promo_items)}
                    alt={headlineText}
                  />
                ) : <div className="image-placeholder-sm" />}
                <div className="headline-description">
                  <div>
                    { this.renderHeadline(headlineText) }
                  </div>
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
    resultListSchema: PropTypes.contentConfig('ans-feed'),
    title: PropTypes.string,
  }),
};

export default SimpleResultsList;
