import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { AuthorBioItems } from './features/author-bio/default';

export default {
  title: 'Blocks/Short Author Bio',
  decorators: [withKnobs],
  parameters: {
    chromatic: {
      viewports: [320, 1200],
    },
  },
};

const authorObject = {
  type: 'author',
  name: 'Sara Carothers',
  description: 'description',
  image: {
    url: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
  },
  additional_properties: {
    original: {
      _id: 'saracarothers',
      byline: 'Sara Lynn Carothers',
      bio_page: '/author/sara-carothers/',
      bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
    },
  },
  social_links: [
    { site: 'twitter', url: 'https://twitter.com/sLcarothers' },
    { site: 'instagram', url: 'https://www.instagram.com/scarothers/' },
    { site: 'facebook', url: 'https://www.thefacebook.com' },
    { site: 'reddit', url: 'https://reddit.com' },
    { site: 'youtube', url: 'https://youtube.com' },
    { site: 'medium', url: 'https://medium.com' },
    { site: 'tumblr', url: 'https://tumblr.com' },
    { site: 'pinterest', url: 'https://pinterest.com' },
    { site: 'snapchat', url: 'https://snapchat.com' },
    { site: 'whatsapp', url: 'https://whatsapp.com' },
    { site: 'linkedin', url: 'https://whatsapp.com' },
    { site: 'rss', url: 'rss feed' },
    { site: 'soundcloud', url: 'https://soundcloud.com' },
  ],
  resized_params: {
    '84x0': 'mbFPm2rKjoum_0LYf0At-9eks1Y=filters:format(jpg):quality(70)/',
  },
};

export const allFieldsFull = () => {
  const data = {
    credits: { by: [authorObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const noSocialLinks = () => {
  const noSocialLinksAuthorObject = {
    ...authorObject,
    social_links: [],
  };

  const data = {
    credits: { by: [noSocialLinksAuthorObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const emptySocialLinkURL = () => {
  const emptySocialLinksAuthorObject = {
    ...authorObject,
    social_links: [
      { site: 'soundcloud', url: '' },
    ],
  };

  const data = {
    credits: { by: [emptySocialLinksAuthorObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const noResizedParams = () => {
  const noResizedParamsObject = {
    ...authorObject,
    resized_params: {},
  };

  const data = {
    credits: { by: [noResizedParamsObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const noBioString = () => {
  const noBioObject = {
    ...authorObject,
    additional_properties: {
      original: {
        ...authorObject.additional_properties.original,
        bio: '',
      },
    },
  };

  const data = {
    credits: { by: [noBioObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const noByline = () => {
  const noBylineObject = {
    ...authorObject,
    additional_properties: {
      original: {
        ...authorObject.additional_properties.original,
        byline: '',
      },
    },
  };

  const data = {
    credits: { by: [noBylineObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const emptyNameString = () => {
  const noNameObject = {
    ...authorObject,
    name: '',
  };

  const data = {
    credits: { by: [noNameObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const noDescriptionString = () => {
  const noDescriptionObject = {
    ...authorObject,
    description: '',
  };

  const data = {
    credits: { by: [noDescriptionObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const noNestedByline = () => {
  const noNestedBylineObject = {
    ...authorObject,
    additional_properties: {
      original: {
        ...authorObject.additional_properties.original,
        byline: '',
      },
    },
  };

  const data = {
    credits: { by: [noNestedBylineObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const emptyBioPageLink = () => {
  const noBioPageObject = {
    ...authorObject,
    additional_properties: {
      original: {
        ...authorObject.additional_properties.original,
        bio_page: '',
      },
    },
  };

  const data = {
    credits: { by: [noBioPageObject] },
  };
  return (<AuthorBioItems content={data} />);
};

export const zeroAuthors = () => {
  const data = {
    credits: { by: [] },
  };
  return (<AuthorBioItems content={data} />);
};

export const threeAuthors = () => {
  const data = {
    credits: { by: [authorObject, authorObject, authorObject] },
  };
  return (<AuthorBioItems content={data} />);
};
