import React from 'react';
import VideoPlayer from '@wpmedia/video-player-block';

const VideoPlayerLeadArt = ({ embedMarkup, enableAutoplay, customFields }) => (
  <VideoPlayer
    embedMarkup={embedMarkup}
    enableAutoplay={enableAutoplay}
    customFields={customFields}
  />
);

export default VideoPlayerLeadArt;
