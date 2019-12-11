import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import './share-bar.scss';
import envelopeLogo from './images/envelope.svg';
import facebookLogo from './images/facebook.svg';
import linkedinLogo from './images/linkedin.svg';
import pinterestLogo from './images/pinterest.svg';
import twitterLogo from './images/twitter.svg';

function encodeSocialUrl(websiteDomain, websiteUrl, encodedTitle, social) {
  // If this is a local dev, then return the domain as localhost - otherwise use the site properties
  const location = (window && window.location.hostname === 'localhost') ? 'localhost' : websiteDomain;
  const encodedUrl = encodeURI(`${location}${websiteUrl}`);

  switch (social) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    case 'pinterest':
      return `http://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;
    case 'linkedIn':
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
    default:
      return encodedUrl;
  }
}

const share = {
  facebook: (url) => {
    const windowFeatures = 'width=658, height=354, scrollbars=no';
    window.open(url, 'share_facebook', windowFeatures);
  },
  twitter: (url) => {
    const windowFeatures = 'width=658, height=354, scrollbars=no';
    window.open(url, 'share_twitter', windowFeatures);
  },
  pinterest: (url) => {
    const windowFeatures = 'width=658, height=354, scrollbars=no';
    window.open(url, 'share_pinterest', windowFeatures);
  },
  linkedIn: (url) => {
    const windowFeatures = 'width=830, height=460, scrollbars=no';
    window.open(url, 'share_linkedin', windowFeatures);
  },
  email: (url, title, websiteName) => {
    const encodedTitle = encodeURIComponent(title);
    const windowFeatures = 'width=830, height=460, scrollbars=no';
    const mailUrl = `mailto:?subject=${encodedTitle}-${websiteName}&body=${url}`;
    window.open(mailUrl, 'send_email', windowFeatures);
  },
};

const logos = {
  email: envelopeLogo,
  facebook: facebookLogo,
  linkedIn: linkedinLogo,
  pinterest: pinterestLogo,
  twitter: twitterLogo,
};

const ShareBar = () => {
  const {
    customFields,
    globalContent: {
      headlines = {},
      website_url: websiteUrl = '',
    } = {},
    arcSite,
  } = useFusionContext();

  const {
    websiteDomain,
    websiteName,
  } = getProperties(arcSite);

  const shareButtons = [];
  Object.keys(customFields).forEach((social) => {
    if (customFields[social]) {
      const encodedTitle = encodeURIComponent(headlines.basic);
      const encodedUrl = encodeSocialUrl(websiteDomain, websiteUrl, encodedTitle, social);

      shareButtons.push((
        <button
          key={social}
          title={social}
          type="button"
          className="shareButton"
          onClick={() => share[social](encodedUrl, encodedTitle, websiteName)}
          onKeyPress={() => share[social](encodedUrl, encodedTitle, websiteName)}
        >
          <img src={logos[social]} alt={social} />
        </button>
      ));
    }
  });

  return (
    <div className="shareBar">
      {shareButtons}
    </div>
  );
};


ShareBar.propTypes = {
  customFields: PropTypes.shape({
    facebook: PropTypes.bool,
    twitter: PropTypes.bool,
    pinterest: PropTypes.bool,
    linkedIn: PropTypes.bool,
    email: PropTypes.bool,
  }),
};

export default ShareBar;
