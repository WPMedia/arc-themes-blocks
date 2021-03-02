import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
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
  title: 'Shared Styles',
  decorators: [withKnobs],
  component: VSpace,
};

export const VerticalSpace = () => {
  const data = {
    space: select('Default Spacing', makeValueSameAsLabel(framework.spacers), 'md'),
    breakpoint: select('Breakpoint', makeValueSameAsLabel(framework.gridBreakpoints), 'md'),
    breakpointSpace: select('Spacing after Breakpoint', makeValueSameAsLabel(framework.spacers), 'lg'),
  };

  const sampleBlockStyles = {
    backgroundColor: 'rgb(240, 240, 240)',
    height: '10vh',
  };

  return (
    <VSpace {...data}>
      <div style={sampleBlockStyles} />
      <hr />
      <div style={sampleBlockStyles} />
      <hr />
      <div style={sampleBlockStyles} />
      <hr />
      <div style={sampleBlockStyles} />
      <hr />
    </VSpace>
  );
};
