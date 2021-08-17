import React from 'react';
import { TopTableList } from './features/top-table-list/default';

export default {
  title: 'Blocks/Top Table List',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

const config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  showImageSM: true,
  imagePositionSM: 'right',
};

export const noStories = () => (
  <TopTableList />
);

export const allSizes = () => (
  <TopTableList customFields={{
    ...config,
    extraLarge: 1,
    large: 1,
    medium: 1,
    small: 2,
  }}
  />
);

export const oneExtraLarge = () => (
  <TopTableList customFields={{
    ...config,
    extraLarge: 1,
  }}
  />
);

export const oneLarge = () => (
  <TopTableList customFields={{
    ...config,
    large: 1,
  }}
  />
);

export const oneMedium = () => (
  <TopTableList customFields={{
    ...config,
    medium: 1,
  }}
  />
);

export const fourMediumStories = () => (
  <TopTableList customFields={{
    ...config,
    medium: 4,
  }}
  />
);

export const fourMediumStoriesNoBorder = () => (
  <TopTableList customFields={{
    ...config,
    medium: 4,
    showBottomBorderMD: false,
  }}
  />
);

export const oneSmall = () => (
  <TopTableList customFields={{
    ...config,
    small: 1,
  }}
  />
);

export const fourSmallStoriesOnePerRow = () => (
  <div>
    <TopTableList customFields={{
      ...config,
      small: 4,
      storiesPerRowSM: 1,
    }}
    />
    <TopTableList customFields={{
      ...config,
      small: 4,
      storiesPerRowSM: 1,
      imagePositionSM: 'below',
    }}
    />
    <TopTableList customFields={{
      ...config,
      small: 4,
      storiesPerRowSM: 1,
      imagePositionSM: 'left',
    }}
    />
    <TopTableList customFields={{
      ...config,
      small: 4,
      storiesPerRowSM: 1,
      imagePositionSM: 'above',
    }}
    />
  </div>
);

export const fourSmallStoriesPerRow = () => (
  <TopTableList customFields={{
    ...config,
    small: 8,
    storiesPerRowSM: 4,
  }}
  />
);

export const fourSmallStoriesPerRowNoBorder = () => (
  <TopTableList customFields={{
    ...config,
    small: 8,
    storiesPerRowSM: 4,
    showBottomBorderSM: false,
  }}
  />
);
