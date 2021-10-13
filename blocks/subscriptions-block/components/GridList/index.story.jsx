import React from 'react';

import GridList from '.';

export default {
  title: 'Blocks/Subscriptions/Components/Grid List',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const threeItems = () => (
  <GridList>
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
  </GridList>
);

export const fourItems = () => (
  <GridList>
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
  </GridList>
);

export const fiveItems = () => (
  <GridList>
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
    <div style={{ background: 'rgb(200 200 200)', height: '5vh' }} />
  </GridList>
);
