import React from 'react';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import Link from './_children/link';

import './links-bar.scss';

const LinkBarSpan = styled.span`
  a {
    font-family: ${(props) => props.primaryFont};
    white-space: nowrap;
  }
`;

const HorizontalLinksBar = ({ hierarchy, navBarColor }) => {
  const { id, arcSite } = useFusionContext();

  const content = useContent({
    source: 'site-service-hierarchy',
    query: {
      site: arcSite,
      hierarchy,
    },
  });

  const menuItems = (content && content.children) ? content.children : [];
  const showSeparator = !!(
    content
    && content.children
    && content.children.length > 1
  );

  const font = getThemeStyle(arcSite)['primary-font-family'];

  return (
    <>
      {}
      <nav key={id} className="horizontal-links-bar">
        {menuItems && menuItems.map((item, index) => (
          <LinkBarSpan
            className="links-menu"
            key={item._id}
            primaryFont={font}
          >
            {
              item.node_type === 'link'
                ? (
                  <Link
                    href={item.url}
                    name={item.display_name}
                    showSeparator={content.children.length !== index + 1 && showSeparator}
                    navBarColor={navBarColor}
                  />
                )
                : (
                  <Link
                    href={item._id}
                    name={item.name}
                    showSeparator={content.children.length !== index + 1 && showSeparator}
                    navBarColor={navBarColor}
                  />
                )
            }
          </LinkBarSpan>
        ))}
      </nav>
    </>
  );
};

export default HorizontalLinksBar;
