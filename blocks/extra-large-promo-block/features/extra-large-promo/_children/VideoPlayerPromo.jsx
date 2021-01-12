import React from 'react';
import VideoPlayer from '@wpmedia/video-player-block';

const VideoPlayerPromo = ({ videoEmbed }) => (
  <VideoPlayer embedMarkup={videoEmbed} enableAutoplay={false} />
);

export default VideoPlayerPromo;
