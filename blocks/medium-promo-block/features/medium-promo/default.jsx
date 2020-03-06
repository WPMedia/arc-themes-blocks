/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent, useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import '@wpmedia/shared-styles/scss/_medium-promo.scss';
import { Image } from '@wpmedia/engine-theme-sdk';

const HeadlineText = styled.h1`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const MediumPromo = ({ customFields, arcSite }) => {
  const { editableContent } = useEditableContent();

  const content = useContent({
    source: customFields.itemContentConfig.contentService,
    query: customFields.itemContentConfig.contentConfigValues,
  }) || null;

  const buildHref = (websiteUrl) => {
    const {
      websiteDomain,
    } = getProperties(arcSite);
    return `${websiteDomain}/${websiteUrl}`;
  };

  const headlineText = content && content.headlines ? content.headlines.basic : null;
  const descriptionText = content && content.description ? content.description.basic : null;
  const showSeparator = content && content.credits && content.credits.by
    && content.credits.by.length !== 0;
  const byLineArray = (content && content.credits && content.credits.by
    && content.credits.by.length !== 0) ? content.credits.by : null;
  const dateText = content && content.display_date ? content.display_date : null;

  const extractImage = (promo) => promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;

  const textClass = customFields.showImage ? 'col-sm-12 col-md-xl-8 flex-col' : 'col-sm-xl-12 flex-col';

  const headlineTmpl = () => {
    if (customFields.showHeadline && headlineText) {
      return (
        <a
          href={buildHref(content.website_url)}
          className="md-promo-headline"
          title={content && content.headlines ? content.headlines.basic : ''}
        >
          <HeadlineText
            primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
            className="md-promo-headline"
            {...editableContent(content, 'headlines.basic')}
          >
            {headlineText}
          </HeadlineText>
        </a>
      );
    }
    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescription && byLineArray) {
      return (
        <DescriptionText
          secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
          className="description-text"
          {...editableContent(content, 'description.basic')}
        >
          {descriptionText}
        </DescriptionText>
      );
    }
    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showByline && descriptionText) {
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

  return content && (
    <article className="container-fluid medium-promo">
      <div className="row med-promo-padding-bottom">
        {customFields.showImage
        && (
          <div className="col-sm-12 col-md-xl-4">
            <a
              href={buildHref(content.website_url)}
              title={content && content.headlines ? content.headlines.basic : ''}
            >
              <Image
                url={customFields.imageOverrideURL
                  ? customFields.imageOverrideURL : extractImage(content.promo_items)}
                alt={content && content.headlines ? content.headlines.basic : ''}
                smallWidth={275}
                smallHeight={0}
                mediumWidth={275}
                mediumHeight={0}
                largeWidth={400}
                largeHeight={0}
              />
            </a>
          </div>
        )}
        {(customFields.showHeadline || customFields.showDescription
          || customFields.showByline || customFields.showDate)
        && (
          <div className={textClass}>
            {headlineTmpl()}
            {descriptionTmpl()}
            <div className="article-meta">
              {byLineTmpl()}
              {dateTmpl()}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

MediumPromo.propTypes = {
  customFields: PropTypes.shape({
    showHeadline: PropTypes.bool.tag(
      {
        name: 'Show headline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showImage: PropTypes.bool.tag(
      {
        name: 'Show image',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDescription: PropTypes.bool.tag(
      {
        name: 'Show description',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showByline: PropTypes.bool.tag(
      {
        name: 'Show byline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDate: PropTypes.bool.tag(
      {
        name: 'Show date',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    imageOverrideURL: PropTypes.string.tag({
      name: 'Image URL',
      group: 'Image',
    }),
    itemContentConfig: PropTypes.contentConfig('ans-item'),
  }),

};

MediumPromo.label = 'Medium Promo – Arc Block';

export default MediumPromo;
