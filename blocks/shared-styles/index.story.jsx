import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import PrimaryFont from './_children/primary-font';
import SecondaryFont from './_children/secondary-font';

export default {
  title: 'Shared Styles',
  decorators: [withKnobs],
};

export const primaryFont = () => {
  const label = 'Font Color';
  const options = {
    Ignore: '',
    Primary: 'primary-color',
    Secondary: 'secondary-color',
  };
  const defaultValue = 'Ignore';

  const data = {
    as: text('"as"', 'h1'),
    fontColor: select(label, options, defaultValue),
  };

  const textString = text('Text', 'When this baby hits 88mph...');

  return (
    <PrimaryFont {...data}>{textString}</PrimaryFont>
  );
};

export const secondaryFont = () => {
  const label = 'Font Color';
  const options = {
    Ignore: '',
    Primary: 'primary-color',
    Secondary: 'secondary-color',
  };
  const defaultValue = 'Ignore';
  const data = {
    as: text('"as"', 'p'),
    fontColor: select(label, options, defaultValue),
  };

  const textString = text('Text', 'When this baby hits 88mph...');

  return (
    <SecondaryFont {...data}>{textString}</SecondaryFont>
  );
};
