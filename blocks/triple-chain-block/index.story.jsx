import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import TripleChain from './chains/triple-chain/default';

export default {
  title: 'Chains/Triple',
  decorators: [withKnobs],
  parameters: {
    // Set the viewports in Chromatic at a component level.
    chromatic: { viewports: [320, 740, 1200] },
  },
};

const styles = {
  backgroundColor: 'rgb(240 240 240)',
};

const Comp1 = () => <div style={styles}>1</div>;
const Comp2 = () => <div style={styles}>2</div>;
const Comp3 = () => <div style={styles}>3</div>;

export const allColumns = () => {
  const customFields = {
    columnOne: 1,
    columnTwo: 1,
    heading: 'Triple Chain Heading',
  };

  return (
    <TripleChain customFields={customFields}>
      <Comp1 />
      <Comp2 />
      <Comp3 />
    </TripleChain>
  );
};

export const allColumnsNoTitle = () => {
  const customFields = {
    columnOne: 1,
    columnTwo: 1,
  };

  return (
    <TripleChain customFields={customFields}>
      <Comp1 />
      <Comp2 />
      <Comp3 />
    </TripleChain>
  );
};

export const zeroColumns = () => {
  const customFields = {
    columnOne: 0,
    columnTwo: 0,
    heading: 'Triple Chain Heading',
  };

  return (
    <TripleChain customFields={customFields}>
      <Comp1 />
      <Comp2 />
      <Comp3 />
    </TripleChain>
  );
};

export const columnOneOnly = () => {
  const customFields = {
    columnOne: 1,
    columnTwo: 0,
    heading: 'Triple Chain Heading',
  };

  return (
    <TripleChain customFields={customFields}>
      <Comp1 />
      <Comp2 />
      <Comp3 />
    </TripleChain>
  );
};
