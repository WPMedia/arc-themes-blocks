/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent, useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import Byline from '@arc-test-org/byline-block';
import ArticleDate from '@arc-test-org/date-block';
import '@arc-test-org/shared-styles/scss/_extra-large-promo.scss';
import { Image } from '@arc-test-org/engine-theme-sdk';

const HeadlineText = styled.h1`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const OverlineLink = styled.a`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const ExtraLargePromo = ({ customFields, arcSite }) => {
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

  const overlineDisplay = (content.label && content.label.basic && content.label.basic.display)
  || false;
  const overlineUrl = (content.label && content.label.basic && content.label.basic.url)
    || '';
  const overlineText = (content.label && content.label.basic && content.label.basic.text)
    || '';

  const extractImage = (promo) => promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;

  const overlineTmpl = () => {
    if (customFields.showOverline && overlineDisplay) {
      return (
        (
          <OverlineLink
            href={overlineUrl}
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            className="overline"
            {...editableContent(content, 'content.label.basic.text')}
          >
            {overlineText}
          </OverlineLink>
        )
      );
    }
    return null;
  };

  const headlineTmpl = () => {
    if (customFields.showHeadline && headlineText) {
      return (
        <a
          href={buildHref(content.website_url)}
          className="xl-promo-headline"
          title={content && content.headlines ? content.headlines.basic : ''}
        >
          <HeadlineText
            primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
            className="xl-promo-headline"
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
    <article className="container-fluid xl-large-promo">
      <div className="row xl-promo-padding-bottom">
        {(customFields.showHeadline || customFields.showDescription
          || customFields.showByline || customFields.showDate)
        && (
          <div className="col-sm-xl-12 flex-col">
            {overlineTmpl()}
            {headlineTmpl()}
            {customFields.showImage
            && (
              <a
                href={buildHref(content.website_url)}
                title={content && content.headlines ? content.headlines.basic : ''}
              >
                <Image
                  url={customFields.imageOverrideURL
                    ? customFields.imageOverrideURL : extractImage(content.promo_items)}
                  alt={content && content.headlines ? content.headlines.basic : ''}
                  smallWidth={800}
                  smallHeight={0}
                  mediumWidth={800}
                  mediumHeight={0}
                  largeWidth={800}
                  largeHeight={0}
                />
              </a>
            )}
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

ExtraLargePromo.propTypes = {
  customFields: PropTypes.shape({
    showOverline: PropTypes.bool.tag(
      {
        name: 'Show overline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
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

ExtraLargePromo.label = 'Extra Large Promo – Arc Block';

export default ExtraLargePromo;
