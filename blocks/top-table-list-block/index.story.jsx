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

export const allSizesNoOverline = () => (
  <TopTableList customFields={{
    ...config,
    extraLarge: 1,
    large: 1,
    medium: 1,
    small: 2,
    showOverlineXL: false,
    showOverlineLG: false,
  }}
  />
);

export const allSizesNoHeadlines = () => (
  <TopTableList customFields={{
    ...config,
    extraLarge: 1,
    large: 1,
    medium: 1,
    small: 2,
    showHeadlineXL: false,
    showHeadlineLG: false,
    showHeadlineMD: false,
    showHeadlineSM: false,
  }}
  />
);

export const allSizesNoDescriptions = () => (
  <TopTableList customFields={{
    ...config,
    extraLarge: 1,
    large: 1,
    medium: 1,
    small: 2,
    showDescriptionXL: false,
    showDescriptionLG: false,
    showDescriptionMD: false,
  }}
  />
);

export const allSizesNoImages = () => (
  <TopTableList customFields={{
    ...config,
    extraLarge: 1,
    large: 1,
    medium: 1,
    small: 2,
    showImageXL: false,
    showImageLG: false,
    showImageMD: false,
    showImageSM: false,
  }}
  />
);

export const allSizesNoByLines = () => (
  <TopTableList customFields={{
    ...config,
    extraLarge: 1,
    large: 1,
    medium: 1,
    small: 2,
    showBylineXL: false,
    showBylineLG: false,
    showBylineMD: false,
  }}
  />
);

export const allSizesNoByDates = () => (
  <TopTableList customFields={{
    ...config,
    extraLarge: 1,
    large: 1,
    medium: 1,
    small: 2,
    showDateXL: false,
    showDateLG: false,
    showDateMD: false,
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
