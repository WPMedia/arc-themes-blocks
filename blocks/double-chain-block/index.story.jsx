import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import DoubleChain from './chains/double-chain/default';

export default {
  title: 'Chains/Double',
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

export const allColumns = () => {
  const customFields = {
    columnOne: 1,
    heading: 'Double Chain Heading',
  };

  return (
    <DoubleChain customFields={customFields}>
      <Comp1 />
      <Comp2 />
    </DoubleChain>
  );
};

export const allColumnsNoTitle = () => {
  const customFields = {
    columnOne: 1,
  };

  return (
    <DoubleChain customFields={customFields}>
      <Comp1 />
      <Comp2 />
    </DoubleChain>
  );
};

export const zeroColumns = () => {
  const customFields = {
    heading: 'Double Chain Heading',
  };

  return (
    <DoubleChain customFields={customFields}>
      <Comp1 />
      <Comp2 />
    </DoubleChain>
  );
};
