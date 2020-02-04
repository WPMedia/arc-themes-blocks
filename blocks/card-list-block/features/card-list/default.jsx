import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { Image } from '@arc-test-org/engine-theme-sdk';
import ArticleDate from '@arc-test-org/date-block';
import Overline from '@arc-test-org/overline-block';
import Byline from '@arc-test-org/byline-block';
import './card-list.scss';

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
class CardList extends Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = { cardList: {} };
    this.fetchStories();
  }

  constructHref(websiteUrl) {
    const { arcSite } = this.props;
    const {
      websiteDomain,
    } = getProperties(arcSite);
    return (window && window.location.hostname === 'localhost')
      ? `https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/${websiteUrl}`
      : `${websiteDomain}/${websiteUrl}`;
  }

  fetchStories() {
    const { customFields: { listContentConfig } } = this.props;
    const { contentService, contentConfigValues } = listContentConfig;
    this.fetchContent({
      cardList: {
        source: contentService,
        query: contentConfigValues,
      },
    });
  }

  render() {
    const { customFields: { title } = {} } = this.props;
    const { cardList: { content_elements: contentElements = [] } } = this.state;
    console.log('CONTENT', contentElements);
    // const title = 'Test';
    const testArr = [
      {
        headlines: {
          basic: 'Fusce vehicula dolor arcu, sit amet blandit dolor dolor',
        },
        credits: {
          by: 'Author',
        },
        display_date: 'Date',
        website_url: 'url',
        canonical_url: 'cannonical_url',
        promo_items: 'promo',
        websites: {
          'the-sun': {
            website_section: {
              name: 'Overline',
            },
          },
        },
      },
      {
        headlines: {
          basic: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
        },
        website_url: 'url',
        canonical_url: 'cannonical_url',
        promo_items: {
          basic: {
            type: 'image',
            url: 'https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/DPD3743AIBHAPLN5YRJBLWZ5RI.png'
          },
        },
      },
      {
        headlines: {
          basic: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
        },
        website_url: 'url',
        canonical_url: 'cannonical_url',
        promo_items: 'promo',
      },
      {
        headlines: {
          basic: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
        },
        website_url: 'url',
        canonical_url: 'cannonical_url',
        promo_items: 'promo',
      },
    ];
    // const showSeparator = contentElements[0].credits.by && contentElements[0].credits.by.length !== 0;
    return (
      <div className="card-list-container">
        <div className="simple-results-list-container">
          {
            title
              ? (
                <Title
                  primaryFont={getThemeStyle(this.arcSite)['primary-font-family']}
                  className="card-list-title"
                >
                  {title}
                </Title>
              )
              : ''
          }
          <div
            className="list-item-simple"
            key={`result-card-${contentElements[0].canonical_url}`}
          >
            <a
              href={this.constructHref(contentElements[0].websiteUrl)}
              title={contentElements[0].headlines.basic}
              className="list-anchor"
            >
              {extractImage(contentElements[0].promo_items) ? (
                <img
                  src={extractImage(contentElements[0].promo_items)}
                  alt={contentElements[0].headlines.basic}
                  className="card-list-main-img"
                />
              ) : <div className="image-placeholder-sm tetsy" />}
              {/* {<Overline />} */}
              <Title
                primaryFont={getThemeStyle(this.arcSite)['primary-font-family']}
                className="card-list-overline"
              >
                {contentElements[0].websites[this.arcSite].website_section.name}
              </Title>
              <div>
                <Title
                  primaryFont={getThemeStyle(this.arcSite)['primary-font-family']}
                  className="card-list-headline"
                >
                  {contentElements[0].headlines.basic}
                </Title>
                <div className="author-date">
                  <Byline story={contentElements[0]} stylesFor="list" />
                  {/* The Separator will only be shown if there is at least one author name */}
                  {/* { showSeparator && <p className="dot-separator">&#9679;</p> } */}
                  <ArticleDate
                    classNames="story-date"
                    date={contentElements[0].display_date}
                  />
                  {/* <p>{contentElements[0].display_date}</p> */}
                </div>
              </div>
            </a>
          </div>
          {
            contentElements && contentElements.length > 0 && contentElements.map((element) => {
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
                    <div className="headline-description">
                      <HeadlineText
                        primaryFont={getThemeStyle(this.arcSite)['primary-font-family']}
                        className="headline-text"
                      >
                        {headlineText}
                      </HeadlineText>
                    </div>
                    {extractImage(element.promo_items) ? (
                      <img
                        src={extractImage(element.promo_items)}
                        alt={headlineText}
                        className="card-list-img"
                      />
                    ) : <div className="image-placeholder-sm" />}
                  </a>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

CardList.label = 'Card List Test – Arc Block';

CardList.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed'),
    title: PropTypes.string,
  }),
};

export default CardList;
