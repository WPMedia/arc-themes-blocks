import React from 'react';
import VideoPlayer from '@wpmedia/video-player-block';

const VideoPlayerTopTable = ({ embedMarkup }) => (
  <VideoPlayer embedMarkup={embedMarkup} enableAutoplay={false} />
);

export default VideoPlayerTopTable;
