/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent, useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import '@arc-test-org/shared-styles/scss/_small-promo.scss';
import { Image } from '@arc-test-org/engine-theme-sdk';

const HeadlineText = styled.h1`
  font-family: ${(props) => props.primaryFont};
`;

const SmallPromo = ({ customFields, arcSite }) => {
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

  const extractImage = (promo) => promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;

  const headlineClass = customFields.showImage ? 'col-sm-xl-8' : 'col-sm-xl-12 no-image-padding';

  return content && (
    <article className="container-fluid small-promo">
      <div className="row sm-promo-padding-btm">
        {customFields.showHeadline
        && (
          <div className={headlineClass}>
            <a
              href={buildHref(content.website_url)}
              className="sm-promo-headline"
              title={content && content.headlines ? content.headlines.basic : ''}
            >
              <HeadlineText
                primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
                className="sm-promo-headline"
                {...editableContent(content, 'headlines.basic')}
              >
                {content && content.headlines ? content.headlines.basic : ''}
              </HeadlineText>
            </a>
          </div>
        )}
        {customFields.showImage
        && (
          <div className="col-sm-xl-4">
            <a
              href={buildHref(content.website_url)}
              title={content && content.headlines ? content.headlines.basic : ''}
            >
              <Image
                url={customFields.imageOverrideURL
                  ? customFields.imageOverrideURL : extractImage(content.promo_items)}
                alt={content && content.headlines ? content.headlines.basic : ''}
                smallWidth={275}
                smallHeight={183}
                mediumWidth={275}
                mediumHeight={183}
                largeWidth={400}
                largeHeight={267}
              />
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

SmallPromo.propTypes = {
  customFields: PropTypes.shape({
    itemContentConfig: PropTypes.contentConfig('ans-item').tag(
      {
        group: 'Configure Content',
        label: 'Display Content Info',
      },
    ),
    showHeadline: PropTypes.bool.tag(
      {
        label: 'Show headline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showImage: PropTypes.bool.tag(
      {
        label: 'Show image',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    imageOverrideURL: PropTypes.string.tag({
      label: 'Image URL',
      group: 'Image',
    }),
  }),
};

SmallPromo.label = 'Small Promo – Arc Block';

export default SmallPromo;
