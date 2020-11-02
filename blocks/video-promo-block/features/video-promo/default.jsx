/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { videoOrg, videoEnv } from 'fusion:environment';
import { useFusionContext } from 'fusion:context';
import { Video } from '@wpmedia/engine-theme-sdk';

const TitleText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const LiveLabel = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  color: #FFFFFF;
  background-color: #DB0A07;
  border-radius: 5px;
`;

const VideoPromo = ({ customFields }) => {
  const { arcSite } = useFusionContext();
  const {
    uuid,
    autoplay = false,
    ratio = 0.5625,
    title,
    description,
    live = false,
  } = customFields;

  const content = uuid ? null : useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? { 'arc-site': arcSite, ...customFields.itemContentConfig.contentConfigValues }
      : null,
  });

  if (!uuid && !content) {
    return null;
  }

  return (
    <div className="container-fluid video-promo">
      <div className="row">
        <div className="col-sm-xl-12">
          {live && <LiveLabel>LIVE VIDEO</LiveLabel>}
          {title
            && (
            <TitleText
              primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
              className="xl-promo-headline"
            >
              {title}
            </TitleText>
            )}
          <Video
            uuid={uuid || content._id}
            autoplay={autoplay}
            aspectRatio={ratio}
            org={videoOrg}
            env={videoEnv}
          />
          {description
            && (
            <DescriptionText
              secondaryFont={getThemeStyle(getProperties(arcSite))['secondary-font-family']}
              className="description-text"
            >
              {description}
            </DescriptionText>
            )}
        </div>
      </div>
    </div>
  );
};

VideoPromo.propTypes = {
  customFields: PropTypes.shape({
    itemContentConfig: PropTypes.contentConfig('ans-item').tag(
      {
        label: 'Video Content',
        group: 'Configure Content',
      },
    ),
    website_url: PropTypes.string.tag({
      group: 'Configure Content',
    }),
    inheritGlobalContent: PropTypes.boolean.tag({
      group: 'Configure Content',
      label: 'Inherit global content',
    }),
    autoplay: PropTypes.bool.tag(
      {
        label: 'Autoplay',
        defaultValue: false,
        group: 'Video settings',
      },
    ),
    title: PropTypes.string.tag({
      label: 'Title',
      group: 'Display Setting',
    }),
    description: PropTypes.string.tag({
      label: 'Description',
      group: 'Display settings',
    }),
    live: PropTypes.bool.tag(
      {
        label: 'Live',
        defaultValue: false,
        group: 'Display settings',
      },
    ),
  }),
};

VideoPromo.label = 'Video Promo – Arc Block';

export default VideoPromo;
