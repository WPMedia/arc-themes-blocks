import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Medium from './features/medium-promo/default';

export default {
  title: 'Blocks/Medium Promo',
  decorators: [withKnobs],
};

const sampleData = {
  showHeadline: false,
  showImage: false,
  showDescription: false,
  showByline: false,
  showDate: false,
  imageOverrideURL: '',
  imageRatio: '16:9',
  itemContentConfig: {
    contentService: 'abc',
    contentConfigValues: 'xyz',
  },
};

export const allFields = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
    showImage: true,
    showDescription: true,
    showByline: true,
    showDate: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const image4x3 = () => {
  const customFields = {
    ...sampleData,
    imageRatio: '4:3',
    showHeadline: true,
    showImage: true,
    showDescription: true,
    showByline: true,
    showDate: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const image3x2 = () => {
  const customFields = {
    ...sampleData,
    imageRatio: '3:2',
    showHeadline: true,
    showImage: true,
    showDescription: true,
    showByline: true,
    showDate: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const headlineOnly = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const imageOnly = () => {
  const customFields = {
    ...sampleData,
    showImage: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const descriptionOnly = () => {
  const customFields = {
    ...sampleData,
    showDescription: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const byLineOnly = () => {
  const customFields = {
    ...sampleData,
    showByline: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const dateOnly = () => {
  const customFields = {
    ...sampleData,
    showDate: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const headingImageDescriptionByline = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
    showImage: true,
    showDescription: true,
    showByline: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const headingImageDescriptionDate = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
    showImage: true,
    showDescription: true,
    showDate: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const headingImageByLineDate = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
    showImage: true,
    showByline: true,
    showDate: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const noImage = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
    showDescription: true,
    showByline: true,
    showDate: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const headingAndDescription = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
    showDescription: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const headingBylineAndDate = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
    showByline: true,
    showDate: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const headingAndByLine = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
    showByline: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};

export const headingAndDate = () => {
  const customFields = {
    ...sampleData,
    showHeadline: true,
    showDate: true,
  };

  return (
    <Medium customFields={customFields} />
  );
};
