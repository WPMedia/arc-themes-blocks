import React from 'react';
import SubHeadline from './features/subheadline/default';

export default {
  title: 'Blocks/Subheadline',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const subHeadline = () => (<SubHeadline />);
