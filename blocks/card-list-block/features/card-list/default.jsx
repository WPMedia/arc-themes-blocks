/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import ArticleDate from '@wpmedia/date-block';
import Byline from '@wpmedia/byline-block';
import { Image, LazyLoad } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams } from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';
import './card-list.scss';

function getResizedImage(promo) {
  if (promo?.basic?.type === 'image' && promo?.basic?.resized_params) {
    return promo.basic.resized_params;
  }

  if (promo?.lead_art?.promo_items) {
    return getResizedImage(promo.lead_art.promo_items);
  }

  return null;
}

function extractImage(promo) {
  if (promo?.basic?.type === 'image' && promo?.basic?.url) {
    return promo.basic.url;
  }

  if (promo?.lead_art?.promo_items) {
    return extractImage(promo.lead_art.promo_items);
  }

  return null;
}

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

HeadlineText.displayName = 'HeadlineText';

const Title = styled.div`
  font-family: ${(props) => props.primaryFont};
`;

@Consumer
class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = {
      cardList: {},
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
    const { customFields: { title, lazyLoad = false } = {}, arcSite } = this.props;
    const {
      cardList: { content_elements: pageContent = [] } = {},
      placeholderResizedImageOptions,
    } = this.state;

    const contentElements = pageContent.reduce((acc, element) => {
      if (element.websites?.[arcSite]) {
        return acc.concat(element);
      }
      return acc;
    }, []);

    const showSeparator = !!(
      contentElements[0]
      && contentElements[0].credits
      && contentElements[0].credits.by
      && contentElements[0].credits.by.length !== 0
    );
    const targetFallbackImage = this.getFallbackImageURL();

    const CardListRender = () => (
      <div className="card-list-container">
        <div className="simple-results-list-container">
          {
            title
              ? (
                <Title
                  primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                  className="card-list-title"
                >
                  {title}
                </Title>
              )
              : ''
          }
          <article
            className="list-item-simple"
            key={`result-card-${contentElements[0].websites[arcSite].website_url}`}
          >
            <a
              href={contentElements[0].websites[arcSite].website_url}
              className="list-anchor card-list--link-container vertical-align-image"
              aria-label={contentElements[0].headlines.basic}
            >
              {
                extractImage(contentElements[0].promo_items) ? (
                  <Image
                    url={extractImage(contentElements[0].promo_items)}
                    alt={contentElements[0].headlines.basic}
                    smallWidth={377}
                    smallHeight={283}
                    mediumWidth={377}
                    mediumHeight={283}
                    largeWidth={377}
                    largeHeight={283}
                    resizedImageOptions={getResizedImage(contentElements[0].promo_items)}
                    breakpoints={getProperties(arcSite)?.breakpoints}
                    resizerURL={getProperties(arcSite)?.resizerURL}
                  />
                ) : (
                  <Image
                    smallWidth={377}
                    smallHeight={283}
                    mediumWidth={377}
                    mediumHeight={283}
                    largeWidth={377}
                    largeHeight={283}
                    alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
                    url={targetFallbackImage}
                    breakpoints={getProperties(arcSite)?.breakpoints}
                    resizedImageOptions={placeholderResizedImageOptions}
                    resizerURL={getProperties(arcSite)?.resizerURL}

                  />
                )
              }
            </a>
            { contentElements[0].websites[arcSite].website_section
              && (
              <Title
                primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                className="card-list-overline"
              >
                {contentElements[0].websites[arcSite].website_section.name}
              </Title>
              )}
            <div>
              <HeadlineText
                primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                className="card-list-headline"
              >
                <a
                  href={contentElements[0].websites[arcSite].website_url}
                  className="list-anchor card-list--link-container vertical-align-image"
                  aria-hidden="true"
                  tabIndex="-1"
                >
                  {contentElements[0].headlines.basic}
                </a>
              </HeadlineText>
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
          </article>
          {
            contentElements.slice(1).map((element) => {
              const {
                headlines: { basic: headlineText } = {},
              } = element;
              const url = element.websites[arcSite].website_url;
              return (
                <React.Fragment key={`result-card-${url}`}>
                  <hr />
                  <article
                    className="card-list-item card-list-item-margins"
                    key={`result-card-${url}`}
                    type="1"
                  >
                    <a
                      href={url}
                      className="headline-list-anchor vertical-align-image"
                    >
                      <HeadlineText
                        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                        className="headline-text"
                      >
                        {headlineText}
                      </HeadlineText>
                    </a>
                    <a
                      href={url}
                      className="list-anchor-image vertical-align-image"
                      aria-hidden="true"
                      tabIndex="-1"
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
                              resizedImageOptions={extractResizedParams(element)}
                              breakpoints={getProperties(arcSite)?.breakpoints}
                              resizerURL={getProperties(arcSite)?.resizerURL}
                            />
                          )
                          : (
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
                          )
                      }
                    </a>
                  </article>
                </React.Fragment>
              );
            })
          }
        </div>
      </div>
    );

    return (
      contentElements.length > 0 && (
        <LazyLoad enabled={lazyLoad}>
          <CardListRender />
        </LazyLoad>
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
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

export default CardList;
