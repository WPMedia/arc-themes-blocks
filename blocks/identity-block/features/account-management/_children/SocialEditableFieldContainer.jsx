import React from 'react';
import { PrimaryFont } from '@wpmedia/shared-styles';
import './social-editable-field-styles.scss';

function SocialEditableFieldContainer({
  text,
  onDisconnectFunction,
  isConnected,
  disconnectText,
}) {
  return (
    <>
      <PrimaryFont
        as="span"
        fontColor="primary-color"
        className="social-field--connected-label-text"
      >
        {text}
        {isConnected ? ' ' : ''}
      </PrimaryFont>
      {
          isConnected ? (
            <PrimaryFont
              as="button"
              className="social-field--disconnect-link"
              type="button"
              onClick={onDisconnectFunction}
              fontColor="primary-color"
            >
              {disconnectText}
            </PrimaryFont>
          ) : null
        }
    </>
  );
}

export default SocialEditableFieldContainer;
