import React from 'react';
import VideoPlayer from './features/video-player/default';

export default {
  title: 'Blocks/Video Player',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const base = () => (
  <VideoPlayer />
);
