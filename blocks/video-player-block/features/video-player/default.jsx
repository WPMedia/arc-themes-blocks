/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import EmbedContainer from 'react-oembed-container';

const VideoPlayer = (props) => {
  const {
    customFields = {},
    isChildComponent,
    _html = '',
  } = props;

  const { inheritGlobalContent = false, websiteURL = '' } = customFields;
  const { globalContent: { embed_html = '' } = {}, arcSite } = useFusionContext();

  let embedHTML = '';

  // eslint-disable-next-line react/destructuring-assignment
  if (!inheritGlobalContent) {
    const { embed_html: fetchedEmbedMarkup = '' } = useContent({
      source: 'content-api',
      query: {
        website_url: websiteURL,
        site: arcSite,
      },
    });
    embedHTML = (content) ? content.embed_html : '';
  } else if (isChildComponent) {
    embedHTML = _html;
  } else {
    embedHTML = embed_html;
  }

  embedHTML = embedHTML.replace('<script', '<!--script');
  embedHTML = embedHTML.replace('script>', 'script-->');

  // Make sure that the player does not render until component did mount
  embedHTML = embedHTML.replace('powa', 'powa-skip');

  
  useEffect(() => {
    const powaEl = document.querySelector('.powa-skip:not(.powa)');
    if (powaEl) {
      powaEl.classList.remove('powa-skip');
      powaEl.classList.add('powa');
      if (window.powaBoot) window.powaBoot();
    }
  });

  return (
    <EmbedContainer markup={embedHTML}>
      <div dangerouslySetInnerHTML={{ __html: embedHTML }} />
    </EmbedContainer>
  );
};

VideoPlayer.propTypes = {
  customFields: PropTypes.shape({
    inheritGlobalContent: PropTypes.bool,
    websiteURL: PropTypes.string,
  }),
};


export default VideoPlayer;
