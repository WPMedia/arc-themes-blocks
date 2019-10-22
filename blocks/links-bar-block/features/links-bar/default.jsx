import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';

import './links-bar.scss';

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
      {menuItems && menuItems.map((item) => {
        return <span className="links-menu" key={item._id}><a href={item._id}>{item.name}</a></span>;
      })}
    </nav>
  );
};

LinksBar.propTypes = {
  customFields: PropTypes.shape({
    hierarchy: PropTypes.string,
  }),
};

export default LinksBar;
