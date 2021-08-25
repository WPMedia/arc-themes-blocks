import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';
import { UserIcon } from '@wpmedia/engine-theme-sdk';

import './styles.scss';

export const BUTTON_STYLES = {
  FILLED: 'FILLED',
  OUTLINED: 'OUTLINED',
};

export const BUTTON_SIZES = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
};

export const BUTTON_TYPES = {
  LABEL_ONLY: 'LABEL_ONLY',
  ICON_ONLY: 'ICON_ONLY',
  LABEL_AND_ICON: 'LABEL_AND_ICON',
};

const StyledDynamicButton = styled.button`
  font-family: ${({ arcSite }) => getThemeStyle(arcSite)['primary-font-family']};
  border: 1px solid ${({ arcSite }) => getThemeStyle(arcSite)['primary-color']};

  ${({ matchedButtonStyle, arcSite }) => {
    switch (matchedButtonStyle) {
      case BUTTON_STYLES.OUTLINED:
        return `
          background-color: transparent;
          color: ${getThemeStyle(arcSite)['primary-color']};
        `;
      case BUTTON_STYLES.FILLED:
      default:
        return `
          background-color: ${getThemeStyle(arcSite)['primary-color']};
          color: #ffffff;
        `;
    }
  }};
`;

const matchButtonSizeWithClass = (matchedButtonSize) => {
  switch (matchedButtonSize) {
    case BUTTON_SIZES.SMALL:
      return 'xpmedia-subs-button--small';
    case BUTTON_SIZES.LARGE:
      return 'xpmedia-subs-button--large';
    case BUTTON_SIZES.MEDIUM:
    default:
      return 'xpmedia-subs-button--medium';
  }
};

function Button(props) {
  const { arcSite } = useFusionContext();

  const {
    buttonSize,
    buttonStyle,
    buttonType,
    children,
    iconType = '',
    text = '',
  } = props;

  const matchedButtonSize = BUTTON_SIZES[buttonSize] || BUTTON_SIZES.MEDIUM;

  const matchedButtonSizeClass = matchButtonSizeWithClass(matchedButtonSize);

  const matchedButtonStyle = BUTTON_STYLES[buttonStyle] || BUTTON_STYLES.FILLED;

  const matchedButtonType = BUTTON_TYPES[buttonType] || BUTTON_TYPES.LABEL_ONLY;

  let Icon = null;

  if (iconType) {
    switch (iconType) {
      case 'user':
        Icon = (
          // todo: width and height for large and medium icons are different
          // https://app.zeplin.io/project/603fa53e2626ed1592e7c0e6/screen/60411633bdf9b380a0f087ca
          <UserIcon />
        );
        break;
      default:
        Icon = null;
        break;
    }
  }

  return (
    <StyledDynamicButton
      arcSite={arcSite}
      matchedButtonStyle={matchedButtonStyle}
      className={`xpmedia-subs-button ${matchedButtonSizeClass}`}
    >
      {
        matchedButtonType === BUTTON_TYPES.ICON_ONLY ? (
          <>
            {Icon}
          </>
        ) : (
          <>
            {Icon}
            {text}
          </>
        )
      }
      {children}
    </StyledDynamicButton>
  );
}

export default Button;
