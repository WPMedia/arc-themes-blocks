import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';

import './links-bar.scss';

const LinkBarSpan = styled.span`
  a {
    font-family: ${(props) => props.primaryFont};
  }
`;

const LinksBar = ({ customFields: { hierarchy } }) => {
  const context = useFusionContext();
  const { id, arcSite } = context;
  const content = useContent({
    source: 'site-navigation',
    query: {
      site: arcSite,
      hierarchy,
    },
  });

  const menuItems = (content && content.children) ? content.children : [];

  return (
    <nav key={id} className="links-bar">
      {menuItems && menuItems.map((item) => (
        <LinkBarSpan className="links-menu" key={item._id} primaryFont={getThemeStyle(arcSite)['primary-font-family']}>
          <a href={item._id}>{item.name}</a>
        </LinkBarSpan>
      ))}
    </nav>
  );
};

LinksBar.label = 'Links Bar – Arc Block';

LinksBar.propTypes = {
  customFields: PropTypes.shape({
    hierarchy: PropTypes.string,
  }),
};

export default LinksBar;
