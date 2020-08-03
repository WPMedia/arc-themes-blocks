import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import Link from './_children/link';

import './links-bar.scss';

const LinkBarSpan = styled.span`
  a {
    font-family: ${(props) => props.primaryFont};
  }
`;

const LinksBar = ({ customFields: { navigationConfig = {} } }) => {
  const content = useContent({
    source: navigationConfig.contentService,
    query: {
      ...navigationConfig.contentConfigValues,
    },
  });
  const { id, arcSite } = useFusionContext();
  const menuItems = (content && content.children) ? content.children : [];
  const showSeparator = !!(
    content
    && content.children
    && content.children.length > 1
  );

  return (
    <>
      <nav key={id} className="links-bar">
        {menuItems && menuItems.map((item, index) => (
          <LinkBarSpan
            className="links-menu"
            key={item._id}
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          >
            {
              item.node_type === 'link'
                ? (
                  <Link
                    href={item.url}
                    name={item.display_name}
                    showSeparator={content.children.length !== index + 1 && showSeparator}
                  />
                )
                : (
                  <Link
                    href={item._id}
                    name={item.name}
                    showSeparator={content.children.length !== index + 1 && showSeparator}
                  />
                )
            }
          </LinkBarSpan>
        ))}
      </nav>
      <hr />
    </>
  );
};

LinksBar.label = 'Links Bar – Arc Block';

LinksBar.propTypes = {
  customFields: PropTypes.shape({
    navigationConfig: PropTypes.contentConfig('navigation-hierarchy').tag({
      group: 'Configure Content',
      label: 'Navigation',
    }),
  }),
};

export default LinksBar;
