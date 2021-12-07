import React from 'react';
import { PrimaryFont } from '@wpmedia/shared-styles';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';
import './social-editable-field-styles.scss';

const StyledContainer = styled.div`
  border-color: ${(props) => props.borderColor};
`;

function SocialEditableFieldContainer({
  foundUsername, identityType, onDisconnectFunction,
}) {
  // if username found then show the username?
  const isConnected = Boolean(foundUsername);
  const { arcSite } = useFusionContext();
  const primaryColor = getThemeStyle(arcSite)['primary-color'];

  // get connect translated
  return (
    <StyledContainer
      borderColor={primaryColor}
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
    </StyledContainer>
  );
}

export default SocialEditableFieldContainer;
