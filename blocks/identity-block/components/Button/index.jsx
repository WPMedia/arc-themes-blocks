import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  OUTLINED_GREY: 'OUTLINED_GREY',
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

// hover overrides link hover global style
const StyledDynamicButton = styled.button.attrs((props) => ({
  arcSite: props.arcSite,
  buttonStyle: props.buttonStyle,
}))`
  font-family: ${({ arcSite }) => getThemeStyle(arcSite)['primary-font-family']};

  ${({ buttonStyle, arcSite }) => {
    switch (buttonStyle) {
      case BUTTON_STYLES.WHITE_BACKGROUND_FILLED:
        return `
          background-color: #ffffff;
          border-color: #ffffff;
          color: ${getThemeStyle(arcSite)['primary-color']};

          &:hover {
            color: ${getThemeStyle(arcSite)['primary-color']};
          }
        `;
      case BUTTON_STYLES.OUTLINED:
        return `
          background-color: transparent;
          border-color: ${getThemeStyle(arcSite)['primary-color']};
          color: ${getThemeStyle(arcSite)['primary-color']};

          &:hover {
            color: ${getThemeStyle(arcSite)['primary-color']};
          }
        `;
      case BUTTON_STYLES.OUTLINED_GREY:
        return `
          background-color: transparent;
          border-color: rgba(255, 255, 255, 0.5);
          color: #ffffff;

          &:hover {
            color: #ffffff;
          }
        `;
      case BUTTON_STYLES.FILLED:
      default:
        return `
          background-color: ${getThemeStyle(arcSite)['primary-color']};
          border-color: ${getThemeStyle(arcSite)['primary-color']};
          color: #ffffff;

          &:hover {
            color: #ffffff;
          }
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

function renderButtonContents(matchedButtonType, text, iconComponent) {
  switch (matchedButtonType) {
    case BUTTON_TYPES.LABEL_ONLY:
      return (text);
    case BUTTON_TYPES.ICON_ONLY:
      return (iconComponent);
    case BUTTON_TYPES.LABEL_AND_ICON:
    default:
      return (
        <>
          <div className="xpmedia-button--left-icon-container">
            {iconComponent}
          </div>
          {text}
        </>
      );
  }
}

function Button(props) {
  const { arcSite } = useFusionContext();

  const {
    buttonSize,
    buttonStyle,
    buttonType,
    // todo: take in children and handle
    // children,
    iconType = '',
    text,
    ariaLabel,
    type,
    href,
    as,
  } = props;

  const matchedButtonSizeClass = matchButtonSizeWithClass(buttonSize);

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
      buttonStyle={buttonStyle}
      className={`xpmedia-button ${matchedButtonSizeClass}`}
      aria-label={ariaLabel}
      type={type}
      href={href}
      as={as}
    >
      {renderButtonContents(buttonType, text, Icon)}
    </StyledDynamicButton>
  );
}

Button.propTypes = {
  buttonSize: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  buttonStyle: PropTypes.oneOf(Object.values(BUTTON_STYLES)),
  buttonType: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
  iconType: PropTypes.oneOf(['user']),
  text: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,

  // for if button
  type: PropTypes.string,

  // for if a tag
  href: PropTypes.string,
};

Button.defaultProps = {
  buttonSize: BUTTON_SIZES.MEDIUM,
  buttonStyle: BUTTON_STYLES.FILLED,
  buttonType: BUTTON_TYPES.LABEL_ONLY,
  iconType: 'user',
};

export default Button;
