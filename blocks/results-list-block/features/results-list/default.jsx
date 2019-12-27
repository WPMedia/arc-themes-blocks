import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import Byline from '@arc-test-org/byline-block';
import ArticleDate from '@arc-test-org/date-block';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import './results-list.scss';

function extractImage(promo) {
  if (promo && promo.basic && promo.basic.type === 'image') {
    return `${promo.basic.url}`;
  }
  return null;
}

const HeadlineText = styled.div`
  font-family: ${props => props.primaryFont};
`;

const DescriptionText = styled.div`
  font-family: ${props => props.secondaryFont};
`;

@Consumer
class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = { resultList: {} };
    this.fetchStories();
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
    const { listType = 'default' } = this.props;
    switch (listType) {
      case 'simple':
      case 'default':
      default:
        return <HeadlineText primaryFont={getThemeStyle(this.arcSite)['primary-font-family']} className="headline-text">{headline}</HeadlineText>;
    }
  }

  // section to control description text
  renderDescription(description) {
    const { listType = 'default' } = this.props;
    switch (listType) {
      case 'simple':
        return null;
      case 'default':
      default:
        return <DescriptionText secondaryFont={getThemeStyle(this.arcSite)['secondary-font-family']} className="description-text">{description}</DescriptionText>;
    }
  }

  // Section to render byLine(Author Names) and date
  renderBylineAndDate(element, date, showSeperator) {
    const { listType = 'default' } = this.props;
    switch (listType) {
      // A simple list does not contain a description text
      case 'simple':
        return null;
      case 'default':
      default:
        return (
          <>
            <Byline story={element} nameClass="nameStyles" byClass="byClass" />
            {/* The Seperator will only be shown if there is atleast one author name */}
            { showSeperator && <p className="dot-separator">&#9679;</p> }
            <ArticleDate classNames="story-date" date={date} />
          </>
        );
    }
  }

  render() {
    const { classNames } = this.props;
    const { resultList: { content_elements: contentElements = [] } } = this.state;
    return (
      <div className="results-list-container">
        {contentElements && contentElements.length && contentElements.map((element) => {
          const {
            description: { basic: descriptionText } = {},
            headlines: { basic: headlineText } = {},
            display_date: displayDate,
            credits: { by } = {},
          } = element;
          const showSeperator = by.length !== 0;
          return (
            <div className={`list-item ${classNames}`} key={`result-card-${element.canonical_url}`}>
              <a
                href={element.canonical_url}
                title={headlineText}
                className="list-anchor"
              >
                {extractImage(element.promo_items) ? (
                  <img
                    src={extractImage(element.promo_items)}
                    alt={headlineText}
                  />
                ) : <div className="image-placeholder" />}
                <div className={descriptionText ? 'headline-description' : 'headline-description headline-description-spacing'}>
                  <div>
                    { this.renderHeadline(headlineText) }
                    { this.renderDescription(descriptionText) }
                  </div>
                  <div className="author-date">
                    { this.renderBylineAndDate(element, displayDate, showSeperator) }
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

ResultsList.propTypes = {
  customFields: PropTypes.shape({
    resultListSchema: PropTypes.contentConfig('ans-feed'),
  }),
  listType: PropTypes.string,
  classNames: PropTypes.string,
};

export default ResultsList;
