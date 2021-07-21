import React from 'react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { framework } from '@wpmedia/news-theme-css/js/framework';

import VSpace from './index';

// VSpace component takes the string name of the object to perform
// the look up - this function makes the object to have the value
// the same as the key for storybook knobs controls
const makeValueSameAsLabel = (keyValueObject) => {
  const newKeyMap = {};
  Object.keys(keyValueObject).forEach((item) => {
    newKeyMap[item] = item;
  });
  return newKeyMap;
};

export default {
  title: 'Shared Styles/Vertical Spacing',
  decorators: [withKnobs],
  parameters: {
    // Set the viewports in Chromatic at a component level.
    chromatic: { viewports: [320, 1200] },
  },
};

const sampleBlockStyles = {
  backgroundColor: 'rgb(240, 240, 240)',
  height: '10vh',
};

export const defaultValues = () => {
  const data = {
    space: select('Default Spacing', makeValueSameAsLabel(framework.spacers), 'lg'),
    breakpoint: select('Breakpoint', makeValueSameAsLabel(framework.gridBreakpoints), 'md'),
    breakpointSpace: select('Spacing after Breakpoint', makeValueSameAsLabel(framework.spacers), 'md'),
    childrenSeparator: boolean('Show separator between items', true),
  };

  return (
    <VSpace {...data}>
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
    </VSpace>
  );
};

export const twoChildren = () => (
  <VSpace>
    <div style={sampleBlockStyles} />
    <div style={sampleBlockStyles} />
  </VSpace>
);

export const defaultWithBlockAfter = () => (
  <>
    <VSpace>
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
    </VSpace>
    <div style={{ backgroundColor: 'rgb(200 200 200)', height: '10vh' }} />
  </>
);

export const nested = () => (
  <VSpace>
    <VSpace breakpointSpace="lg">
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
    </VSpace>
    <div style={{ backgroundColor: 'rgb(200 200 200)', height: '10vh' }} />
    <div style={{ backgroundColor: 'rgb(200 200 200)', height: '10vh' }} />
  </VSpace>
);

export const noSeparator = () => (
  <VSpace childrenSeparator={false}>
    <div style={sampleBlockStyles} />
    <div style={sampleBlockStyles} />
    <div style={sampleBlockStyles} />
    <div style={sampleBlockStyles} />
  </VSpace>
);

export const noSeparatorBlockAfter = () => (
  <>
    <VSpace childrenSeparator={false}>
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
      <div style={sampleBlockStyles} />
    </VSpace>
    <div style={{ backgroundColor: 'rgb(200 200 200)', height: '10vh' }} />
  </>
);
