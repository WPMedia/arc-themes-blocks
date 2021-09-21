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
  reasonPromptText,
  headlineText,
  linkText,
  linkPromptText,
  linkUrl,
  subHeadlineText,
}) => (
  <PrimaryFont as="div" className="xpmedia-subscription-dialog">
    {reasonPromptText
      ? (
        <div
          className="xpmedia-subscription-dialog-reason-prompt"
          dangerouslySetInnerHTML={{ __html: reasonPromptText }}
        />
      )
      : null}
    <div className="xpmedia-subscription-dialog-link-prompt">
      {linkPromptText
        ? (
          <span
            className="xpmedia-subscription-dialog-link-prompt-pre-link"
            dangerouslySetInnerHTML={{ __html: linkPromptText }}
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
    {headlineText
      ? (
        <h2
          className="xpmedia-subscription-dialog-headline"
          dangerouslySetInnerHTML={{ __html: headlineText }}
        />
      )
      : null}
    {subHeadlineText
      ? (
        <h3
          className="xpmedia-subscription-dialog-subheadline"
          dangerouslySetInnerHTML={{ __html: subHeadlineText }}
        />
      )
      : null}
    {actionUrl && actionText
      ? (
        <Button
          as="a"
          buttonSize={BUTTON_SIZES.LARGE}
          buttonStyle={BUTTON_STYLES.FILLED}
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
  reasonPromptText: PropTypes.string,
  headlineText: PropTypes.string,
  linkText: PropTypes.string.isRequired,
  linkPromptText: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  subHeadlineText: PropTypes.string,
};

export default SubscriptionDialog;
