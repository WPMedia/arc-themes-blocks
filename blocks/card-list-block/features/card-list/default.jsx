/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React from 'react';
import ArticleDate from '@wpmedia/date-block';
import { Image, LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams, extractImageFromStory } from '@wpmedia/resizer-image-block';
import {
  Byline, Heading, HeadingSection, Overline,
} from '@wpmedia/shared-styles';
import getProperties from 'fusion:properties';
import './card-list.scss';

@Consumer
class CardList extends React.Component {
  constructor(props) {
    super(props);
    const { lazyLoad = false } = props.customFields || {};

    this.arcSite = props.arcSite;
    this.lazyLoad = lazyLoad;
    this.isAdmin = props.isAdmin;

    this.siteProperties = getProperties(props.arcSite);

    this.largeImageOptions = {
      smallWidth: 377,
      smallHeight: 283,
      mediumWidth: 377,
      mediumHeight: 283,
      largeWidth: 377,
      largeHeight: 283,
      breakpoints: this.siteProperties?.breakpoints,
      resizerURL: this.siteProperties?.resizerURL,
    };

    this.samllImageOptions = {
      smallWidth: 105,
      smallHeight: 70,
      mediumWidth: 105,
      mediumHeight: 70,
      largeWidth: 105,
      largeHeight: 70,
      breakpoints: this.siteProperties?.breakpoints,
      resizerURL: this.siteProperties?.resizerURL,
    };

    this.state = {
      cardList: {},
      placeholderResizedImageOptions: {},
    };

    this.fetchPlaceholder();

    // Fetch stories if lazyLoad is not enabled, the code is running on the server
    if (!this.lazyLoad && isServerSide()) {
      this.fetchStories();
    }
  }

  componentDidMount() {
    this.fetchStories();
  }

  getFallbackImageURL() {
    const { deployment, contextPath } = this.props;
    let targetFallbackImage = this.siteProperties.fallbackImage;

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
        query: { ...contentConfigValues, feature: 'card-list' },
        filter: `{
          content_elements {
            _id,
            display_date
            credits {
              by {
                _id
                name
                url
                type
                additional_properties {
                  original {
                    byline
                  }
                }
              }
            }
            headlines {
              basic
            }
            owner {
              sponsored
            }
            promo_items {
              basic {
                type
                url
                resized_params {
                  377x283
                  274x183
                  105x70
                }
              }
              lead_art {
                promo_items {
                  basic {
                    type
                    url
                    resized_params {
                      377x283
                      274x183
                      105x70
                    }
                  }
                }
                type
              }
            }
            websites {
              ${this.arcSite} {
                website_url
                website_section {
                  name
                }
              }
            }
          }
        }`,
      },
    });
  }

  render() {
    if (this.lazyLoad && isServerSide() && !this.isAdmin) {
      return null;
    }

    const { customFields: { title } = {}, arcSite } = this.props;
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

    const Wrapper = title ? HeadingSection : React.Fragment;

    const CardListItems = () => (
      (contentElements.length > 0
        ? (
          <HeadingSection>
            <div className="card-list-container">
              {title
                ? (
                  <Heading className="card-list-title">
                    {title}
                  </Heading>
                ) : null}
              <Wrapper>
                <article
                  className="list-item-simple"
                  key={`card-list-${contentElements[0].websites[arcSite].website_url}`}
                >
                  <a
                    href={contentElements[0].websites[arcSite].website_url}
                    className="list-anchor card-list--link-container vertical-align-image"
                    aria-hidden="true"
                    tabIndex="-1"
                  >
                    {extractImageFromStory(contentElements[0]) ? (
                      <Image
                        {...this.largeImageOptions}
                        url={extractImageFromStory(contentElements[0])}
                        alt={contentElements[0].headlines.basic}
                        resizedImageOptions={extractResizedParams(contentElements[0])}
                      />
                    ) : (
                      <Image
                        {...this.largeImageOptions}
                        url={targetFallbackImage}
                        alt={this.siteProperties.primaryLogoAlt || ''}
                        resizedImageOptions={placeholderResizedImageOptions}
                      />
                    )}
                  </a>
                  <Overline story={contentElements[0]} className="card-list-overline" />
                  <Heading className="card-list-headline">
                    <a
                      href={contentElements[0].websites[arcSite].website_url}
                      className="list-anchor vertical-align-image"
                      id="card-list--headline-link"
                    >
                      {contentElements[0].headlines.basic}
                    </a>
                  </Heading>
                  <div className="author-date">
                    <Byline content={contentElements[0]} list separator={showSeparator} font="Primary" />
                    <ArticleDate
                      classNames="story-date"
                      date={contentElements[0].display_date}
                    />
                  </div>
                </article>
                {contentElements.slice(1).map((element) => {
                  const {
                    headlines: { basic: headlineText } = {},
                  } = element;
                  const imageURL = extractImageFromStory(element);
                  const url = element.websites[arcSite].website_url;
                  return (
                    <React.Fragment key={`card-list-${url}`}>
                      <article
                        className="card-list-item card-list-item-margins"
                        key={`card-list-${url}`}
                        type="1"
                      >
                        <a
                          href={url}
                          className="headline-list-anchor vertical-align-image"
                        >
                          <Heading className="headline-text">
                            {headlineText}
                          </Heading>
                        </a>
                        <a
                          href={url}
                          className="list-anchor-image vertical-align-image"
                          aria-hidden="true"
                          tabIndex="-1"
                        >
                          <Image
                            {...this.samllImageOptions}
                            url={imageURL || targetFallbackImage}
                            alt={imageURL ? headlineText : this.siteProperties.primaryLogoAlt || ''}
                            resizedImageOptions={imageURL
                              ? extractResizedParams(element) : placeholderResizedImageOptions}
                          />
                        </a>
                      </article>
                    </React.Fragment>
                  );
                })}
              </Wrapper>
            </div>
          </HeadingSection>
        ) : null
      )
    );

    return (
      <LazyLoad enabled={this.lazyLoad && !this.isAdmin}>
        <CardListItems />
      </LazyLoad>
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
