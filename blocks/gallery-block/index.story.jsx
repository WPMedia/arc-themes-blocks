import React from 'react';
import { GalleryPresentation } from './features/gallery/default';

export default {
  title: 'Blocks/Gallery',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

const mockGallery = {
  _id: 'gallery_id',
  content_elements: [
    {
      _id: 'image_id1',
      alt_text: 'Image Alt Text 1',
      caption: 'Image Caption 1',
      credits: {
        affiliation: [{ name: 'Affiliation 1', type: 'author' }],
        by: [{ byline: 'Custom Credit 1', name: 'Smith Smitherson', type: 'author' }],
      },
      height: 3744,
      resized_params: {
        '274x0': '--al0lnFNBcEFSRnjIDaqW3hEXs=filters:format(jpg):quality(70)/',
        '400x0': 'D1TuuuNZJiX29k5IcHROrI-y1zI=filters:format(jpg):quality(70)/',
        '768x0': 'C6NNPZQgZICy5VMk-jLjNpbg_vw=filters:format(jpg):quality(70)/',
        '800x0': 'SFAi-Aks2Fy99PkwQ9LLvd2Jxl4=filters:format(jpg):quality(70)/',
        '1024x0': 'LSihqkSkpwAFfD0qsLDFuLw08P8=filters:format(jpg):quality(70)/',
        '1440x0': 'mnOhSZmQiFynETHFN7BAYI5-Pzg=filters:format(jpg):quality(70)/',
      },
      subtitle: 'Image Subtitle 1',
      type: 'image',
      url: 'https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
      width: 5616,
    },
    {
      _id: 'image_id2',
      alt_text: 'Image Alt Text 2',
      caption: 'Image Caption 2',
      credits: {
        affiliation: [{ name: 'Affiliation 2', type: 'author' }],
        by: [{ byline: 'Custom Credit 2', name: 'Smith Smitherson', type: 'author' }],
      },
      height: 3744,
      resized_params: {
        '274x0': '--al0lnFNBcEFSRnjIDaqW3hEXs=filters:format(jpg):quality(70)/',
        '400x0': 'D1TuuuNZJiX29k5IcHROrI-y1zI=filters:format(jpg):quality(70)/',
        '768x0': 'C6NNPZQgZICy5VMk-jLjNpbg_vw=filters:format(jpg):quality(70)/',
        '800x0': 'SFAi-Aks2Fy99PkwQ9LLvd2Jxl4=filters:format(jpg):quality(70)/',
        '1024x0': 'LSihqkSkpwAFfD0qsLDFuLw08P8=filters:format(jpg):quality(70)/',
        '1440x0': 'mnOhSZmQiFynETHFN7BAYI5-Pzg=filters:format(jpg):quality(70)/',
      },
      subtitle: 'Image Subtitle 2',
      type: 'image',
      url: 'https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
      width: 5616,
    },
  ],
  headlines: {
    basic: 'Gallery Headline',
  },
  type: 'gallery',
};

const mockContextGlobalContent = {
  copyright: '&copy;2021 - Big Media',
  location: 'Thatoneplace, ST',
  id: 'globalContent_id',
};

export const noContent = () => {
  const mockCustomFields = {};

  return (
    <GalleryPresentation
      arcSite="StoryBook Site"
      globalContent={mockContextGlobalContent}
      customFields={mockCustomFields}
    />
  );
};

export const withPassedInContent = () => {
  const mockGlobalContent = {
    ...mockGallery,
    ...mockContextGlobalContent,
  };

  const mockCustomFields = {
    inheritGlobalContent: true,
    galleryContentConfig: {},
  };

  return (
    <GalleryPresentation
      arcSite="StoryBook Site"
      globalContent={mockGlobalContent}
      customFields={mockCustomFields}
    />
  );
};

export const hideCaption = () => {
  const mockGlobalContent = {
    ...mockGallery,
    ...mockContextGlobalContent,
  };

  const mockCustomFields = {
    inheritGlobalContent: true,
    galleryContentConfig: {},
    hideCaption: true,
  };

  return (
    <GalleryPresentation
      arcSite="StoryBook Site"
      globalContent={mockGlobalContent}
      customFields={mockCustomFields}
    />
  );
};

export const hideCredits = () => {
  const mockGlobalContent = {
    ...mockGallery,
    ...mockContextGlobalContent,
  };

  const mockCustomFields = {
    inheritGlobalContent: true,
    galleryContentConfig: {},
    hideCredits: true,
  };

  return (
    <GalleryPresentation
      arcSite="StoryBook Site"
      globalContent={mockGlobalContent}
      customFields={mockCustomFields}
    />
  );
};

export const hideTitle = () => {
  const mockGlobalContent = {
    ...mockGallery,
    ...mockContextGlobalContent,
  };

  const mockCustomFields = {
    inheritGlobalContent: true,
    galleryContentConfig: {},
    hideTitle: true,
  };

  return (
    <GalleryPresentation
      arcSite="StoryBook Site"
      globalContent={mockGlobalContent}
      customFields={mockCustomFields}
    />
  );
};

export const hideTitleAndCaption = () => {
  const mockGlobalContent = {
    ...mockGallery,
    ...mockContextGlobalContent,
  };

  const mockCustomFields = {
    inheritGlobalContent: true,
    galleryContentConfig: {},
    hideTitle: true,
    hideCaption: true,
  };

  return (
    <GalleryPresentation
      arcSite="StoryBook Site"
      globalContent={mockGlobalContent}
      customFields={mockCustomFields}
    />
  );
};

export const hideCaptionAndCredits = () => {
  const mockGlobalContent = {
    ...mockGallery,
    ...mockContextGlobalContent,
  };

  const mockCustomFields = {
    inheritGlobalContent: true,
    galleryContentConfig: {},
    hideCaption: true,
    hideCredits: true,
  };

  return (
    <GalleryPresentation
      arcSite="StoryBook Site"
      globalContent={mockGlobalContent}
      customFields={mockCustomFields}
    />
  );
};

export const hideCaptionAndCreditsAndTitle = () => {
  const mockGlobalContent = {
    ...mockGallery,
    ...mockContextGlobalContent,
  };

  const mockCustomFields = {
    inheritGlobalContent: true,
    galleryContentConfig: {},
    hideCaption: true,
    hideCredits: true,
    hideTitle: true,
  };

  return (
    <GalleryPresentation
      arcSite="StoryBook Site"
      globalContent={mockGlobalContent}
      customFields={mockCustomFields}
    />
  );
};
