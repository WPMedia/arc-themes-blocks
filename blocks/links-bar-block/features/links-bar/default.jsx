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

const LinksBar = ({ customFields: { navigationConfig = {}, ariaLabel = 'More Links' } }) => {
  const content = useContent({
    source: navigationConfig.contentService,
    query: {
      ...navigationConfig.contentConfigValues,
      feature: 'links-bar',
    },
    filter: `{
      children {
        _id
        node_type
        display_name
        name
        url
      }
    }`,
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
      <nav
        key={id}
        className="links-bar"
        aria-label={ariaLabel || 'More Links'}
      >
        {menuItems && menuItems.map((item, index) => (
          <LinkBarSpan
            className="links-menu"
            key={item._id}
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          >
            {
              item.node_type === 'link'
                ? (
                  <Link href={item.url} name={item.display_name} />
                )
                : (
                  <Link href={item._id} name={item.name} />
                )
            }
            {(content.children.length !== index + 1 && showSeparator) ? '\u00a0 • \u00a0' : ''}
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
    ariaLabel: PropTypes.string.tag({
      label: 'Aria-label',
      default: 'More Links',
    }),
  }),
};

export default LinksBar;
