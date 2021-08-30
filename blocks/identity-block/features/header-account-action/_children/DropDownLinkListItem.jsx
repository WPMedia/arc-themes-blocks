import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';

import './DropDownLinkListItem.scss';

const StyledLinkWithHover = styled.a`
  font-family: ${({ arcSite }) => getThemeStyle(arcSite)['primary-font-family']};
  color: ${(arcSite) => getThemeStyle(arcSite)['primary-color']};

  &:hover {
    color: ${(arcSite) => getThemeStyle(arcSite)['primary-color']};
  }
`;

function DropDownLinkListItem({ text, href, isLastItem }) {
  const { arcSite } = useFusionContext();

  return (
    <li
      className={`${
        isLastItem
          ? 'xpmedia-subs-header-dropdown-list-item--last-item'
          : 'xpmedia-subs-header-dropdown-list-item'
      }`}
    >
      <StyledLinkWithHover
        arcSite={arcSite}
        href={href}
        className="xpmedia-subs-header-dropdown-list-item-link"
      >
        {text}
      </StyledLinkWithHover>
    </li>
  );
}

export default DropDownLinkListItem;
