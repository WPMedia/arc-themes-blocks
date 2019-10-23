import React from 'react';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';

import './footer.scss';

const Footer = () => {
  const { arcSite } = useFusionContext();
  const content = useContent({
    source: 'site-navigation',
    query: {
      site: arcSite,
      hierarchy: 'footer',
    },
  });

  const footerColumns = (content && content.children) ? content.children : [];
  return (
    <footer>
      {/* The columns are 2D arrays of columns x column items. Iterate through both */}
      {footerColumns.map((column) => {
        const columnItems = (column.children) ? column.children.map((item) => {
          return (
            <li className="footer-item" key={item._id}><a href={item.url}>{item.display_name}</a></li>
          );
        }) : [];
        return (
          <ul className="footer-section" key={column._id}>
            <section className="footer-header">{(column.name) ? column.name : ''}</section>
            {columnItems}
          </ul>
        );
      })}
    </footer>
  );
};

export default Footer;
