import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent, useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';

import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import Overline from '@wpmedia/overline-block';
import {
  extractVideoEmbedFromStory,
  // presentational component does not do data fetching
  VideoPlayer as VideoPlayerPresentational,
  LazyLoad, isServerSide,
} from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import { PromoHeadline, PromoImage } from '@wpmedia/shared-styles';

import '@wpmedia/shared-styles/scss/_large-promo.scss';

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const LargePromoItem = ({ customFields }) => {
  const { arcSite, id, isAdmin } = useFusionContext();
  const { editableContent, searchableField } = useEditableContent();

  const content = useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? {
        'arc-site': arcSite,
        feature: 'large-promo',
        ...customFields.itemContentConfig.contentConfigValues,
      }
      : null,
    filter: `{
      _id
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
      description {
        basic
      }
      display_date
      type
      headlines {
        basic
      }
      label {
        basic {
          display
          url
          text
        }
      }
      promo_items {
        type
        url
        lead_art {
          embed_html
          type
          promo_items {
            basic {
              type
              url
              resized_params {
                377x283
                377x251
                377x212
                274x206
                274x183
                274x154
              }
            }
          }
        }
        basic {
          type
          url
          resized_params {
            377x283
            377x251
            377x212
            274x206
            274x183
            274x154
          }
        }
      }
      embed_html
      website_url
      websites {
        ${arcSite} {
          website_url
          website_section {
            _id
            name
          }
        }
      }
    }`,
  }) || null;

  const { website_section: websiteSection } = content?.websites?.[arcSite] ?? {
    website_section: null,
  };
  const descriptionText = content && content.description ? content.description.basic : null;
  const showSeparator = content && content.credits && content.credits.by
      && content.credits.by.length !== 0;
  const byLineArray = (content && content.credits && content.credits.by
      && content.credits.by.length !== 0) ? content.credits.by : null;
  const dateText = content && content.display_date ? content.display_date : null;
  const overlineDisplay = (content?.label?.basic?.display ?? null)
      || (content?.websites?.[arcSite] && websiteSection)
      || false;
  const textClass = customFields.showImage ? 'col-sm-12 col-md-xl-6 flex-col' : 'col-sm-xl-12 flex-col';

  const overlineTmpl = () => {
    if (customFields.showOverline && overlineDisplay) {
      return (
        (
          <Overline
            className="overline"
            story={content}
            editable
          />
        )
      );
    }
    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescription && descriptionText) {
      return (
        <DescriptionText
          secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
          className="description-text"
          {...editableContent(content, 'description.basic')}
          suppressContentEditableWarning
        >
          {descriptionText}
        </DescriptionText>
      );
    }
    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showByline && byLineArray) {
      return (
        <>
          <Byline story={content} stylesFor="list" />
          { showSeparator && <p className="dot-separator">&#9679;</p> }
        </>
      );
    }
    return null;
  };

  const dateTmpl = () => {
    if (customFields.showDate && dateText) {
      return (
        <>
          <ArticleDate date={dateText} />
        </>
      );
    }
    return null;
  };

  const videoEmbed = customFields?.playVideoInPlace && extractVideoEmbedFromStory(content);

  return (
    <>
      <article className="container-fluid large-promo">
        <div className="row">
          { customFields.showImage && (
            <div className="col-sm-12 col-md-xl-6 flex-col" style={{ position: isAdmin ? 'relative' : null }}>
              {
                videoEmbed ? (
                  <VideoPlayerPresentational
                    id={id}
                    embedMarkup={videoEmbed}
                    enableAutoplay={false}
                  />
                ) : (
                  <div {...searchableField('imageOverrideURL')}>
                    <PromoImage
                      content={content}
                      customImageURL={customFields.imageOverrideURL}
                      showPromoLabel
                      promoSize="LG"
                      promoLabelSize="large"
                      imageRatio={customFields.imageRatio}
                      lazyLoad={customFields.lazyLoad}
                    />
                  </div>
                )
              }
            </div>
          )}
          {(customFields.showHeadline || customFields.showDescription
            || customFields.showByline || customFields.showDate)
          && (
            <div className={textClass}>
              {overlineTmpl()}
              {customFields.showHeadline ? (
                <PromoHeadline
                  content={content}
                  headingClassName="lg-promo-headline"
                  linkClassName="lg-promo-headline"
                />
              ) : null}
              {descriptionTmpl()}
              <div className="article-meta">
                {byLineTmpl()}
                {dateTmpl()}
              </div>
            </div>
          )}
        </div>
      </article>
      <hr />
    </>
  );
};

const LargePromo = ({ customFields }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <LargePromoItem customFields={{ ...customFields }} />
    </LazyLoad>
  );
};

LargePromo.propTypes = {
  customFields: PropTypes.shape({
    itemContentConfig: PropTypes.contentConfig('ans-item').tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    showOverline: PropTypes.bool.tag({
      label: 'Show overline',
      defaultValue: true,
      group: 'Show promo elements',
    }),
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
    showDescription: PropTypes.bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    showByline: PropTypes.bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    showDate: PropTypes.bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    imageOverrideURL: PropTypes.string.tag({
      label: 'Image URL',
      group: 'Image',
      searchable: 'image',
    }),
    ...imageRatioCustomField('imageRatio', 'Art', '4:3'),
    playVideoInPlace: PropTypes.bool.tag({
      label: 'Play video in place',
      group: 'Art',
      defaultValue: false,
    }),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),

};

LargePromo.label = 'Large Promo – Arc Block';

export default LargePromo;
