import React, { useEffect, useRef } from 'react';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import EmbedContainer from 'react-oembed-container';
import './default.scss';

const VideoPlayer = (props) => {
  const {
    customFields = {},
    embedMarkup,
  } = props;

  const { inheritGlobalContent = false, websiteURL = '' } = customFields;
  const { id, globalContent: { embed_html: globalContentHTML = '' } = {}, arcSite } = useFusionContext();
  const videoRef = useRef(id);
  let embedHTML = '';

  // If it's inheriting from global content, use the html from the content
  if (inheritGlobalContent) {
    embedHTML = globalContentHTML;
  } else if (embedMarkup) {
    // If there is an embed html being passed in from a parent, use that
    embedHTML = embedMarkup;
  } else {
    // In all other scenarios, fetch from the provided url and content api
    const { embed_html: fetchedEmbedMarkup = '' } = useContent({
      source: 'content-api',
      query: {
        website_url: websiteURL,
        site: arcSite,
      },
    });
    embedHTML = fetchedEmbedMarkup;
  }

  // Make sure that the player does not render until after component is mounted
  embedHTML = embedHTML.replace('<script', '<!--script')
    .replace('script>', 'script-->')
    .replace('powa', 'powa-skip');

  useEffect(() => {
    const powaEl = document.getElementById(`video-${videoRef.current}`).firstElementChild;

    if (powaEl) {
      powaEl.classList.remove('powa-skip');
      powaEl.classList.add('powa');
      if (window.powaBoot) window.powaBoot();
    }
  });

  return (
    <div className="embed-video">
      <EmbedContainer markup={embedHTML}>
        <div id={`video-${videoRef.current}`} dangerouslySetInnerHTML={{ __html: embedHTML }} />
      </EmbedContainer>
    </div>
  );
};

VideoPlayer.propTypes = {
  customFields: PropTypes.shape({
    websiteURL: PropTypes.string.tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    inheritGlobalContent: PropTypes.bool.tag({
      group: 'Configure Content',
    }),
  }),
};

VideoPlayer.label = 'Video Center Player - Arc Block';

export default VideoPlayer;
