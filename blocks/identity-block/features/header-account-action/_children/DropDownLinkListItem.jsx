import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';

import './DropDownLinkListItem.scss';

const StyledLinkWithHover = styled.a`
  font-family: ${({ fontFamily }) => fontFamily};
  color: ${({ primaryColor }) => primaryColor};

  &:hover {
    color: ${({ primaryColor }) => primaryColor};
  }
`;

function DropDownLinkListItem({ text, href }) {
  const { arcSite } = useFusionContext();
  const primaryColor = getThemeStyle(arcSite)['primary-color'];
  const primaryFont = getThemeStyle(arcSite)['primary-font-family'];

  return (
    <li
      className="xpmedia-subs-header-dropdown-list-item"
    >
      <StyledLinkWithHover
        className="xpmedia-subs-header-dropdown-list-item-link"
        href={href}
        primaryColor={primaryColor}
        primaryFont={primaryFont}
      >
        {text}
      </StyledLinkWithHover>
    </li>
  );
}

export default DropDownLinkListItem;
