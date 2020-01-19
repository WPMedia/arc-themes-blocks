import React from 'react';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import facebook from './images/facebook.svg';
import twitter from './images/twitter.svg';
import rss from './images/rss.svg';
import placeholderLogo from './images/arc-placeholder-logo.svg';

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

  const socialButtons = (
    <>
      {
        (getProperties(arcSite).facebookPage)
          ? (
            <a
              title="Facebook page"
              target="_blank"
              href={getProperties(arcSite).facebookPage}
            >
              <img src={facebook} alt="Facebook page" />
            </a>
          )
          : ''
      }
      {
        (getProperties(arcSite).twitterUsername)
          ? (
            <a
              title="Twitter feed"
              target="_blank"
              href={getProperties(arcSite).twitterUsername}
            >
              <img src={twitter} alt="Twitter feed" />
            </a>
          )
          : ''
      }
      {
        (getProperties(arcSite).rssUrl)
          ? (
            <a
              title="RSS feed"
              target="_blank"
              href={getProperties(arcSite).rssUrl}
            >
              <img src={rss} alt="RSS feed" />
            </a>
          )
          : ''
      }
    </>
  );

  return (
    <div className="container">
      <div className="section-separator">
        <section className="footer-header">
          <div className="footer-row">
            <div className="social-column">
              <div className="socialBtn-container">
                {socialButtons}
              </div>
            </div>
            <div className="copyright-column">
              {/* If large screen, show copyright over border */}
              <p className="copyright" id="copyright-top" style={{ width: '100%' }}>
                {getProperties(arcSite).copyrightText}
              </p>
            </div>
          </div>
        </section>
      </div>
      <div>
        {/* If small screen, show copyright under border */}
        <p className="copyright" id="copyright-bottom" style={{ width: '100%' }}>
          {getProperties(arcSite).copyrightText}
        </p>
      </div>
      <div className="row legacy-footer-row">
        {/* The columns are 2D arrays of columns x column items. Iterate through both */}
        {footerColumns.map((column) => {
          const columnItems = (column.children) ? column.children.map(item => (
            <li className="footer-item" key={item._id}>
              <a href={item.url}>{item.display_name}</a>
            </li>
          )) : [];

          return (
            <FooterSection
              className="footer-section col-sm-12 col-md-6 col-lg-xl-3"
              key={column._id}
              primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            >
              <section className="footer-header">{(column.name) ? column.name : ''}</section>
              {columnItems}
            </FooterSection>
          );
        })}
      </div>
      <div className="primaryLogo">
        <img
          src={getProperties(arcSite).primaryLogo || placeholderLogo}
          alt={getProperties(arcSite).primaryLogoAlt || 'Footer logo'}
          className="footer-logo"
        />
      </div>
    </div>
  );
};

export default Footer;
