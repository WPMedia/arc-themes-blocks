import React, { useEffect, useRef } from 'react';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  // presentational component does not do data fetching
  VideoPlayer as VideoPlayerPresentational,
  videoPlayerCustomFields,
} from '@wpmedia/engine-theme-sdk';
import { PrimaryFont, SecondaryFont } from '@wpmedia/shared-styles';

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

  useEffect(() => {
    if (document.getElementById(`video-${videoRef.current}`)) {
      const powaEl = document.getElementById(`video-${videoRef.current}`).firstElementChild;

      if (powaEl) {
        if (window.powaBoot) window.powaBoot();
      }
    }
  });

  return (
    <div className="container-fluid">
      {alertBadge
        && (
        <div className="padding-sm-bottom">
          <AlertBadge>{alertBadge}</AlertBadge>
        </div>
        )}
      {title
      && (
      <PrimaryFont as="h2" className="xl-promo-headline">
        {title}
      </PrimaryFont>
      )}
      {embedHTML && (
        <VideoPlayerPresentational
          id={id}
          embedMarkup={embedHTML}
          enableAutoplay={enableAutoplay}
          shrinkToFit={customFields?.shrinkToFit}
          viewportPercentage={customFields?.viewportPercentage}
          customFields={{
            autoplay,
            playthrough,
          }}
        />
      )}
      {description
        && (
        <SecondaryFont
          as="p"
          className="description-text"
        >
          {description}
        </SecondaryFont>
        )}
    </div>
  );
};

VideoPlayer.propTypes = {
  customFields: PropTypes.shape({
    websiteURL: PropTypes.string.tag({
      label: 'Display Content Info',
      hidden: true,
      group: 'Configure Content',
    }),
    itemContentConfig: PropTypes.contentConfig('ans-item').tag({
      label: 'Video Content',
      group: 'Configure Content',
    }),
    inheritGlobalContent: PropTypes.bool.tag({
      label: 'Inherit global content',
      defaultValue: true,
      group: 'Configure Content',
    }),
    autoplay: PropTypes.bool.tag({
      label: 'Autoplay',
      defaultValue: false,
      group: 'Video Settings',
    }),
    playthrough: PropTypes.bool.tag({
      label: 'Playthrough',
      defaultValue: false,
      group: 'Video Settings',
    }),
    ...(videoPlayerCustomFields()),
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
