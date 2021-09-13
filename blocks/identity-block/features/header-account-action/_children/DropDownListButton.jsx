import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';

import './DropDownListButton.scss';

const StyledButtonLinkWithHover = styled.button`
  font-family: ${({ font }) => font};
  color: ${({ primaryColor }) => primaryColor};

  &:hover {
    color: ${({ primaryColor }) => primaryColor};
  }
`;

function DropDownListButton(props) {
  const { text } = props;
  const { arcSite } = useFusionContext();
  const primaryColor = getThemeStyle(arcSite)['primary-color'];
  const font = getThemeStyle(arcSite)['primary-font-family'];

  return (
    <li
      className="xpmedia-subs-header-dropdown-list-item"
    >
      <StyledButtonLinkWithHover
        className="xpmedia-subs-header-dropdown-list-item-button"
        primaryColor={primaryColor}
        font={font}
        {...props}
      >
        {text}
      </StyledButtonLinkWithHover>
    </li>
  );
}

export default DropDownListButton;
