import React from 'react';
import { useFusionContext } from 'fusion:context';
import EmbedContainer from 'react-oembed-container';

const VideoPlayer = () => {
  const { globalContent: { embed_html: embedHTML = '' } = {} } = useFusionContext();
  console.log(embedHTML);
  return (
    <EmbedContainer markup={embedHTML}>
      <div dangerouslySetInnerHTML={{ __html: embedHTML }} />
    </EmbedContainer>
  );
};

export default VideoPlayer;
