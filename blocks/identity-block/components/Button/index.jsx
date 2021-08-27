import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';
import { UserIcon } from '@wpmedia/engine-theme-sdk';

// handle non-dynamic styling not based on theme styles
import './styles.scss';

// naming comes from zeplin docs for types
export const BUTTON_STYLES = {
  FILLED: 'FILLED',
  OUTLINED: 'OUTLINED',
  WHITE_BACKGROUND_FILLED: 'WHITE_BACKGROUND_FILLED',
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

const StyledDynamicButton = styled.button.attrs((props) => ({
  arcSite: props.arcSite,
  matchedButtonStyle: props.matchedButtonStyle,
}))`
  font-family: ${({ arcSite }) => getThemeStyle(arcSite)['primary-font-family']};

  ${({ matchedButtonStyle, arcSite }) => {
    switch (matchedButtonStyle) {
      case BUTTON_STYLES.WHITE_BACKGROUND_FILLED:
        return `
          background-color: #ffffff;
          border-color: #ffffff;
          color: ${getThemeStyle(arcSite)['primary-color']};
        `;
      case BUTTON_STYLES.OUTLINED:
        return `
          background-color: transparent;
          border-color: ${getThemeStyle(arcSite)['primary-color']};
          color: ${getThemeStyle(arcSite)['primary-color']};
        `;
      case BUTTON_STYLES.FILLED:
      default:
        return `
          background-color: ${getThemeStyle(arcSite)['primary-color']};
          border-color: ${getThemeStyle(arcSite)['primary-color']};
          color: #ffffff;
        `;
    }
  }}
`;

// get the class name for the button based on the button size based on mocks
const matchButtonSizeWithClass = (matchedButtonSize) => {
  switch (matchedButtonSize) {
    case BUTTON_SIZES.SMALL:
      return 'xpmedia-button--small';
    case BUTTON_SIZES.LARGE:
      return 'xpmedia-button--large';
    case BUTTON_SIZES.MEDIUM:
    default:
      return 'xpmedia-button--medium';
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
    text,
    ariaLabel,
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
          <UserIcon
            height={16}
            width={16}
            fill={getThemeStyle(arcSite)['primary-color']}
          />
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
      className={`xpmedia-button ${matchedButtonSizeClass}`}
      aria-label={ariaLabel}
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
