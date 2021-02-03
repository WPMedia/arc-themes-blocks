import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import PrimaryFont from './_children/primary-font';
import SecondaryFont from './_children/secondary-font';
import VSpace from './_children/v-space';

export default {
  title: 'Atoms',
  decorators: [withKnobs],
};

export const primaryFontBlock = () => {
  const label = 'Font Color';
  const options = {
    None: '',
    Primary: 'primary-color',
    Secondary: 'secondary-color',
  };
  const defaultValue = 'None';

  const data = {
    as: text('"as"', 'h1'),
    fontColor: select(label, options, defaultValue),
  };

  const textString = text('Text', 'When this baby hits 88mph...');

  return (
    <PrimaryFont {...data}>{textString}</PrimaryFont>
  );
};

export const secondaryFontBlock = () => {
  const label = 'Font Color';
  const options = {
    None: '',
    Primary: 'primary-color',
    Secondary: 'secondary-color',
  };
  const defaultValue = 'None';
  const data = {
    as: text('"as"', 'h2'),
    fontColor: select(label, options, defaultValue),
  };

  const textString = text('Text', 'When this baby hits 88mph...');

  return (
    <SecondaryFont {...data}>{textString}</SecondaryFont>
  );
};

export const VSpaceBlock = () => {
  const placeholderStyles = {
    backgroundColor: 'rgb(230, 230, 230)',
    height: '100px',
    width: '100%',
  };
  const label = 'Spacing';
  const options = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  };
  const defaultValue = 'lg';

  const data = {
    space: select(label, options, defaultValue),
    breakpoint: select('Breakpoint', { md: 'md', lg: 'lg', xl: 'xl' }, 'md'),
    breakpointSpace: select('From Breakpoint Space', { md: 'md', lg: 'lg', xl: 'xl' }, 'md'),
  };

  return (
    <VSpace {...data}>
      <div style={placeholderStyles} />
      <hr />
      <div style={placeholderStyles} />
      <hr />
      <div style={placeholderStyles} />
      <hr />
      <div style={placeholderStyles} />
      <hr />
      <div style={placeholderStyles} />
    </VSpace>
  );
};
