import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { videoOrg, videoEnv } from 'fusion:environment';
import { useFusionContext } from 'fusion:context';
import { Video, videoPlayerCustomFields } from '@wpmedia/engine-theme-sdk';

const TitleText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const AlertBadge = styled.span`
  background-color: #db0a07;
  border-radius: 1.5rem;
  color: #fff;
  display: inline-block;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  line-height: 1;
  font-weight: bold;
`;

const VideoPromo = ({ customFields }) => {
  const { arcSite } = useFusionContext();
  const {
    autoplay,
    inheritGlobalContent,
    playthrough,
    alertBadge,
    // title and description can be overwritten by globalContent
    title,
    description,
  } = customFields;

  const { globalContent = {} } = useFusionContext();

  const customContent = useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? { 'arc-site': arcSite, ...customFields.itemContentConfig.contentConfigValues }
      : null,
  });

  const content = inheritGlobalContent ? globalContent : customContent;
  const videoId = content?._id;

  if (!videoId || !content) {
    return null;
  }
  return (
    <div className="container-fluid video-promo">
      <div className="row">
        <div className="col-sm-xl-12">
          {alertBadge
            && (
            <div className="padding-sm-bottom">
              <AlertBadge>{alertBadge}</AlertBadge>
            </div>
            )}
          {title
            && (
            <TitleText
              primaryFont={getThemeStyle(arcSite)['primary-font-family']}
              className="xl-promo-headline"
            >
              {title}
            </TitleText>
            )}
          <Video
            uuid={videoId}
            autoplay={autoplay}
            org={videoOrg}
            env={videoEnv}
            playthrough={playthrough}
            shrinkToFit={customFields?.shrinkToFit}
            viewportPercentage={customFields?.viewportPercentage}
          />
          {description
            && (
            <DescriptionText
              secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
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
    itemContentConfig: PropTypes.contentConfig('ans-item').tag({
      label: 'Video Content',
      group: 'Configure Content',
    }),
    inheritGlobalContent: PropTypes.bool.tag({
      label: 'Inherit global content',
      group: 'Configure Content',
      defaultValue: true,
    }),
    autoplay: PropTypes.bool.tag({
      label: 'Autoplay',
      defaultValue: false,
      group: 'Video Settings',
    }),
    title: PropTypes.string.tag({
      label: 'Title',
      group: 'Display Settings',
    }),
    description: PropTypes.string.tag({
      label: 'Description',
      group: 'Display Settings',
    }),
    alertBadge: PropTypes.string.tag({
      label: 'Alert Badge',
      group: 'Display Settings',
    }),
    playthrough: PropTypes.bool.tag({
      label: 'Playthrough',
      defaultValue: false,
      group: 'Video Settings',
    }),
    ...(videoPlayerCustomFields()),
  }),
};

VideoPromo.label = 'Video Promo – Arc Block';

export default VideoPromo;
