import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { FullAuthorBioPresentational } from './features/full-author-bio/default';

export default {
  title: 'Blocks/Full Author Bio',
  decorators: [withKnobs],
  parameters: {
    chromatic: {
      viewports: [320, 1200],
    },
  },
};

// full author bio only supports one author
// it takes in an array of potential authors
const authorObject = {
  _id: 'janedoe',
  firstName: 'Jane',
  lastName: 'Doe',
  byline: 'Jane Da Doe',
  role: 'Senior Product Manager',
  image: 'https://s3.amazonaws.com/arc-authors/corecomponents/0a2eb086-d143-48a1-b306-69dba75cb5b8.png',
  resized_params: {
    '84x56': 'cgxOKlUEzP6f-Ofz-7mHC3IHVg8=filters:format(png):quality(70)/',
    '105x70': 'LsTgTye3ZCky9ydyoE9pqV8cT6k=filters:format(png):quality(70)/',
    '158x105': 'rWLjZEHvD40PxsyqzkUBlmqOALI=filters:format(png):quality(70)/',
    '274x183': 'Dm-3kDTXmcEmw_chGSYOTbWQdC0=filters:format(png):quality(70)/',
    '377x251': 'DsELuc-t0FkiyAaQ9evxrOw2Npw=filters:format(png):quality(70)/',
    '400x267': '7O1UwbraAj4VmayQamwuPlZ9Ros=filters:format(png):quality(70)/',
    '600x400': 'Q9tPq24UUzv-RcPfPxT-VuK22mk=filters:format(png):quality(70)/',
    '768x512': '-_7n74DeTcRP76DRjU5qZeqkyQ0=filters:format(png):quality(70)/',
    '800x533': '8v6ckTtCykYJn5C7QlJedgCW8Vs=filters:format(png):quality(70)/',
    '1024x683': 'cSZbuCqo7wDW0EaqIcxOeDQUFsw=filters:format(png):quality(70)/',
    '1440x960': 'PF1cSaru4NsFQ1nGCP7w-hcCpD0=filters:format(png):quality(70)/',
    '1600x1067': 'kffdQ8TyZjzsliRLB4hdsZtUOqE=filters:format(png):quality(70)/',
    '84x63': 'W7lQuVgVNsIRIzeIwB1yWCPecsg=filters:format(png):quality(70)/',
    '105x79': 'fXPxniu-3FOkGI9zxDEHZlN7Vbw=filters:format(png):quality(70)/',
    '158x119': 'nw_ElqU0OKiZ5L1tku-ouTVGBMQ=filters:format(png):quality(70)/',
    '274x206': 'VhSAzzn1WlAVDqTWgJ-O7HNBL1g=filters:format(png):quality(70)/',
    '377x283': '2heNgXYPSrUC1N7E9LIyanKeqWg=filters:format(png):quality(70)/',
    '400x300': 'qWVz4Jny9zSRdNngky41J4gryow=filters:format(png):quality(70)/',
    '600x450': 'iy0ZPN9C7xT_0qprUHRf95juAF4=filters:format(png):quality(70)/',
    '768x576': 'sWOFFJHUBAvnofF2MEZbUo6t_-Q=filters:format(png):quality(70)/',
    '800x600': 'zBrhpK5KyyrMTH1OKzt2pQl0UAU=filters:format(png):quality(70)/',
    '1024x768': 'WZqZ93bUnO7D2TcU50d5NluMaGE=filters:format(png):quality(70)/',
    '1440x1080': 'y83i-Sylc_Dd2qBvoZYt5xFDARM=filters:format(png):quality(70)/',
    '1600x1200': 'UMTCjqT5ECx2rHgOOIzUoZjVZO4=filters:format(png):quality(70)/',
    '84x0': 'lssZNJyVJLzopTEzyZRiimH3XzY=filters:format(png):quality(70)/',
    '105x0': 'S6T18CDFPuXM8sW6-27WUF1Lbxo=filters:format(png):quality(70)/',
    '158x0': 'h-02DdReRvogaEq3GMwPqSBhcfU=filters:format(png):quality(70)/',
    '274x0': 'uZXnCwF-TEDsNJp-TxNo3J-3WCM=filters:format(png):quality(70)/',
    '377x0': '1Ki8MLgzTQhZlC2Ev4KdagRYpV8=filters:format(png):quality(70)/',
    '400x0': 'aUqjH4csN6pWe5WAJqxsSJLZxYU=filters:format(png):quality(70)/',
    '600x0': 'QOU8Pf1-ZXA6HB-hTaCmRFjVQyM=filters:format(png):quality(70)/',
    '768x0': '9tQsX1mzPKIc63XbkwvedNj5How=filters:format(png):quality(70)/',
    '800x0': 'rBewKX_RqVZ341NPefZPhJvtExg=filters:format(png):quality(70)/',
    '1024x0': 'PgbDVvdDdV8Sb0tSECFy5igAJPQ=filters:format(png):quality(70)/',
    '1440x0': '7tH61rNJNFg7eQbwAFGieeUdIko=filters:format(png):quality(70)/',
    '1600x0': 'lRmvC6gjV-bvJzSg1O_jvBHKDFo=filters:format(png):quality(70)/',
    '84x47': '4pI0LeP0sZcCPdErouNJLg3VRLA=filters:format(png):quality(70)/',
    '105x59': 'LwcVG9W8e3jQI-9UN4AGhgjD28A=filters:format(png):quality(70)/',
    '158x89': 'IX-npN0OIvpux6UKVFUI-wMzlWc=filters:format(png):quality(70)/',
    '274x154': 'cQV_WB4BlDEheChok-2K5H_eOqE=filters:format(png):quality(70)/',
    '377x212': 'QbSLS5no-b9_6VuGFVXvJYG8klA=filters:format(png):quality(70)/',
    '400x225': '35KEuuKuorHwV7WQU2HJW9TrqFQ=filters:format(png):quality(70)/',
    '600x338': 'Ty9F3T38UW0XM_tal1HT-HsB-9k=filters:format(png):quality(70)/',
    '768x432': 'Yo1fdtoxSsqRpasdCssWT9P1lsQ=filters:format(png):quality(70)/',
    '800x450': 'Tk6lFrRK4Mup2LS-lTCYssjuuro=filters:format(png):quality(70)/',
    '1024x576': 'aI_27cyHrFYqOxeK1l8915WGRrQ=filters:format(png):quality(70)/',
    '1440x810': 'QGw1xM7bqGpB6YXGCkJPqy8aRcU=filters:format(png):quality(70)/',
    '1600x900': 'OpYA8snBxe-6a4C4iGJy3GAws3U=filters:format(png):quality(70)/',
    '84x84': 'ONswZ99gfpuSMbKOE_-BKLueyH0=filters:format(png):quality(70)/',
    '105x105': 'vLuh0s9hYB5FqJm2SQusgGi_kmI=filters:format(png):quality(70)/',
    '158x158': 'UapOGI9yWg8OgM_JyK_nBv78JCs=filters:format(png):quality(70)/',
    '274x274': 'BNBjaMgVFinGw47YSf4AnWk3-vA=filters:format(png):quality(70)/',
    '377x377': 'eXj8dwf5P6IHg7LERF4w7odjyU4=filters:format(png):quality(70)/',
    '400x400': 'vRauKlDXdsnLW81XxzNdIcQDVyA=filters:format(png):quality(70)/',
    '600x600': 'JjyyJnc2NlM-xXPLw7ggbDWti2s=filters:format(png):quality(70)/',
    '768x768': '2IDhykEPIXFfPvXKfCBiGpdaSV8=filters:format(png):quality(70)/',
    '800x800': 'iKvaiY-ZgfRU3fIHn5y8JzvgwA4=filters:format(png):quality(70)/',
    '1024x1024': 'rBk_xWY-zLBLTKOfD6F15fEPIbo=filters:format(png):quality(70)/',
    '1440x1440': 'ts_LCn22acxoRapN49P3DS-vxXM=filters:format(png):quality(70)/',
    '1600x1600': 'Pz9yZTMW0ODoyNLi0ZA2YqPckXA=filters:format(png):quality(70)/',
  },
  email: 'jane@doe.com',
  facebook: 'https://facebook.com/janedoe',
  twitter: 'janedoe',
  longBio: 'Jane Doe is a senior product manager for Arc Publishing. This is a Long bio. ',
  instagram: 'janedoe',
  rss: 'someusername',
  linkedin: 'someusername',
  reddit: 'someusername',
  youtube: 'someusername',
  medium: 'someusername',
  tumblr: 'someusername',
  pinterest: 'someusername',
  snapchat: 'someusername',
  whatsapp: 'someusername',
  soundcloud: 'someusername',
};

