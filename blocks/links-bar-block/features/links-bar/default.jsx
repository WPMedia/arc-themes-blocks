import React from 'react';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';

import './links-bar.scss';

const LinksBar = () => {
  const context = useAppContext();
  const { arcSite } = context;
  const content = useContent({
    source: 'site-navigation',
    query: {
      site: arcSite,
    },
  });
  const { children: menuItems } = content;

  return (
    <nav className="page-header">
      <div className="links-bar">
        <ul className="links-menu">
          {menuItems && menuItems.map((item) => {
            return <li key={item._id}><a href={item._id}>{item.name}</a></li>;
          })}
        </ul>
      </div>
    </nav>
  );
};

export default LinksBar;
