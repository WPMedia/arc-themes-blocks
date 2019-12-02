/* eslint-disable camelcase */
import React from 'react';
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

  const { inheritGlobalContent = {}, websiteURL = '' } = customFields;
  const { globalContent: { embed_html = '' } = {}, arcSite } = useFusionContext();
  let embedHTML = '';
  // eslint-disable-next-line react/destructuring-assignment
  if (!inheritGlobalContent) {
    const content = useContent({
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
