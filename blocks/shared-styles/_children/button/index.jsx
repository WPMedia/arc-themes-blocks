import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HamburgerMenuIcon,
  SearchIcon,
  UserIcon,
} from '@wpmedia/engine-theme-sdk';

// handle non-dynamic styling not based on theme styles
import './styles.scss';

// naming comes from zeplin docs for types
export const BUTTON_STYLES = {
  PRIMARY: 'PRIMARY',
  PRIMARY_REVERSE: 'PRIMARY_REVERSE',
  SECONDARY: 'SECONDARY',
  SECONDARY_REVERSE: 'SECONDARY_REVERSE',
  DEFAULT: 'DEFAULT',
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
  LABEL_AND_TWO_ICONS: 'LABEL_AND_TWO_ICONS',
  LABEL_AND_RIGHT_ICON: 'LABEL_AND_RIGHT_ICON',
};

// names based on zeplin docs
const UI_WHITE_COLOR = '#fff';
const UI_LIGHT_GRAY_COLOR = '#dadada';
const UI_DARK_GRAY_COLOR = '#191919';

const iconTypeStringToIconTypeComponent = (
  iconTypeString, iconHeightWidth, primaryColor, buttonStyle,
) => {
  let iconColor;

  switch (buttonStyle) {
    case BUTTON_STYLES.PRIMARY:
    case BUTTON_STYLES.SECONDARY_REVERSE:
      iconColor = UI_WHITE_COLOR;
      break;
    case BUTTON_STYLES.PRIMARY_REVERSE:
      iconColor = primaryColor;
      break;
    case BUTTON_STYLES.SECONDARY:
    case BUTTON_STYLES.DEFAULT:
    default:
      iconColor = UI_DARK_GRAY_COLOR;
  }

  const icons = {
    'chevron-down': ChevronDownIcon,
    'chevron-up': ChevronUpIcon,
    'hamburger-menu': HamburgerMenuIcon,
    search: SearchIcon,
    user: UserIcon,
  };

  const iconProps = {
    height: iconHeightWidth,
    width: iconHeightWidth,
    fill: iconColor,
  };

  const Icon = icons[iconTypeString] || null;

  return Icon ? <Icon {...iconProps} /> : null;
};