// When an author has no social accounts
// If they don't have an image
// If they don't have a role,
// If they don't have a byline
// If they don't have a bio

// content available in .storybook/alias/context.js useFusionContext authors
export const allFieldsFull = () => {
  const data = {
    authors: [authorObject],
  };
  return (<FullAuthorBioPresentational content={data} />);
};

export const noSocialAccounts = () => {
  const authorNoSocials = {
    ...authorObject,
    email: '',
    facebook: '',
    twitter: '',
    longBio: '',
    instagram: '',
    rss: '',
    linkedin: '',
    reddit: '',
    youtube: '',
    medium: '',
    tumblr: '',
    pinterest: '',
    snapchat: '',
    whatsapp: '',
    soundcloud: '',
  };

  const data = {
    authors: [authorNoSocials],
  };
  return (<FullAuthorBioPresentational content={data} />);
};

export const noRole = () => {
  const authorNoRole = {
    ...authorObject,
    role: '',
  };

  const data = {
    authors: [authorNoRole],
  };
  return (<FullAuthorBioPresentational content={data} />);
};

export const noByline = () => {
  const authorNoByline = {
    ...authorObject,
    byline: '',
  };

  const data = {
    authors: [authorNoByline],
  };
  return (<FullAuthorBioPresentational content={data} />);
};

export const noBioNorLongBio = () => {
  const authorNoBio = {
    ...authorObject,
    bio: '',
    longBio: '',
  };

  const data = {
    authors: [authorNoBio],
  };
  return (<FullAuthorBioPresentational content={data} />);
};

export const noImage = () => {
  const authorNoImage = {
    ...authorObject,
    image: '',
    resized_params: {},
  };

  const data = {
    authors: [authorNoImage],
  };
  return (<FullAuthorBioPresentational content={data} />);
};

const socials = [
  'email',
  'facebook',
  'twitter',
  'instagram',
  'twitter',
  'facebook',
  'rss',
  'linkedin',
  'reddit',
  'youtube',
  'medium',
  'tumblr',
  'pinterest',
  'snapchat',
  'whatsapp',
  'soundcloud',
];

export const noSocialKeys = () => {
  // delete socials from author object
  socials.forEach((social) => {
    delete authorObject[social];
  });

  const authorNoSocialKeys = {
    ...authorObject,
  };

  const data = {
    authors: [authorNoSocialKeys],
  };
  return (<FullAuthorBioPresentational content={data} />);
};
