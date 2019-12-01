import React from 'react';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';

import './footer.scss';

const FooterSection = styled.ul`
  font-family: ${props => props.primaryFont};
`;

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
      <div className="container">
        <div className="row">
          {/* The columns are 2D arrays of columns x column items. Iterate through both */}
          {footerColumns.map((column) => {
            const columnItems = (column.children) ? column.children.map(item => (
              <li className="footer-item" key={item._id}><a href={item.url}>{item.display_name}</a></li>
            )) : [];

            return (
              <FooterSection className="footer-section col-sm-12 col-md-6 col-lg-xl-3" key={column._id} primaryFont={getThemeStyle(arcSite)['primary-font-family']}>
                <section className="footer-header">{(column.name) ? column.name : ''}</section>
                {columnItems}
              </FooterSection>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
