import React from 'react';
import { PrimaryFont } from '@wpmedia/shared-styles';
import './social-editable-field-styles.scss';

function SocialEditableFieldContainer({
  foundUsername, identityType, onDisconnectFunction,
}) {
  // if username found then show the username?
  const isConnected = Boolean(foundUsername);

  // get connect translated
  return (
    <div
      className="social-field--container"
    >
      {
        isConnected ? (
          <div className="social-field--label-text-container">
            <PrimaryFont
              as="span"
              fontColor="primary-color"
              className="social-field--connected-label-text"
            >
              Connected as
              {' '}
            </PrimaryFont>
            <PrimaryFont
              as="span"
              fontColor="primary-color"
              className="social-field--bold-text"
            >
              {foundUsername}
              {' '}
            </PrimaryFont>
            <PrimaryFont
              as="button"
              className="social-field--disconnect-link"
              type="button"
              onClick={onDisconnectFunction}
              fontColor="primary-color"
            >
              Disconnect
            </PrimaryFont>
          </div>
        ) : (
          <div className="social-field--label-text-container">
            <PrimaryFont
              as="span"
              className="social-field--bold-text"
              fontColor="primary-color"
            >
              Connect
              {' '}
              {identityType}
            </PrimaryFont>
          </div>
        )
    }
    </div>
  );
}

export default SocialEditableFieldContainer;
