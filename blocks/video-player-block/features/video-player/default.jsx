import React, { useEffect, useRef } from 'react';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import EmbedContainer from 'react-oembed-container';
import './default.scss';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';

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
  line-height: 1.33;
  font-weight: bold;
`;

const VideoPlayer = (props) => {
  const {
    customFields = {},
    embedMarkup,
    enableAutoplay = false,
  } = props;

  const {
    autoplay,
    inheritGlobalContent,
    playthrough,
    alertBadge,
    title,
    description,
    websiteURL,
  } = customFields;

  const { id, globalContent = {}, arcSite } = useFusionContext();
  const videoRef = useRef(id);
  let embedHTML = '';
  let doFetch = false;

  // If it's inheriting from global content, use the html from the content
  if (inheritGlobalContent) {
    embedHTML = globalContent?.embed_html;
  } else if (embedMarkup) {
    // If there is an embed html being passed in from a parent, use that
    embedHTML = embedMarkup;
  } else {
    doFetch = true;
  }

  // In all other scenarios, fetch from the provided url and content api
  const customFieldSource = customFields?.itemContentConfig?.contentService ?? null;
  const contentConfigValues = customFields?.itemContentConfig?.contentConfigValues;
  // Support for deprecated 'websiteURL' custom field (use 'content-api' & URL for fetch)
  const fetchSource = doFetch ? (
    (!!websiteURL && 'content-api') || customFieldSource
  ) : null;
  const fetchDataQuery = websiteURL ? {
    website_url: websiteURL,
    site: arcSite,
  } : (contentConfigValues && { 'arc-site': arcSite, ...contentConfigValues }) || null;

  const fetchedData = useContent({
    source: fetchSource,
    query: fetchDataQuery,
  });

  embedHTML = doFetch ? fetchedData && fetchedData.embed_html : embedHTML;

  if ((enableAutoplay || autoplay) && embedHTML) {
    const position = embedHTML.search('id=');
    embedHTML = [embedHTML.slice(0, position), ' data-autoplay=true data-muted=true ', embedHTML.slice(position)].join('');
  }

  if (playthrough && embedHTML) {
    const position = embedHTML.search('id=');
    embedHTML = [embedHTML.slice(0, position), ' data-playthrough=true ', embedHTML.slice(position)].join('');
  }

  // Make sure that the player does not render until after component is mounted
  embedHTML = embedHTML && embedHTML.replace('<script', '<!--script')
    .replace('script>', 'script-->');

  useEffect(() => {
    const powaEl = document.getElementById(`video-${videoRef.current}`).firstElementChild;

    if (powaEl) {
      if (window.powaBoot) window.powaBoot();
    }
  });

  return (
    <div className="container-fluid video-promo">
      {alertBadge
        && (
        <div className="padding-sm-bottom">
          <AlertBadge>{alertBadge}</AlertBadge>
        </div>
        )}
      {title
      && (
      <TitleText
        primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
        className="xl-promo-headline"
      >
        {title}
      </TitleText>
      )}
      <div className="embed-video">
        <EmbedContainer markup={embedHTML}>
          <div id={`video-${videoRef.current}`} dangerouslySetInnerHTML={{ __html: embedHTML }} />
        </EmbedContainer>
      </div>
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
  );
};

VideoPlayer.propTypes = {
  customFields: PropTypes.shape({
    websiteURL: PropTypes.string.tag({
      group: 'Configure Content',
      label: 'Display Content Info',
      hidden: true,
    }),
    itemContentConfig: PropTypes.contentConfig('ans-item').tag(
      {
        label: 'Video Content',
        group: 'Configure Content',
      },
    ),
    inheritGlobalContent: PropTypes.bool.tag({
      group: 'Configure Content',
      label: 'Inherit global content',
      defaultValue: true,
    }),
    autoplay: PropTypes.bool.tag(
      {
        label: 'Autoplay',
        defaultValue: false,
        group: 'Video settings',
      },
    ),
    playthrough: PropTypes.bool.tag({
      label: 'Playthrough',
      defaultValue: false,
      group: 'Video settings',
    }),
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
  }),
  embedMarkup: PropTypes.string,
  enableAutoplay: PropTypes.bool,
};

VideoPlayer.label = 'Video Center Player - Arc Block';

export default VideoPlayer;
