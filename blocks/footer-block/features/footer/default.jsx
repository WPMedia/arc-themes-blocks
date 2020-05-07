import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import Link from '@wpmedia/links-bar-block';
import FacebookAltIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/FacebookAltIcon';
import TwitterIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/TwitterIcon';
import RssIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/RssIcon';
import ArcLogo from '@wpmedia/engine-theme-sdk/dist/es/components/ArcLogo';

import './footer.scss';

const FooterSection = styled.ul`
  font-family: ${(props) => props.primaryFont};
`;

const Footer = ({ customFields: { navigationConfig } }) => {
  const { arcSite } = useFusionContext();

  const content = useContent({
    source: navigationConfig.contentService,
    query: {
      hierarchy: 'footer',
      ...navigationConfig.contentConfigValues,
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
              rel="noopener noreferrer"
              href={getProperties(arcSite).facebookPage}
            >
              <FacebookAltIcon fill="#2980B9" />
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
              rel="noopener noreferrer"
              href={`https://twitter.com/${getProperties(arcSite).twitterUsername}`}
            >
              <TwitterIcon fill="#2980B9" />
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
              rel="noopener noreferrer"
              href={getProperties(arcSite).rssUrl}
            >
              <RssIcon fill="#2980B9" />
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
          const columnItems = (column.children) ? column.children.map((item) => (
            <li className="footer-item" key={item._id}>
              {item.node_type === 'link' ? <Link href={item.url} name={item.display_name} /> : <Link href={item._id} name={item.name} />}
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
        {
          getProperties(arcSite).primaryLogo
            ? (
              <img
                src={getProperties(arcSite).primaryLogo}
                alt={getProperties(arcSite).primaryLogoAlt || 'Footer logo'}
                className="footer-logo"
              />
            )
            : <ArcLogo />
        }
      </div>
    </div>
  );
};

Footer.propTypes = {
  customFields: PropTypes.shape({
    navigationConfig: PropTypes.contentConfig('navigation-hierarchy').tag({
      group: 'Configure Content',
      label: 'Navigation',
    }),
  }),
};

Footer.label = 'Footer – Arc Block';

export default Footer;
