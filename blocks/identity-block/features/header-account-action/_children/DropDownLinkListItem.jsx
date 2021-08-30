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

function DropDownLinkListItem({ text, href }) {
  const { arcSite } = useFusionContext();

  return (
    <li>
      <StyledLinkWithHover
        arcSite={arcSite}
        href={href}
        className="xpmedia-subs-header-dropdown-list-item"
      >
        {text}
      </StyledLinkWithHover>
    </li>
  );
}

export default DropDownLinkListItem;
