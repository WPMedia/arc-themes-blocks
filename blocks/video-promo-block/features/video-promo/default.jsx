import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { videoOrg, videoEnv } from 'fusion:environment';
import { useFusionContext } from 'fusion:context';
import { Video } from '@wpmedia/engine-theme-sdk';

// aspect ratio for video player engine theme sdk
const RATIO = 0.5625;

const TitleText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const AlertBadge = styled.span`
  background-color: #db0a07;
  border-radius: 5px;
  color: #fff;
  display: inline-block;
  padding: 0.3rem 0.8rem;
`;

const VideoPromo = ({ customFields }) => {
  const { arcSite } = useFusionContext();
  const {
    autoplay = false,
    inheritGlobalContent = true,
    playthrough = false,
    alertBadge,
  } = customFields;

  // title and description can be overwritten by globalContent
  const {
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
          {alertBadge && <AlertBadge>{alertBadge}</AlertBadge>}
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
            // RATIO is a constant declared at top of file
            aspectRatio={RATIO}
            org={videoOrg}
            env={videoEnv}
            playthrough={playthrough}
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
      defaultValue: true,
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
    alertBadge: PropTypes.string.tag({
      label: 'Alert Badge',
      group: 'Display settings',
    }),
    playthrough: PropTypes.bool.tag({
      label: 'Playthrough',
      defaultValue: false,
      group: 'Video settings',
    }),
  }),
};

VideoPromo.label = 'Video Promo – Arc Block';

export default VideoPromo;
