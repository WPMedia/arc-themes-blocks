import React from 'react';
import PromoImage from './index';

export default {
  title: 'Shared Styles/Promo/Image',
};

const customImageURL = 'https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG';

export const withLinkAndLabel = () => {
  const props = {
    customImageURL,
    showPromoLabel: true,
    promoLabelSize: 'large',
    content: { type: 'gallery', websites: { 'story-book': { website_url: 'https://arcxp.com' } } },
  };

  return (
    <PromoImage {...props} />
  );
};

export const withLinkAndSmallLabel = () => {
  const props = {
    customImageURL,
    showPromoLabel: true,
    content: { type: 'gallery', websites: { 'story-book': { website_url: 'https://arcxp.com' } } },
  };

  return (
    <PromoImage {...props} />
  );
};

export const withLinkAndNoLabel = () => {
  const props = {
    customImageURL,
    content: { type: 'gallery', websites: { 'story-book': { website_url: 'https://arcxp.com' } } },
  };

  return (
    <PromoImage {...props} />
  );
};

export const withoutLinkAndNoLabel = () => {
  const props = {
    customImageURL,
  };

  return (
    <PromoImage {...props} />
  );
};

export const withoutLinkAndWithLabel = () => {
  const props = {
    customImageURL,
    showPromoLabel: true,
    promoLabelSize: 'large',
    content: { type: 'gallery' },
  };

  return (
    <PromoImage {...props} />
  );
};
