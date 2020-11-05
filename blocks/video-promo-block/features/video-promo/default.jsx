/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { videoOrg, videoEnv } from 'fusion:environment';
import { useFusionContext, useAppContext } from 'fusion:context';
import { Video } from '@wpmedia/engine-theme-sdk';

const RATIO = 0.5625;

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
    autoplay = false,
    live = false,
    inheritGlobalContent,
  } = customFields;

  // can be overwrite by globalContent
  let {
    title,
    description,
  } = customFields;

  const { globalContent = {} } = useFusionContext();

  const content = inheritGlobalContent ? globalContent : useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? { 'arc-site': arcSite, ...customFields.itemContentConfig.contentConfigValues }
      : null,
  });
  let videoId = content?._id;
  // use globalcontent
  if (inheritGlobalContent && globalContent) {
    if (globalContent?.promo_items?.lead_art?.type === 'video') {
      const videoProps = globalContent?.promo_items?.lead_art;
      title = videoProps?.headline?.basic;
      description = videoProps?.description?.basic;
      videoId = videoProps?._id;
    }
  }

  if (!content) {
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
            uuid={videoId}
            autoplay={autoplay}
            aspectRatio={RATIO}
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
    inheritGlobalContent: PropTypes.bool.tag({
      label: 'Inherit global content',
      group: 'Configure Content',
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
      group: 'Display settings',
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
