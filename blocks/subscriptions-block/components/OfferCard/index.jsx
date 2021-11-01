import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { CheckIcon } from '@wpmedia/engine-theme-sdk';

import {
  Button,
  BUTTON_SIZES,
  BUTTON_STYLES,
  PrimaryFont,
} from '@wpmedia/shared-styles';

import './styles.scss';

const OfferCard = ({
  headline,
  subHeadline,
  actionText,
  actionEvent,
  features = [],
}) => (
  <PrimaryFont as="div" className="xpmedia-subscription-offer-card">
    {headline
      ? (
        <PrimaryFont
          as="h2"
          className="xpmedia-subscription-offer-card--headline"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
      )
      : null}

    {subHeadline
      ? (
        <PrimaryFont
          as="h3"
          className="xpmedia-subscription-offer-card--subheadline"
          dangerouslySetInnerHTML={{ __html: subHeadline }}
        />
      )
      : null}

    {actionText && actionEvent
      ? (
        <Button
          buttonSize={BUTTON_SIZES.LARGE}
          buttonStyle={BUTTON_STYLES.PRIMARY}
          fullWidth
          text={actionText}
          isHTMLText
          onClick={actionEvent}
        />
      )
      : null}

    {features.length
      ? (
        <ul className="xpmedia-subscription-offer-card--features">
          {features.map((feat) => (
            <li className="xpmedia-subscription-offer-card--feature-item" key={`feat-${feat.featureText}`}>
              <span className="xpmedia-subscription-offer-card--feature-item-icon">
                <CheckIcon width="16" height="16" />
              </span>
              <span dangerouslySetInnerHTML={{ __html: feat.featureText }} />
            </li>
          ))}
        </ul>
      ) : null}
  </PrimaryFont>
);

OfferCard.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
  actionText: PropTypes.string,
  actionEvent: PropTypes.func,
  features: PropTypes.arrayOf(PropTypes.shape({
    featureText: PropTypes.string,
  })),
};

export default OfferCard;
