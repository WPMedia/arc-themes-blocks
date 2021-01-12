import React from 'react';
import VideoPlayer from '@wpmedia/video-player-block';

const VideoPlayerSection = ({ key, embedHtml }) => (
  <section key={key} className="block-margin-bottom">
    <VideoPlayer embedMarkup={embedHtml} />
  </section>
);

export default VideoPlayerSection;
