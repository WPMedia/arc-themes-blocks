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
  ],
};

export const allFieldsFull = () => {
  const data = {
    credits: { by: [authorObject] },
  };
  return (<AuthorBioItems content={data} />);
};
