import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

import {
  Button,
  BUTTON_SIZES,
  BUTTON_STYLES,
  BUTTON_TYPES,
  PrimaryFont,
} from '@wpmedia/shared-styles';

import './styles.scss';

const SubscriptionDialog = ({
  actionText,
  actionUrl,
  reasonPrompt,
  headline,
  linkText,
  linkPrompt,
  linkUrl,
  subHeadline,
}) => (
  <PrimaryFont as="div" className="xpmedia-subscription-dialog">
    {reasonPrompt
      ? (
        <div
          className="xpmedia-subscription-dialog-reason-prompt"
          dangerouslySetInnerHTML={{ __html: reasonPrompt }}
        />
      )
      : null}
    <div className="xpmedia-subscription-dialog-link-prompt">
      {linkPrompt
        ? (
          <span
            className="xpmedia-subscription-dialog-link-prompt-pre-link"
            dangerouslySetInnerHTML={{ __html: linkPrompt }}
          />
        )
        : null}
      <a
        className="xpmedia-subscription-dialog-link-prompt-link"
        href={linkUrl}
      >
        {linkText}
      </a>
    </div>
    {headline
      ? (
        <h2
          className="xpmedia-subscription-dialog-headline"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
      )
      : null}
    {subHeadline
      ? (
        <h3
          className="xpmedia-subscription-dialog-subheadline"
          dangerouslySetInnerHTML={{ __html: subHeadline }}
        />
      )
      : null}
    {actionUrl && actionText
      ? (
        <Button
          as="a"
          buttonSize={BUTTON_SIZES.LARGE}
          buttonStyle={BUTTON_STYLES.PRIMARY}
          buttonType={BUTTON_TYPES.LABEL_ONLY}
          href={actionUrl}
          text={actionText}
        />
      )
      : null}
  </PrimaryFont>
);

SubscriptionDialog.propTypes = {
  actionText: PropTypes.string,
  actionUrl: PropTypes.string,
  reasonPrompt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  headline: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  linkText: PropTypes.string.isRequired,
  linkPrompt: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  subHeadline: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default SubscriptionDialog;
