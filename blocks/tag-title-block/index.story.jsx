import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { TagTitleOutput as TagTitle } from './features/tag-title/default';

export default {
  title: 'Blocks/Tag Title',
  decorators: [withKnobs],
};

const fullMockData = {
  Payload: [
    {
      description: 'This is a tag about dogs. This is the description field.',
      name: 'Dogs',
    },
  ],
};

const noDescriptionMock = {
  Payload: [
    {
      name: 'Dogs',
    },
  ],
};

const noTitleMock = {
  Payload: [
    {
      description: 'This is a tag about dogs. This is the description field.',
    },
  ],
};

export const withNameAndDescription = () => (
  <TagTitle data={fullMockData} />
);

export const noTitle = () => (
  <TagTitle data={noTitleMock} />
);

export const noDescription = () => (
  <TagTitle data={noDescriptionMock} />
);
