import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import './share-bar.scss';
import EnvelopeIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/EnvelopeIcon';
import FacebookIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/FacebookIcon';
import LinkedInAltIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/LinkedInAltIcon';
import PinterestAltIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/PinterestAltIcon';
import TwitterIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/TwitterIcon';

function encodeSocialUrl(websiteDomain, websiteUrl, encodedTitle, social) {
  // If this is a local dev, then return the domain as localhost - otherwise use the site properties
  const location = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? 'https://corecomponents-the-gazette-prod.cdn.arcpublishing.com' : websiteDomain;
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
    const windowFeatures = 'width=830, height=460, scrollbars=no';
    const mailUrl = `mailto:?subject=${title}-${websiteName}&body=${url}`;
    window.open(mailUrl, 'send_email', windowFeatures);
  },
};

function getLogoComponent(type) {
  switch (type) {
    case 'facebook':
      return <FacebookIcon description="Facebook icon" fill="#4267B2" />;
    case 'linkedIn':
      return <LinkedInAltIcon description="LinkedIn icon" fill="#2867B2" />;
    case 'pinterest':
      return <PinterestAltIcon description="Pinterest icon" fill="#BD081C" />;
    case 'twitter':
      return <TwitterIcon description="Twitter icon" fill="#1DA1F2" />;
    default:
    case 'email':
      return <EnvelopeIcon description="Email icon" fill="#C72A22" />;
  }
}

const ShareBar = ({ fusionContext = useFusionContext }) => {
  const {
    customFields,
    globalContent: {
      headlines = {},
      website_url: websiteUrl = '',
    } = {},
    arcSite,
  } = fusionContext();

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
          { getLogoComponent(social) }
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

ShareBar.label = 'Share Bar – Arc Block';

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