// istanbul ignoring because we don't have a good way to test styled components yet
// hover overrides link hover global style
const StyledDynamicButton = styled.button.attrs((props) => ({
  buttonStyle: props.buttonStyle,
  primaryColor: props.primaryColor,
  font: props.font,
}))`
  /* istanbul ignore next */
  font-family: ${({ font }) => font};

  ${({ buttonStyle, primaryColor }) => {
    // istanbul ignore next
    switch (buttonStyle) {
      // istanbul ignore next
      case BUTTON_STYLES.PRIMARY_REVERSE:
        return `
          background-color: ${UI_WHITE_COLOR};
          border-color: ${UI_WHITE_COLOR};
          color: ${primaryColor};

          &:hover {
            color: ${primaryColor};
          }
        `;
      case BUTTON_STYLES.SECONDARY:
        // istanbul ignore next
        return `
          background-color: transparent;
          border-color: ${UI_LIGHT_GRAY_COLOR};
          color: ${UI_DARK_GRAY_COLOR};

          &:hover {
            color: ${UI_DARK_GRAY_COLOR};
          }
        `;
      case BUTTON_STYLES.SECONDARY_REVERSE:
        // istanbul ignore next
        return `
          background-color: transparent;
          border-color: ${UI_WHITE_COLOR};
          color: ${UI_WHITE_COLOR};

          &:hover {
            color: ${UI_WHITE_COLOR};
          }
        `;
      case BUTTON_STYLES.PRIMARY:
        // istanbul ignore next
        return `
          background-color: ${primaryColor};
          border-color: ${primaryColor};
          color: ${UI_WHITE_COLOR};

          &:hover {
            color: ${UI_WHITE_COLOR};
          }
        `;
      case BUTTON_STYLES.DEFAULT:
      default:
        // istanbul ignore next
        return `
          background-color: ${UI_WHITE_COLOR};
          border-color: ${UI_WHITE_COLOR};
          color: ${UI_DARK_GRAY_COLOR};

          &:hover {
            color: ${UI_DARK_GRAY_COLOR};
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

function renderButtonContents(
  matchedButtonType,
  text,
  iconComponent,
  secondaryIconComponent,
  isHTMLText,
) {
  const buttonText = isHTMLText
    ? <span dangerouslySetInnerHTML={{ __html: text }} />
    : text;

  switch (matchedButtonType) {
    case BUTTON_TYPES.LABEL_AND_TWO_ICONS:
      return (
        <>
          <span className="xpmedia-button--left-icon-container">
            {iconComponent}
          </span>
          {buttonText}
          <span className="xpmedia-button--right-icon-container">
            {secondaryIconComponent}
          </span>
        </>
      );
    case BUTTON_TYPES.LABEL_AND_ICON:
      return (
        <>
          <span className="xpmedia-button--left-icon-container">
            {iconComponent}
          </span>
          {buttonText}
        </>
      );
    case BUTTON_TYPES.LABEL_AND_RIGHT_ICON:
      return (
        <>
          {buttonText}
          <span className="xpmedia-button--right-icon-container">
            {iconComponent}
          </span>
        </>
      );
    case BUTTON_TYPES.ICON_ONLY:
      return (iconComponent);
    case BUTTON_TYPES.LABEL_ONLY:
    default:
      return (buttonText);
  }
}

function Button(props) {
  const { arcSite } = useFusionContext();

  const {
    ariaLabel,
    as,
    additionalClassNames,
    buttonSize,
    buttonStyle,
    buttonType,
    fullWidth,
    iconType,
    secondaryIconType,
    text,
    isHTMLText = false,
    type,
  } = props;

  const matchedButtonSizeClass = matchButtonSizeWithClass(buttonSize);

  let iconHeightWidth;

  const primaryColor = getThemeStyle(arcSite)['primary-color'];
  const primaryFont = getThemeStyle(arcSite)['primary-font-family'];

  const elementType = !type && as === undefined ? 'button' : null;

  switch (buttonSize) {
    case BUTTON_SIZES.LARGE:
      iconHeightWidth = 26;
      break;
    case BUTTON_SIZES.MEDIUM:
      iconHeightWidth = 24;
      break;
    case BUTTON_SIZES.SMALL:
    default:
      iconHeightWidth = 16;
  }

  const PrimaryIcon = iconTypeStringToIconTypeComponent(
    iconType,
    iconHeightWidth,
    primaryColor,
    buttonStyle,
  );
  const SecondaryIcon = iconTypeStringToIconTypeComponent(
    secondaryIconType,
    iconHeightWidth,
    primaryColor,
    buttonStyle,
  );

  return (
    <StyledDynamicButton
      arcSite={arcSite}
      aria-label={buttonType === BUTTON_TYPES.ICON_ONLY ? (ariaLabel || text) : null}
      as={as}
      buttonStyle={buttonStyle}
      className={`xpmedia-button ${matchedButtonSizeClass}${fullWidth ? ' xpmedia-button--full-width' : ''}${additionalClassNames ? ` ${additionalClassNames}` : ''}`}
      font={primaryFont}
      primaryColor={primaryColor}
      type={elementType}
      {...props}
    >
      {renderButtonContents(buttonType, text, PrimaryIcon, SecondaryIcon, isHTMLText)}
    </StyledDynamicButton>
  );
}

Button.propTypes = {
  buttonSize: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  buttonStyle: PropTypes.oneOf(Object.values(BUTTON_STYLES)),
  buttonType: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
  iconType: PropTypes.oneOf(['user', 'chevron-up', 'chevron-down', 'hamburger-menu', 'search']),
  secondaryIconType: PropTypes.oneOf(['user', 'chevron-up', 'chevron-down', 'hamburger-menu', 'search']),
  text: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  fullWidth: PropTypes.bool,

  // for if button
  type: PropTypes.string,

  // for if a tag
  href: PropTypes.string,
};

Button.defaultProps = {
  buttonSize: BUTTON_SIZES.MEDIUM,
  buttonStyle: BUTTON_STYLES.DEFAULT,
  buttonType: BUTTON_TYPES.LABEL_ONLY,
  iconType: 'user',
  secondaryIconType: 'user',
};

export default Button;
