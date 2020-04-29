import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import ArticleDate from '@wpmedia/date-block';
import Byline from '@wpmedia/byline-block';
import { Image } from '@wpmedia/engine-theme-sdk';
import PlaceholderImage from '@wpmedia/placeholder-image-block';
import './card-list.scss';
import { Image } from '@wpmedia/engine-theme-sdk';

function extractImage(promo) {
  return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
}

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const Title = styled.div`
  font-family: ${(props) => props.primaryFont};
`;

@Consumer
class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = { cardList: {} };
    this.fetchStories();
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
    const { cardList: { content_elements: contentElements = [] } = {} } = this.state;
    const showSeparator = !!(
      contentElements[0]
      && contentElements[0].credits
      && contentElements[0].credits.by
      && contentElements[0].credits.by.length !== 0
    );

    return (
      (contentElements.length > 0
        && (
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
                  href={contentElements[0].website_url}
                  title={contentElements[0].headlines.basic}
                  className="list-anchor"
                  id="card-list--link-container"
                >
                  {
                    extractImage(contentElements[0].promo_items) ? (
                      <Image
                        url={extractImage(contentElements[0].promo_items)}
                        alt={contentElements[0].headlines.basic}
                        // first element is always bigger
                        smallWidth={377}
                        smallHeight={283}
                        mediumWidth={377}
                        mediumHeight={283}
                        largeWidth={377}
                        largeHeight={283}
                        // todo: add resized params
                      />
                    ) : (
                      <PlaceholderImage
                        smallWidth={377}
                        smallHeight={283}
                        mediumWidth={377}
                        mediumHeight={283}
                        largeWidth={377}
                        largeHeight={283}
                      />
                    )
                  }
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
                      {/* separator will only be shown if there is at least one author */}
                      { showSeparator && <p className="dot-separator">&#9679;</p> }
                      <ArticleDate
                        classNames="story-date"
                        date={contentElements[0].display_date}
                      />
                    </div>
                  </div>
                </a>
              </div>
              {
                contentElements.slice(1).map((element) => {
                  const {
                    headlines: { basic: headlineText } = {},
                    website_url: websiteUrl,
                  } = element;
                  return (
                    <div
                      className="card-list-item"
                      key={`result-card-${element.canonical_url}`}
                      type="1"
                    >
                      <a
                        href={websiteUrl}
                        title={headlineText}
                        className="headline-list-anchor"
                      >
                        <HeadlineText
                          primaryFont={getThemeStyle(this.arcSite)['primary-font-family']}
                          className="headline-text"
                        >
                          {headlineText}
                        </HeadlineText>
                      </a>
                      <a
                        href={websiteUrl}
                        title={headlineText}
                        className="list-anchor-image"
                      >
                        {
                          extractImage(element.promo_items)
                            ? (
                              <Image
                                url={extractImage(element.promo_items)}
                                alt={headlineText}
                                // small, matches numbered list, is 3:2 aspect ratio
                                smallWidth={105}
                                smallHeight={70}
                                mediumWidth={105}
                                mediumHeight={70}
                                largeWidth={274}
                                largeHeight={183}
                                // todo: add resized params
                              />
                            )
                            : (
                              <PlaceholderImage
                                smallWidth={105}
                                smallHeight={70}
                                mediumWidth={105}
                                mediumHeight={70}
                                largeWidth={274}
                                largeHeight={183}
                              />
                            )
                        }
                      </a>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )
      )
    );
  }
}

CardList.label = 'Card List – Arc Block';

CardList.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed').tag(
      {
        group: 'Configure Content',
        label: 'Display Content Info',
      },
    ),
    title: PropTypes.string,
  }),
};

export default CardList;
