import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import Byline from './index';

export default {
  title: 'Shared Styles/Byline',
  decorators: [withKnobs],
};

export const usingANSStoryObject = () => {
  const props = {
    separator: boolean('separator', true),
    list: boolean('list', true),
    content: {
      credits: {
        by: [{
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
          additional_properties: {
            original: {
              byline: 'SangHee Kim Byline',
            },
          },
        }],
      },
    },
  };

  return (
    <Byline {...props} />
  );
};

export const multipleAuthorsANSStoryObject = () => {
  const props = {
    separator: boolean('separator', true),
    list: boolean('list', true),
    content: {
      credits: {
        by: [{
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
          additional_properties: {
            original: {
              byline: 'SangHee Kim Byline',
            },
          },
        }, {
          type: 'author',
          name: 'Marty McFly',
          url: '/author/marty-mcfly',
          additional_properties: {
            original: {
              byline: 'Marty McFly Byline',
            },
          },
        }],
      },
    },
  };

  return (
    <Byline {...props} />
  );
};

export const noAuthors = () => {
  const props = {
    separator: boolean('separator', true),
    list: boolean('list', true),
    content: {
      credits: {
        by: [],
      },
    },
  };

  return (
    <Byline {...props} />
  );
};

export const emptyStringBylineURL = () => {
  const props = {
    separator: boolean('separator', true),
    list: boolean('list', true),
    content: {
      credits: {
        by: [{
          type: 'author',
          name: 'No Name URL',
          url: '',
          additional_properties: {
            original: {
              byline: 'SangHee Kim Byline',
            },
          },
        }],
      },
    },
  };

  return (
    <Byline {...props} />
  );
};
